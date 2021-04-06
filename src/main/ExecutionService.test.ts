import { ExecutionService } from "./ExecutionService";
import { Executor } from "./Executor";
import { ExecutorDummy } from "./ExecutorDummy";
import { SearchResultItemDummy } from "./SearchResultItemDummy";

describe(ExecutionService, () => {
    describe(Executor.prototype.execute, () => {
        const executorDummy = new ExecutorDummy();

        it("should succeed if there is a corresponding executor", (done) => {
            new ExecutionService([executorDummy])
                .execute(SearchResultItemDummy.withExecutorId(executorDummy.executorId))
                .then(() => done())
                .catch((error) => done(error));
        });

        it("should fail if there is no corresponding executor found", (done) => {
            new ExecutionService([executorDummy])
                .execute(SearchResultItemDummy.withExecutorId("some random executor id"))
                .then(() => done("Should have failed"))
                .catch(() => done());
        });
    });
});
