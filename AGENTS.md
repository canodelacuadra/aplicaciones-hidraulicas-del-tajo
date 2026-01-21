# AGENTS.md

This file contains guidelines for agentic coding agents working on this Astro project for Aplicaciones Hidráulicas del Tajo.

## Project Overview

This is a Spanish-language business website for "Aplicaciones Hidráulicas del Tajo" specializing in hydraulic solutions, efficient irrigation, and technical water management. The site is built with Astro and React for optimal performance and SEO.

## Build and Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Astro CLI access
npm run astro
```

**Note**: This project does not currently have linting, testing, or type checking scripts configured. When making changes, manually verify:
- No TypeScript errors in VS Code
- Site builds successfully with `npm run build`
- Responsive design works across breakpoints

## Architecture and File Structure

- **Astro Framework**: Static site generator with island architecture
- **React Integration**: Used sparingly for interactive components
- **TypeScript**: Enabled with strict configuration
- **Content Management**: JSON files in `src/data/` for business content
- **Styling**: Scoped CSS within Astro components

```
src/
├── components/     # Reusable UI components (.astro files)
├── layouts/        # Page layout templates
├── pages/          # Route-based pages
├── data/           # JSON content files
└── assets/         # Static assets (images, etc.)
```

## Code Style Guidelines

### Astro Components

- Use `.astro` file extension
- Frontmatter script blocks with `---` delimiters
- Component imports at top of frontmatter
- Props destructuring: `const { title } = Astro.props;`
- Use `<slot />` for content injection in layouts
- Scoped `<style>` blocks at component bottom

### TypeScript

- Strict TypeScript configuration enabled
- Use type annotations for function parameters
- Prefer explicit typing over inference when clarity is needed
- JSON schema validation for data files when possible

### Styling Conventions

- Use CSS custom properties for brand colors:
  - `--primary: #1568a7` (brand blue)
  - `--bg: #f5f7fa` (light background)
  - `--dark: #1f2933` (text color)
- Mobile-first responsive design with `@media (max-width: 768px)`
- Scoped styles to prevent CSS leakage
- Smooth transitions and animations with `prefers-reduced-motion` consideration

### Import Patterns

```astro
---
// Imports in frontmatter
import BaseLayout from "../layouts/BaseLayout.astro";
import ComponentName from "../components/ComponentName.astro";
import dataFile from "../data/content.json";
---
```

### Naming Conventions

- **Files**: PascalCase for components (e.g., `Header.astro`, `Footer.astro`)
- **Components**: PascalCase for React/Astro components
- **Props**: camelCase (e.g., `pageTitle`, `isSticky`)
- **CSS Classes**: kebab-case with BEM-like approach (e.g., `hero`, `hero__title`, `hero--scrolled`)
- **Data Properties**: Spanish locale matching business content

### Content Management

- Business content stored in `src/data/` as JSON files
- Spanish language content throughout
- Image assets in `public/images/`
- Use semantic HTML5 elements for accessibility
- Include `loading="lazy"` for images below fold
- Use `fetchpriority="high"` for critical images

### Performance Guidelines

- Leverage Astro's zero-JS by default approach
- Use React islands only for interactive elements
- Implement proper image optimization with appropriate formats
- Consider Core Web Vitals in component design
- Use `is:inline` script attribute only when necessary

### Error Handling

- Validate data from JSON files with TypeScript interfaces
- Provide fallback content for missing data
- Use conditional rendering for optional content
- Implement proper error boundaries for React components

## Development Workflow

1. **Before Making Changes**: Run `npm run dev` to start development server
2. **Component Development**: Create reusable components in `src/components/`
3. **Content Updates**: Modify JSON files in `src/data/` for business content
4. **Style Changes**: Use scoped styles within components
5. **Testing**: Verify responsive design across mobile/tablet/desktop
6. **Final Check**: Ensure production build succeeds with `npm run build`

## Special Considerations

- **Spanish Language**: All user-facing text should be in Spanish
- **Business Focus**: Hydraulic solutions, water treatment, irrigation systems
- **SEO Priority**: Proper meta tags, semantic HTML, and performance optimization
- **Accessibility**: Include ARIA labels, semantic HTML, and keyboard navigation
- **Brand Consistency**: Maintain blue color scheme and professional industrial aesthetic

## No Testing Framework

This project currently does not have automated testing configured. When implementing features:
- Manually test interactive functionality
- Verify responsive design across devices
- Check accessibility with screen readers
- Ensure production build completes without errors