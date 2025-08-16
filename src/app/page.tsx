"use client"
import Navbar from "@/components/global/navbar"
import HeroSection from "@/components/landing/hero-section"
import AutoScrollLogos from "@/components/landing/auto-scroll-logs"
import { HealthSection } from "@/components/landing/health"
import { TestimonialsSection } from "@/components/landing/testimonials"
import { FaqSection } from "@/components/landing/faq"
import { CtaSection } from "@/components/landing/cta-section"
import { FooterSection } from "@/components/landing/footer"
import BannerCarousel from "@/components/landing/banner"
import AboutOverlay from "@/components/landing/about"
export default function Home() {
    return (
        <>
        <Navbar />
        <HeroSection 
            
            />
   
        <AutoScrollLogos/>
        <HealthSection/>
        <TestimonialsSection/>
        <FaqSection/>
        <CtaSection/>   
        <FooterSection/>
        </>
    )
}