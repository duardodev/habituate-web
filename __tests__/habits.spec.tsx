import { render, screen, waitFor } from '@testing-library/react';
import { Habits } from '@/app/habits/components/habits';
import { useHabits } from '@/hooks/use-habits';

jest.mock('../src/app/habits/components/habit', () => ({
  Habit: ({ id, title }: { id: string; title: string }) => (
    <div data-testid={`habit-${id}`}>{title}</div>
  ),
}));

jest.mock('../src/hooks/use-habits', () => ({
  useHabits: jest.fn(),
}));

describe('Habits components', () => {
  it('should render Habits when data is available', async () => {
    (useHabits as jest.Mock).mockReturnValue({
      habits: [
        { id: '1', title: 'First habit' },
        { id: '2', title: 'Second habit' },
      ],
    });

    render(await Habits());

    expect(await screen.findByTestId('habit-1')).toHaveTextContent('First habit');
    expect(await screen.findByTestId('habit-2')).toHaveTextContent('Second habit');
  });

  it('should render message when no habits are found', async () => {
    (useHabits as jest.Mock).mockReturnValue({ habits: [] });

    render(await Habits());

    expect(await screen.findByText(/Nenhum hábito encontrado/)).toBeInTheDocument();
  });
});
