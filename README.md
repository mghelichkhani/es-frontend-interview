# Frontend Interview Project

This is a Next.js application for managing and viewing purchases with filtering capabilities. The project includes a purchases page with product and user filters, a demo page for component testing, and a GraphQL server for data management.

**Tech Stack:** Next.js 14, React 18, TypeScript, Apollo Client, GraphQL, Tailwind CSS, Radix UI, Vitest, Playwright

## Introduction

This project was built as a time-boxed frontend challenge. The main application displays purchases in a tabular format with filtering capabilities. A demo page at `/demo` showcases all components and design tokens for testing purposes. Design tokens are defined in `tokens.css` and used throughout the application for consistent styling.

# Assumptions & Decisions

## 🎨 Design & UX Decisions

**Layout change:**
The task description suggested a grid of product cards, which didn't make much sense to me from a business perspective. A huge gallery of random products doesn't add much value. So I went for a tabular layout instead — it's easier to scan and understand purchases in relation to users and products.

**Visual feedback:**
Added small touches like a toast notification when new records load and a background color animation for newly fetched rows. This helps users to distinguish the newly loaded items.

**Quick reset:**
Added a small badge/reset button in the MultiSelect to clear selections in a single click action

**MultiSelect usability features:**
The MultiSelect component includes several usability enhancements:

- Alphabetical sorting option for easier navigation
- Automatic prioritization of selected items (moved to the top) for longer lists (10+ items)
- Option re-arranging that only occurs after clicking Apply to prevent confusion during selection

**Focus state:**
Added focus state and keyboard navigation for all UI elements. (e.g., user can use Enter and ESC keys to interact with the MultiSelect)

**Pagination:**
Added a simple “Load more” button. In production, this could evolve into grouped purchase views per product and expandable rows for detailed purchase data.

## ⚙️ Technical & Architecture Choices

**AI-assisted coding:**
Since this is a time-boxed challenge, I decided to lean on AI agents to generate some boilerplate and repetitive logic (e.g. component structure, prop types). In a real project, I'd spend more time designing consistent patterns upfront so future components follow the same conventions.

**Radix UI usage:**
Used Radix primitives (like Dialog, Checkbox) for accessibility and consistent behavior without reinventing base logic. I didn't evaluate long-term maintainability or theming tradeoffs here — it was a practical choice to move faster and focus on core functionality.

**Design tokens:**
Design tokens are centralized in `tokens.css` using CSS custom properties. This includes brand colors, surface colors, text colors and borders. The tokens are used throughout the application via Tailwind CSS configuration for consistent theming.

**Pre-commit checks:**
Added Husky hooks for code formatting and basic linting. Even for small projects, I like keeping the code clean and predictable.

**Library alignment:**
In a real-world setup, I'd align choices like UI libraries, i18n, validation, or routing conventions with the team or across the engineering department. The goal would be to avoid fragmentation and make sure new components can plug into existing systems smoothly.

**Form validation:**
Skipped input validation here, since product names can be arbitrary and this isn't a production app.

**Commit messages:**
The commit messages are a bit inconsistent since I was experimenting quickly. Normally I'd follow conventional commits.

## 🧪 Testing & Scope Decisions

**Scope priorities:**
Focused testing efforts on the MultiSelect logic and one main end-to-end scenario that covers the filtering flow. With more time, I'd expand to integration tests and accessibility snapshots.

**Mobile testing:**
Skipped mobile E2E tests, mainly because this feels like an internal desktop tool, but I did manually check responsiveness at different breakpoints.

**Core Web Vitals:**
Left out performance optimization (Lighthouse, Web Vitals, etc.) — again, mostly due to the internal nature of this task.

**i18n:**
Added a simple translations file, using ICU format (based on my personal experience with Lokalize)

**Demo page:**
Added a demo page at `/demo` for testing and QA purposes, allowing components to be tested in isolation. The page showcases all design tokens, component variations, and interactive examples. In a production setup, a tool like Storybook would be more appropriate for component documentation and testing.

### Editor Setup

This project includes editor configuration for VS Code and Cursor. When you open the project, you'll be prompted to install recommended extensions:

- **ESLint** - For code quality and import sorting
- **Prettier** - For code formatting

The workspace is configured to:

- **Format on save** - Prettier automatically formats your code
- **Fix ESLint issues on save** - Automatically sorts imports and fixes code quality issues
- **Pre-commit hooks** - Prettier and ESLint run automatically before commits

If extensions aren't auto-installed, install them manually:

1. Open Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`)
2. Search for "ESLint" and "Prettier - Code formatter"
3. Install both extensions
4. Reload the window

**Note:** The pre-commit hooks will still work even if editor extensions aren't installed, ensuring code quality before commits.

### Available Commands

Development:

- **`npm run dev`** - Start the development server
- **`npm run build`** - Build the application for production
- **`npm run start`** - Start the production server (requires build first)

Code Quality:

- **`npm run lint`** - Run ESLint to check for code quality issues
- **`npm run lint:fix`** - Run ESLint and automatically fix issues

Testing:

- **`npm run test`** - Run unit tests with Vitest
- **`npm run test:ui`** - Run unit tests with Vitest UI (interactive test runner)
- **`npm run test:e2e`** - Run end-to-end tests with Playwright (headless)
- **`npm run test:e2e:headed`** - Run end-to-end tests with Playwright (headed browser)
- **`npm run test:e2e:debug`** - Run end-to-end tests in debug mode
- **`npm run test:e2e:ui`** - Run end-to-end tests with Playwright UI (interactive test runner)
