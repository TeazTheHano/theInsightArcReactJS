import styles from './LandingPage.module.css'

import LazyImage from '../../components/LazyImage/lazyImage'
import { DivFlexColumn, DivFlexRow } from '../../components/LayoutDiv/LayoutDiv'
import { ButtonDefault } from '../../components/Button/Button'
import { TextBodyMedium, TextDisplayMedium, TextHeadlineLarge, TextHeadlineSmall } from '../../components/TextBox/textBox'
import Divider from '../../components/Divider/Divider'
import { Trans, useTranslation } from 'react-i18next'
import BlogItemSingle, { type BlogItemProps } from '../../components/Blog/BlogItemSingle'

function LandingPage() {

    const { t } = useTranslation('landingPage')

    const item111: BlogItemProps[] = [
        {
            title: 'Đây là một tiêu đề bài viết mẫu',
            description: 'Blog Description 1',
            image: 'placeholder',
            link: '/test'
        },
        {
            title: 'Blog Title 1',
            description: 'Blog Description 1',
            image: 'placeholder',
            link: '/test'
        },
        {
            title: 'Blog Title 1',
            description: 'Blog Description 1',
            image: 'placeholder',
            link: '/test'
        },
    ]

    return (

        <div>
            <LazyImage src='/photos/home/theinsightArcbanner.jpg' alt='logo banner' height={'50dvh'} maxHeight='100dvw' />
            <br />
            {/* content */}

            {/* 1 hero section */}
            <DivFlexRow className={styles.wrapperLayout}>
                {/* left */}
                <DivFlexColumn style={{ gap: `var(--Gap-Gap-m2, 8px)`, flex: 1 }}>
                    <TextDisplayMedium>{t('section-1-title-1')} <br />{t('section-1-title-2')}</TextDisplayMedium>
                    <ButtonDefault
                        variantMode='Extreme'
                        children={t('section-1-button')}
                        label={t('section-1-button')}
                        onClick={() => { }}
                        iconMain={'phone_filled'}
                    />
                </DivFlexColumn>
                {/* right */}
                <DivFlexColumn style={{ gap: `var(--Gap-Gap-m1, 12px)`, flex: 1, textAlign: 'justify' }}>
                    <TextBodyMedium children={t('section-1-description-1')} />
                    <TextBodyMedium children={t('section-1-description-2')} />
                    <TextBodyMedium children={t('section-1-description-3')} />
                </DivFlexColumn>
            </DivFlexRow>

            {/* 2 content list section */}
            <Divider />
            <DivFlexRow className={styles.wrapperLayout}>
                {/* left */}
                <DivFlexColumn style={{ gap: `var(--Gap-Gap-m2, 8px)`, flex: 1 }}>
                    <TextHeadlineSmall children={t('section-2-title')} />
                </DivFlexColumn>
                {/* right */}
                <DivFlexColumn style={{ gap: `var(--Gap-Gap-m1, 12px)`, flex: 1, }}>
                    <TextBodyMedium children={t('section-2-description-1')} />
                    <TextBodyMedium children={t('section-2-description-2')} />
                    <TextBodyMedium children={t('section-2-description-3')} />
                    <TextBodyMedium children={t('section-2-description-4')} />
                </DivFlexColumn >
            </DivFlexRow >

            {/* 3 about section */}
            <Divider />
            <DivFlexRow className={styles.wrapperLayout}>
                {/* left */}
                <DivFlexColumn style={{ flex: 1 }}>
                    <TextHeadlineLarge>{t('section-3-title-1')} <br />{t('section-3-title-2')}</TextHeadlineLarge>
                </DivFlexColumn>
                {/* right */}
                <DivFlexColumn style={{ gap: `var(--Gap-Gap-m1, 12px)`, flex: 1, textAlign: 'justify' }}>
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
            <DivFlexColumn className={styles.wrapperLayoutVer2}>
                {/* text */}
                <DivFlexRow className={styles.wrapperLayoutVer2_itemWrapper}>
                    {/* left */}
                    <DivFlexColumn style={{ gap: `var(--Gap-Gap-m2, 8px)`, flex: 1 }}>
                        <TextHeadlineLarge children={t('section-4-title')} />
                        <ButtonDefault
                            children={t('section-4-button')}
                            label={t('section-4-button')}
                            onClick={() => { }}
                            iconMain={'arrow_outward'}
                        />
                    </DivFlexColumn>
                    {/* right */}
                    <DivFlexColumn style={{ gap: `var(--Gap-Gap-m1, 12px)`, flex: 1, textAlign: 'justify' }}>
                        <TextBodyMedium children={t('section-4-description')} />
                    </DivFlexColumn>
                </DivFlexRow>
                {/* image */}
                <LazyImage errorMessage='Will update sooooon' onErrorIcon="🙆" src='placeholder' alt='' aspectRatio='21/9' />
            </DivFlexColumn>

            {/* 5 Blog section */}
            <Divider />
            <DivFlexColumn className={styles.wrapperLayoutVer2}>
                {/* text */}
                <DivFlexRow className={styles.wrapperLayoutVer2_itemWrapper}>
                    {/* left */}
                    <DivFlexColumn style={{ gap: `var(--Gap-Gap-m2, 8px)`, flex: 1 }}>
                        <TextHeadlineLarge children={t('section-5-title')} />
                        <ButtonDefault
                            children={t('section-5-button')}
                            label={t('section-5-button')}
                            onClick={() => { }}
                            iconMain={'arrow_outward'}
                        />
                    </DivFlexColumn>
                    {/* right */}
                    <DivFlexColumn style={{ gap: `var(--Gap-Gap-m1, 12px)`, flex: 1, textAlign: 'justify' }}>
                        <TextBodyMedium children={t('section-5-description')} />
                    </DivFlexColumn>
                </DivFlexRow>
                {/* blog list */}
                <DivFlexRow className='shiftVerticalSm' style={{ gap: `var(--Gap-Gap-0, 24px)`, flex: 1 }}>
                    <BlogItemSingle dataList={item111} />
                </DivFlexRow>
            </DivFlexColumn>

            {/* 6 Game */}
            <Divider />
            <DivFlexColumn className={styles.wrapperLayoutVer2}>
                {/* text */}
                <DivFlexRow className={styles.wrapperLayoutVer2_itemWrapper}>
                    {/* left */}
                    <DivFlexColumn style={{ gap: `var(--Gap-Gap-m2, 8px)`, flex: 1 }}>
                        <TextHeadlineLarge children={t('section-6-title')} />
                        <ButtonDefault
                            children={t('section-6-button')}
                            label={t('section-6-button')}
                            onClick={() => { }}
                            iconMain={'arrow_outward'}
                        />
                    </DivFlexColumn>
                    {/* right */}
                    <DivFlexColumn style={{ gap: `var(--Gap-Gap-m1, 12px)`, flex: 1, textAlign: 'justify' }}>
                        <TextBodyMedium children={t('section-6-description')} />
                    </DivFlexColumn>
                </DivFlexRow>
                {/* blog list */}
                <DivFlexRow className='shiftVerticalSm shiftVerticalMd' style={{ gap: `var(--Gap-Gap-0, 24px)`, flex: 1 }}>
                    <DivFlexRow style={{ gap: `var(--Gap-Gap-0, 24px)`, flex: 1 }}>
                        <TextHeadlineSmall children={t('section-6-subTitle-1')} />
                        
                    </DivFlexRow>
                    <DivFlexRow style={{ gap: `var(--Gap-Gap-0, 24px)`, flex: 1 }}>
                        <TextHeadlineSmall children={t('section-6-subTitle-2')} />
                    </DivFlexRow>
                </DivFlexRow>
            </DivFlexColumn>

        </div >


    )
}

export default LandingPage