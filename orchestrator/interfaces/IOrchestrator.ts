import { UserInput } from "orchestrator/userInput";
import { ContentDto } from "shared/dtos/ContentDto";

export interface IOrchestrator {
    userInput: UserInput;
    getContent(): ContentDto;
}