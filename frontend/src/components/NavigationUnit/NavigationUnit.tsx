import { Link, useLocation } from 'react-router-dom'
import { DivFlexColumn, DivFlexRow, DivFlexRowSpaceBetweenCenter } from '../LayoutDiv/LayoutDiv'
import { TextTitleLarge, TextTitleMedium, TextTitleSmall } from '../TextBox/textBox'
import TheInsightArcLogo from '../../assets/icon/Logo'
import Divider from '../Divider/Divider'
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './NavigationUnit.module.css'
import ButtonDefault from '../Button/Button'
import TextField from '../TextInput/TextField'
import { type searchEngineOutputProps } from '../../utils/searchEngine'
import { BlogItem2RowGen } from '../Blog/BlogListVariant'
import type { BlogItemProps } from '../../data/type'

const navItemsData = [
    { href: '/landingpage', key: 'about-us', supText: '01' },
    { href: '/inspiration', key: 'inspiration', supText: '02' },
    { href: '/blog', key: 'blog-page', supText: '03' },
    { href: '/game', key: 'game-page', supText: '04' },
];

const BasicSearchResult: React.FC<{
    data: { dataBaseName: string; result: searchEngineOutputProps }[] | undefined;
}> = ({ data }) => {
    if (!data || data.length === 0) {
        return null;
    }

    const { t } = useTranslation('common');

    const renderItemGroup = (items: BlogItemProps[], label: string) => {
        if (!items || items.length === 0) {
            return null;
        }
        return (
            <React.Fragment key={label}>
                <TextTitleMedium>{label}</TextTitleMedium>
                <BlogItem2RowGen
                    dataList={items}
                    thumbSize={100}
                    direction="row"
                    hideDescription
                    hideTag
                    smallTitle
                    openAsNewTab
                />
            </React.Fragment>
        );
    };

    return (
        <DivFlexColumn style={{
            overflowY: 'scroll',
            flex: 1,
            gap: 'var(--Spacing-Spaceing-XXS)',
            padding: 'var(--Spacing-Spaceing-XXS) 0',
            scrollbarWidth: 'none',
            height: 'inherit'
        }}>
            {
                data.map((item) => (
                    <React.Fragment key={item.dataBaseName}>
                        {
                            item.result.author.length
                                || item.result.category.length
                                || item.result.title.length
                                || item.result.tag.length ?
                                <TextTitleLarge>{item.dataBaseName}</TextTitleLarge>
                                : null

                        }
                        {renderItemGroup(item.result.title, t('title'))}
                        {renderItemGroup(item.result.category, t('category'))}
                        {renderItemGroup(item.result.tag, t('tag'))}
                        {renderItemGroup(item.result.author, t('author'))}
                    </React.Fragment>
                ))
            }
        </DivFlexColumn >
    );
};

const useSearch = () => {
    const [searchInput, setSearchInput] = useState<string>('')
    const [searchResult, setSearchResult] = useState<{ dataBaseName: string; result: searchEngineOutputProps }[] | undefined>()
    const [isSearchFocus, setSearchFocus] = useState<boolean>(false)
    const { t } = useTranslation('common')

    const performSearch = useCallback(async (input: string) => {
        const { searchEngine } = await import('../../utils/searchEngine')
        const { fetchInspirationList } = await import('../../utils/fetchContent')

        const trimmedInput = input.trim()
        if (!trimmedInput) {
            setSearchResult(undefined)
            setSearchFocus(false)
            return
        }

        const blogRes = await searchEngine(trimmedInput)
        const inspireRes = await searchEngine(trimmedInput, await fetchInspirationList())
        setSearchFocus(true)
        const res = [
            {
                dataBaseName: t('blog'),
                result: blogRes
            },
            {
                dataBaseName: t('inspiration'),
                result: inspireRes
            }
        ]

        setSearchInput(trimmedInput)
        setSearchResult(res)
    }, [])

    return {
        searchInput,
        searchResult,
        isSearchFocus,
        setSearchFocus,
        performSearch
    }
}

const NavigationUnit: React.FC = () => {

    const [t] = useTranslation('common');

    const location = useLocation();

    const [logoSubButtonIcon, setLogoSubButtonIcon] = useState('dehaze');

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { searchInput, searchResult, isSearchFocus, setSearchFocus, performSearch } = useSearch()
    const searchContainerRef = useRef<HTMLDivElement>(null)

    const handleNavItemClick = useCallback(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            setLogoSubButtonIcon('dehaze');
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setSearchFocus(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                            label={t('search')}
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
                    ref={searchContainerRef}
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
                        onChange={(e) => performSearch(e.target.value)}
                        compactMode
                    />
                    {
                        searchInput && isSearchFocus ?
                            <BasicSearchResult data={searchResult} />
                            : null
                    }


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