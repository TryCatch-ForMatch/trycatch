import { planProjectStackChanges } from '@/lib/project-stack-update';

describe('planProjectStackChanges', () => {
  it('preserves existing stack links when a stack remains but its percentage changes', () => {
    const existingStacks = [
      { id: 'ps-1', stackId: 'stack-1', percentage: 10 },
      { id: 'ps-2', stackId: 'stack-2', percentage: 20 },
    ];

    const incomingStacks = [
      { stackId: 'stack-1', percentage: 60 },
      { stackId: 'stack-3', percentage: 40 },
    ];

    const result = planProjectStackChanges(existingStacks, incomingStacks);

    expect(result.toUpdate).toEqual([{ id: 'ps-1', percentage: 60 }]);
    expect(result.toCreate).toEqual([{ stackId: 'stack-3', percentage: 40 }]);
    expect(result.toDelete).toEqual([
      { id: 'ps-2', stackId: 'stack-2', percentage: 20 },
    ]);
  });
});
