import { Link } from 'react-router-dom'
import { DivFlexColumn, DivFlexRow, DivFlexRowSpaceBetweenCenter } from '../LayoutDiv/LayoutDiv'
import { TextTitleSmall } from '../TextBox/textBox'
import TheInsightArcLogo from '../../assets/icon/Logo'
import Divider from '../Divider/Divider'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './NavigationUnit.module.css'
import { ButtonDefault } from '../Button/Button'

export default function NavigationUnit() {

    const navRef = useRef<HTMLDivElement>(null);
    const [logoWidth, setLogoWidth] = useState(0);
    const [logoHeight, setLogoHeight] = useState(0);

    const [t] = useTranslation('common');

    const calculateLogoContentSize = useCallback(() => {
        let widthValue = document.getElementById('NavMenu')?.offsetWidth || 0
        setLogoWidth(widthValue)

        let heightValue = (document.querySelector('nav [class*="navLogoContainer"] > div') as HTMLElement)?.offsetHeight || 0
        setLogoHeight(heightValue)
    }, []);

    useEffect(() => {
        let observer: ResizeObserver | null = null;
        if (navRef.current) {
            observer = new ResizeObserver((entries) => {
                // Only recalculate if navRef.current size changes
                if (entries.length > 0 && entries[0].target === navRef.current) {
                    calculateLogoContentSize();
                }
            });
            observer.observe(navRef.current);

            // Initial calculation on mount
            calculateLogoContentSize();
        }

        // Cleanup function for ResizeObserver
        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [navRef, calculateLogoContentSize]);

    // const [isNavVisible, setIsNavVisible] = useState(true);
    // const lastScrollY = useRef(0);

    // const handleScroll = useCallback(() => {
    //     const currentScrollY = window.scrollY;

    //     // Luôn hiển thị nav khi ở đầu trang
    //     if (currentScrollY <= 20) {
    //         setIsNavVisible(true);
    //     }
    //     // Ẩn nav khi cuộn xuống
    //     else if (currentScrollY > lastScrollY.current) {
    //         setIsNavVisible(false);
    //     }
    //     // Hiện nav khi cuộn lên
    //     else if (currentScrollY < lastScrollY.current) {
    //         setIsNavVisible(true);
    //     }

    //     // Cập nhật vị trí cuộn cuối cùng
    //     lastScrollY.current = currentScrollY;
    // }, []);

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [handleScroll]);

    const navItemsData = [
        { key: 'nav-item-1', supText: null },
        { key: 'nav-item-2', supText: '01' },
        { key: 'nav-item-3', supText: '02' },
        { key: 'nav-item-4', supText: '03' },
        { key: 'nav-item-5', supText: '04' },
    ];

    const navItems = navItemsData.map(({ key, supText }, index) => (
        <Link key={index} to="/" className={styles.linkObject}>
            <TextTitleSmall className={styles.linkText}>
                {t(key)}
                {supText && <sup><b className={styles.linkTextSmall}>{supText}</b></sup>}
            </TextTitleSmall>
        </Link>
    ));

    const [logoSubButtonIcon, setLogoSubButtonIcon] = useState('dehaze');

    return (
        <nav className={styles.nav}>

            <DivFlexRowSpaceBetweenCenter className={styles.navLogoContainer}>
                {/* Logo icon */}
                <Link to="/">
                    <DivFlexRow
                        id='NavLogo'
                        className={styles.navLogo}
                        style={{
                            width: logoWidth,
                            height: logoHeight || 'auto',
                        }}>
                        <TheInsightArcLogo fillColor='var(--Schemes-On-Surface)' />
                    </DivFlexRow>
                </Link>

                {/* Logo sub button */}
                <DivFlexRow>
                    <Link to="/" className={styles.linkObject}>
                        <DivFlexRow style={{
                            padding: 'var(--Padding-and-Margin-PM-m1, 12px) var(--Padding-and-Margin-PM-0, 24px)',
                            alignItems: 'center',
                        }}>
                            <TextTitleSmall className={styles.linkText} color='var(--Schemes-On-Surface-Variant)' children={t('nav-item-6')} />
                        </DivFlexRow>
                    </Link>
                    <ButtonDefault
                        onClick={() => {
                            document.getElementsByClassName(styles.navMenu)[0].classList.toggle(styles.hideSm)
                            setLogoSubButtonIcon(logoSubButtonIcon === 'dehaze' ? 'cancel_filled' : 'dehaze')
                        }}
                        styleMode='Text'
                        iconMain={logoSubButtonIcon}
                    />
                </DivFlexRow>


            </DivFlexRowSpaceBetweenCenter >
            <Divider />

            {/* Nav Menu */}
            <DivFlexColumn
                id='NavMenu'
                ref={navRef}
                className={[
                    styles.navMenu, styles.hideSm,
                    // !isNavVisible ? styles.navHidden : ""
                ].join(' ')}>
                {navItems}
            </DivFlexColumn>

            {/* Other in nav */}
            <Divider className={styles.hideMdSm} />
            <DivFlexColumn
                className={[styles.navMenu, styles.hideMdSm].join(' ')}
                style={{ flex: 1 }}>
                <Link to="/" className={styles.linkObject}>
                    <TextTitleSmall className={styles.linkText} color='var(--Schemes-On-Surface-Variant)' children={t('nav-item-6')} />
                </Link>
            </DivFlexColumn>

            {/* Nav bottom */}
            <Divider className={styles.hideMdSm} />
            <DivFlexColumn
                className={[styles.navMenu, styles.hideMdSm].join(' ')}>
                <Link to="/test" className={styles.linkObject}>
                    <TextTitleSmall className={styles.linkText} color='var(--Schemes-On-Surface-Variant)' children={t('nav-item-7')} />
                </Link>
            </DivFlexColumn>
        </nav >
    )
}
