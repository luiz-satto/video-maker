import { SentenceDto } from "./SentenceDto";

export class ContentDto {
    searchTerm: string;
    prefix: string;
    sourceContentOriginal: string;
    sourceContentSanitized: string;
    sentences: SentenceDto[];
}