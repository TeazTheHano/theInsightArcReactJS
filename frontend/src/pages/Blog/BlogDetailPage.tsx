import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBlogList } from "../../utils/fetchContent";
import BlogDetail from "../../components/Blog/BlogDetail";
import { TextBodyLarge } from "../../components/TextBox/textBox";
import { useTranslation } from "react-i18next";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [metadata, setMetadata] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const { t: t_toast } = useTranslation('toast');

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

  if (notFound) return <TextBodyLarge children={t_toast('error.notFound')} />;
  if (!metadata) return <TextBodyLarge children={t_toast('info.loading')} />;

  return <BlogDetail metadata={metadata} />;
}
