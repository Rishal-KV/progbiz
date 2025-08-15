"use client";
import axiosInstance from "@/lib/axios";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TestimonialsSection() {
  const [testimonials, setTestimonialss] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const indicatorItemsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    axiosInstance.get("/testimonials").then((response) => {
      const data = response.data.data.data;
      console.log("Fetched testimonials:", data);
      setTestimonialss(data);
    });
  }, []);

  // Auto-advance testimonials every 5 seconds - ONLY if there are multiple testimonials
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Main scroll animations
  useEffect(() => {
    if (testimonials.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial states for internal elements only
      gsap.set(headerRef.current, { opacity: 0, y: 60 });
      gsap.set(titleRef.current, { opacity: 0, y: 40, scale: 0.9 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30, scale: 0.95 });
      gsap.set(carouselRef.current, { opacity: 0, y: 80 });
      gsap.set(navigationRef.current, {
        opacity: 0,
        scale: 0.7,
        x: (i) => (i === 0 ? -30 : 30),
      });
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        rotationY: -15,
      });
      gsap.set(indicatorsRef.current, { opacity: 0, y: 40 });

      // Header animations with stagger
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Title with dramatic entrance
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.8)",
        delay: 0.5,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Subtitle with gentle slide
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.8,
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Carousel container
      gsap.to(carouselRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1,
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Navigation buttons with bounce
      navigationRef.current.forEach((nav, index) => {
        if (nav) {
          gsap.to(nav, {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.8,
            ease: "back.out(1.4)",
            delay: 1.2 + index * 0.1,
            scrollTrigger: {
              trigger: nav,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // Main testimonial card with 3D effect
      gsap.to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.4,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Indicators with wave effect
      gsap.to(indicatorsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.8,
        scrollTrigger: {
          trigger: indicatorsRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [testimonials]);

  // Animate indicator items when they load
  useEffect(() => {
    if (testimonials.length > 1) {
      const ctx = gsap.context(() => {
        gsap.set(indicatorItemsRef.current, {
          opacity: 0,
          y: 20,
          scale: 0.9,
          rotationX: -20,
        });

        indicatorItemsRef.current.forEach((item, index) => {
          if (item) {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 2 + index * 0.1,
              scrollTrigger: {
                trigger: item,
                start: "top 98%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [testimonials]);

  // Card transition animation when testimonial changes
  useEffect(() => {
    if (cardRef.current && testimonials.length > 0) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.98,
          rotationY: -10,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
  }, [currentIndex, testimonials]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Interaction handlers
  const handleNavigationHover = (index: number, isEntering: boolean) => {
    const nav = navigationRef.current[index];
    if (nav) {
      gsap.to(nav, {
        scale: isEntering ? 1.1 : 1,
        rotation: isEntering ? 5 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleNavigationTap = (index: number) => {
    const nav = navigationRef.current[index];
    if (nav) {
      gsap.to(nav, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
    }
  };

  const handleIndicatorHover = (index: number, isEntering: boolean) => {
    const indicator = indicatorItemsRef.current[index];
    if (indicator) {
      gsap.to(indicator, {
        scale: isEntering ? 1.05 : index === currentIndex ? 1.02 : 1,
        y: isEntering ? -2 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleIndicatorTap = (index: number) => {
    const indicator = indicatorItemsRef.current[index];
    if (indicator) {
      gsap.to(indicator, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
    }
  };

  const currentTestimonial: any = testimonials[currentIndex];

  // Don't render anything if no testimonials
  if (!testimonials.length) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl text-gray-900 mb-6 leading-tight"
          >
            Our Users Feel the
            <br />
            Transformation
          </h2>
          <p
            ref={subtitleRef}
            className="text-gray-500 text-lg font-medium text-center"
          >
            Real Stories from People Empowered by Personalized
            <br />
            <span>Wellness</span>
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div ref={carouselRef} className="relative">
          {/* Navigation Buttons - Only show if more than 1 testimonial */}
          {testimonials.length > 1 && (
            <>
              <div
                ref={(el) => (navigationRef.current[0] = el! as any)}
                className="absolute left-8 top-1/5 -translate-y-1/2 z-10"
                onMouseEnter={() => handleNavigationHover(0, true)}
                onMouseLeave={() => handleNavigationHover(0, false)}
                onMouseDown={() => handleNavigationTap(0)}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full shadow-lg w-12 h-12 transition-all duration-200
                    ${
                      currentIndex > 0
                        ? "bg-blue-600 hover:bg-blue-700 text-white border-none"
                        : "bg-transparent text-gray-500 border border-gray-500 hover:bg-transparent"
                    }`}
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>

              <div
                ref={(el) => (navigationRef.current[1] = el! as any)}
                className="absolute right-8 top-1/5 -translate-y-1/2 z-10"
                onMouseEnter={() => handleNavigationHover(1, true)}
                onMouseLeave={() => handleNavigationHover(1, false)}
                onMouseDown={() => handleNavigationTap(1)}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full shadow-lg w-12 h-12 transition-all duration-200
                    ${
                      currentIndex < testimonials.length - 1
                        ? "bg-blue-600 hover:bg-blue-700 text-white border-none"
                        : "bg-transparent text-gray-500 border border-gray-500 hover:bg-transparent"
                    }`}
                  onClick={goToNext}
                  disabled={currentIndex === testimonials.length - 1}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}

          {/* Main Testimonial Card */}
          <div ref={cardRef} key={currentIndex} className="mx-16 md:mx-24">
            <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-12 md:p-16">
                <div className="flex flex-col items-center text-center">
                  {/* Quote */}
                  <blockquote
                    dangerouslySetInnerHTML={{
                      __html: currentTestimonial?.quote,
                    }}
                    className="text-gray-700 text-xl md:text-2xl leading-relaxed mb-8 max-w-4xl font-medium"
                  />

                  {/* Avatar and Author Info */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="size-12 hover:scale-110 transition-transform duration-200">
                      <AvatarImage
                        src={
                          currentTestimonial?.avatar ||
                          "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>
                        {currentTestimonial?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-gray-700 text-lg font-medium">
                        {currentTestimonial?.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {currentTestimonial?.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial Indicator Cards - Only show if more than 1 testimonial */}
          {testimonials.length > 1 && (
            <div ref={indicatorsRef} className="mt-12">
              {/* For 6 or fewer testimonials, show them all in a single row */}
              {testimonials.length <= 6 ? (
                <div className="flex justify-center space-x-4 flex-wrap gap-y-4">
                  {testimonials.map((testimonial: any, index: any) => (
                    <button
                      key={testimonial._id}
                      ref={(el) =>
                        (indicatorItemsRef.current[index] = el! as any)
                      }
                      onClick={() => goToSlide(index)}
                      className="focus:outline-none"
                      onMouseEnter={() => handleIndicatorHover(index, true)}
                      onMouseLeave={() => handleIndicatorHover(index, false)}
                      onMouseDown={() => handleIndicatorTap(index)}
                    >
                      <div
                        className={`relative bg-white rounded-lg border-2 p-4 min-w-[160px] transition-all duration-300 ${
                          index === currentIndex
                            ? "border-blue-500 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                        }`}
                        style={{
                          transform:
                            index === currentIndex ? "scale(1.02)" : "scale(1)",
                        }}
                      >
                        {/* Active Indicator Dot */}
                        {index === currentIndex && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white animate-pulse" />
                        )}

                        <div className="flex items-center space-x-3">

                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="text-left min-w-0 flex-1">
                            <div
                              className={`text-sm font-medium truncate transition-colors duration-200 ${
                                index === currentIndex
                                  ? "text-blue-600"
                                  : "text-gray-700"
                              }`}
                            >
                              {testimonial.name}
                            </div>
                            <div
                              className={`text-xs truncate transition-colors duration-200 ${
                                index === currentIndex
                                  ? "text-blue-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                /* For more than 6 testimonials, use a scrollable container */
                <div className="relative">
                  {/* Scroll Indicators */}
                  <div className="absolute -top-8 right-0 text-sm text-gray-500 z-10">
                    {Math.floor(currentIndex / 6) + 1} of{" "}
                    {Math.ceil(testimonials.length / 6)}
                  </div>

                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex space-x-4 pb-4 min-w-max">
                      {testimonials.map((testimonial: any, index: any) => (
                        <button
                          key={testimonial.id}
                          ref={(el) =>
                            (indicatorItemsRef.current[index] = el! as any)
                          }
                          onClick={() => goToSlide(index)}
                          className="focus:outline-none flex-shrink-0"
                          onMouseEnter={() => handleIndicatorHover(index, true)}
                          onMouseLeave={() =>
                            handleIndicatorHover(index, false)
                          }
                          onMouseDown={() => handleIndicatorTap(index)}
                        >
                          <div
                            className={`relative bg-white rounded-lg border-2 p-4 w-[160px] transition-all duration-300 ${
                              index === currentIndex
                                ? "border-blue-500 shadow-lg"
                                : "border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                            }`}
                            style={{
                              transform:
                                index === currentIndex
                                  ? "scale(1.02)"
                                  : "scale(1)",
                            }}
                          >
                            {/* Active Indicator Dot */}
                            {index === currentIndex && (
                              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white animate-pulse" />
                            )}

                            <div className="flex items-center space-x-3 cursor-pointer ">
                              <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div className="text-left min-w-0 flex-1">
                                <div
                                  className={`text-sm font-medium truncate transition-colors duration-200 ${
                                    index === currentIndex
                                      ? "text-blue-600"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {testimonial.name}
                                </div>
                                <div
                                  className={`text-xs truncate transition-colors duration-200 ${
                                    index === currentIndex
                                      ? "text-blue-500"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {testimonial.role}
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scroll hint */}
                  <div className="text-center mt-2 text-xs text-gray-400">
                    Scroll horizontally to see more testimonials
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
