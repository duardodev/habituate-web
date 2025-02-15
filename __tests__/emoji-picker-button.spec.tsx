import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { EmojiPickerButton } from '@/app/management/components/emoji-picker-button';
import { useEmojiPickerButton } from '@/hooks/use-emoji-picker-button';
import { screen, waitFor } from '@testing-library/dom';
import { useTheme } from 'next-themes';

jest.mock('@/hooks/use-emoji-picker-button', () => ({
  useEmojiPickerButton: jest.fn(),
}));

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

jest.mock('emoji-picker-react', () => ({
  __esModule: true,
  default: jest.fn(({ onEmojiClick }) => (
    <div aria-label="Emoji picker">
      <button
        role="button"
        aria-label="grinning"
        onClick={() =>
          onEmojiClick({ imageUrl: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f600.png' })
        }
      >
        😀
      </button>
    </div>
  )),
}));

describe('EmojiPickerButton component', () => {
  const mockHandleEmojiUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useEmojiPickerButton as jest.Mock).mockReturnValue({
      handleEmojiUpdate: mockHandleEmojiUpdate,
      emojiUrl: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1fab4.png',
    });

    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: 'dark',
    });
  });

  it('should render the button with correct emoji', () => {
    render(<EmojiPickerButton />);

    const button = screen.getByRole('button', { name: /Open emoji picker/i });
    expect(button).toBeInTheDocument();

    const emojiImg = screen.getByAltText('Habit emoji');
    expect(emojiImg).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Femoji-datasource-apple%2Fimg%2Fapple%2F64%2F1fab4.png&w=48&q=100'
    );
  });

  it('should open the emoji picker when the button is clicked', async () => {
    render(<EmojiPickerButton />);

    userEvent.click(screen.getByRole('button', { name: /Open emoji picker/i }));
    const emojiPicker = await screen.findByLabelText('Emoji picker');
    expect(emojiPicker).toBeInTheDocument();
  });

  it('should call handleEmojiUpdate when an emoji is clicked', async () => {
    render(<EmojiPickerButton />);

    userEvent.click(screen.getByRole('button', { name: /Open emoji picker/i }));

    const emojiPicker = await screen.findByLabelText('Emoji picker');
    expect(emojiPicker).toBeInTheDocument();

    const firstEmoji = screen.getByRole('button', { name: /grinning/i });
    userEvent.click(firstEmoji);

    await waitFor(() => {
      expect(mockHandleEmojiUpdate).toHaveBeenCalledWith(
        'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f600.png'
      );
    });
  });
});
