import { ContentDto } from "orchestrator/dtos/ContentDto";

export interface IOrchestrator {
    getContent(): ContentDto;
}