import { useEffect, useRef, useState } from 'react';

//스크롤을 내리면 그에 맞게 데이터의 opacity가 1이 되고 스크롤이 맞지 않으면 0이됨. 
// 잘 조정해서 쓰면 좋겠지만, 일단 보류
const useScrollFadeIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.disconnect();
      }
    };
  }, []);

  return {
    ref: domRef,
    style: {
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out',
    },
  };
};

export default useScrollFadeIn;
