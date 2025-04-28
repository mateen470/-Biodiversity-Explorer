#  Biodiversity Explorer
## Biodiversity Explorer

A React + TypeScript application to browse endangered species worldwide. Filter by region, habitat, threat level or taxonomic group; search by name; sort by various criteria; and page through results. Clicking on a species card navigates to a detail “Conservation Action” page where you can read a summary, view classification labels, and learn about recommended conservation steps.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Component Overview](#component-overview)
- [Routing & Data Flow](#routing--data-flow)
- [Styling Conventions](#styling-conventions)

## Features

- **Filtering**
  - Region, Habitat, Threat Severity, Taxonomic Group via a custom dropdown.
- **Search**
  - Live text search across scientific and common names, debounced for performance.
- **Sorting**
  - Alphabetical (A–Z), Threat Severity ranking, Newest/Oldest listing date.
- **Pagination**
  - “Load more” button loads 20 more cards at a time.
- **Detail Page**
  - `/conservation/:id` shows name, summary, classification labels, and full conservation actions.
- **Thumbnails**
  - Fetched from iNaturalist API with in-memory caching and fallback placeholder.
- **Accessibility & UX**
  - Keyboard-navigable cards, focus rings, hover glow effects, and loading spinners.

## Tech Stack

- **Framework**: React v18+ with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS (with custom CSS variables & animations)
- **Data Fetching**:
  - Local JSON (`species.json`) for core data
  - iNaturalist API for thumbnails
- **Utilities**:
  - Custom `useSpecies` hook for filtering, thumbnail enrichment, and state management
  - `useDebounce` hook for search throttling
  - Custom `<DropDown>` component for filters
  - `<LoadingSpinner>` for async feedback

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/mateen470/-Biodiversity-Explorer.git
   cd biodiversity-explorer
   ```
2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```
3. **Start dev server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open in browser**  
   Navigate to `http://localhost:3000`

## Available Scripts

- `dev` — Run development server with hot reloading
- `build` — Create a production build (`dist/`)
- `preview` — Preview the production build locally

## Folder Structure

```
/
├── src/
│   ├── main.tsx           # App entrypoint, ReactDOM render + BrowserRouter
│   ├── App.tsx            # Gallery, filters, search, sort, pagination
│   ├── species.json       # Core species data
│   ├── options.json       # Filter dropdown definitions
│   ├── components/
│   │   ├── searchbar/     # SearchBar.tsx
│   │   ├── filter/        # Filters.tsx & types
│   │   ├── dropdown/      # DropDown.tsx for custom selects
│   │   ├── sort/          # Sort.tsx & types
│   │   ├── card/          # Card.tsx with hover glow
│   │   └── card-grid/     # CardGrid.tsx layout
│   ├── hooks/
│   │   ├── useSpecies.ts  # Filters, paging, thumbnail hook
│   │   └── useDebounce.ts # Debounce utility
│   ├── pages/
│   │   └── ConservationAction.tsx  # Detail page
│   └── utility/
│       └── LoadingSpinner.tsx
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Component Overview

### `useSpecies` Hook

- Applies UI filters in-memory
- Fetches and caches thumbnails, with loading & error states

### `Filters` + `DropDown`

- Controlled `<select>` UI bound to hook’s `Filters` type
- Label-to-key mapping ensures type safety

### `Card` & `CardGrid`

- Card: clickable, keyboard-accessible, hover glow effect
- Grid: responsive columns, equal-height rows

### `ConservationAction` Page

- Reads `id` from URL via `useParams`
- Finds matching species in JSON, displays detailed info

## Routing & Data Flow

1. **Main view (`/`)**
   - `App.tsx` calls `useSpecies(filters)` → receives `{ data, loading, error }`.
   - Search, sort, and paginate on `data`.
   - Map to `cards` array, passing each card’s `id` into its click handler.
2. **Detail view (`/conservation/:id`)**
   - `ConservationAction.tsx` uses `useParams` to grab `id`.
   - Filters `species.json` locally to find the matching record.
   - Renders summary, labels, and conservation actions.

## Styling Conventions

- **Tailwind CSS** with custom CSS variables for brand colors.
- **Hover glow**: `transition-shadow duration-300` + `hover:shadow-[0_0_20px_rgba(27,164,118,0.7)]`.
- **Focus rings** on interactive elements for accessibility.
- **CSS `line-clamp`** utility for truncating summaries.
