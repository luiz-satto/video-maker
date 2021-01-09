import { ContentDto } from "dtos/ContentDto";

export interface IOrchestrator {
    getContent(): ContentDto;
}