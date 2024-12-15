import { render, screen, waitFor } from '@testing-library/react';
import { Habit } from '@/app/habits/components/habit';
import { useHabit } from '@/hooks/use-habit';

jest.mock('../src/hooks/use-habit', () => ({
  useHabit: jest.fn(),
}));

jest.mock('../src/app/habits/components/habit-title', () => ({
  HabitTitle: () => <div data-testid="habit-title">Habit Title</div>,
}));

jest.mock('../src/app/habits/components/checkboxes', () => ({
  Checkboxes: ({ datesTheHabitWasCompleted }: { datesTheHabitWasCompleted: string[] }) => (
    <div data-testid="checkboxes">Checkboxes for dates: {JSON.stringify(datesTheHabitWasCompleted)}</div>
  ),
}));

describe('Habit Component', () => {
  const mockHabitId = 'habit-1';
  const mockDatesTheHabitWasCompleted = ['2024-12-05', '2024-12-06'];

  beforeEach(() => {
    (useHabit as jest.Mock).mockResolvedValue(mockDatesTheHabitWasCompleted);
  });

  it('should render correctly', async () => {
    render(await Habit({ id: mockHabitId }));

    expect(screen.getByTestId('habit-title')).toBeInTheDocument();
    expect(screen.getByTestId('checkboxes')).toBeInTheDocument();
  });

  it('should call useHabit with the correct id', async () => {
    render(await Habit({ id: mockHabitId }));

    await waitFor(() => {
      expect(useHabit).toHaveBeenCalledWith({ id: mockHabitId });
    });
  });

  it('should render Checkboxes component with correct props', async () => {
    render(await Habit({ id: mockHabitId }));

    const checkboxes = await screen.findByTestId('checkboxes');
    expect(checkboxes).toHaveTextContent(JSON.stringify(mockDatesTheHabitWasCompleted));
  });
});
