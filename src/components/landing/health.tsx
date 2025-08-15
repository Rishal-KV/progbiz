"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Clock, History } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axiosInstance from "@/lib/axios";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HealthSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({ hours: 10, minutes: 34, seconds: 0 });

  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardHeaderRef = useRef<HTMLDivElement>(null);
  const timerDisplayRef = useRef<HTMLDivElement>(null);
  const timerTextRef = useRef<HTMLParagraphElement>(null);
  const playButtonRef = useRef<HTMLDivElement>(null);
  const taskListRef = useRef<HTMLDivElement>(null);
  const taskItemsRef = useRef<HTMLDivElement[]>([]);

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(prevTime => {
          let { hours, minutes, seconds } = prevTime;
          seconds++;
          
          if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
              minutes = 0;
              hours++;
            }
          }
          
          return { hours, minutes, seconds };
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Format time for display
  const formatTime = (time: { hours: number; minutes: number; seconds: number }) => {
    const { hours, minutes, seconds } = time;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for internal elements only
      gsap.set(leftContentRef.current, { opacity: 0, x: -80 });
      gsap.set(titleRef.current, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonRef.current, { opacity: 0, y: 30, scale: 0.9 });
      gsap.set(rightContentRef.current, { opacity: 0, x: 80 });
      gsap.set(cardRef.current, { opacity: 0, scale: 0.9, rotationY: -15 });
      gsap.set(cardHeaderRef.current, { opacity: 0, y: 20 });
      gsap.set(timerDisplayRef.current, { opacity: 0, y: 30, scale: 0.95 });
      gsap.set(timerTextRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(playButtonRef.current, { opacity: 0, scale: 0.7, rotation: -180 });
      gsap.set(taskListRef.current, { opacity: 0, y: 20 });
      gsap.set(taskItemsRef.current, { opacity: 0, x: -30, scale: 0.9 });

      // Left content animations with staggered entrance
      gsap.to(leftContentRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: leftContentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Title with dramatic scale effect
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "elastic.out(1, 0.8)",
        delay: 0.4,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Subtitle with smooth slide
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.7,
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Description with gentle fade-in
      gsap.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.9,
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Button with bounce effect
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.4)",
        delay: 1.1,
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      });

      // Right content with slide from right
      gsap.to(rightContentRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: rightContentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Card with 3D effect
      gsap.to(cardRef.current, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Card header elements
      gsap.to(cardHeaderRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.2,
        scrollTrigger: {
          trigger: cardHeaderRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Timer display with scale effect
      gsap.to(timerDisplayRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.2)",
        delay: 1.4,
        scrollTrigger: {
          trigger: timerDisplayRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Timer text with dramatic entrance
      gsap.to(timerTextRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.6)",
        delay: 1.7,
        scrollTrigger: {
          trigger: timerTextRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Play button with spinning entrance
      gsap.to(playButtonRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.6)",
        delay: 1.6,
        scrollTrigger: {
          trigger: playButtonRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      });

      // Task list container
      gsap.to(taskListRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.8,
        scrollTrigger: {
          trigger: taskListRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      });

      // Task items with staggered animation
      taskItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.to(item, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 2 + index * 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top 98%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });

      // Floating animation for the card
      gsap.to(cardRef.current, {
        y: "+=15",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Interaction handlers
  const handleButtonHover = (element: HTMLElement, isEntering: boolean) => {
    gsap.to(element, {
      scale: isEntering ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleButtonTap = (element: HTMLElement) => {
    gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  const handleTaskHover = (index: number, isEntering: boolean) => {
    const task = taskItemsRef.current[index];
    if (task) {
      gsap.to(task, {
        x: isEntering ? 8 : 0,
        scale: isEntering ? 1.02 : 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handlePlayButtonHover = (isEntering: boolean) => {
    gsap.to(playButtonRef.current, {
      scale: isEntering ? 1.1 : 1,
      rotation: isEntering ? (isPlaying ? 0 : 5) : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handlePlayButtonClick = () => {
    setIsPlaying(!isPlaying);
    
    // Animate the button
    gsap.to(playButtonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });

    // Animate timer text when starting/stopping
    gsap.to(timerTextRef.current, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  const [abouts, setAbouts] = useState<any>([]);

  useEffect(() => {
    axiosInstance.get('/abouts')
    .then(response => {
      setAbouts(response.data.data.data);
      console.log(response,"about");
    
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    }); 
    
  }, []);
  

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-[#F4F5F6] flex items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 lg:py-0"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div 
            ref={leftContentRef}
            className="space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            <h1 
              ref={titleRef}
              className="text-5xl font-medium text-black leading-tight"
            >
            {abouts[0]?.heading}
            </h1>

            <div className="space-y-4">
              <h2 
                ref={subtitleRef}
                className="text-lg sm:text-xl md:text-2xl text-gray-900"
              >
                Smart Nutrition Planning
              </h2>
              <p 
              dangerouslySetInnerHTML={{ __html: abouts[0]?.description }}
                ref={descriptionRef}
                className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0"
              />
             
            </div>

            <div ref={buttonRef} className="pt-2">
              <Button 
                variant="outline"  
                className="rounded-full text-black px-6 sm:px-8 py-3 sm:py-4 md:py-5 cursor-pointer text-base sm:text-lg hover:bg-gray-50 transition-colors duration-200 w-auto"
                onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
                onMouseDown={(e) => handleButtonTap(e.currentTarget)}
              >
                Read More
              </Button>
            </div>
          </div>

          {/* Right Content - Time Tracker */}
          <div 
            ref={rightContentRef}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <Card 
              ref={cardRef}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full p-4 sm:p-6 md:p-8 lg:p-10 bg-[#F4F5F6] shadow-lg"
            >
              {/* Header */}
              <div className="bg-white rounded-2xl p-4 sm:p-6">
                <div 
                  ref={cardHeaderRef}
                  className="flex items-center justify-between mb-4 sm:mb-6"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    <span className="text-xs sm:text-sm text-gray-500">Time Tracker</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="rounded-full border-gray-300 px-2 py-1" variant="outline">
                      <History className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-xs sm:text-sm text-gray-500 ml-1">History</span>
                    </Badge>
                  </div>
                </div>

                {/* Timer Display */}
                <div 
                  ref={timerDisplayRef}
                  className="mb-4 sm:mb-6 flex bg-[#F4F5F6] items-center justify-between rounded-2xl p-3 sm:p-4 md:p-5"
                >
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Design System</p>
                    <p 
                      ref={timerTextRef}
                      className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-gray-900 mb-2 sm:mb-4"
                    >
                      {formatTime(time).split(':').slice(0, 2).join(':')}:<span className="text-blue-600">{time.seconds.toString().padStart(2, '0')}</span>
                    </p>
                  </div>
                  <div
                    ref={playButtonRef}
                    onMouseEnter={() => handlePlayButtonHover(true)}
                    onMouseLeave={() => handlePlayButtonHover(false)}
                  >
                    <Button
                      size="sm"
                      onClick={handlePlayButtonClick}
                      className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 transition-all duration-200 ${
                        isPlaying 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Task List */}
                <div 
                  ref={taskListRef}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="text-xs sm:text-sm text-gray-500 mb-2">
                    Previous Tasks
                  </div>

                  <div 
                    ref={el => taskItemsRef.current[0] = el! as any}
                    className="flex items-center justify-between py-2 cursor-pointer rounded-lg hover:bg-gray-50 px-2 -mx-2 transition-colors"
                    onMouseEnter={() => handleTaskHover(0, true)}
                    onMouseLeave={() => handleTaskHover(0, false)}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-700 truncate">
                        Login/UI Design System
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 ml-2 flex-shrink-0">1</span>
                  </div>

                  <div 
                    ref={el => taskItemsRef.current[1] = el! as any}
                    className="flex items-center justify-between py-2 cursor-pointer rounded-lg hover:bg-gray-50 px-2 -mx-2 transition-colors"
                    onMouseEnter={() => handleTaskHover(1, true)}
                    onMouseLeave={() => handleTaskHover(1, false)}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-700 truncate">
                        Login/UI UI Designer
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 ml-2 flex-shrink-0">1</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}