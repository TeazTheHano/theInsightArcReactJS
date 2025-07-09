import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import styles from './LazyImage.module.css';

// Định nghĩa kiểu dữ liệu cho props của LazyImage
interface LazyImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    alt: string;
    width?: number | string; // Có thể là số (px) hoặc chuỗi (ví dụ: "100%", "300px", "50vw")
    height?: number | string; // Có thể là số (px) hoặc chuỗi (ví dụ: "auto", "200px", "30vh")
    aspectRatio?: string; // Ví dụ: "16/9", "4/3", "1/1" (cho CSS `aspect-ratio` property)
    className?: string;
    onErrorIcon?: React.ReactNode;
    rootMargin?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    width = '100%', // Mặc định là 100% chiều rộng
    height,
    aspectRatio,
    className = '',
    onErrorIcon = '⚠️',
    rootMargin = '0px 0px 100px 0px',
    ...restProps
}) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string>('');

    const handleImageLoad = useCallback(() => {
        setIsLoading(false);
        setError(false);
    }, []);

    const handleImageError = useCallback(() => {
        setIsLoading(false);
        setError(true);
    }, []);

    useEffect(() => {
        let observer: IntersectionObserver | null = null;

        if (imgRef.current) {
            if ('IntersectionObserver' in window) {
                observer = new IntersectionObserver((entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setImageSrc(src);
                            obs.unobserve(entry.target);
                        }
                    });
                }, { rootMargin });

                observer.observe(imgRef.current);
            } else {
                setImageSrc(src);
            }
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [src, rootMargin]);

    // --- LOGIC XỬ LÝ KÍCH THƯỚC VÀ TỶ LỆ (KHÔNG DÙNG PADDING-TOP) ---
    const wrapperStyles = useMemo(() => {
        const styles: React.CSSProperties = {
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            // aspect-ratio property: Cho phép trình duyệt tự động giữ tỷ lệ nếu có đủ thông tin
            aspectRatio: aspectRatio,
        };

        const hasExplicitWidth = width !== undefined && width !== null;
        const hasExplicitHeight = height !== undefined && height !== null;
        const hasAspectRatio = aspectRatio !== undefined && aspectRatio !== null;

        // Trường hợp 1: Có cả width và height (ưu tiên cao nhất)
        // Khi này, aspect-ratio có thể bị bỏ qua bởi trình duyệt nếu nó mâu thuẫn
        if (hasExplicitWidth && hasExplicitHeight) {
            return styles;
        }

        // Trường hợp 2: Có width và aspectRatio
        // `height` sẽ được trình duyệt tự động điều chỉnh theo `aspect-ratio`
        if (hasExplicitWidth && hasAspectRatio) {
            styles.height = 'auto';
            return styles;
        }

        // Trường hợp 3: Có height và aspectRatio
        // `width` sẽ được trình duyệt tự động điều chỉnh theo `aspect-ratio`
        if (hasExplicitHeight && hasAspectRatio) {
            styles.width = 'auto';
            return styles;
        }

        // Trường hợp 4: Chỉ có aspectRatio (hoặc không có gì, và width/height cũng không có)
        // Nếu chỉ có aspectRatio mà không có width/height, ta cần cung cấp một chiều để nó có tác dụng.
        // Mặc định width 100%. Height sẽ được điều chỉnh bởi aspect-ratio.
        if (hasAspectRatio || (!hasExplicitWidth && !hasExplicitHeight)) {
            styles.width = hasExplicitWidth ? styles.width : '100%';
            styles.height = hasExplicitHeight ? styles.height : 'auto';
            // Nếu không có cả width/height, và không có aspectRatio, thì sẽ mặc định width 100% height auto,
            // dẫn đến layout shift nếu ảnh chưa load. Điều này đúng với yêu cầu "bỏ padding-top"
        }

        // Fallback: nếu không có bất kỳ logic nào ở trên phù hợp
        return styles;
    }, [width, height, aspectRatio]);
    // --- KẾT THÚC LOGIC CẬP NHẬT ---

    return (
        <div
            className={`${styles.lazyImageWrapper} ${className}`}
            style={wrapperStyles} // Áp dụng styles đã tính toán
            {...restProps}
        >
            {error ? (
                <div className={styles.errorPlaceholder}>
                    {onErrorIcon}
                    <p>Failed to load image</p>
                </div>
            ) : (
                <>
                    {isLoading && (
                        <div className={styles.placeholder}>
                            <div className={styles.shimmer}></div>
                        </div>
                    )}
                    <img
                        ref={imgRef}
                        src={imageSrc}
                        alt={alt}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className={`${styles.image} ${isLoading ? styles.hidden : ''}`}
                        loading="lazy"
                    />
                </>
            )}
        </div>
    );
};

export default LazyImage;