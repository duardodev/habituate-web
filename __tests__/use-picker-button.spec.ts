import { updateHabitEmoji } from '@/app/actions/habit-actions';
import { useEmojiPickerButton } from '@/hooks/use-emoji-picker-button';
import { act, renderHook } from '@testing-library/react';
import { toast } from 'sonner';

jest.mock('@/app/actions/habit-actions', () => ({
  updateHabitEmoji: jest.fn(),
}));

jest.mock('@/hooks/use-habit-context', () => ({
  useHabitContext: jest.fn(() => ({
    id: 'mock-habit',
    emoji: 'mock-emoji',
  })),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('useEmojiPickerButton hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with the correct emojiUrl', () => {
    const { result } = renderHook(() => useEmojiPickerButton());
    expect(result.current.emojiUrl).toBe('mock-emoji');
  });

  it('should update emojiUrl when handleEmojiUpdate is called', async () => {
    (updateHabitEmoji as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useEmojiPickerButton());

    await act(async () => {
      await result.current.handleEmojiUpdate('new-emoji');
    });

    expect(result.current.emojiUrl).toBe('new-emoji');
    expect(updateHabitEmoji).toHaveBeenCalledWith('mock-habit', 'new-emoji');
  });

  it('should revert emojiUrl if updateHabitEmoji fails', async () => {
    (updateHabitEmoji as jest.Mock).mockResolvedValue({ success: false, error: 'Failed to update emoji!' });

    const { result } = renderHook(() => useEmojiPickerButton());

    await act(async () => {
      await result.current.handleEmojiUpdate('new-emoji');
    });

    expect(result.current.emojiUrl).toBe('mock-emoji');
    expect(toast.error).toHaveBeenCalledWith('Failed to update emoji!');
  });
});
