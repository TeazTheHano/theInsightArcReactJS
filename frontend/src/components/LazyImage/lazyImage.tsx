import React, { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react';
import styles from './LazyImage.module.css';

// A tiny, transparent 1x1 pixel GIF
const BLANK_IMAGE_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// Define the props for the LazyImage component
interface LazyImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    alt: string;
    width?: number | string; // Can be a number (px) or a string (e.g., "100%", "300px", "50vw")
    height?: number | string; // Can be a number (px) or a string (e.g., "auto", "200px", "30vh")
    aspectRatio?: string; // e.g., "16/9", "4/3", "1/1" for the CSS `aspect-ratio` property
    className?: string;
    onErrorIcon?: React.ReactNode;
    rootMargin?: string;
}

const LazyImageComponent: React.FC<LazyImageProps> = ({
    src,
    alt,
    width, // Mặc định là 100% chiều rộng
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
    const [imageSrc, setImageSrc] = useState<string>(BLANK_IMAGE_SRC);

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

    // --- Logic for handling size and aspect ratio using modern CSS ---
    const wrapperStyles = useMemo(() => {
        // This simplified approach relies on CSS's natural handling of aspect-ratio.
        // If width and aspectRatio are provided, height will be calculated by the browser.
        // If height and aspectRatio are provided, width will be calculated.
        // This prevents layout shifts effectively with less complex logic.
        return {
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            aspectRatio: aspectRatio,
        };
    }, [width, height, aspectRatio]);

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

LazyImageComponent.displayName = 'LazyImage';

export default memo(LazyImageComponent);