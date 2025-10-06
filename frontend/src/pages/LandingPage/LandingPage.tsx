import styles from './LandingPage.module.css'

import LazyImage from '../../components/LazyImage/lazyImage'
import { DivFlexColumn, DivFlexRow } from '../../components/LayoutDiv/LayoutDiv'
import ButtonDefault from '../../components/Button/Button'
import { TextBodyMedium, TextDisplayMedium, TextHeadlineLarge, TextHeadlineSmall } from '../../components/TextBox/textBox'
import Divider from '../../components/Divider/Divider'
import { Trans, useTranslation } from 'react-i18next'
import { BlogItem2RowGen, BlogItemSingleGener } from '../../components/Blog/BlogItemSingle'
import type { BlogItemProps } from '../../data/type'
import { placeholderData } from '../../data/placeholderData'

function LandingPage() {

    const { t } = useTranslation('landingPage')

    return (

        <div>
            <LazyImage
                disableLazyLoad
                id='landingPage_banner'
                src='/photos/home/theinsightArcbanner.jpg' alt='logo banner' height={'50dvh'} maxHeight='100dvw' />
            <br />
            {/* content */}

            {/* 1 hero section */}
            <DivFlexRow
                id='landingPage_direction'
                className={styles.wrapperLayout}>
                {/* left */}
                <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-XXS, 8px)`, flex: 1 }}>
                    <TextDisplayMedium>{t('section-1-title-1')} <br />{t('section-1-title-2')}</TextDisplayMedium>
                    <ButtonDefault
                        variantMode='Extreme'
                        children={t('section-1-button')}
                        label={t('section-1-button')}
                        onClick={() => { }}
                        leadingIcon={'phone_filled'}
                    />
                </DivFlexColumn>
                {/* right */}
                <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-XS, 12px)`, flex: 1, textAlign: 'justify' }}>
                    <TextBodyMedium children={t('section-1-description-1')} />
                    <TextBodyMedium children={t('section-1-description-2')} />
                    <TextBodyMedium children={t('section-1-description-3')} />
                </DivFlexColumn>
            </DivFlexRow>

            {/* 2 content list section */}
            <Divider />
            <DivFlexRow className={styles.wrapperLayout}>
                {/* left */}
                <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-XXS, 8px)`, flex: 1 }}>
                    <TextHeadlineSmall children={t('section-2-title')} />
                </DivFlexColumn>
                {/* right */}
                <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-XS, 12px)`, flex: 1, }}>
                    <TextBodyMedium children={t('section-2-description-1')} />
                    <TextBodyMedium children={t('section-2-description-2')} />
                    <TextBodyMedium children={t('section-2-description-3')} />
                    <TextBodyMedium children={t('section-2-description-4')} />
                </DivFlexColumn >
            </DivFlexRow >

            {/* 3 about section */}
            <Divider />
            <DivFlexRow
                id='landingPage_about'
                className={styles.wrapperLayout}>
                {/* left */}
                <DivFlexColumn style={{ flex: 1 }}>
                    <TextHeadlineLarge>{t('section-3-title-1')} <br />{t('section-3-title-2')}</TextHeadlineLarge>
                </DivFlexColumn>
                {/* right */}
                <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-XS, 12px)`, flex: 1, textAlign: 'justify' }}>
                    <TextBodyMedium children={t('section-3-description-1')} />

                    <LazyImage errorMessage='Will update sooooon' onErrorIcon="🙆" src='placeholder' alt='' aspectRatio='1' />

                    <TextBodyMedium children={t('section-3-description-2')} />
                    <TextBodyMedium>
                        <Trans i18nKey="section-3-description-3" ns="landingPage"
                            components={{ b: <strong /> }}
                        />
                    </TextBodyMedium>
                    {/* Sử dụng Trans component cho section-3-description-4 */}
                    <TextBodyMedium>
                        <Trans i18nKey="section-3-description-4" ns="landingPage"
                            components={{ b: <strong /> }}
                        />
                    </TextBodyMedium>
                </DivFlexColumn >
            </DivFlexRow >

            {/* 4 inspiration section */}
            <Divider />
            <DivFlexColumn
                id='landingPage_inspiration'
                className={styles.wrapperLayoutVer2}>
                {/* text */}
                <DivFlexRow className={styles.wrapperLayoutVer2_itemWrapper}>
                    {/* left */}
                    <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-XXS, 8px)`, flex: 1 }}>
                        <TextHeadlineLarge children={t('section-4-title')} />
                        <ButtonDefault
                            children={t('section-4-button')}
                            label={t('section-4-button')}
                            onClick={() => { }}
                            leadingIcon={'arrow_outward'}
                        />
                    </DivFlexColumn>
                    {/* right */}
                    <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-XS, 12px)`, flex: 1, textAlign: 'justify' }}>
                        <TextBodyMedium children={t('section-4-description')} />
                    </DivFlexColumn>
                </DivFlexRow>
                {/* image */}
                <LazyImage errorMessage='Will update sooooon' onErrorIcon="🙆" src='placeholder' alt='' aspectRatio='21/9' />
            </DivFlexColumn>

            {/* 5 Blog section */}
            <Divider />
            <DivFlexColumn
                id='landingPage_blog'
                className={styles.wrapperLayoutVer2}>
                {/* text */}
                <DivFlexRow className={styles.wrapperLayoutVer2_itemWrapper}>
                    {/* left */}
                    <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-XXS, 8px)`, flex: 1 }}>
                        <TextHeadlineLarge children={t('section-5-title')} />
                        <ButtonDefault
                            children={t('section-5-button')}
                            label={t('section-5-button')}
                            onClick={() => { }}
                            leadingIcon={'arrow_outward'}
                        />
                    </DivFlexColumn>
                    {/* right */}
                    <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-XS, 12px)`, flex: 1, textAlign: 'justify' }}>
                        <TextBodyMedium children={t('section-5-description')} />
                    </DivFlexColumn>
                </DivFlexRow>
                {/* blog list */}
                <DivFlexRow className='shiftVerticalSm' style={{ gap: `var(--Spacing-Spaceing-M, 24px)`, flex: 1 }}>
                    <BlogItemSingleGener dataList={placeholderData} />
                </DivFlexRow>
            </DivFlexColumn>

            {/* 6 Game */}
            <Divider />
            <DivFlexColumn
                id='landingPage_game'
                className={styles.wrapperLayoutVer2}>
                {/* text */}
                <DivFlexRow className={styles.wrapperLayoutVer2_itemWrapper}>
                    {/* left */}
                    <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-XXS, 8px)`, flex: 1 }}>
                        <TextHeadlineLarge children={t('section-6-title')} />
                        <ButtonDefault
                            children={t('section-6-button')}
                            label={t('section-6-button')}
                            onClick={() => { }}
                            leadingIcon={'arrow_outward'}
                        />
                    </DivFlexColumn>
                    {/* right */}
                    <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-XS, 12px)`, flex: 1, textAlign: 'justify' }}>
                        <TextBodyMedium children={t('section-6-description')} />
                    </DivFlexColumn>
                </DivFlexRow>
                {/* blog list */}
                <DivFlexRow className='shiftVerticalSm shiftVerticalMd' style={{ gap: `var(--Spacing-Spaceing-M, 24px)`, flex: 1 }}>
                    <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-M, 24px)`, flex: 1 }}>
                        <TextHeadlineSmall children={t('section-6-subTitle-1')} />
                        <BlogItemSingleGener
                            maxHeight={500}

                            dataList={[
                                {
                                    title: '',
                                    description: '',
                                    image: 'placeholder',
                                    link: '/test',
                                }
                            ] as BlogItemProps[]}
                        />
                    </DivFlexColumn>
                    <DivFlexColumn style={{ gap: `var(--Spacing-Spaceing-M, 24px)`, flex: 1 }}>
                        <TextHeadlineSmall children={t('section-6-subTitle-2')} />
                        <BlogItem2RowGen dataList={placeholderData} compactMode />
                    </DivFlexColumn>
                </DivFlexRow>
            </DivFlexColumn>

        </div >


    )
}

export default LandingPage