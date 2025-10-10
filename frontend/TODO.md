# Migration from Vite to Next.js

## Steps to Complete

- [ ] Update package.json: Remove Vite dependencies, add Next.js dependencies, update scripts
- [ ] Create next.config.js with basic configuration
- [ ] Restructure project: Move src/ contents to root (pages/, components/, etc.)
- [ ] Create pages/_app.tsx to wrap with GlobalLayout and i18n provider
- [ ] Create pages/index.tsx as the home page (currently App.tsx)
- [ ] Update routing: Convert React Router routes to Next.js file-based routing
- [ ] Handle static assets and public folder
- [ ] Update imports to use Next.js Link instead of react-router-dom Link
- [ ] Test the build and fix any issues
- [ ] Update vercel.json if needed for deployment

## Todo UI:
- [x] Update re-render for mermaid diagrams
- [x] Fix dark mode for mermaid diagrams
- [ ] Try auto generating table of contents from markdown
- [ ] Search engine