import { useSEO } from "../../hooks/useSEO";

export const BlogHeader = ({ meta }: { meta: any }) => {
    useSEO(meta); // <-- chỉ thêm meta tags vào <head>
    return null;  // <-- không render gì ra màn hình
};