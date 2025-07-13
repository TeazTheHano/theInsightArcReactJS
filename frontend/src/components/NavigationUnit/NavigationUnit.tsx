import { Link } from 'react-router-dom'
import { DivFlexColumn } from '../LayoutDiv/LayoutDiv'
import { TextTitleSmall } from '../TextBox/textBox'
import TheInsightArcLogo from '../../assets/icon/Logo'
import Divider from '../Divider/Divider'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function NavigationUnit(layoutProps: React.CSSProperties) {

    const navRef = useRef<HTMLDivElement>(null);
    const [logoWidth, setLogoWidth] = useState(0);

    const [t] = useTranslation('common');

    useEffect(() => {
        console.log('run nav cal');

        const calculateLogoContentWidth = () => {

            let value = document.getElementById('NavMenu')?.offsetWidth || 0
            setLogoWidth(value)
        }

        let observer: ResizeObserver | null = null;
        if (navRef.current) {
            observer = new ResizeObserver((entries) => {
                // Chỉ tính toán lại nếu kích thước của navRef.current thay đổi
                if (entries.length > 0 && entries[0].target === navRef.current) {
                    calculateLogoContentWidth();
                }
            });
            observer.observe(navRef.current);

            // Thực hiện tính toán ban đầu khi component mount
            calculateLogoContentWidth();
        }

        // Cleanup function cho ResizeObserver
        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [navRef.current])

    const styles: { [key: string]: React.CSSProperties } = {
        navMenu: {
            gap: 'var(--Gap-Gap-m2, 8px)',
            padding: 'var(--PAGE-Prop-Body-margin, 24px) var(--Padding-and-Margin-PM-2, 48px) var(--PAGE-Prop-Body-margin, 24px) var(--PAGE-Prop-Body-margin, 24px)'
        },
        linkObject: { textDecoration: 'none' },
        linkText: { flex: 1, whiteSpace: 'nowrap' },
        linkTextSmall: { color: 'var(--Schemes-Primary)', letterSpacing: 4 }
    }

    return (
        <nav style={layoutProps}>
            <Link to="/" style={{ display: 'block' }}> {/* Đảm bảo Link là block element để chiếm toàn bộ chiều rộng */}
                <div
                    id='navLogo'
                    style={{
                        width: logoWidth,
                        padding: 'var(--Padding-and-Margin-PM-0, 24px)'
                    }}>
                    <TheInsightArcLogo
                        fillColor='var(--Schemes-On-Surface)'
                    />
                </div>
            </Link>
            <Divider />
            <DivFlexColumn
                id='NavMenu'
                ref={navRef}
                style={styles.navMenu}>
                <Link to="/" style={styles.linkObject}>
                    <TextTitleSmall style={styles.linkText} children={t('nav-item-1')} />
                </Link>
                <Link to="/" style={styles.linkObject}>
                    <TextTitleSmall style={styles.linkText}>{t('nav-item-2')}<sup><b style={styles.linkTextSmall}>01</b></sup></TextTitleSmall>
                </Link>
                <Link to="/" style={styles.linkObject}>
                    <TextTitleSmall style={styles.linkText}>{t('nav-item-3')}<sup><b style={styles.linkTextSmall}>02</b></sup></TextTitleSmall>
                </Link>
                <Link to="/" style={styles.linkObject}>
                    <TextTitleSmall style={styles.linkText}>{t('nav-item-4')}<sup><b style={styles.linkTextSmall}>03</b></sup></TextTitleSmall>
                </Link>
                <Link to="/" style={styles.linkObject}>
                    <TextTitleSmall style={styles.linkText}>{t('nav-item-5')}<sup><b style={styles.linkTextSmall}>04</b></sup></TextTitleSmall>
                </Link>
            </DivFlexColumn>
            <Divider />
            <DivFlexColumn
                style={{
                    flex: 1,
                    ...styles.navMenu,
                }}>
                <Link to="/" style={styles.linkObject}>
                    <TextTitleSmall style={styles.linkText} color='var(--Schemes-On-Surface-Variant)' children={t('nav-item-6')} />
                </Link>
            </DivFlexColumn>
            <Divider />
            <DivFlexColumn
                style={styles.navMenu}>
                <Link to="/test" style={styles.linkObject}>
                    <TextTitleSmall style={styles.linkText} color='var(--Schemes-On-Surface-Variant)' children={t('nav-item-7')} />
                </Link>
            </DivFlexColumn>
        </nav>
    )
}
