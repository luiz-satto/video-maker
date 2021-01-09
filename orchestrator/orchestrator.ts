import readline = require('readline-sync');

import { IOrchestrator } from './interfaces/IOrchestrator';
import { ContentDto } from '../dtos/ContentDto';

export class Orchestrator implements IOrchestrator {
    private static instance: Orchestrator;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

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
        let content = new ContentDto();
        content.searchTerm = askAndReturnSearchTerm();
        content.prefix = askAndReturnPrefix();
        return content;

        function askAndReturnSearchTerm() {
            return readline.question('Type a search term: ');
        }

        function askAndReturnPrefix() {
            const prefixes = ['Who is', 'What is', 'History of'];
            const selectedPrefixIndex = readline.keyInSelect(prefixes);
            const selectedPrefixText = prefixes[selectedPrefixIndex];
            return selectedPrefixText;
        }
    }
}