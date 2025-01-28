import { useEffect, useRef, useState } from 'react';

interface useTitleWidthProps {
  isTitleEditing: boolean;
  title: string;
}

export function useTitleWidth({ isTitleEditing, title }: useTitleWidthProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleWidth, setTitleWidth] = useState(0);

  useEffect(() => {
    if (titleRef.current) {
      setTitleWidth(titleRef.current.offsetWidth + 18);
    }
  }, [isTitleEditing, title]);

  return {
    titleWidth,
    titleRef,
  };
}
