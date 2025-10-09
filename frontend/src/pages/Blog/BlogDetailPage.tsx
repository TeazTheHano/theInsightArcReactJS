import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CONFIG } from "../../utils/config";
import { fetchBlogList } from "../../utils/fetchContent";
import BlogDetail from "../../components/Blog/BlogDetail";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [metadata, setMetadata] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const blogs = await fetchBlogList(false);
      const found = blogs.find((b) => b.id === id);
      if (found) setMetadata(found);
      else setNotFound(true);
    };
    load();
  }, [id]);

  if (notFound) return <p className="text-center p-10">❌ Bài viết không tồn tại.</p>;
  if (!metadata) return <p className="text-center p-10">Đang tải...</p>;

  const markdownUrl = `https://raw.githubusercontent.com/${CONFIG.GITHUB.CONTENT_REPO}/${CONFIG.GITHUB.BRANCH}/${CONFIG.BLOG.BASE_PATH}/${metadata.id}.md`;

  return <BlogDetail metadata={metadata} markdownUrl={markdownUrl} />;
}
