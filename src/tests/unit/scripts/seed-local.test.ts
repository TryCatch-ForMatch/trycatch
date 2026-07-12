/**
 * @jest-environment node
 */

import bcrypt from 'bcryptjs';
import { seedLocalPortfolio } from '../../../../scripts/seed.local';
import { prisma } from '../../../../src/lib/prisma';

jest.mock('../../../../src/lib/prisma', () => ({
  prisma: {
    feedback: {
      upsert: jest.fn(),
    },
    project: {
      upsert: jest.fn(),
    },
    projectStack: {
      upsert: jest.fn(),
    },
    skill: {
      upsert: jest.fn(),
    },
    stack: {
      upsert: jest.fn(),
    },
    stackTaken: {
      upsert: jest.fn(),
    },
    user: {
      upsert: jest.fn(),
    },
    userCertificate: {
      upsert: jest.fn(),
    },
    userSkill: {
      upsert: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs', () => ({
  __esModule: true,
  default: {
    hash: jest.fn(),
  },
}));

const resolveCreateData = ({ create }: { create: Record<string, unknown> }) =>
  Promise.resolve(create);

describe('seedLocalPortfolio', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

    (prisma.user.upsert as jest.Mock).mockImplementation(({ create, where }) =>
      Promise.resolve({
        id: `user-${create.userName ?? where.email}`,
        ...create,
      })
    );
    (prisma.skill.upsert as jest.Mock).mockImplementation(({ create }) =>
      Promise.resolve({ id: `skill-${create.name}`, ...create })
    );
    (prisma.stack.upsert as jest.Mock).mockImplementation(({ create }) =>
      Promise.resolve({ id: `stack-${create.name}`, ...create })
    );
    (prisma.project.upsert as jest.Mock).mockImplementation(resolveCreateData);
    (prisma.projectStack.upsert as jest.Mock).mockImplementation(
      resolveCreateData
    );
    (prisma.stackTaken.upsert as jest.Mock).mockImplementation(
      resolveCreateData
    );
    (prisma.userCertificate.upsert as jest.Mock).mockImplementation(
      resolveCreateData
    );
    (prisma.userSkill.upsert as jest.Mock).mockImplementation(
      resolveCreateData
    );
    (prisma.feedback.upsert as jest.Mock).mockImplementation(resolveCreateData);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('creates the local portfolio seed records through the shared Prisma client', async () => {
    await seedLocalPortfolio();

    expect(bcrypt.hash).toHaveBeenCalledWith('teste123', 10);
    expect(prisma.user.upsert).toHaveBeenCalledTimes(4);
    expect(prisma.project.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          id: 'seed-project-concluido',
          ownerId: 'user-joao_public',
        }),
      })
    );
    expect(prisma.stackTaken.upsert).toHaveBeenCalledTimes(2);
    expect(prisma.feedback.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          stackTakenId: 'seed-st-1',
          toUserId: 'user-joao_public',
        }),
      })
    );
  });
});
