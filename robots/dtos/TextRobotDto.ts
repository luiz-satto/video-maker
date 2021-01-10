import { SentenceDto } from "./SentenceDto";

export class TextRobotDto {
    originalContent: string;
    sanitizedContent: string;
    sentences: SentenceDto[];
}