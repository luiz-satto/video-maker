import algorithmia = require('algorithmia');
import algorithmiaJSON = require('../algorithmia.json');
import sentenceBoundaryDetection = require('sbd');

import { ContentDto } from "shared/dtos/ContentDto";
import { TextRobotDto } from "./dtos/TextRobotDto";
import { ITextRobot } from "./interfaces/ITextRobot";
import { SentenceDto } from './dtos/SentenceDto';

export class TextRobot implements ITextRobot {
    private readonly searchTerm: string;
    private readonly prefix: string;

    public constructor(content: ContentDto) {
        this.searchTerm = content.searchTerm;
        this.prefix = content.prefix;
    }

    async getTextRobot(): Promise<TextRobotDto> {
        let textRobot = new TextRobotDto();
        let originalContent = await this.fetchContent();
        textRobot.originalContent = originalContent;

        let sanitizedContent = this.sanitizeContent(originalContent);
        textRobot.sanitizedContent = sanitizedContent;

        textRobot.sentences = new Array<SentenceDto>();
        let sentences = this.breakContentIntoSentences(textRobot.sanitizedContent);
        sentences.forEach(sentence => {
            textRobot.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            });
        });

        console.log(textRobot.sentences);
        return textRobot;
    }

    private async fetchContent() {
        let algorithmiaClient = algorithmia(algorithmiaJSON.apiKey);
        let wikipediaAlgorithm = algorithmiaClient.algo("web/WikipediaParser/0.1.2?timeout=300");
        let wikipediaResponse = await wikipediaAlgorithm.pipe(this.prefix + ' ' + this.searchTerm);
        let wikipediaContent = wikipediaResponse.get();
        return wikipediaContent
            ? wikipediaContent.content
            : null;
    }

    private sanitizeContent(content: string): string {
        let contentWithoutBlankLinesAndMarkDowns = removeBlankLinesAndMarkDowns(content);
        let contentWithoutDatesInParentheses = removeDatesInParentheses(contentWithoutBlankLinesAndMarkDowns);
        return contentWithoutDatesInParentheses;

        function removeBlankLinesAndMarkDowns(content: string): string {
            let allLines = content.split('\n');
            let contentWithoutBlankLinesAndMarkDowns = allLines.filter((line) => {
                return line.trim().length > 0
                    && !line.trim().startsWith('=')
            });

            return contentWithoutBlankLinesAndMarkDowns
                ? contentWithoutBlankLinesAndMarkDowns.join(' ')
                : null;
        }

        function removeDatesInParentheses(content: string): string {
            return content.replace(/|((?:|([^()]*|)|[^()])*|)/gm, '').replace(/  /g, ' ');
        }
    }

    private breakContentIntoSentences(content: string) {
        let sentences = sentenceBoundaryDetection.sentences(content);
        return sentences;
    }
}