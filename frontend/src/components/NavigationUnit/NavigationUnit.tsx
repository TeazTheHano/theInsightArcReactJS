import { Link, useLocation } from 'react-router-dom'
import { DivFlexColumn, DivFlexRow, DivFlexRowSpaceBetweenCenter } from '../LayoutDiv/LayoutDiv'
import { TextTitleSmall } from '../TextBox/textBox'
import TheInsightArcLogo from '../../assets/icon/Logo'
import Divider from '../Divider/Divider'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './NavigationUnit.module.css'
import ButtonDefault from '../Button/Button'

const NavigationUnit: React.FC = () => {

    const [t] = useTranslation('common');

    const location = useLocation();

    const navRef = useRef<HTMLDivElement>(null);

    const navItemsData = [
        { href: '/landingpage', key: 'nav-item-2', supText: '01' },
        { href: '/inspiration', key: 'nav-item-3', supText: '02' },
        { href: '/blog', key: 'nav-item-4', supText: '03' },
        { href: '/game', key: 'nav-item-5', supText: '04' },
    ];

    const navItems = navItemsData.map(({ href, key, supText }, index) => (
        <Link key={index} to={href} aria-label={t(key)} className={[styles.navMenuItem, location.pathname.startsWith(href) ? styles.active : null].join(' ')}>
            <p className={styles.navMenuItemText}>
                {t(key)}
                {supText && <sup><b className={styles.navMenuItemTextSup}>{supText}</b></sup>}
            </p>
        </Link>
    ));

    const [logoSubButtonIcon, setLogoSubButtonIcon] = useState('dehaze');

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
                            label={t('nav-item-8')}
                            onClick={() => {
                                document.getElementsByClassName(styles.navMenuContainer)[0].classList.toggle(styles.hideSm)
                                setLogoSubButtonIcon(logoSubButtonIcon === 'dehaze' ? 'cancel_filled' : 'dehaze')
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
                    ref={navRef}
                    className={[
                        styles.navMenuContainer, styles.hideSm,
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
                    {/* SLOT FOR TABLE OF CONTENT */}
                </DivFlexColumn>

                {/* Nav bottom */}
                <Divider className={styles.hideMdSm} />
                <DivFlexColumn
                    className={[styles.navMenuContainer, styles.hideMdSm].join(' ')}>
                    <Link to="/test" aria-label={t('nav-item-7')} className={styles.navMenuItem}>
                        <TextTitleSmall className={styles.navMenuItemText} color='var(--Schemes-On-Surface-Variant)' children={t('nav-item-7')} />
                    </Link>
                    <Link to="/" aria-label={t('nav-item-6')} className={styles.navMenuItem}>
                        <TextTitleSmall className={styles.navMenuItemText} color='var(--Schemes-On-Surface-Variant)' children={t('nav-item-6')} />
                    </Link>
                </DivFlexColumn>
            </nav >
            <Divider direction='vertical' className={styles.hideMdSm} />
        </>
    )
}

export default React.memo(NavigationUnit)