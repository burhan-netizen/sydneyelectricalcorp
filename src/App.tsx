import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { VideoShowcase } from './components/VideoShowcase';
import { ProjectGallery } from './components/ProjectGallery';
import { AboutSection } from './components/AboutSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { QuoteSection } from './components/QuoteSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('residential');
  const [activeVideoId, setActiveVideoId] = useState<string>('video-rough-in');

  // Horizontal scroll progress bar using Framer Motion useScroll
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleOpenQuoteModal = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const handleWatchVideo = (videoId: string) => {
    setActiveVideoId(videoId);
    const videoSection = document.getElementById('videos');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-white selection:bg-[#F20AA9] selection:text-white">
      {/* Slim Electric Pink Horizontal Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#F20AA9] origin-left z-50 pointer-events-none shadow-sm shadow-[#F20AA9]/40"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* Fixed Top Bar Navigation */}
      <Header onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Content Regions */}
      <main id="main-content">
        {/* Hero Section with Jimmy, Service Van & Dual CTAs */}
        <Hero
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onWatchVideo={handleWatchVideo}
        />

        {/* Core Electrical Services Grid */}
        <ServicesSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Real Job Site Video Walkthroughs (7 authentic clips) */}
        <VideoShowcase
          activeVideoId={activeVideoId}
          onSelectVideo={(id) => setActiveVideoId(id)}
        />

        {/* Project Gallery & Technical Lightbox Specifications */}
        <ProjectGallery />

        {/* About Jimmy, SEC & Australian Standards Delivery Process */}
        <AboutSection />

        {/* Service Suburbs & Coverage Area Checker */}
        <ServiceAreaSection />

        {/* On-Page Detailed Quote Request Form */}
        <QuoteSection preselectedService={selectedServiceId} />

        {/* Frequently Asked Questions Accordion */}
        <FAQSection onOpenQuoteModal={() => handleOpenQuoteModal()} />
      </main>

      {/* Comprehensive Footer */}
      <Footer onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Quick Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        preselectedServiceId={selectedServiceId}
      />

      {/* Mobile Sticky Bar (<15% viewport height budget compliant) */}
      <MobileStickyBar onOpenQuoteModal={() => handleOpenQuoteModal()} />
    </div>
  );
}
