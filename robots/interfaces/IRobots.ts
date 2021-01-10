import { RobotsDto } from "robots/dtos/RobotsDto";
import { ContentDto } from "shared/dtos/ContentDto";

export interface IRobots {
    getRobots(content: ContentDto): Promise<RobotsDto>;
}