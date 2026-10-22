import React, { useState } from 'react';
import { Camera, X, MapPin, Lightbulb, ChevronRight } from 'lucide-react';
import { PROJECT_PHOTOS } from '../data/secData';
import { ProjectPhoto } from '../types';
import { ScrollReveal } from './ScrollReveal';

export const ProjectGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<ProjectPhoto | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'kitchen', label: 'Kitchen & Dining' },
    { id: 'lighting', label: 'Lighting Design' },
    { id: 'bathroom', label: 'Bathrooms' },
    { id: 'outdoor', label: 'Alfresco & Living' },
  ];

  const filteredPhotos = PROJECT_PHOTOS.filter((photo) => {
    if (filter === 'all') return true;
    if (filter === 'kitchen') return photo.category === ('kitchen' as any) || photo.id.includes('kitchen') || photo.id.includes('dining');
    if (filter === 'lighting') return photo.category === 'lighting' || photo.id.includes('pendant');
    if (filter === 'bathroom') return photo.category === 'bathroom';
    if (filter === 'outdoor') return photo.category === 'outdoor' || photo.id.includes('living') || photo.id.includes('alfresco');
    return true;
  });

  return (
    <section id="our-work" className="py-24 bg-[#0E0F14] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F20AA9] uppercase tracking-wider">
              <Camera className="w-4 h-4" />
              <span>Visual Showcase & Completed Installations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Craftsmanship in Every Conduit & Luminaire
            </h2>
            <p className="text-base text-[#9E9EB0] leading-relaxed">
              Explore photography from our Gymea luxury duplex build and residential electrical projects across Sydney. Tap any image to view installation and lighting details.
            </p>
          </div>

          {/* Gallery Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#14151A] rounded-xl border border-white/10 overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                type="button"
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#F20AA9] text-white shadow-md shadow-[#F20AA9]/25'
                    : 'text-[#9E9EB0] hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <ScrollReveal delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#14151A] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPhoto(photo);
                }
              }}
              aria-label={`View details for ${photo.title}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14151A] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute top-3 left-3 bg-[#08090C]/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-md text-[11px] font-semibold text-white flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#F20AA9]" />
                  <span>{photo.location}</span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold text-white group-hover:text-[#F20AA9] transition-colors leading-snug">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[#9E9EB0] line-clamp-2">
                    {photo.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#C8C8D4] font-medium">
                  <span className="flex items-center gap-1 text-[11px] text-[#F20AA9]">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>View Specifications</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#9E9EB0] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full bg-[#14151A] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#F20AA9] uppercase tracking-wider">
                  {selectedPhoto.location}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {selectedPhoto.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedPhoto(null)}
                type="button"
                className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative bg-black flex items-center justify-center overflow-hidden max-h-[55vh]">
              <img
                src={selectedPhoto.imageSrc}
                alt={selectedPhoto.title}
                className="max-h-[55vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Modal Details */}
            <div className="p-5 sm:p-6 bg-[#181920] flex flex-col gap-3">
              <p className="text-sm text-[#C8C8D4] leading-relaxed">
                {selectedPhoto.caption}
              </p>

              <div className="p-3.5 rounded-xl bg-[#08090C] border border-white/10 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#F20AA9] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Lighting & Electrical Scope
                  </span>
                  <span className="text-xs sm:text-sm text-[#9E9EB0] pt-0.5">
                    {selectedPhoto.lightingDetails}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
