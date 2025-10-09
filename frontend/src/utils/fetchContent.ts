import { CONFIG } from "./config";
import { getCache, saveCache } from "./cacheUtils";
import type { BlogItemProps } from "../data/type";

// Kiểm tra xem token GitHub có sẵn không để xác thực API
console.log("GitHub token available:", !!CONFIG.GITHUB.TOKEN);

/**
 * Lấy danh sách các file Markdown từ thư mục blogs/ trên GitHub
 * Sử dụng cache để tránh gọi API nhiều lần không cần thiết
 */

/**
 * Fetch danh sách blog từ metadata.json (tự động tạo trong repo content)
 */
export const fetchBlogList = async (useCache: boolean = false): Promise<BlogItemProps[]> => {
    const cacheKey = "blog-list-cache";

    // Kiểm tra cache
    if (useCache) {
        const cached = getCache(cacheKey, CONFIG.BLOG.CACHE_EXPIRE_HOURS);
        if (cached) return cached;
    }

    // URL tới metadata.json
    const url = `https://api.github.com/repos/${CONFIG.GITHUB.CONTENT_REPO}/contents/${CONFIG.BLOG.BASE_PATH}/metadata.json?ref=${CONFIG.GITHUB.BRANCH}`;

    const res = await fetch(url, {
        headers: {
            Accept: "application/vnd.github.v3.raw+json", // để GitHub trả về raw content
            ...(CONFIG.GITHUB.TOKEN && { Authorization: `token ${CONFIG.GITHUB.TOKEN}` }),
        },
    });

    if (!res.ok) throw new Error(`Lỗi khi lấy metadata.json: ${res.statusText}`);

    // Decode nội dung JSON
    const data = await res.json();
    let metadata: BlogItemProps[];

    if (Array.isArray(data)) {
        // GitHub có thể trả raw JSON nếu header đúng
        metadata = data;
    } else if (data.content) {
        // Nếu GitHub trả về dạng content base64
        const decoded = atob(data.content);
        metadata = JSON.parse(decoded);
    } else {
        throw new Error("Định dạng metadata.json không hợp lệ");
    }

    // Lưu cache
    if (useCache) saveCache(cacheKey, metadata);

    return metadata;
};

/**
 * Lấy nội dung chi tiết của một bài blog Markdown dựa trên slug
 * Bao gồm việc parse frontmatter (metadata) nếu có
 */
export const fetchBlogContent = async (slug: string, useCache: boolean = false) => {
    const cacheKey = `blog-content-${slug}`;

    // Kiểm tra cache nếu bật cache
    if (useCache) {
        const cachedData = getCache(cacheKey, CONFIG.BLOG.CACHE_EXPIRE_HOURS);
        if (cachedData) {
            return cachedData;
        }
    }

    // Tạo URL API để lấy nội dung file cụ thể
    const url = `https://api.github.com/repos/${CONFIG.GITHUB.CONTENT_REPO}/contents/${CONFIG.BLOG.BASE_PATH}/${slug}.md?ref=${CONFIG.GITHUB.BRANCH}`;

    const res = await fetch(url, {
        headers: {
            Accept: "application/vnd.github.v3+json",
            ...(CONFIG.GITHUB.TOKEN && { Authorization: `token ${CONFIG.GITHUB.TOKEN}` }),
        },
    });

if (!res.ok) throw new Error(`Lỗi khi lấy nội dung blog: ${res.statusText}`);

    const data = await res.json();

    // Giải mã nội dung base64 từ GitHub API
    const content = atob(data.content);

    // Phân tích frontmatter (metadata) nếu có ở đầu file
    // Frontmatter thường có dạng --- key: value --- ở đầu file
    const match = /^---\n([\s\S]+?)\n---\n([\s\S]*)$/m.exec(content);
    let meta: Record<string, any> = {};
    let body = content;

    if (match) {
        // Nếu có frontmatter, tách phần meta và body
        const yaml = match[1];
        body = match[2];
        // Parse YAML đơn giản (không dùng thư viện)
        yaml.split("\n").forEach((line) => {
            const [key, ...rest] = line.split(":");
            if (key) {
                meta[key.trim()] = rest.join(":").trim();
            }
        });
    }

    const result = { meta, content: body };
    // Lưu kết quả vào cache nếu bật cache
    if (useCache) {
        saveCache(cacheKey, result);
    }
    return result;
};
