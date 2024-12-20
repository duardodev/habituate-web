import { AmountTasks } from '@/app/habits/components/amount-tasks';
import { useLoading } from '@/hooks/use-loading';
import { render, screen } from '@testing-library/react';

jest.mock('@/hooks/use-loading', () => ({
  useLoading: jest.fn(),
}));

jest.mock('@/components/ui/skeleton', () => ({
  Skeleton: () => <div data-testid="skeleton">Mocked Skeleton</div>,
}));

jest.mock('@/store/use-tasks-store', () => ({
  useTasksStore: jest.fn(selector =>
    selector({
      amountCompletedTasks: () => 10,
      amountTasks: () => 15,
    })
  ),
}));

describe('AmountTasks component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useLoading as jest.Mock).mockReturnValue({
      isLoading: false,
    });
  });

  it('should render the component with correct data information', () => {
    render(<AmountTasks />);
    expect(screen.getByText('10/15 feitas')).toBeInTheDocument();
  });

  it('should render Skeleton when isLoading is true', () => {
    (useLoading as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<AmountTasks />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});
