import { Link, useLocation } from 'react-router-dom'
import { DivFlexColumn, DivFlexRow, DivFlexRowSpaceBetweenCenter } from '../LayoutDiv/LayoutDiv'
import { TextTitleSmall } from '../TextBox/textBox'
import TheInsightArcLogo from '../../assets/icon/Logo'
import Divider from '../Divider/Divider'
import React, { useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './NavigationUnit.module.css'
import ButtonDefault from '../Button/Button'
import TextField from '../TextInput/TextField'

const navItemsData = [
    { href: '/landingpage', key: 'about-us', supText: '01' },
    { href: '/inspiration', key: 'inspiration', supText: '02' },
    { href: '/blog', key: 'blog-page', supText: '03' },
    { href: '/game', key: 'game-page', supText: '04' },
];

const NavigationUnit: React.FC = () => {

    const [t] = useTranslation('common');

    const location = useLocation();

    const [logoSubButtonIcon, setLogoSubButtonIcon] = useState('dehaze');

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavItemClick = useCallback(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            setLogoSubButtonIcon('dehaze');
        }
    }, [isMenuOpen]);

    const navItems = useMemo(() => navItemsData.map(({ href, key, supText }, index) => (
        <Link key={index} to={href}
            aria-label={t(key)}
            className={[styles.navMenuItem, location.pathname.startsWith(href) ? styles.active : null].join(' ')}
            onClick={handleNavItemClick}
        >
            <p className={styles.navMenuItemText}>
                {t(key)}
                {supText && <sup><b className={styles.navMenuItemTextSup}>{supText}</b></sup>}
            </p>
        </Link>
    )), [location.pathname, handleNavItemClick, t]);

    return (
        <>
            <nav className={styles.nav}>
                {/* LOGO row */}
                <DivFlexRowSpaceBetweenCenter className={styles.navLogoContainer}>
                    {/* Logo icon */}
                    <Link to="/" aria-label='Logo'>
                        <DivFlexRow
                            id='NavLogo'
                            className={styles.navLogo}
                        >
                            <TheInsightArcLogo fillColor='var(--Schemes-On-Surface)' />
                        </DivFlexRow>
                    </Link>

                    {/* Logo sub button */}
                    <DivFlexRow>
                        {/* SLOT FOR SEARCH */}
                        <ButtonDefault
                            label='search'
                            // TODO: update with text
                            variantMode='Icon'
                            styleMode='Text'
                            leadingIcon='search'
                            colorMode='Default'
                        />
                        {/* Hamburger menu */}
                        <ButtonDefault
                            label={t('nav-menu')}
                            onClick={() => {
                                const newState = !isMenuOpen;
                                setIsMenuOpen(newState);
                                setLogoSubButtonIcon(newState ? 'cancel_filled' : 'dehaze');
                            }}
                            styleMode='Text'
                            variantMode='Icon'
                            leadingIcon={logoSubButtonIcon}
                            className={styles.hideMd}
                        />
                    </DivFlexRow>


                </DivFlexRowSpaceBetweenCenter >
                <Divider />

                {/* Nav Menu */}
                <DivFlexColumn
                    id='NavMenuContainer'
                    className={[
                        styles.navMenuContainer, isMenuOpen ? '' : styles.hideSm,
                    ].join(' ')}>
                    {navItems}
                </DivFlexColumn>

                {/* Other in nav */}
                <Divider className={styles.hideMdSm} />
                <DivFlexColumn
                    className={[styles.navMenuContainer, styles.hideMdSm].join(' ')}
                    style={{
                        flex: 1,
                        color: 'var(--Schemes-On-Surface-Variant)'
                    }}>
                    {/* SLOT FOR SEARCH BAR */}
                    <TextField
                        leadingIcon='search'
                        placeholder={t("search")}
                        widthMode='fill'
                        onChange={() => { }}
                        compactMode
                    />
                    {/* SLOT FOR TABLE OF CONTENT */}
                </DivFlexColumn>

                {/* Nav bottom */}
                <Divider className={styles.hideMdSm} />
                <DivFlexColumn
                    className={[styles.navMenuContainer, styles.hideMdSm].join(' ')}>
                    <Link to="/test" aria-label={t('test-site')} className={styles.navMenuItem}>
                        <TextTitleSmall className={styles.navMenuItemText} color='var(--Schemes-On-Surface-Variant)' children={t('test-site')} />
                    </Link>
                    <Link to="/contact" aria-label={t('contact-page')} className={styles.navMenuItem}>
                        <TextTitleSmall className={styles.navMenuItemText} color='var(--Schemes-On-Surface-Variant)' children={t('contact-page')} />
                    </Link>
                </DivFlexColumn>
            </nav >
            <Divider direction='vertical' className={styles.hideMdSm} />
        </>
    )
}

export default React.memo(NavigationUnit)