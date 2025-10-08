/**
 * Project global config for content fetching and environment variables
 */

export const CONFIG = {
  // --- GitHub content source ---
  GITHUB: {
    OWNER: "TeazTheHano",
    CONTENT_REPO: import.meta.env.VITE_CONTENT_REPO || "TeazTheHano/theInsightArcContent",
    TOKEN: import.meta.env.VITE_GITHUB_TOKEN || "",
    BRANCH: import.meta.env.VITE_CONTENT_BRANCH || "main",
  },

  // --- Blog structure ---
  BLOG: {
    BASE_PATH: "blogs",  // thư mục trong repo B chứa .md
    CACHE_EXPIRE_HOURS: 1,
  },

  // --- API endpoints (sau này nếu mở rộng) ---
//   API: {
//     BASE_URL: import.meta.env.VITE_API_URL || "",
//   },

  // --- Build info (optional) ---
//   BUILD: {
//     ENV: import.meta.env.MODE, // 'development' | 'production'
//     VERSION: "1.0.0",
//   },
};
