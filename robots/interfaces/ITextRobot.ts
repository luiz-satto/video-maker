import { TextRobotDto } from "../dtos/TextRobotDto";

export interface ITextRobot {
    getTextRobot(): Promise<TextRobotDto>;
}