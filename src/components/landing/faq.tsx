"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axiosInstance from "@/lib/axios";
import { useEffect, useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const faqItemsRef = useRef<HTMLDivElement[]>([]);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axiosInstance.get("/faqs");
        setFaqs(res.data.data.data);
      } catch (error) {
        console.error("Error fetching faqs:", error);
      }
    };
    fetchFaqs();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(sectionRef.current, { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      });
      
      gsap.set(headerRef.current?.children || [], { 
        opacity: 0, 
        y: 40,
        rotationX: -15
      });
      
      gsap.set(accordionRef.current, { 
        opacity: 0, 
        y: 50
      });

      // Main section entrance animation
      gsap.to(sectionRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 20%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Parallax effect for the section
            gsap.to(sectionRef.current, {
              y: -30,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
              }
            });
          }
        }
      });

      // Header elements staggered animation
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        Array.from(headerElements).forEach((element, index) => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.9,
            ease: "back.out(1.2)",
            delay: 0.3 + index * 0.2,
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          });
        });
      }

      // Accordion container slide-in
      gsap.to(accordionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.8,
        scrollTrigger: {
          trigger: accordionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate FAQ items when they're added to the DOM
  useEffect(() => {
    if (faqs.length > 0) {
      const ctx = gsap.context(() => {
        // Set initial state for FAQ items
        gsap.set(faqItemsRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          rotationY: -5
        });

        // Staggered animation for FAQ items
        faqItemsRef.current.forEach((item, index) => {
          if (item) {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: 1.2 + index * 0.1,
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            });
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [faqs]);

  // Loading animation
  useEffect(() => {
    if (faqs.length === 0 && loadingRef.current) {
      const ctx = gsap.context(() => {
        const loadingItems = loadingRef.current?.children;
        if (loadingItems) {
          gsap.set(loadingItems, {
            opacity: 0,
            scale: 0.95,
            y: 20
          });

          Array.from(loadingItems).forEach((item, index) => {
            gsap.to(item, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              delay: index * 0.1
            });

            // Shimmer effect
            const shimmerElements = item.querySelectorAll('.shimmer');
            shimmerElements.forEach((shimmer) => {
              gsap.to(shimmer, {
                opacity: 1,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
                delay: 0.2
              });
            });
          });
        }
      }, loadingRef);

      return () => ctx.revert();
    }
  }, [faqs.length]);

  // Hover and interaction effects
  const handleFaqHover = (index: number, isEntering: boolean) => {
    const item = faqItemsRef.current[index];
    if (item) {
      gsap.to(item, {
        scale: isEntering ? 1.02 : 1,
        y: isEntering ? -2 : 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleFaqTap = (index: number) => {
    const item = faqItemsRef.current[index];
    if (item) {
      gsap.to(item, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }
  };

  // Icon animation for active state
  const animateIcon = (element: HTMLElement, isActive: boolean) => {
    if (isActive) {
      gsap.to(element, {
        rotation: 180,
        scale: 1.1,
        color: "rgb(59, 130, 246)",
        duration: 0.3,
        ease: "back.out(1.2)"
      });
    } else {
      gsap.to(element, {
        rotation: 0,
        scale: 1,
        color: "rgb(107, 114, 128)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 px-4 max-w-4xl mx-auto"
    >
      {/* Header Section */}
      <div 
        ref={headerRef}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-foreground mb-4 opacity-0">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto opacity-0">
          Get answers to common questions about our AI health assistant app
        </p>
      </div>

      {/* FAQ Accordion */}
      <div ref={accordionRef} className="opacity-0">
        <Accordion 
          type="single" 
          collapsible 
          className="space-y-4"
          value={activeItem as any}
          onValueChange={setActiveItem as any}
        >
          {faqs.map((faq: any, index: number) => {
            const isActive = activeItem === `faq-${faq._id}`;
            
            return (
              <div
                key={faq._id}
                ref={el => faqItemsRef.current[index] = el! as any}
                onMouseEnter={() => handleFaqHover(index, true)}
                onMouseLeave={() => handleFaqHover(index, false)}
                onMouseDown={() => handleFaqTap(index)}
                className="opacity-0"
              >
                <AccordionItem
                  value={`faq-${faq._id}`}
                  className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="rounded-lg">
                    <AccordionTrigger className="text-left hover:bg-white font-medium hover:no-underline py-4 group">
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`pr-4 transition-all duration-300 ${
                            isActive 
                              ? 'font-semibold text-blue-600' 
                              : 'group-hover:text-blue-600'
                          }`}
                        >
                          {faq.question}
                        </span>
                        
                        <div
                          className={`flex-shrink-0 transition-colors duration-200 ${
                            isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'
                          }`}
                        >
                          {isActive ? (
                            <Minus className="h-5 w-5" />
                          ) : (
                            <Plus className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                  </div>
                  
                  <AccordionContent className="text-muted-foreground pt-2 pb-4">
                    <div className="transition-all duration-300 ease-out">
                      <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            );
          })}
        </Accordion>
      </div>

      {/* Loading State Animation */}
      {faqs.length === 0 && (
        <div ref={loadingRef} className="space-y-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="border rounded-lg px-6 py-4 bg-gray-50 opacity-0"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-3/4 shimmer opacity-50" />
                <div className="h-4 w-4 bg-gray-200 rounded shimmer opacity-50" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}