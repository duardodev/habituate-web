import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Habit } from '@/app/(private)/management/components/habit';

jest.mock('../src/app/(private)/management/components/emoji-picker-button', () => ({
  EmojiPickerButton: () => <div data-testid="emoji-picker">Emoji Picker</div>,
}));

jest.mock('../src/app/(private)/management/components/habit-title', () => ({
  HabitTitle: () => <div data-testid="habit-title">Habit Title</div>,
}));

jest.mock('../src/app/(private)/management/components/checkboxes', () => ({
  Checkboxes: ({ datesTheHabitWasCompleted }: { datesTheHabitWasCompleted: string[] }) => (
    <div data-testid="checkboxes">Checkboxes for dates: {JSON.stringify(datesTheHabitWasCompleted)}</div>
  ),
}));

jest.mock('@/hooks/use-get-query-client', () => ({
  useGetQueryClient: () => ({
    prefetchQuery: jest.fn(),
    getDefaultOptions: jest.fn(),
    dehydrate: jest.fn(() => ({})),
  }),
}));

jest.mock('@tanstack/react-query', () => ({
  HydrationBoundary: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  dehydrate: jest.fn(() => ({})),
}));

describe('Habit Component', () => {
  const mockHabitId = 'habit-1';

  it('should render correctly', async () => {
    render(await Habit({ id: mockHabitId }));

    await waitFor(() => expect(screen.queryByTestId('emoji-picker')).toBeInTheDocument());
    expect(screen.getByTestId('habit-title')).toBeInTheDocument();
    expect(screen.getByTestId('checkboxes')).toBeInTheDocument();
  });
});
