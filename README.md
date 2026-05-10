# Investment Compare Dashboard

Investment Compare Dashboard is a polished React + TypeScript fintech demo app built for interview review. It behaves like a lightweight investment workspace where users can search instruments, save them to a watchlist, select them for comparison, inspect details, and switch between light and dark themes.

The project is intentionally frontend-focused. It demonstrates clean state boundaries, typed API mapping, responsive UI.

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router
- Redux Toolkit and RTK Query
- vanilla-extract for theme tokens and component styles
- Vitest, React Testing Library, and MSW
- Financial Modeling Prep API integration with local fallback data

## Features

- Dashboard overview with search entry point, compare preview, watchlist preview, and popular instruments
- Instrument search with debounced RTK Query requests
- Mock-first Financial Modeling Prep search and quote API layer
- Instrument details route at `/instrument/:symbol`
- Compare selection state with a four-instrument limit
- Responsive compare page with mobile cards and desktop table
- Watchlist state with localStorage persistence
- Light/dark theme switcher with persisted preference

## API Strategy

The app supports Financial Modeling Prep through Vite environment variables:

```env
VITE_FMP_API_KEY=
VITE_USE_FMP_API=false
```

Real API calls are opt-in. By default, `VITE_USE_FMP_API=false`, so local development uses deterministic mock data even if an API key is present. Set `VITE_USE_FMP_API=true` and provide `VITE_FMP_API_KEY` to use live FMP search and quote endpoints.

The API layer keeps raw response types separate from domain models and maps FMP responses into app-level `Instrument` and `InstrumentQuote` types.

## Architecture

```txt
src/
  api/
  components/
  context/
  features/
  hooks/
  layout/
  mocks/
  store/
  styles/
  test/
  types/
  utils/
```

Key decisions:

- RTK Query owns server/API state.
- Redux Toolkit slices own compare and watchlist UI state.
- Theme state lives in context because it is global UI state.
- vanilla-extract styles are colocated with components and use shared semantic tokens.
- Mock data keeps the app usable without network access or paid API quota.

## Testing

The suite uses Vitest and React Testing Library with user-facing assertions. MSW covers an RTK Query/FMP mapping flow, and focused tests cover:

- `useDebounce`
- instrument typeguards
- `InstrumentCard`
- compare selection
- watchlist state
- `DataTable<T>`
- theme switching
- search flow

## Run Locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Run tests:

```bash
npm test -- --run
```

Run lint:

```bash
npm run lint
```
