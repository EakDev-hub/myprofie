# Component Flow & Architecture Diagram

## Application Structure

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Header.tsx                        │    │
│  │  [Logo] [Navigation Menu] [Theme Toggle]            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Hero.tsx                          │    │
│  │  [Profile Image] [Animated Text] [CTA Buttons]      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   About.tsx                         │    │
│  │  [Bio Text] [Key Stats] [Download Resume]           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 Experience.tsx                      │    │
│  │  [Timeline] [Job Cards] [Expand Details]            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  Skills.tsx                         │    │
│  │  [Skill Categories] [Progress Bars] [Tech Icons]    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 Projects.tsx                        │    │
│  │  [Project Cards] [Image Gallery] [Live Demos]       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 Contact.tsx                         │    │
│  │  [Contact Form] [Social Links] [Location Info]      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Footer.tsx                        │    │
│  │  [Copyright] [Quick Links] [Social Media]           │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Animation Flow

```
User Scroll Event
       ↓
Intersection Observer
       ↓
Section Enters Viewport
       ↓
Trigger Anime.js Animation
       ↓
┌─────────────────────────┐
│   Animation Types:      │
│                         │
│ • fadeInUp              │
│ • slideInLeft           │
│ • staggerChildren       │
│ • progressBar           │
│ • typeWriter            │
│ • scaleOnHover          │
└─────────────────────────┘
```

## Data Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Static Data   │    │  User Actions   │    │   Animations    │
│                 │    │                 │    │                 │
│ • Personal Info │    │ • Scroll Events │    │ • Scroll Trigger│
│ • Experience    │────│ • Click Events  │────│ • Hover Effects │
│ • Skills        │    │ • Form Submit   │    │ • State Changes │
│ • Projects      │    │ • Navigation    │    │ • Loading States│
│ • Contact Info  │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Responsive Breakpoints

```
Mobile (< 640px)
├─ Single column layout
├─ Collapsed navigation
├─ Stacked components
└─ Touch-optimized interactions

Tablet (640px - 1024px)
├─ Two-column layout
├─ Horizontal navigation
├─ Grid-based sections
└─ Hover states enabled

Desktop (> 1024px)
├─ Multi-column layout
├─ Fixed navigation
├─ Advanced animations
└─ Full feature set
```

## Technology Integration

```
┌─────────────────┐
│      Vite       │ ← Build Tool & Dev Server
└─────────────────┘
         │
┌─────────────────┐
│   React 18      │ ← UI Framework
└─────────────────┘
         │
┌─────────────────┐
│   TypeScript    │ ← Type Safety
└─────────────────┘
         │
┌─────────────────┐
│  Tailwind CSS   │ ← Styling & Layout
└─────────────────┘
         │
┌─────────────────┐
│    Anime.js     │ ← Animations
└─────────────────┘
         │
┌─────────────────┐
│   HTTPS/SSL     │ ← Security
└─────────────────┘