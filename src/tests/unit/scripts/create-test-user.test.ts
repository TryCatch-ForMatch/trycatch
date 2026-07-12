/**
 * @jest-environment node
 */

import bcrypt from 'bcryptjs';
import { createTestUser } from '../../../../scripts/createTestUser';
import { prisma } from '../../../../src/lib/prisma';

jest.mock('../../../../src/lib/prisma', () => ({
  prisma: {
    user: {
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

describe('createTestUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates or updates the admin test user with a hashed password', async () => {
    const adminUser = {
      id: 'admin-1',
      email: 'admin@admin.com',
      role: 'ADMIN',
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
    (prisma.user.upsert as jest.Mock).mockResolvedValue(adminUser);

    await expect(createTestUser()).resolves.toEqual(adminUser);

    expect(bcrypt.hash).toHaveBeenCalledWith('teste123', 10);
    expect(prisma.user.upsert).toHaveBeenCalledWith({
      where: { email: 'admin@admin.com' },
      update: {},
      create: expect.objectContaining({
        email: 'admin@admin.com',
        password: 'hashed-password',
        role: 'ADMIN',
      }),
    });
  });
});
