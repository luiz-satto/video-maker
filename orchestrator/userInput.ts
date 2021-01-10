import readline = require('readline-sync');
import { ContentDto } from '../shared/dtos/ContentDto';
import { SentenceDto } from '../robots/dtos/SentenceDto';

export class UserInput {
    private content: ContentDto;
    private static instance: UserInput;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() {
        this.content = new ContentDto();
    }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): UserInput {
        if (!UserInput.instance) {
            UserInput.instance = new UserInput();
        }

        return UserInput.instance;
    }

    public getUserInput(): ContentDto {
        this.content.searchTerm = askAndReturnSearchTerm();
        this.content.prefix = askAndReturnPrefix();
        return this.content;

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