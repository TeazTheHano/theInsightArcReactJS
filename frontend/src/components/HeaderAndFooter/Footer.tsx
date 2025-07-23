import { ButtonDefault } from '../Button/Button'
import { useTheme } from '../../hooks/useTheme'
import { TextBodySmall, TextHeadlineLarge } from '../TextBox/textBox'
import { DivFlexColumn, DivFlexRow } from '../LayoutDiv/LayoutDiv'
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

export default function Footer() {

    const { theme, setTheme } = useTheme()
    const { t } = useTranslation('common');

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <footer
            style={{
                display: 'flex',
                padding: 'var(--Padding-and-Margin-PM-0, 24px) var(--Padding-and-Margin-PM-0, 24px) var(--Padding-and-Margin-PM-2, 48px) var(--Padding-and-Margin-PM-0, 24px)',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 'var(--Gap-Gap-0, 24px)',
                alignSelf: 'stretch',
            }}>
            <DivFlexColumn
                style={{ gap: 'var(--Gap-Gap-m2, 8px)', }}
            >
                <TextHeadlineLarge children='The insightArc' color='var(--Schemes-On-Surface-Variant, #434843)' />
                <TextBodySmall>
                    {t('footer-item-1')}<br />{t('footer-item-2')}
                </TextBodySmall>
            </DivFlexColumn>

            <DivFlexColumn>
                <ButtonDefault
                    children='@the_insightarc'
                    label='Contact us on instagram: @the_insightarc'
                    styleMode='Text'
                    colorMode='Primary'
                    iconMain={'instagram'}
                    onClick={() => {
                        window.open('https://www.instagram.com/the_insightarc/', '_blank')
                    }}
                />
                <ButtonDefault
                    children='contact@theinsightarc.id.vn'
                    label='Contact us via email: contact@theinsightarc.id.vn'
                    styleMode='Text'
                    colorMode='Primary'
                    iconMain={'mail'}
                    onClick={() => {
                        window.open('mailto:contact@theinsightarc.id.vn', '_blank')
                    }}
                />
            </DivFlexColumn>

            {/* change themes */}
            <DivFlexRow
                style={{ gap: 'var(--Gap-Gap-m2, 24px)', }}
            >
                <ButtonDefault onClick={() => { setTheme('system') }} children='Reset theme' label='theme' />
                <ButtonDefault onClick={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light')
                }} children='Toggle theme' label='theme' />
                <ButtonDefault onClick={() => { changeLanguage(i18n.language != 'en' ? 'en' : 'vi') }} children={i18n.language != 'en' ? 'English' : 'Tiếng Việt'} label='language' />
            </DivFlexRow>
        </footer >
    )
}
