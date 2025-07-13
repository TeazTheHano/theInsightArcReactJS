import styles from './LandingPage.module.css'

import LazyImage from '../../components/LazyImage/lazyImage'
import { DivFlexColumn, DivFlexRow } from '../../components/LayoutDiv/LayoutDiv'
import { ButtonDefault } from '../../components/Button/Button'
import { IconGen } from '../../assets/icon/OtherIcon'
import { TextBodySmall, TextDisplayMedium, TextHeadlineSmall } from '../../components/TextBox/textBox'
import Divider from '../../components/Divider/Divider'
import { useTranslation } from 'react-i18next'

function LandingPage() {

    const { t } = useTranslation('landingPage')

    return (

        <div>
            <LazyImage src='/photos/home/theinsightArcbanner.jpg' alt='logo' aspectRatio='16/9' />
            <br />
            {/* content */}

            {/* first section */}
            <DivFlexRow className={styles.wrapperLayout}>
                {/* left */}
                <DivFlexColumn style={{ gap: `var(--Gap-Gap-m2, 8px)`, flex: 1 }}>
                    <TextDisplayMedium>{t('section-1-title-1')} <br />{t('section-1-title-2')}</TextDisplayMedium>
                    <ButtonDefault
                        variantMode='Extreme'
                        children={t('section-1-button')}
                        onClick={() => { }}
                        iconMain={<IconGen svgName='phone' fillColor='var(--Schemes-On-Primary-Container)' />}
                    />
                </DivFlexColumn>
                {/* right */}
                <DivFlexColumn style={{ gap: `var(--Gap-Gap-m1, 12px)`, flex: 1, textAlign: 'justify' }}>
                    <TextBodySmall children={t('section-1-description-1')} />
                    <TextBodySmall children={t('section-1-description-2')} />
                    <TextBodySmall children={t('section-1-description-3')} />
                </DivFlexColumn>
            </DivFlexRow>

            <Divider />
            {/* second section */}
            <DivFlexRow className={styles.wrapperLayout}>
                {/* left */}
                <DivFlexColumn style={{ gap: `var(--Gap-Gap-m2, 8px)`, flex: 1 }}>
                    <TextHeadlineSmall children={t('section-2-title')} />
                </DivFlexColumn>
                {/* right */}
                <DivFlexColumn style={{ gap: `var(--Gap-Gap-m1, 12px)`, flex: 1, textAlign: 'justify' }}>
                    <TextBodySmall children={t('section-2-description-1')} />
                    <TextBodySmall children={t('section-2-description-2')} />
                    <TextBodySmall children={t('section-2-description-3')} />
                    <TextBodySmall children={t('section-2-description-4')} />
                </DivFlexColumn >
            </DivFlexRow >

        </div >


    )
}

export default LandingPage
