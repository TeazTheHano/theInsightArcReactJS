import ButtonDefault from '../Button/Button'
import { useTheme, type Theme } from '../../hooks/useTheme'
import { TextBodySmall, TextHeadlineLarge, TextHeadlineSmall } from '../TextBox/textBox'
import { DivFlexColumn } from '../LayoutDiv/LayoutDiv'
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'
import SegmentedButton from '../Button/SegmentedButton'
import Divider from '../Divider/Divider'

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
                padding: 'var(--Spacing-Spaceing-M, 24px) var(--Spacing-Spaceing-M, 24px) var(--Spacing-Spaceing-XL, 48px) var(--Spacing-Spaceing-M, 24px)',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 'var(--Spacing-Spaceing-M, 24px)',
                alignSelf: 'stretch',
            }}>
            <DivFlexColumn
                style={{ gap: 'var(--Spacing-Spaceing-XXS, 8px)', }}
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

            <Divider />
            <TextHeadlineSmall children='Theme' />

            <SegmentedButton
                dataList={[
                    { label: 'English', value: 'en' },
                    { label: 'Tiếng Việt', value: 'vi' },
                ]}
                onChange={(value: string) => {
                    changeLanguage(value)
                }}
                preSelected={i18n.language}
                iconOnSelected='check'
            />

            <SegmentedButton
                dataList={[
                    { label: 'Light', value: 'light' },
                    { label: 'Dark', value: 'dark' },
                    { label: 'Light Medium Contrast', value: 'light-medium-contrast' },
                    { label: 'Light High Contrast', value: 'light-high-contrast' },
                    { label: 'System', value: 'system' }
                ]}
                onChange={(value: string) => {
                    setTheme(value as Theme)
                }}
                preSelected={theme}
                styleMode='Outlined'
            />

        </footer >
    )
}
