import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const SeamlessCardCarousel = () => {

  const [simplifiedAppData, setSimplifiedAppData] = useState({
    screens: []
  });

  useEffect(() => {
    axiosInstance.get('/heros')
    .then(response => {
      console.log(response,"okkk");
      setSimplifiedAppData({
        screens: response.data.data.data
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  console.log(simplifiedAppData,"hmmm");
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const currentContentRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLElement>(null);
  
  // Dynamic health coach app data with content sections
 


  
  const [currentIndex, setCurrentIndex] = useState(0); // Start with coach screen in center
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasViewedAllCards, setHasViewedAllCards] = useState(false);
  const [viewedCards, setViewedCards] = useState(new Set([0])); // Track which cards have been viewed



  useEffect(() => {
    if (!containerRef.current) return;
  
    const totalCards = simplifiedAppData.screens.length;
  
    const snapTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${totalCards * 150}vh`, // enough distance for all cards
      pin: true,
      pinSpacing: true,
      scrub: true, // smooth scroll link
      snap: {
        snapTo: (progress) => {
          // Progress is 0 → 1, map it to nearest card index
          const snapIndex = Math.round(progress * (totalCards - 1));
          return snapIndex / (totalCards - 1);
        },
        duration: 0.4,
        ease: "power1.inOut",
      },
      onUpdate: (self) => {
        const progressIndex = Math.round(self.progress * (totalCards - 1));
        setCurrentIndex(progressIndex); // update current card index
      },
    });
  
    return () => snapTrigger.kill();
  }, [simplifiedAppData.screens.length]);
  
  useEffect(() => {
    setViewedCards(prev => {
      const newViewed = new Set(prev).add(currentIndex);
      if (newViewed.size === simplifiedAppData.screens.length && !hasViewedAllCards) {
        setHasViewedAllCards(true);
        // Refresh ScrollTrigger when all cards are viewed to allow scrolling past
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 500);
      }
      return newViewed;
    });
  }, [currentIndex, hasViewedAllCards]);

  // Update positions when currentIndex changes
  useEffect(() => {
    if (cardsRef.current) {
      const cardElements = cardsRef.current.children;
      Array.from(cardElements).forEach((card, index) => {
        const position = index - currentIndex;
        
        let x = 0;
        let y = 0;
        let rotation = 0;
        let scale = 0.8;
        let zIndex = 1;
        let opacity = 0.4;

        if (position === -1) {
          x = -400;
          y = 30;
          rotation = -12;
          scale = 0.8;
          zIndex = 2;
          opacity = 0.6;
        } else if (position === 0) {
          x = 0;
          y = 0;
          rotation = 0;
          scale = 1;
          zIndex = 10;
          opacity = 1;
        } else if (position === 1) {
          x = 400;
          y = 30;
          rotation = 12;
          scale = 0.8;
          zIndex = 2;
          opacity = 0.6;
        } else {
          x = position < 0 ? -800 : 800;
          y = 50;
          rotation = position < 0 ? -20 : 20;
          scale = 0.6;
          zIndex = 0;
          opacity = 0;
        }

        gsap.to(card, {
          x: x,
          y: y,
          rotation: rotation,
          scale: scale,
          zIndex: zIndex,
          opacity: opacity,
          duration: 0.8,
          ease: "power2.out",
          transformOrigin: 'center center'
        });
      });
    }

    // Animate content fade in
    if (currentContentRef.current) {
      gsap.fromTo(currentContentRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  // Text animation when currentIndex changes
  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      const tl = gsap.timeline();
      
      // Animate title with a dramatic entrance
      tl.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 80, 
          scale: 0.8,
          rotationX: 90 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationX: 0,
          duration: 1.2, 
          ease: "back.out(1.7)",
          transformOrigin: "center bottom"
        }
      )
      // Animate subtitle with elegant slide up
      .fromTo(subtitleRef.current, 
        { 
          opacity: 0, 
          y: 40,
          x: -30 
        },
        { 
          opacity: 1, 
          y: 0,
          x: 0,
          duration: 0.8, 
          ease: "power3.out"
        }, 
        "-=0.6" // Start 0.6 seconds before title finishes
      );
    }
  }, [currentIndex]);

  // Initial load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation for the first load
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 80 });
      
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");

    }, contentRef);

    return () => ctx.revert();
  }, []);

  const renderImageCard = (screen: any, index: any) => (
    <div className="relative bg-white rounded-3xl shadow-md overflow-hidden h-full">
      {/* Full background image */}
      <Image
        src={screen.image.secure_url}
        alt={screen.title}
        fill
        className="object-cover"
      />
  
      {/* Optional overlay for current card */}
     
    </div>
  );
  
  // Use this instead of type-switching
  const renderCard = (screen: any, index: any) => renderImageCard(screen, index);
  const currentContent :any = simplifiedAppData.screens[currentIndex];

  return (
    <div className="font-sans antialiased">
      {/* Carousel Section - Pinned */}
      <div 
        ref={containerRef as any}
        className="min-h-screen    flex flex-col items-center justify-center  overflow-hidden"
      >
        {/* Cards Container */}
        <div 
          ref={cardsRef as any}
          className="w-full flex items-center justify-center "
        >
          {simplifiedAppData.screens.map((screen, index) => (
            <div
              key={index}
              className="absolute w-80 h-[60%] rounded-3xl cursor-pointer select-none shadow-2xl border border-white/20 transition-shadow duration-300 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setCurrentIndex(index)}
            >
              {renderCard(screen, index)}
            </div>
          ))}
        </div>

        {/* Scroll hint with animated text */}
       <div ref={contentRef as any} className="absolute bg-gre bottom-2 left-1/2 transform -translate-x-1/2 text-center">
          {/* Fade effect */}
          <div className="absolute top-0 left-0 w-full h-20  pointer-events-none" />

          <div className="text-gray-600 text-sm animate-pulse mb-2 relative">
            <h1 
              ref={titleRef as any}
              className="text-6xl font-semibold whitespace-nowrap"
              style={{ transformOrigin: 'center bottom' }}
            >
              {currentContent?.title}
            </h1>
          </div>

          <div className="text-xs text-gray-500 relative">
            <h1 
              ref={subtitleRef as any}
              className="text-sm"
            >
              {currentContent?.subtitle}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeamlessCardCarousel;