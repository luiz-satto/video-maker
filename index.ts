import { Robots } from "./robots/robots";
import { Orchestrator } from "./orchestrator/orchestrator";

class App {
    orchestrator: Orchestrator;
    robots: Robots;

    constructor() {
        this.orchestrator = Orchestrator.getInstance();
        this.robots = Robots.getInstance();
    }

    async init() {
        let content = this.orchestrator.getContent();
        let robots = await this.robots.getRobots(content);
        // console.log(robots);
    }
}

start();
function start() {
    var app = new App();
    app.init();
}