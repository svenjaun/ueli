import { ExecutionService } from "./ExecutionService";
import { Executor } from "../Executors/Executor";
import { ExecutorDummy } from "../Executors/ExecutorDummy";
import { SearchResultItemDummy } from "../../common/SearchResult/SearchResultItemDummy";

describe(ExecutionService, () => {
    describe(Executor.prototype.execute, () => {
        it("should succeed if the corresponding executor resolves", (done) => {
            const executorDummy = new ExecutorDummy();
            new ExecutionService([executorDummy])
                .execute(SearchResultItemDummy.withExecutorId(executorDummy.executorId))
                .then(() => done())
                .catch((error) => done(error));
        });

        it("should fail if the corresponding executor rejects", (done) => {
            const executorDummy = new ExecutorDummy();
            executorDummy.executionWillSucceed = false;

            new ExecutionService([executorDummy])
                .execute(SearchResultItemDummy.withExecutorId(executorDummy.executorId))
                .then(() => done("Should have failed"))
                .catch((error) => {
                    expect(error).toBe("Failed");
                    done();
                });
        });

        it("should fail if there is no corresponding executor found", (done) => {
            const executorDummy = new ExecutorDummy();
            new ExecutionService([executorDummy])
                .execute(SearchResultItemDummy.withExecutorId("some random executor id"))
                .then(() => done("Should have failed"))
                .catch((error) => {
                    expect(error).toBe(
                        `Can't execute "${
                            SearchResultItemDummy.withExecutorId("some random executor id").executionArgument
                        }". Reason: no executor found.`
                    );
                    done();
                });
        });
    });
});
