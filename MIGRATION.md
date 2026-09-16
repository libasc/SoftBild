# SoftBild React → Next.js migration

This version is a direct technology migration of the uploaded SoftBild React/Vite project. The existing visual design, CSS, assets and page components are retained as the source of truth.

## What changed

- Vite entry point and React Router application shell were replaced by Next.js App Router.
- Existing public pages are mapped to Next.js route folders.
- React Router `Link`, `NavLink`, `useParams`, `useSearchParams`, `useNavigate`, and `useLocation` were converted to their Next.js equivalents.
- Existing image/icon imports are served from `/public/assets` so existing `<img>` usage continues to render without a visual redesign.
- Existing global CSS is loaded from the root Next.js layout.
- Bootstrap JavaScript is loaded client-side after mount so existing Bootstrap collapse behavior remains available.
- Existing CAPTCHA and email handlers are exposed through Next.js route handlers at `/api/captcha` and `/api/send-email`.
- Existing page-level Helmet metadata was removed from the components and basic Next.js route metadata was added to the public pages.
- Legacy URLs redirect to clean lowercase URLs.

## What was intentionally not added

- No new public-site redesign.
- No Supabase CMS.
- No Cloudinary.
- No new admin dashboard.
- No new service/industry/solution content.
- No replacement of the existing SoftBild visual system.

Those should be separate stages after this migration is confirmed visually.
