import { Orchestrator } from "./orchestrator/orchestrator";

class App {
    orchestrator: Orchestrator;
    constructor() {
        this.orchestrator = Orchestrator.getInstance();
    }

    init() {
        let content = this.orchestrator.getContent();
        console.log(content);
    }
}

start();
function start() {
    var app = new App();
    app.init();
}