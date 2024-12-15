import { render, screen } from '@testing-library/react';
import { Habits } from '@/app/habits/components/habits';
import { useFetchHabits } from '@/hooks/use-fetch-habits';

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(() => ({
    getToken: jest.fn(() => 'mock-token'),
  })),
}));

jest.mock('../src/app/habits/components/habit', () => ({
  Habit: ({ id }: { id: string }) => <div data-testid={`habit-${id}`}>Habit {id}</div>,
}));

jest.mock('../src/hooks/use-fetch-habits', () => ({
  useFetchHabits: jest.fn(),
}));

describe('Habits components', () => {
  it('should render Habits when data is available', async () => {
    (useFetchHabits as jest.Mock).mockReturnValue({
      habits: [
        { id: '1', title: 'First Habit' },
        { id: '2', title: 'Second Habit' },
      ],
    });

    render(await Habits());

    expect(await screen.findByTestId('habit-1')).toHaveTextContent('Habit 1');
    expect(await screen.findByTestId('habit-2')).toHaveTextContent('Habit 2');
  });

  it('should render message when no habits are found', async () => {
    (useFetchHabits as jest.Mock).mockReturnValue({ habits: [] });

    render(await Habits());

    expect(await screen.findByText(/Nenhum hábito encontrado/)).toBeInTheDocument();
  });
});
