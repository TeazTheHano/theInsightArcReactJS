import React, { useMemo, useCallback } from 'react'
import { DivFlexColumn, DivFlexColumnSpaceBetween, DivFlexRow } from '../LayoutDiv/LayoutDiv'
import LazyImage from '../LazyImage/lazyImage'
import { IconGen } from '../../assets/icon/OtherIcon'
import { TextBodyLarge, TextBodySmall, TextHeadlineMedium, TextHeadlineSmall, TextLabelSmall, TextTitleMedium } from '../TextBox/textBox'

import styles from './BlogItemSingle.module.css'
import { Link } from 'react-router-dom'
import type { TagProps } from '../../styles/dataInterface'
import Chip from '../Chip/Chip'
import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'

export interface BlogItemProps {
    title?: string
    description?: string
    image: string
    link: string
    timeStamp?: Date
    tags?: TagProps[]
    ratio?: string
}

interface BlogItemSingleGenerProps {
    dataList: BlogItemProps[],
    openAsNewTab?: boolean,
    maxWidth?: number,
    maxHeight?: number,
    ratio?: string
}

const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

const BlogBlockComponet: React.FC<BlogItemSingleGenerProps> = ({
    dataList,
    openAsNewTab,
    maxWidth,
    maxHeight,
    ratio = '1',
}) => {

    const linkStyle = useMemo(() => ({
        width: '100%',
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
        aspectRatio: ratio
    }), [maxWidth, maxHeight, ratio]);

    const renderedItems = useMemo(() => {
        return dataList.map((item, index) => (
            <Link
                key={`${item.title}_${index}`}
                to={item.link}
                aria-label={item.title}
                tabIndex={0}
                style={linkStyle}
                target={openAsNewTab ? '_blank' : '_self'}
            >
                <DivFlexColumnSpaceBetween
                    className={`${styles.blogItemContainer} CM-border-radius-mode-default`}
                >
                    <LazyImage
                        src={item.image}
                        alt={item.title || ''}
                        aspectRatio={ratio}
                        width={'100%'}
                        maxHeight={maxHeight ? `${maxHeight}px` : undefined}
                        maxWidth={maxWidth ? `${maxWidth}px` : undefined}
                    />
                    <DivFlexColumnSpaceBetween className={styles.overlay}>
                        <DivFlexRow className={styles.iconRow}>
                            <div className={styles.iconContainer}>
                                <IconGen svgName='arrow_outward' fillColor='var(--Schemes-On-Surface)' />
                            </div>
                        </DivFlexRow>
                        <TextHeadlineMedium className={styles.title} maxLines={4}>{item.title}</TextHeadlineMedium>
                    </DivFlexColumnSpaceBetween>
                </DivFlexColumnSpaceBetween>
            </Link>
        ));
    }, [dataList, linkStyle, openAsNewTab, ratio, maxWidth, maxHeight]);

    return <>{renderedItems}</>;
}

export const BlogItemSingleGener = React.memo(BlogBlockComponet)

export interface Blog2RowComponetProps {
    dataList: BlogItemProps[]
    openAsNewTab?: boolean
    direction?: 'row' | 'column'
    thumbSize?: 100 | 300 | 600 | 'full'
    ratio?: string
    compactMode?: boolean
}

const Blog2RowComponet: React.FC<Blog2RowComponetProps> = ({
    dataList,
    openAsNewTab,
    direction = 'row',
    thumbSize = 'full',
    ratio = '16/9',
    compactMode,
}) => {

    const containerClass = useMemo(() => [
        styles.blog2RowContainer,
        styles[`direction-${direction}`],
        styles[`thumbSize-${thumbSize}`]
    ].filter(Boolean).join(' ').trim(), [direction, thumbSize]);

    const handleTagClick = useCallback((link: string) => {
        window.open(link, '_blank');
    }, []);

    const renderedItems = useMemo(() => {
        return dataList.map((item, index) => (
            <Link
                key={`${item.title}_${index}`}
                to={item.link}
                aria-label={item.title}
                tabIndex={0}
                style={{ width: '100%' }}
                target={openAsNewTab ? '_blank' : '_self'}
            >
                <div className={containerClass}>
                    {compactMode ? (
                        <>
                            <LazyImage
                                src={item.image}
                                alt={item.title || ''}
                                aspectRatio={ratio}
                                width={200}
                                className={styles.Blog2RowComponetImage}
                                borderRadius='default'
                            />
                            <DivFlexColumnSpaceBetween style={{ flex: 1 }}>
                                <TextTitleMedium children={item.title} className={styles.title} maxLines={3} />
                                <TextLabelSmall
                                    children={item.timeStamp && formatDate(item.timeStamp)}
                                    maxLines={1}
                                    color='var(--Schemes-Outline)'
                                />
                            </DivFlexColumnSpaceBetween>
                        </>
                    ) : (
                        <>
                            <LazyImage
                                src={item.image}
                                alt={item.title || ''}
                                borderRadius='default'
                                className={styles.Blog2RowComponetImage}
                                width={direction === 'column' ? '100%' : '50%'}
                                height={'100%'}
                                aspectRatio={ratio}
                                maxWidth={thumbSize !== 'full' ? `${thumbSize}px` : undefined}
                            />
                            <DivFlexColumnSpaceBetween style={{ flex: 1 }} className={styles.titleHolder}>
                                <DivFlexColumn className={styles.titleHolder}>
                                    <TextHeadlineSmall children={item.title} className={styles.title} maxLines={3} />
                                    <TextBodySmall
                                        children={item.description}
                                        className={styles.description}
                                        maxLines={3}
                                        color='var(--Schemes-On-Surface-Variant)'
                                    />
                                </DivFlexColumn>

                                <DivFlexColumn className={styles.support}>
                                    {item.tags?.length && (
                                        <DivFlexRow className={styles.tags}>
                                            {item.tags.map((e, tagIndex) => (
                                                <Chip
                                                    key={`${e.title}_${tagIndex}`}
                                                    label={e.title}
                                                    children={e.title}
                                                    onClick={() => handleTagClick(e.link)}
                                                    styleMode='FillFixed'
                                                    colorMode='Secondary'
                                                />
                                            ))}
                                        </DivFlexRow>
                                    )}
                                    <TextLabelSmall
                                        children={item.timeStamp && formatDate(item.timeStamp)}
                                        maxLines={1}
                                        color='var(--Schemes-Outline)'
                                    />
                                </DivFlexColumn>
                            </DivFlexColumnSpaceBetween>
                        </>
                    )}
                </div>
            </Link>
        ));
    }, [dataList, openAsNewTab, containerClass, compactMode, ratio, direction, thumbSize, handleTagClick]);

    return <>{renderedItems}</>;
}

export const BlogItem2RowGen = React.memo(Blog2RowComponet)

export interface IdealBlockProps {
    dataList: BlogItemProps[]
    openAsNewTab?: boolean
    squareRatio?: boolean
    compactMode?: boolean
}

const IdealBlock: React.FC<IdealBlockProps> = ({
    dataList,
    openAsNewTab,
    squareRatio,
    compactMode,
}) => {

    const { t } = useTranslation('toast')

    const handleTagClick = useCallback((link: string) => {
        window.open(link, '_blank');
    }, []);

    const renderedItems = useMemo(() => {
        if (dataList.length === 0) {
            return <TextBodyLarge children={t('info.noData')} color='var(--Schemes-On-Surface-Variant)' />
        }

        return dataList.map((item, index) => (
            <Link
                key={`${item.title}_${index}`}
                to={item.link}
                aria-label={item.title}
                tabIndex={0}
                style={{ width: '100%' }}
                target={openAsNewTab ? '_blank' : '_self'}
            >
                <div className={
                    // containerClass
                    styles.blog2RowContainer
                }>

                    <LazyImage
                        src={item.image}
                        alt={item.title || ''}
                        // aspectRatio={squareRatio ? '1' : item.ratio}
                        aspectRatio={squareRatio ? '1' : item.ratio || '1'}
                        className={styles.Blog2RowComponetImage}
                        borderRadius='default'
                    />
                    <DivFlexRow style={{ flex: 1, gap: 'var(--Spacing-Spaceing-M, 24px)' }}>
                        <DivFlexColumn className={styles.titleHolder} style={{ flex: 1 }}>
                            <TextHeadlineSmall children={item.title} className={styles.title} maxLines={2} />
                            {
                                !compactMode &&
                                <TextBodySmall
                                    children={item.description}
                                    className={styles.description}
                                    maxLines={3}
                                    color='var(--Schemes-On-Surface-Variant)'
                                />
                            }
                        </DivFlexColumn>

                        <Button
                            children={t('inspiration-outward_arrow')}
                            showTitleWhileHover
                            variantMode='Icon' label={t('inspiration-outward_arrow')} leadingIcon='arrow_outward' onClick={() => handleTagClick(item.link)} />
                    </DivFlexRow>
                </div>
            </Link>
        ));
    }, [dataList, openAsNewTab, compactMode, handleTagClick, squareRatio]);

    return <>{renderedItems}</>;
}

export const IdealBlockGen = React.memo(IdealBlock)
