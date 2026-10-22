export type ServiceCategory = 'residential' | 'commercial' | 'lighting' | 'switchboard' | 'automation';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  description: string;
  features: string[];
  imageSrc?: string;
  tag: string;
}

export interface VideoItem {
  id: string;
  title: string;
  location: string;
  duration: string;
  src: string;
  poster?: string;
  description: string;
  tags: string[];
}

export interface ProjectPhoto {
  id: string;
  title: string;
  category: 'lighting' | 'residential' | 'bathroom' | 'outdoor' | 'joinery';
  location: string;
  imageSrc: string;
  caption: string;
  lightingDetails: string;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  suburb: string;
  serviceId: string;
  propertyType: string;
  projectStage: string;
  details: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
