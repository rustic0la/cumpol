-- CreateIndex
CREATE INDEX "topicId" ON "CheckList"("topicId");

-- CreateIndex
CREATE INDEX "todoId" ON "Meta"("todoId");

-- CreateIndex
CREATE INDEX "userId" ON "Space"("userId");

-- CreateIndex
CREATE INDEX "checkListId" ON "Todo"("checkListId");

-- CreateIndex
CREATE INDEX "spaceId" ON "Topic"("spaceId");
