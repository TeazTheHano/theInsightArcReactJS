import { Link } from 'react-router-dom'
import { DivFlexColumn } from '../LayoutDiv/LayoutDiv'
import { TextTitleSmall } from '../TextBox/textBox'
import TheInsightArcLogo from '../../assets/icon/Logo'
import Divider from '../Divider/Divider'
import { useEffect, useRef, useState } from 'react'

export default function NavigationUnit(layoutProps: React.CSSProperties) {

    const navRef = useRef<HTMLDivElement>(null);
    const [logoWidth, setLogoWidth] = useState(0);

    useEffect(() => {
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

    return (
        <nav
            style={layoutProps}
        >
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
                style={{

                    gap: 'var(--Gap-Gap-m2, 8px)',
                    padding: 'var(--PAGE-Prop-Body-margin, 24px) var(--Padding-and-Margin-PM-2, 48px) var(--PAGE-Prop-Body-margin, 24px) var(--PAGE-Prop-Body-margin, 24px)'
                }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <TextTitleSmall style={{ flex: 1, whiteSpace: 'nowrap' }} children='Định hướng' />
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <TextTitleSmall style={{ flex: 1, whiteSpace: 'nowrap' }} >Về The insightArc<sup><b style={{ color: 'var(--Schemes-Primary)', letterSpacing: 4 }}>01</b></sup></TextTitleSmall>
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <TextTitleSmall style={{ flex: 1, whiteSpace: 'nowrap' }} >Nguồn cảm hứng<sup><b style={{ color: 'var(--Schemes-Primary)', letterSpacing: 4 }}>02</b></sup></TextTitleSmall>
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <TextTitleSmall style={{ flex: 1, whiteSpace: 'nowrap' }} >Viết và Bàn luận<sup><b style={{ color: 'var(--Schemes-Primary)', letterSpacing: 4 }}>03</b></sup></TextTitleSmall>
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <TextTitleSmall style={{ flex: 1, whiteSpace: 'nowrap' }} >Vui cùng Đất Nước<sup><b style={{ color: 'var(--Schemes-Primary)', letterSpacing: 4 }}>04</b></sup></TextTitleSmall>
                </Link>
            </DivFlexColumn>
            <Divider />
            <DivFlexColumn
                style={{
                    gap: 'var(--Gap-Gap-m2, 8px)',
                    padding: 'var(--PAGE-Prop-Body-margin, 24px) var(--Padding-and-Margin-PM-2, 48px) var(--PAGE-Prop-Body-margin, 24px) var(--PAGE-Prop-Body-margin, 24px)'
                }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <TextTitleSmall style={{ flex: 1, whiteSpace: 'nowrap' }} color='var(--Schemes-On-Surface-Variant)' children='Liên hệ' />
                </Link>
            </DivFlexColumn>
        </nav >
    )
}
