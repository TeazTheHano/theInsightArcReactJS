import React, { useMemo, useCallback } from 'react'
import chipStyle from './Chip.module.css'
import { IconGen } from '../../assets/icon/OtherIcon';
import { TextBodyMedium } from '../TextBox/textBox';

/**
 * Props for the Button component.
 */
interface ChipProps {
    /**
     * Click handler function.
     */
    onClick?: () => void;
    /**
     * Content to display inside the button (usually text).
     */
    children?: React.ReactNode;
    /**
     * Accessibility label for the button.
     */
    label: string;
    /**
     * Additional CSS class names.
     */
    className?: string;
    /**
     * Inline styles for the button.
     */
    style?: React.CSSProperties;
    /**
     * Whether the button is disabled.
     */
    disabled?: boolean;
    /**
     * Whether to show the title on hover.
     */
    showTitleWhileHover?: boolean;
    toggle?: boolean;
    isSelected?: boolean;

    isShowBadgeOnSelect?: boolean;
    /**
     * Styling mode: 'Filled', 'FillFixed', 'Outlined', 'Text', or 'Elevated'.
     */
    styleMode?: 'Filled' | 'FillFixed' | 'Outlined' | 'Text' | 'Elevated';

    /**
     * Color mode: 'Primary', 'Secondary', 'Tertiary', or 'Default'.
     */
    colorMode?: 'Primary' | 'Secondary' | 'Tertiary' | 'Default';
    /**
     * Main icon: string (icon name) or ReactNode.
     */
    iconMain?: React.ReactNode | string;
    /**
     * Right icon: string (icon name) or ReactNode.
     */
    iconRight?: React.ReactNode | string;
    /**
     * Border radius: 'none', 'default', 'rounded', or a number in pixels.
     */
    borderRadius?: 'none' | 'default' | 'rounded' | number;
}

/**
 * A customizable button component with various styling modes, icons, and interaction handlers.
 * Supports Material Design-inspired themes and scales.
 */
const Chip: React.FC<ChipProps> = ({
    onClick,
    children,
    label,
    className = '',
    style = {},
    disabled = false,
    colorMode = 'Primary',
    styleMode = 'Filled',
    iconMain,
    iconRight,
    borderRadius = 'rounded',
    showTitleWhileHover = false,
    toggle = false,
    isSelected = false,
    isShowBadgeOnSelect = false,
}) => {

    const [selectedState, setSelectedState] = React.useState(isSelected)

    // Memoize the button class to avoid recomputation on every render
    const buttonClass = useMemo(() => {
        return [
            chipStyle.layoutButtonWrapper,
            typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            `typography-system-medium`,
            disabled ? chipStyle.disabled : '',
            `colorMode${colorMode}`,
            `styleMode${styleMode}`,
            selectedState ? chipStyle.selected : '',
            className
        ].filter(Boolean).join(' ').trim()
    }, [styleMode, colorMode, borderRadius, className, disabled, selectedState]);

    const handleClick = useCallback(() => {
        onClick && onClick()
        if (toggle) setSelectedState(prev => !prev)
    }, [onClick, toggle])

    return (
        <button
            aria-label={label}
            onClick={handleClick}
            className={buttonClass}
            disabled={disabled}
            style={{
                borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : undefined,
                ...style,
            }}
            title={showTitleWhileHover && typeof children == 'string' ? children : undefined}
        >
            <div className={[
                chipStyle.stateLayer,
                chipStyle[`colorMode${colorMode}`],
                typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            ].join(' ')}></div>

            {selectedState && isShowBadgeOnSelect ?
                <div className={chipStyle.badge} />
                : null
            }

            {iconMain && typeof iconMain === 'string' ? <IconGen className={[`iconMain`, chipStyle.layoutIcon].join(' ')} svgName={iconMain} /> : <span className={[`iconMain`, chipStyle.layoutIcon].join(' ')}>{iconMain}</span>}
            {children && typeof children === 'string' ? <TextBodyMedium children={children} color='currentColor' className={chipStyle.layoutLabel} /> : children}
            {iconRight && typeof iconRight === 'string' ? <IconGen className={chipStyle.layoutIcon} svgName={iconRight} /> : <span className={chipStyle.layoutIcon}>{iconRight}</span>}
        </button >
    );
};

export default React.memo(Chip);
