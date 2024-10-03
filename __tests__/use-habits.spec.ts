import { renderHook, waitFor } from '@testing-library/react';
import { useHabits } from '@/hooks/use-habits';

describe('useHabits', () => {
  it('should fetch habits successfully', async () => {
    const { result } = renderHook(() => useHabits());

    await waitFor(() => {
      expect(result.current).toBeDefined();
    });

    expect((await result.current).habits).toHaveLength(3);
    expect((await result.current).habits[0]).toEqual({ id: 'habit-1', title: 'Correr 1KM' });
  });
});
