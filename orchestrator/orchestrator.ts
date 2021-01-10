import { IOrchestrator } from './interfaces/IOrchestrator';
import { ContentDto } from '../shared/dtos/ContentDto';
import { UserInput } from './userInput';

export class Orchestrator implements IOrchestrator {
    userInput: UserInput;
    private static instance: Orchestrator;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() {
        this.userInput = UserInput.getInstance();
    }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): Orchestrator {
        if (!Orchestrator.instance) {
            Orchestrator.instance = new Orchestrator();
        }

        return Orchestrator.instance;
    }

    public getContent(): ContentDto {
        return this.userInput.getUserInput();
    }
}