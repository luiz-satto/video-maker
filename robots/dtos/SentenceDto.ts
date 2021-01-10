export class SentenceDto {
    text: string;
    keywords: string[];
    images: string[];

    constructor(text: string, keywords: string[], images: string[]) {
        this.text = text;
        this.keywords = keywords;
        this.images = images;
    }
}