import { render, screen } from '@testing-library/react';
import { Habits } from '@/app/habits/components/habits';
import { useFetchHabits } from '@/hooks/use-fetch-habits';

jest.mock('next/cache', () => ({
  unstable_cache: (fn: Function) => fn,
}));

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(() => ({
    getToken: jest.fn(() => 'mock-token'),
  })),
}));

jest.mock('../src/app/habits/components/habit', () => ({
  Habit: ({ id }: { id: string }) => <div data-testid={`habit-${id}`}>Habit {id}</div>,
}));

jest.mock('@/hooks/use-fetch-habits', () => ({
  useFetchHabits: jest.fn(),
}));

describe('Habits components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Habits when data is available', async () => {
    const mockHabits = {
      habits: [
        { id: '1', title: 'First Habit' },
        { id: '2', title: 'Second Habit' },
      ],
    };

    (useFetchHabits as jest.Mock).mockResolvedValue(mockHabits);

    render(await Habits());

    expect(await screen.findByTestId('habit-1')).toBeInTheDocument();
    expect(await screen.findByTestId('habit-2')).toBeInTheDocument();
  });

  it('should render message when no habits are found', async () => {
    (useFetchHabits as jest.Mock).mockResolvedValue({ habits: [] });

    render(await Habits());

    expect(await screen.findByText(/Nenhum hábito encontrado/)).toBeInTheDocument();
  });
});
