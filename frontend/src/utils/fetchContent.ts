import { CONFIG } from "./config";

/**
 * Kiểm tra cache còn hạn không
 */
const isCacheValid = (key: string, expireHours: number): boolean => {
  const cache = localStorage.getItem(key);
  if (!cache) return false;

  try {
    const { timestamp } = JSON.parse(cache);
    return Date.now() - timestamp < expireHours * 60 * 60 * 1000;
  } catch {
    return false;
  }
};

/**
 * Lưu dữ liệu vào cache localStorage
 */
const saveCache = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
};

/**
 * Fetch danh sách file Markdown trong thư mục blogs/
 */
export const fetchBlogList = async () => {
  const cacheKey = "blog-list-cache";

  if (isCacheValid(cacheKey, CONFIG.BLOG.CACHE_EXPIRE_HOURS)) {
    const cache = localStorage.getItem(cacheKey);
    if (cache) return JSON.parse(cache).data;
  }

  const url = `https://api.github.com/repos/${CONFIG.GITHUB.CONTENT_REPO}/contents/${CONFIG.BLOG.BASE_PATH}?ref=${CONFIG.GITHUB.BRANCH}`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...(CONFIG.GITHUB.TOKEN && { Authorization: `token ${CONFIG.GITHUB.TOKEN}` }),
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch blog list: ${res.statusText}`);

  const data = await res.json();

  const markdownFiles = data
    .filter((item: any) => item.name.endsWith(".md"))
    .map((item: any) => ({
      id: item.sha,
      title: item.name.replace(".md", ""),
      slug: item.name.replace(".md", ""),
      path: item.path,
      downloadUrl: item.download_url,
    }));

  saveCache(cacheKey, markdownFiles);
  return markdownFiles;
};

/**
 * Fetch nội dung chi tiết của 1 bài Markdown
 */
export const fetchBlogContent = async (slug: string) => {
  const cacheKey = `blog-content-${slug}`;

  if (isCacheValid(cacheKey, CONFIG.BLOG.CACHE_EXPIRE_HOURS)) {
    const cache = localStorage.getItem(cacheKey);
    if (cache) return JSON.parse(cache).data;
  }

  const url = `https://api.github.com/repos/${CONFIG.GITHUB.CONTENT_REPO}/contents/${CONFIG.BLOG.BASE_PATH}/${slug}.md?ref=${CONFIG.GITHUB.BRANCH}`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...(CONFIG.GITHUB.TOKEN && { Authorization: `token ${CONFIG.GITHUB.TOKEN}` }),
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch blog content: ${res.statusText}`);

  const data = await res.json();
  const content = atob(data.content); // decode base64 content

  // Parse frontmatter nếu có
  const match = /^---\n([\s\S]+?)\n---\n([\s\S]*)$/m.exec(content);
  let meta: Record<string, any> = {};
  let body = content;

  if (match) {
    const yaml = match[1];
    body = match[2];
    yaml.split("\n").forEach((line) => {
      const [key, ...rest] = line.split(":");
      meta[key.trim()] = rest.join(":").trim();
    });
  }

  const result = { meta, content: body };
  saveCache(cacheKey, result);
  return result;
};
