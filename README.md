# Investment Compare Dashboard

A realistic React + TypeScript fintech demo application for interviews, showcasing strong frontend engineering practices.

## Project Goals

Build a polished investment comparison platform that demonstrates:
- Modern React patterns and TypeScript best practices
- State management with Redux Toolkit
- RTK Query for API data fetching
- Client-side routing with React Router
- Testing best practices (Vitest, React Testing Library)
- Accessibility and responsive design
- Feature-based architecture

## Features (Planned)

1. **Instrument Search** — Find stocks, bonds, ETFs, and other instruments
2. **Compare** — Side-by-side comparison of multiple instruments
3. **Watchlist** — Save and manage favorite instruments
4. **Details** — View detailed information and historical performance
5. **Mock & Real APIs** — MSW support for mocking, Financial Modeling Prep integration

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Redux Toolkit** — State management
- **RTK Query** — Data fetching and caching
- **React Router** — Client-side routing
- **Vitest** — Unit testing framework
- **React Testing Library** — Component testing
- **MSW** — Mock Service Worker for API mocking
- **lucide-react** — Icon library
- **clsx** — Utility for className composition

## Folder Structure

```
src/
├── features/           # Feature modules
│   ├── search/        # Instrument search
│   ├── compare/       # Comparison view
│   ├── watchlist/     # Saved instruments
│   └── details/       # Instrument detail view
├── api/               # Data fetching and mocking
│   ├── types.ts       # API types and interfaces
│   ├── mocks/         # MSW handlers
│   └── slices.ts      # RTK Query slices (TBD)
├── store/             # Redux store configuration
│   ├── index.ts       # Store setup
│   └── hooks.ts       # Typed Redux hooks
├── components/        # Shared UI components
├── hooks/             # Custom React hooks
├── types/             # Shared TypeScript types
├── utils/             # Utilities and helpers
├── layout/            # Layout wrappers
├── styles/            # Global CSS
├── App.tsx            # Root component with routing
└── main.tsx           # Application entry point
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Building

```bash
npm run build
```

### Testing

```bash
npm run test          # Run tests once
npm run test:watch    # Watch mode
npm run test:ui       # UI dashboard
```

### Linting

```bash
npm lint
```

## Architecture Decisions

- **Feature-based Structure** — Organizes code by feature domain, making it easy to navigate and scale
- **Typed Redux Hooks** — Custom hooks (`useAppDispatch`, `useAppSelector`) for type safety
- **Separation of Concerns** — API logic, state management, and UI are clearly separated
- **Generic Components** — Reusable, composable UI components with proper TypeScript generics
- **Type Guards** — Runtime type safety utilities for API responses
- **Self-Documenting Code** — Minimal comments; naming and structure convey intent

## Development Notes

### Code Style

- No unnecessary comments — code structure and naming are self-documenting
- Keep files reasonably small and focused
- Use meaningful variable and function names
- Extract complex logic into utilities or custom hooks

### Commits

- Small, focused commits with clear messages
- Follow conventional commit format (chore:, feat:, fix:, etc.)
- Each commit represents a logical unit of work

---

Built as a learning demonstration of modern fintech frontend development.
