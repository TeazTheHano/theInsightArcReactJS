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

# TODO: Chuyển dự án sang Next.js

## 1. Khởi tạo dự án Next.js mới

```sh
npx create-next-app@latest theInsightArcNextJS --typescript
cd theInsightArcNextJS
```

---

## 2. Copy code và cấu trúc lại thư mục

- `src/components` → `theInsightArcNextJS/components`
- `src/pages` (trừ App.tsx, main.tsx) → `theInsightArcNextJS/app` (nếu dùng App Router) hoặc `pages` (nếu dùng Pages Router)
- `src/styles` → `theInsightArcNextJS/styles`
- `src/assets` → `theInsightArcNextJS/public/assets`
- Các file global CSS/SCSS import vào `app/layout.tsx` hoặc `pages/_app.tsx`

---

## 3. Chuyển đổi các file chính

- **App.tsx**:  
  - Nếu dùng App Router: chuyển logic layout vào `app/layout.tsx`
  - Nếu dùng Pages Router: chuyển vào `pages/_app.tsx`
- **main.tsx**: Không cần, Next.js tự động render.

---

## 4. Chuyển các route/page

- Mỗi file trong `pages` hoặc `app` sẽ là một route.
- Blog:  
  - Tạo thư mục `app/blog/[slug]/page.tsx` (App Router) hoặc `pages/blog/[slug].tsx` (Pages Router)
  - Fetch metadata và markdown từ GitHub trong hàm `getStaticProps` (Pages Router) hoặc `generateStaticParams` + `fetch` (App Router)
- Inspiration:  
  - Tạo `app/inspiration/page.tsx` hoặc `pages/inspiration.tsx`

---

## 5. Chuyển các component

- Copy toàn bộ sang `components/`
- Sửa lại import đường dẫn nếu cần.

---

## 6. Chuyển các style

- Global CSS/SCSS: import vào `app/layout.tsx` hoặc `pages/_app.tsx`
- CSS module giữ nguyên, chỉ đổi đuôi `.module.css` hoặc `.module.scss`

---

## 7. Tối ưu ảnh với Next.js

- Dùng component `<Image />` của Next.js để tự động tối ưu ảnh:
  ```tsx
  import Image from 'next/image'
  <Image src="/assets/banner.jpg" alt="Banner" width={1200} height={600} priority />
  ```
- Với ảnh từ Vercel Blob hoặc external, thêm domain vào `next.config.js`:
  ```js
  images: {
    domains: ['your-bucket.vercel-storage.com', 'cdn.sanity.io', ...],
  }
  ```

---

## 8. SEO cho Blog

- Dùng `getStaticProps`/`getStaticPaths` (Pages Router) hoặc `generateMetadata` (App Router) để tạo meta tag động cho từng bài blog.
- Render nội dung markdown thành HTML (dùng `remark`, `react-markdown`, ...).

---

## 9. Chạy thử

```sh
npm run dev
```
Truy cập `http://localhost:3000` để kiểm tra.

---

## 10. Xử lý các vấn đề phát sinh

- Sửa lại các import, đường dẫn, hook nếu có lỗi.
- Nếu dùng hook custom (ví dụ: `useTheme`), copy sang và import bình thường.
- Nếu fetch từ GitHub, dùng `fetch` trong server component hoặc `getStaticProps`.

---

## 11. Deploy lên Vercel

```sh
git init
git add .
git commit -m "init nextjs"
git remote add origin <your-repo>
git push -u origin main
# Sau đó kết nối repo với Vercel để deploy
```

---

## Tóm tắt cấu trúc Next.js sau khi chuyển

```
/app hoặc /pages
  /blog/[slug]/page.tsx
  /inspiration/page.tsx
/components
/styles
/public/assets
next.config.js
package.json
```

---

**Nếu cần ví dụ cụ thể cho fetch markdown từ GitHub, dynamic routing blog, hoặc tối ưu ảnh, hãy hỏi thêm!**

## Todo UI:
- [x] Update re-render for mermaid diagrams
- [x] Fix dark mode for mermaid diagrams
- [ ] Try auto generating table of contents from markdown
- [x] Search engine
- [x] make list view for search result in navigation and custom screen
- [ ] make custom hook for fetching and save to data. to reduce repeat code and control re-fetch with cache access.
