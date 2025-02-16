import { useTitleWidth } from '@/hooks/use-title-width';
import { renderHook } from '@testing-library/react';

// Mock do useRef
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));

describe('useTitleWidth', () => {
  it('should calculate the title width correctly', () => {
    // Cria um mock para o elemento HTML
    const mockOffsetWidth = 100;
    const mockElement = { offsetWidth: mockOffsetWidth };

    // Configura o mock do useRef para retornar o mockElement
    require('react').useRef.mockReturnValue({ current: mockElement });

    // Renderiza o hook
    const { result } = renderHook(() => useTitleWidth({ isTitleEditing: false, title: 'Initial Title' }));

    // Verifica se a largura foi calculada corretamente
    expect(result.current.titleWidth).toBe(mockOffsetWidth + 18);
  });

  it('should handle null ref correctly', () => {
    // Configura o mock do useRef para retornar null
    require('react').useRef.mockReturnValue({ current: null });

    // Renderiza o hook
    const { result } = renderHook(() => useTitleWidth({ isTitleEditing: false, title: 'Initial Title' }));

    // Verifica se a largura é 0 quando a ref é nula
    expect(result.current.titleWidth).toBe(0);
  });
});
