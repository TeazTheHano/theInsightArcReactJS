import { ButtonDefault } from '../Button/Button'
import { useTheme } from '../../hooks/useTheme'
import { TextBodySmall, TextHeadlineLarge } from '../TextBox/textBox'
import { DivFlexColumn, DivFlexRow } from '../LayoutDiv/LayoutDiv'
import { InstagramIcon, MailIcon } from '../../assets/icon/OtherIcon'

export default function Footer() {

    const { setTheme } = useTheme()

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
                    Dự án The insightArc.<br />
                    Hà Nội, tháng 5, năm 2025
                </TextBodySmall>
            </DivFlexColumn>

            <div style={{ display: 'none' }}>
                <InstagramIcon />
                <MailIcon />
            </div>

            <DivFlexColumn>
                <ButtonDefault
                    children='@the_insightarc'
                    styleMode='Text'
                    colorMode='Primary'
                    iconMain={<InstagramIcon fillColor='var(--Schemes-Primary)' />}
                    onClick={() => {
                        window.open('https://www.instagram.com/the_insightarc/', '_blank')
                    }}
                />
                <ButtonDefault
                    children='contact@theinsightarc.id.vn'
                    styleMode='Text'
                    colorMode='Primary'
                    iconMain={<MailIcon fillColor='var(--Schemes-Primary)' />}
                    onClick={() => {
                        window.open('mailto:contact@theinsightarc.id.vn', '_blank')
                    }}
                />
            </DivFlexColumn>

            {/* change themes */}
            <DivFlexRow
                style={{ gap: 'var(--Gap-Gap-m2, 24px)', }}
            >
                <ButtonDefault autoFocus onClick={() => { setTheme('system') }}>
                    reset theme
                </ButtonDefault>
                <ButtonDefault autoFocus onClick={() => { setTheme('light') }}>
                    light theme
                </ButtonDefault>
            </DivFlexRow>
        </footer >
    )
}
