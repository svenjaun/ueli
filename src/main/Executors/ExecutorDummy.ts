import { Executor } from "./Executor";

export class ExecutorDummy extends Executor {
    public constructor(executorId = "DummyExecutor", public executionWillSucceed = true) {
        super(executorId);
    }

    public execute(): Promise<void> {
        return this.executionWillSucceed ? Promise.resolve() : Promise.reject("Failed");
    }
}
