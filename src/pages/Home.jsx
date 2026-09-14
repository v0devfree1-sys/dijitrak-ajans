import React from "react";
import HeroSection from "../components/home/HeroSection";
import TechStackSection from "../components/home/TechStackSection";
import StatsSection from "../components/home/StatsSection";
import BentoSection from "../components/home/BentoSection";
import ServicesSection from "../components/home/ServicesSection";
import ProcessSection from "../components/home/ProcessSection";
import BeforeAfterSlider from "../components/home/BeforeAfterSlider";
import StatsChartSection from "../components/home/StatsChartSection";
import RoiCalculator from "../components/home/RoiCalculator";
import FeaturedProducts from "../components/home/FeaturedProducts";
import SeoSummarySection from "../components/home/SeoSummarySection";
import SeoPricingSection from "../components/home/SeoPricingSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";
import LiveActivityFeed from "../components/home/LiveActivityFeed";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TechStackSection />
      <StatsSection />
      <BentoSection />
      <ServicesSection />
      <ProcessSection />
      <BeforeAfterSlider />
      <StatsChartSection />
      <RoiCalculator />
      <FeaturedProducts />
      <SeoSummarySection />
      <SeoPricingSection />
      <TestimonialsSection />
      <CTASection />
      <LiveActivityFeed />
    </div>
  );
}