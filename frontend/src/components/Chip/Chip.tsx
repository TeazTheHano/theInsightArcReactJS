import React, { useMemo, useCallback } from 'react'
import chipStyle from './Chip.module.css'
import { IconGen } from '../../assets/icon/OtherIcon';
import { TextBodyMedium } from '../TextBox/textBox';

/**
 * Props for the Chip component.
 */
interface ChipProps {
    /**
     * Click handler function.
     */
    onClick?: () => void;
    /**
     * Content to display inside the chip (usually text).
     */
    children?: React.ReactNode;
    /**
     * Accessibility label for the chip.
     */
    label: string;
    /**
     * Additional CSS class names.
     */
    className?: string;
    /**
     * Inline styles for the chip.
     */
    style?: React.CSSProperties;
    /**
     * Whether the chip is disabled.
     */
    disabled?: boolean;
    /**
     * Whether to show the title on hover.
     */
    showTitleWhileHover?: boolean;
    /**
     * Whether the chip acts as a toggle.
     */
    toggle?: boolean;
    /**
     * Initial selected state.
     */
    isSelected?: boolean;
    /**
     * Whether to show a badge when selected.
     */
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
     * Leading icon: string (icon name) or ReactNode.
     */
    leadingIcon?: React.ReactNode | string;
    /**
     * Trailing icon: string (icon name) or ReactNode.
     */
    trailingIcon?: React.ReactNode | string;
    /**
     * Border radius: 'none', 'default', 'rounded', or a number in pixels.
     */
    borderRadius?: 'none' | 'default' | 'rounded' | number;
}

/**
 * A customizable chip component with various styling modes, icons, and interaction handlers.
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
    leadingIcon,
    trailingIcon,
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
                typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            ].join(' ')}></div>

            {selectedState && isShowBadgeOnSelect ?
                <div className={chipStyle.badge} />
                : null
            }

            {leadingIcon ? typeof leadingIcon === 'string' ? <IconGen className={[`leadingIcon`, chipStyle.layoutIcon].join(' ')} svgName={leadingIcon} /> : <span className={[`leadingIcon`, chipStyle.layoutIcon].join(' ')}>{leadingIcon}</span> : null}
            {children ? typeof children === 'string' ? <TextBodyMedium children={children} color='currentColor' className={chipStyle.layoutLabel} /> : children : null}
            {trailingIcon ? typeof trailingIcon === 'string' ? <IconGen className={chipStyle.layoutIcon} svgName={trailingIcon} /> : <span className={chipStyle.layoutIcon}>{trailingIcon}</span> : null}
        </button >
    );
};

/**
 * Chip component with memoization for performance.
 * Works like a button but includes toggle mode for selection.
 */
export default React.memo(Chip);
