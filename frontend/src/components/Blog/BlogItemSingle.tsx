import React from 'react'
import { DivFlexColumnSpaceBetween, DivFlexRow } from '../LayoutDiv/LayoutDiv'
import LazyImage from '../LazyImage/lazyImage'
import { IconGen } from '../../assets/icon/OtherIcon'
import { TextHeadlineMedium } from '../TextBox/textBox'

import styles from './BlogItemSingle.module.css'
import { Link } from 'react-router-dom'

export interface BlogItemProps {
    title: string
    description: string
    image: string
    link: string
}

interface BlogItemSingleProps {
    dataList: BlogItemProps[]
    openAsNewTab?: boolean
}

const BlogItemSingle: React.FC<BlogItemSingleProps> = ({
    dataList,
    openAsNewTab = false,
}) => {

    return (
        <>
            {
                dataList.map((item) => {
                    return (
                        <Link
                            key={item.title}
                            to={item.link}
                            aria-label={item.title}
                            tabIndex={0}
                            style={{
                                width: '100%'
                            }}
                            target={openAsNewTab ? '_blank' : '_self'}
                        >
                            <DivFlexColumnSpaceBetween
                                className={styles.blogItemContainer}
                            >
                                <LazyImage src={item.image} alt={item.title} aspectRatio='1' width={'100%'} />
                                <DivFlexColumnSpaceBetween className={styles.overlay}>
                                    <DivFlexRow className={styles.iconRow}>
                                        <div className={styles.iconContainer}>
                                            <IconGen svgName='arrow_outward' />
                                        </div>
                                    </DivFlexRow>
                                    <TextHeadlineMedium className={styles.title}>{item.title}</TextHeadlineMedium>
                                </DivFlexColumnSpaceBetween>
                            </DivFlexColumnSpaceBetween>
                        </Link>
                    )
                })
            }
        </>
    )
}

export default React.memo(BlogItemSingle)