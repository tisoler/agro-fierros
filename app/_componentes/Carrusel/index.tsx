'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import BotonIzquierda from '../BotonIzquierda';
import BotonDerecha from '../BotonDerecha';

interface HorizontalScrollerProps {
  items: {
    urlImagenDesktop: string,
    urlImagenMobile: string,
    textoAlt: string,
  }[]
  autoscroll?: boolean;
  autoScrollInterval?: number;
  esDispositivoMovil?: boolean;
}

const Carrusel: React.FC<HorizontalScrollerProps> = ({
  items,
  autoscroll = true,
  autoScrollInterval = 3000, // default value of auto-scroll
  esDispositivoMovil = true,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout>(null);
  const currentIndexRef = useRef(0);
  const currentTranslate = useRef(0);
  // StartX and isDragging are not refs because they are not needed outside the scope of the event handlers
  // They are used to track the touch/mouse position and dragging state
  // and they are not used in the render method
  let startX = 0;
  let startY = 0;
  let isDragging = false;

  const startAutoScroll = () => {
    autoScrollTimeoutRef.current = setInterval(() => {
      swipeSlide(currentIndexRef.current + 1);
    }, autoScrollInterval);
  };

  const resetAutoScroll = () => {
    if (autoScrollTimeoutRef.current) {
      clearInterval(autoScrollTimeoutRef.current);
    }
    startAutoScroll();
  };

  // Start auto-scroll when the component is mounted
  useEffect(() => {
    if (autoscroll) {
      startAutoScroll();
    }

    return () => {
      if (autoScrollTimeoutRef.current) {
        clearInterval(autoScrollTimeoutRef.current);
      }
    };
  }, []);

  const updateBullets = (newIndex: number) => {
    const bullets = document.querySelectorAll('[id^="bullet-"]');
    bullets.forEach((bullet, i) => {
      if (i === newIndex) {
        bullet.classList.add('bg-color-marca');
        bullet.classList.remove('bg-color-sec-marca');
      } else {
        bullet.classList.remove('bg-color-marca');
        bullet.classList.add('bg-color-sec-marca');
      }
    });
  };

  function smoothScrollTo (
    element: HTMLDivElement,
    targetX: number,
    duration = 0.3,
  ) {
    if (autoscroll) {
      resetAutoScroll();
    }

    // Enable hardware acceleration
    element.style.willChange = 'transform';

    // Set up transition
    element.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1)`;

    // Apply transform
    element.style.transform = `translateX(${targetX}px)`;

    // Clean up
    element.addEventListener(
      'transitionend',
      () => {
        element.style.willChange = 'auto';
        element.style.transition = 'none';
      },
      { once: true },
    );
  }

  const swipeSlide = (index: number) => {
    if (currentIndexRef.current === index || !scrollerRef.current) return;

    let newIndex = index;
    if (newIndex > items.length - 1) newIndex = 0;
    if (newIndex < 0) newIndex = items.length - 1;
    currentIndexRef.current = newIndex;

    const viewWidth = scrollerRef.current?.offsetWidth;
    currentTranslate.current = -newIndex * (viewWidth || 1);
    smoothScrollTo(scrollerRef.current, currentTranslate.current);
    updateBullets(newIndex);
  };

  const handleStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  };

  const handleMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollerRef.current) return;

    const clientX = e.touches && e.touches[0].clientX;
    if (!clientX) return;

    const diffX = clientX - startX;
    const clientY = e.touches && e.touches[0].clientY || 0;
    const diffY = clientY - startY;
    if (Math.abs(diffY) > Math.abs(diffX)) return;

    let newTranslate = currentTranslate.current + diffX;

    // Calculate boundaries with 10px elastic limit
    const viewWidth = scrollerRef.current?.offsetWidth;
    const rightTranslateBound = -(items.length - 1) * (viewWidth || 1) - 10; // 10px past last
    const leftTranslateBound = 10; // 10px past first

    // Apply elastic resistance when beyond limits
    if (newTranslate > leftTranslateBound) {
      // Calculate how far beyond limit (0-10px)
      const overshoot = newTranslate - leftTranslateBound;
      // Apply resistance (reduce movement by 5% when beyond)
      newTranslate = leftTranslateBound + overshoot * 0.05;
    } else if (newTranslate < rightTranslateBound) {
      // Calculate how far beyond limit (-10px past last)
      const overshoot = newTranslate - rightTranslateBound;
      // Apply resistance (reduce movement by 5% when beyond)
      newTranslate = rightTranslateBound + overshoot * 0.05;
    }
    // Apply the translation
    smoothScrollTo(scrollerRef.current, newTranslate, 0.2);
  };

  const handleEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollerRef.current) return;
    isDragging = false;

    const endX = e.changedTouches && e.changedTouches[0].clientX;
    if (!endX) return;

    const diffX = endX - startX;

    if (Math.abs(diffX) > 50) {
      swipeSlide(currentIndexRef.current + (diffX > 0 ? -1 : 1));
    } else {
      // Return to current position
      smoothScrollTo(scrollerRef.current, currentTranslate.current);
    }
  };

  const dimensions = esDispositivoMovil 
    ? { width: 400, height: 500 }  // iPhone promedio 4:5
    : { width: 1470, height: 430 };

  return (
    <div
      className='relative w-full overflow-hidden'
      ref={containerRef}
    >
      <div className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10">
        <BotonIzquierda onClick={() => swipeSlide(currentIndexRef.current - 1)} />
      </div>
      <div
        ref={scrollerRef}
        className="flex w-full will-change-transform h-[calc(100vw*5/4)] md:h-[430px]"
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {
          items?.map((item, idx) => 
            <div
              key={idx + 1}
              className="relative shrink-0 md:snap-start aspect-[4/5] md:aspect-auto md:h-[430px] w-full"
            >
              <picture>
                <source media="(min-width: 768px)" srcSet={item.urlImagenDesktop}></source>
                <source media="(max-width: 767px)" srcSet={item.urlImagenMobile}></source>
                <Image
                  priority
                  loading="eager"
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  src="https://tisolercdn.nyc3.cdn.digitaloceanspaces.com/agrotommasi/genericas/transparente-chica.svg"
                  alt={item.textoAlt}
                  width={dimensions.width}
                  height={dimensions.height}
                  className="object-cover object-center w-full h-full"
                  quality={85} // Optimización de calidad
                  sizes="100vw"
                />
              </picture>
            </div>
          )
        }
      </div>
      <div className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10">
        <BotonDerecha onClick={() => swipeSlide(currentIndexRef.current + 1)} />
      </div>
      <div className="absolute bottom-2 w-full z-40 flex items-center justify-center h-[40px] gap-6">
        {items?.map((_, index) => (
          <button
            id={`bullet-${index}`}
            key={index}
            onClick={() => swipeSlide(index)}
            className={`w-[8px] md:w-[10px] h-[8px] md:h-[10px] rounded-full cursor-pointer ${
              currentIndexRef.current === index
                ? 'bg-color-marca'
                : 'bg-color-sec-marca'
            }`}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrusel;
