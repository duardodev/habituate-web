import { useHabit } from '@/hooks/use-habit';
import { auth } from '@clerk/nextjs/server';
import { server } from '@/app/api/mocks/server';
import { getDatesTheHabitWasCompletedMock } from '@/app/api/mocks/get-dates-the-habit-was-completed';

jest.mock('@clerk/nextjs/server');

describe('useHabit', () => {
  const mockHabitId = 'habit-1';
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
    expect(result).toEqual(['2025-01-10T03:00:00.000Z', '2025-01-09T03:00:00.000Z', '2025-01-08T03:00:00.000Z']);
  });

  it('should handle authentication errors', async () => {
    (auth as jest.Mock).mockReturnValue({
      getToken: jest.fn().mockRejectedValue(new Error('Auth Error')),
    });

    await expect(useHabit({ id: mockHabitId })).rejects.toThrow('Auth Error');
  });
});
