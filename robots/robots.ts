import { ContentDto } from "shared/dtos/ContentDto";
import { RobotsDto } from "./dtos/RobotsDto";
import { TextRobotDto } from "./dtos/TextRobotDto";
import { IRobots } from "./interfaces/IRobots";
import { TextRobot } from "./text-robot";

export class Robots implements IRobots {
    private static instance: Robots;

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
    public static getInstance(): Robots {
        if (!Robots.instance) {
            Robots.instance = new Robots();
        }

        return Robots.instance;
    }

    async getRobots(content: ContentDto): Promise<RobotsDto> {
        let robots = new RobotsDto();
        robots.textRobot = await getTextRobot(content);
        return robots;

        async function getTextRobot(content: ContentDto): Promise<TextRobotDto> {
            let textRobot = new TextRobot(content);
            return await textRobot.getTextRobot();
        }
    }
}