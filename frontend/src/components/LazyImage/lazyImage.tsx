import React, { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react';
import styles from './LazyImage.module.css';

// A tiny, transparent 1x1 pixel GIF
const BLANK_IMAGE_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// Define the props for the LazyImage component
interface LazyImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    alt: string;
    srcSet?: string; // For responsive images, e.g. "image-300.jpg 300w, image-600.jpg 600w"
    sizes?: string; // For responsive images, e.g. "(max-width: 600px) 480px, 800px"
    width?: number | string; // Can be a number (px) or a string (e.g., "100%", "300px", "50vw")
    height?: number | string; // Can be a number (px) or a string (e.g., "auto", "200px", "30vh")
    aspectRatio?: string; // e.g., "16/9", "4/3", "1/1" for the CSS `aspect-ratio` property
    maxWidth?: string; // e.g., "100%", "300px", "50vw"
    maxHeight?: string; // e.g., "auto", "200px", "30vh"
    className?: string;
    onErrorIcon?: React.ReactNode;
    errorMessage?: string;
    rootMargin?: string;
}

const LazyImageComponent: React.FC<LazyImageProps> = ({
    src,
    alt,
    srcSet,
    sizes,
    width, // Mặc định là 100% chiều rộng
    height,
    aspectRatio,
    maxWidth,
    maxHeight,
    className = '',
    onErrorIcon = '⚠️',
    errorMessage = 'Failed to load image',
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
    const wrapperStyles = useMemo((): React.CSSProperties => {
        return {
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            aspectRatio: aspectRatio,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
        };
    }, [width, height, aspectRatio, maxWidth, maxHeight]);

    return (
        <div
            className={`${styles.lazyImageWrapper} ${className}`}
            style={wrapperStyles} // Áp dụng styles đã tính toán
            {...restProps}
        >
            {error ? (
                <div className={styles.errorPlaceholder}>
                    {onErrorIcon}
                    <p>{errorMessage}</p>
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
                        srcSet={srcSet}
                        sizes={sizes}
                        alt={alt}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className={`${styles.image} ${isLoading ? styles.hidden : ''}`}
                        loading="lazy"
                        width={'100%'}
                        height={'100%'}
                    />
                </>
            )}
        </div>
    );
};

LazyImageComponent.displayName = 'LazyImage';

export default memo(LazyImageComponent);