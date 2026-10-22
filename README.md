# Sydney Electrical Corp (SEC) — Website Rebuild

A high-conversion website for **Sydney Electrical Corp (SEC)**, a licensed electrical contractor based in Sydney, NSW, Australia.

## Features & Implementation

### 1. Brand & Visual Architecture
- **Authentic Brand Identity**: Accurate lightbulb + white/pink SEC logo (`/assets/aistudio/Logo_6d072cd0.jpg`), with Electric Pink (`#F20AA9`) used purposefully as an accent rather than over-saturating surfaces.
- **Top Bar Contract**: Fixed 80px header with single-line navigation, direct phone link (`0451 102 588`), primary "Request a Quote" CTA, and accessible mobile drawer with focus and escape handling.
- **Mobile Sticky Bar**: Lightweight quick-action bar (<56px) for mobile users with direct call and quote enquiry triggers.

### 2. Authentic Media & On-Site Video Showcase
- **Real Job Site Footage**: Embedded video showcase featuring 7 genuine clips of lead electrician Jimmy and the SEC team:
  - Duplex framing and rough-in walkthrough (conduits around skylights, dining sconces, LED pelmets).
  - Completed Gymea duplex handover (curved timber kitchen joinery, wave pendant, downlights).
  - SEC service van fleet and on-site tool setup.
  - Architectural lighting tour (staircase void chandelier, alfresco ceiling fan, vanity illumination).
  - Whole-home smart tablet automation.
  - Exterior night illumination and facade lighting.
  - Floating vanity warm LED strip detail.
- **Muted Inline Previews**: Video player defaults to muted inline playback respecting mobile and browser autoplay policies, with tap-to-unmute audio controls, fullscreen mode, and direct playlist selection.

### 3. Comprehensive Electrical Services & Editorial Gallery
- **Bento Grid Services**: 8 detailed electrical services (Residential, Architectural Lighting, Switchboard Upgrades, Smart Automation, Duplex Rough-In to Fit-off, Commercial, Air Conditioning circuits, Fault Finding) with interactive category filters.
- **Project Photo Gallery**: High-resolution photography of the Gymea duplex build and residential projects with a lightbox specification modal detailing electrical and lighting scopes.

### 4. Technical Compliance & Local SEO
- **Australian Trade Standards**: Highlights compliance with AS/NZS 3000 Wiring Rules, SafeWork NSW safety guidelines, and mandatory Certificate of Compliance for Electrical Work (CCEW).
- **Service Area Suburb Checker**: Interactive suburb search verifying coverage across Sutherland Shire, St George, Eastern Suburbs, Inner West, Western Sydney, and Northern Beaches.
- **LocalBusiness Schema (JSON-LD)**: Structured data embedded in `index.html` configured for search engines and Google Maps rich snippets.
- **Dual Quote Flow**: Interactive on-page quote calculator and responsive quick-modal quote popup with client-side validation, reference number generation, and `localStorage` persistence.

## Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (with custom CSS variables for dark charcoal and electric pink)
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans & Outfit (Google Fonts)

## Development
```bash
npm run dev
```
The application runs on port 3000.
