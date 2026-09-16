# SoftBild — Original React Design migrated to Next.js

This project preserves the original SoftBild React/Vite website design, components, content, assets and CSS while replacing the Vite/React Router application shell with Next.js App Router.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Notes

- Public UI is based on the original SoftBild React project.
- React Router was replaced with Next.js routing.
- Existing CSS and assets were preserved.
- Existing CAPTCHA/email API behavior is exposed through Next.js route handlers in a later integration step.
- Supabase, Cloudinary and CMS functionality are intentionally not added in this migration stage.
