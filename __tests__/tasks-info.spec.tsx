import { TasksInfo } from '@/app/habits/components/tasks-info';
import { monthsNames } from '@/lib/data';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';

jest.mock('@/app/habits/components/amount-tasks', () => ({
  AmountTasks: () => <div data-testid="amount-tasks">Mocked AmountTasks</div>,
}));

describe('TasksInfo component', () => {
  it('should render the component with correct data information', () => {
    render(<TasksInfo />);

    expect(screen.getByText('Tarefas para hoje')).toBeInTheDocument();

    const currentMonth = monthsNames[dayjs().month()].toLowerCase();
    const currentYear = dayjs().year();
    const currentDay = dayjs().date();

    const dateString = `${currentDay} de ${currentMonth} de ${currentYear}`;

    expect(screen.getByText(dateString)).toBeInTheDocument();
    expect(screen.getByTestId('amount-tasks')).toBeInTheDocument();
  });
});
