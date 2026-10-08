# Contributing Guidelines

First off, thank you for considering contributing to the ModernSaaS Landing Page
Template! It's people like you that make the open-source community such an
amazing place.

## Table of Contents

1. [Git Branching Strategy](#git-branching-strategy)
2. [Development Setup](#development-setup)
3. [Code Style & Standards](#code-style--standards)
4. [How to Contribute](#how-to-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Requesting Features](#requesting-features)
   - [Pull Requests](#pull-requests)
5. [Testing Requirements](#testing-requirements)
6. [License](#license)

## Git Branching Strategy

We follow a simplified version of Git Flow to manage our development process.

### Branches

- **main**: This branch contains the production-ready code. All code in `main`
  must be stable and tested.
- **develop**: This is the integration branch for features. All features should
  be merged into `develop` first.
- **feature/**: Used for developing new features. Branch from `develop` and
  merge back into `develop`.
- **fix/**: Used for bug fixes. Branch from `develop` and merge back into
  `develop`.
- **hotfix/**: Used for critical fixes in production. Branch from `main` and
  merge back into both `main` and `develop`.

### Branch Naming Conventions

- Features: `feature/TASK-ID-short-description` (e.g.,
  `feature/TASK-032-hero-section`)
- Bug Fixes: `fix/TASK-ID-short-description` (e.g.,
  `fix/TASK-045-dark-mode-toggle`)
- Chores: `chore/TASK-ID-description` (e.g.,
  `chore/TASK-010-update-dependencies`)

### Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/)
specification.

Format: `<type>(<scope>): <description> [TASK-ID]`

Types:

| Type       | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| `feat`     | A new feature                                                 |
| `fix`      | A bug fix                                                     |
| `docs`     | Documentation only changes                                    |
| `style`    | Changes that do not affect the meaning of the code            |
| `refactor` | A code change that neither fixes a bug nor adds a feature     |
| `perf`     | A code change that improves performance                       |
| `test`     | Adding missing tests or correcting existing tests             |
| `chore`    | Changes to the build process or auxiliary tools and libraries |
| `build`    | Changes that affect the build system or external dependencies |
| `ci`       | Changes to our CI configuration files and scripts             |

Example: `feat(hero): add animated gradient background [TASK-032]`

## Development Setup

This project uses **Bun** as the primary package manager and runtime.

### Prerequisites

- [Bun](https://bun.sh/) (v1.1 or higher)
- [Node.js](https://nodejs.org/) (LTS recommended, for certain tooling
  compatibility)
- [Git](https://git-scm.com)

### Getting Started

```bash
# Clone the repository
git clone https://github.com/MasuRii/ModernSaaS-LandingPage-Template.git
cd ModernSaaS-LandingPage-Template

# Install dependencies
bun install

# Start development server
bun run dev
```

The site should now be running at `http://localhost:4321`.

## Code Style & Standards

We enforce high standards to ensure the codebase remains maintainable and
high-quality.

### TypeScript

- We use **TypeScript** in strict mode. Avoid `any` at all costs.
- Use functional components with React 19.
- Explicitly define prop types and return types for functions.

### Styling

- We use **Tailwind CSS v4**.
- Follow the utility-first approach. Avoid writing custom CSS unless absolutely
  necessary.
- Ensure all components support both **Light** and **Dark** modes using
  Tailwind's `dark:` modifier or CSS variables.

### Formatting & Linting

- We use **ESLint** and **Prettier**.
- Run `bun run lint` to check for errors.
- Run `bun run format` to auto-format code.
- Code is automatically formatted on commit via `husky` and `lint-staged`.

## How to Contribute

### Reporting Bugs

- Use the GitHub Issue Tracker.
- Describe the bug in detail, including steps to reproduce.
- Include environment details (OS, Browser, Node/Bun version).
- Add the `bug` label to your issue.

### Requesting Features

- Open an issue with the `feature request` label.
- Explain why the feature is needed and how it benefits the template users.
- Provide examples or mockups if applicable.

### Pull Requests

1. **Create a branch**: Use a descriptive name like `feature/new-section` or
   `fix/button-contrast`.
2. **Keep it focused**: One PR should address one issue or feature.
3. **Update documentation**: If you add a new feature or change configuration,
   update the README or relevant docs.
4. **Add tests**: Ensure new functionality is covered by unit or E2E tests.
5. **Verify locally**: Ensure all tests pass and there are no linting errors:

```bash
bun run typecheck
bun run lint
bun run test
bun run test:e2e
```

## Testing Requirements

We aim for high test coverage and zero regressions.

| Test Type         | Command               | Description                          |
| ----------------- | --------------------- | ------------------------------------ |
| Unit Tests        | `bun run test`        | Vitest - Component and utility tests |
| E2E Tests         | `bun run test:e2e`    | Playwright - User journey tests      |
| Type Checking     | `bun run typecheck`   | TypeScript - Type validation         |
| Linting           | `bun run lint`        | ESLint - Code quality                |
| Accessibility     | `bun run test:a11y`   | Axe-core - WCAG compliance           |
| Performance       | `bun run test:perf`   | Lighthouse - Core Web Vitals         |
| Visual Regression | `bun run test:visual` | Playwright - Screenshot comparison   |

## License

By contributing to this project, you agree that your contributions will be
licensed under its MIT License.

---

<div align="center">

**Happy Contributing!** 🚀

</div>
