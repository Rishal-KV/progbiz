"use client";
import { Button } from "@/components/ui/button";
import { Apple, Play, FileText, MessageSquare, Shield, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cornerIconsRef = useRef<HTMLDivElement[]>([]);
  const buttonsRef = useRef<HTMLDivElement[]>([]);
  const pathRef = useRef<SVGPathElement[]>([]);
  const appleIconRef = useRef<HTMLDivElement>(null);
  const playIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(sectionRef.current, { opacity: 0, y: 50 });
      gsap.set(cornerIconsRef.current, { 
        opacity: 0, 
        scale: 0.5, 
        rotation: -180,
        x: (index) => index % 2 === 0 ? -50 : 50,
        y: (index) => index < 2 ? -50 : 50
      });
      gsap.set(contentRef.current?.children || [], { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      });
      gsap.set(buttonsRef.current, { 
        opacity: 0, 
        y: 40, 
        scale: 0.8,
        rotationX: -15
      });

      // Main section slide-in animation
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 20%",
          toggleActions: "play none none reverse",
          scrub: false,
          onEnter: () => {
            gsap.to(sectionRef.current, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out"
            });
          },
          onLeave: () => {
            gsap.to(sectionRef.current, {
              opacity: 0.8,
              y: -20,
              duration: 0.6,
              ease: "power2.inOut"
            });
          },
          onEnterBack: () => {
            gsap.to(sectionRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(sectionRef.current, {
              opacity: 0,
              y: 50,
              duration: 0.6,
              ease: "power2.in"
            });
          }
        }
      });

      // Corner icons staggered slide-in
      cornerIconsRef.current.forEach((icon, index) => {
        if (icon) {
          gsap.to(icon, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.6)",
            delay: 0.3 + index * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });

      // Content elements cascading slide-in
      const contentElements = contentRef.current?.children;
      if (contentElements) {
        Array.from(contentElements).forEach((element, index) => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.6 + index * 0.2,
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          });
        });
      }

      // Buttons with 3D flip effect
      buttonsRef.current.forEach((button, index) => {
        if (button) {
          gsap.to(button, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            ease: "back.out(1.4)",
            delay: 1.2 + index * 0.2,
            scrollTrigger: {
              trigger: button,
              start: "top 95%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });

      // SVG path drawing with progressive reveal
      pathRef.current.forEach((path, index) => {
        if (path) {
          const pathLength = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            opacity: 0
          });

          gsap.to(path, {
            strokeDashoffset: 0,
            opacity: index === 0 ? 0.4 : 0.25,
            duration: 2.5,
            ease: "power2.inOut",
            delay: 1 + index * 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });

      // Continuous floating animations (start after entrance)
      setTimeout(() => {
        cornerIconsRef.current.forEach((icon, index) => {
          if (icon) {
            gsap.to(icon, {
              y: "+=25",
              duration: 3 + index * 0.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.7
            });
          }
        });
      }, 2000);

      // Enhanced icon wiggle animations
      if (appleIconRef.current) {
        gsap.to(appleIconRef.current, {
          rotation: 8,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          repeatDelay: 4,
          delay: 2
        });
      }

      if (playIconRef.current) {
        gsap.to(playIconRef.current, {
          rotation: -8,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          repeatDelay: 4,
          delay: 2.5
        });
      }

      // Parallax effect for the entire section
      gsap.to(sectionRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover effects
  const handleIconHover = (index: number, colors: string[]) => {
    const icon = cornerIconsRef.current[index];
    if (icon) {
      gsap.to(icon, {
        scale: 1.2,
        color: colors[index],
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleIconLeave = (index: number) => {
    const icon = cornerIconsRef.current[index];
    if (icon) {
      gsap.to(icon, {
        scale: 1,
        color: "rgb(156, 163, 175)",
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleButtonHover = (index: number) => {
    const button = buttonsRef.current[index];
    if (button) {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleButtonLeave = (index: number) => {
    const button = buttonsRef.current[index];
    if (button) {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleButtonTap = (index: number) => {
    const button = buttonsRef.current[index];
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }
  };

  const iconColors = [
    "rgb(59, 130, 246)",  // blue
    "rgb(34, 197, 94)",   // green
    "rgb(168, 85, 247)",  // purple
    "rgb(239, 68, 68)"    // red
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Corner Icons */}
      <div 
        // ref={el => cornerIconsRef.current[0] = el!}
        className="absolute top-8 left-8 text-gray-400 cursor-pointer"
        onMouseEnter={() => handleIconHover(0, iconColors)}
        onMouseLeave={() => handleIconLeave(0)}
      >
        <FileText className="w-8 h-8" />
      </div>
      
      <div 
        // ref={el => cornerIconsRef.current[1] = el!}
        className="absolute top-8 right-8 text-gray-400 cursor-pointer"
        onMouseEnter={() => handleIconHover(1, iconColors)}
        onMouseLeave={() => handleIconLeave(1)}
      >
        <MessageSquare className="w-8 h-8" />
      </div>
      
      <div 
        // ref={el => cornerIconsRef.current[2] = el!}
        className="absolute bottom-8 left-8 text-gray-400 cursor-pointer"
        onMouseEnter={() => handleIconHover(2, iconColors)}
        onMouseLeave={() => handleIconLeave(2)}
      >
        <Shield className="w-8 h-8" />
      </div>
      
      <div 
        // ref={el => cornerIconsRef.current[3] = el!}
        className="absolute bottom-8 right-8 text-gray-400 cursor-pointer"
        onMouseEnter={() => handleIconHover(3, iconColors)}
        onMouseLeave={() => handleIconLeave(3)}
      >
        <Heart className="w-8 h-8" />
      </div>

      {/* Decorative curved lines */}
      <div className="absolute inset-0 pointer-events-none opacity-0">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 400" fill="none">
          <path
            // ref={el => pathRef.current[0] = el!}
            d="M0,200 Q200,100 400,200 T800,200"
            stroke="rgb(229, 231, 235)"
            strokeWidth="1"
            fill="none"
          />
          <path
            // ref={el => pathRef.current[1] = el!}
            d="M0,250 Q300,150 600,250 T800,250"
            stroke="rgb(229, 231, 235)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div ref={contentRef}>
          <div className="text-sm font-medium text-gray-500 mb-4 tracking-wider uppercase opacity-0">
            Special Launch Offer
          </div>

          <h2 className="text-4xl md:text-5xl text-gray-900 mb-6 opacity-0">
            Your journey to better
            <br />
            health starts now
          </h2>

          <p className="text-lg text-gray-600 mb-12 opacity-0">
            Get 50% off your first 3 months when you start your trial today
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0">
            <div
              ref={el => buttonsRef.current[0] = el! as any}
              onMouseEnter={() => handleButtonHover(0)}
              onMouseLeave={() => handleButtonLeave(0)}
              onMouseDown={() => handleButtonTap(0)}
              className="opacity-0"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-3xl text-black px-8 py-3 flex items-center gap-3 min-w-[180px] transition-all duration-200"
              >
                <Image width={20} height={20} src="/icons/apple.png" alt="Google Play" className="w-5 h-5" />
                Download
              </Button>
            </div>

            <div
              ref={el => buttonsRef.current[1] = el!  as any}
              onMouseEnter={() => handleButtonHover(1)}
              onMouseLeave={() => handleButtonLeave(1)}
              onMouseDown={() => handleButtonTap(1)}
              className="opacity-0"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-3xl text-black px-8 py-3 flex items-center gap-3 min-w-[180px] transition-all duration-200"
              >
                <div ref={playIconRef}>
                  <Image width={20} height={20} src="/icons/play-store.png" alt="Google Play" className="w-5 h-5" />
                </div>
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}