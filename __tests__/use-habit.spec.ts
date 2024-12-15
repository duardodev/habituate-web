import { useHabit } from '@/hooks/use-habit';
import { auth } from '@clerk/nextjs/server';
import { server } from '@/app/api/mocks/server';
import { getDatesTheHabitWasCompletedMock } from '@/app/api/mocks/get-dates-the-habit-was-completed';

jest.mock('@clerk/nextjs/server');

describe('useHabit', () => {
  const mockHabitId = 'habit123';
  const mockToken = 'mock-token';

  beforeEach(() => {
    jest.resetAllMocks();
    (auth as jest.Mock).mockReturnValue({
      getToken: jest.fn().mockResolvedValue(mockToken),
    });
  });

  it('should fetch and return formatted dates', async () => {
    server.use(getDatesTheHabitWasCompletedMock);
    const result = await useHabit({ id: mockHabitId });
    expect(result).toEqual(['2024-10-01T00:00:00.000Z', '2024-09-30T00:00:00.000Z', '2024-09-28T00:00:00.000Z']);
  });

  it('should handle authentication errors', async () => {
    (auth as jest.Mock).mockReturnValue({
      getToken: jest.fn().mockRejectedValue(new Error('Auth Error')),
    });

    await expect(useHabit({ id: mockHabitId })).rejects.toThrow('Auth Error');
  });
});
