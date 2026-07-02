export type ProjectStackLike = {
  id: string;
  stackId: string;
  percentage: number;
};

export type IncomingProjectStack = {
  stackId: string;
  percentage: number;
};

export function planProjectStackChanges(
  existingStacks: ProjectStackLike[],
  incomingStacks: IncomingProjectStack[]
) {
  const incomingMap = new Map(
    incomingStacks.map((stack) => [stack.stackId, stack])
  );
  const existingMap = new Map(
    existingStacks.map((stack) => [stack.stackId, stack])
  );

  const toUpdate = existingStacks
    .filter((stack) => incomingMap.has(stack.stackId))
    .map((stack) => ({
      id: stack.id,
      percentage: incomingMap.get(stack.stackId)!.percentage,
    }));

  const toCreate = incomingStacks.filter(
    (stack) => !existingMap.has(stack.stackId)
  );

  const toDelete = existingStacks.filter(
    (stack) => !incomingMap.has(stack.stackId)
  );

  return { toUpdate, toCreate, toDelete };
}
