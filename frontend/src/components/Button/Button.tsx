import React, { useMemo, forwardRef } from 'react'
import buttonStyle from './Button.module.css'
import { IconGen } from '../../assets/icon/OtherIcon';

/**
 * Props for the Button component.
 */
interface ButtonProps {
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
     * Whether the button should autofocus on mount.
     */
    autoFocus?: boolean;
    /**
     * Whether to show the title on hover.
     */
    showTitleWhileHover?: boolean;
    /**
     * Button type: 'button', 'submit', or 'reset'.
     */
    type?: 'button' | 'submit' | 'reset';
    /**
     * Styling mode: 'Filled', 'FillFixed', 'Outlined', 'Text', or 'Elevated'.
     */
    styleMode?: 'Filled' | 'FillFixed' | 'Outlined' | 'Text' | 'Elevated';
    /**
     * Variant mode: 'Default', 'Icon', 'IconRatio1W', 'IconRatio1H', or 'Extreme'.
     * IconRatio1 means 1:1 width and height.
     */
    variantMode?: 'Default' | 'Icon' | 'IconRatio1W' | 'IconRatio1H' | 'Extreme';
    /**
     * Color mode: 'Primary', 'Secondary', 'Tertiary', or 'Default'.
     */
    colorMode?: 'Primary' | 'Secondary' | 'Tertiary' | 'Default' | 'Error' | 'Destructive';
    /**
     * Scale factor: '0_75', '1', '1_5', or '2'.
     */
    scale?: `0_75` | `1` | `1_5` | `2`;
    /**
     * Main icon: string (icon name) or ReactNode.
     */
    leadingIcon?: React.ReactNode | string;
    /**
     * Right icon: string (icon name) or ReactNode.
     */
    trailingIcon?: React.ReactNode | string;
    /**
     * Border radius: 'none', 'default', 'rounded', or a number in pixels.
     */
    borderRadius?: 'none' | 'default' | 'rounded' | number;
    /**
     * Mouse down event handler.
     */
    mouseDownFnc?: () => void;
    /**
     * Mouse up event handler.
     */
    mouseUpFnc?: () => void;
    /**
     * Mouse enter event handler.
     */
    mouseEnterFnc?: () => void;
    /**
     * Mouse leave event handler.
     */
    mouseLeaveFnc?: () => void;
    alternativeText?: string;
}

/**
 * A customizable button component with various styling modes, icons, and interaction handlers.
 * Supports Material Design-inspired themes and scales.
 */
const ButtonDefault = forwardRef<HTMLButtonElement, ButtonProps>(({
    onClick,
    children,
    label,
    className = '',
    style = {},
    disabled,
    colorMode = 'Primary',
    type = 'button',
    variantMode = 'Default',
    styleMode = 'Filled',
    scale = '1',
    leadingIcon,
    trailingIcon,
    borderRadius = 'rounded',
    autoFocus,
    showTitleWhileHover,
    mouseDownFnc,
    mouseUpFnc,
    mouseEnterFnc,
    mouseLeaveFnc,
}, ref) => {

    // Memoize the button class to avoid recomputation on every render
    const buttonClass = useMemo(() => {
        return [
            buttonStyle.layoutButtonWrapper,
            buttonStyle[`variantMode${variantMode}`],
            buttonStyle[`scaleFactor${scale}`],
            typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            `typography-system-medium`,
            disabled ? buttonStyle.disabled : '',
            `colorMode${colorMode}`,
            `styleMode${styleMode}`,
            className
        ].join(' ').trim();
    }, [styleMode, variantMode, colorMode, scale, borderRadius, className]);

    return (
        <button
            ref={ref}
            aria-label={label}
            onClick={onClick}
            onMouseDown={mouseDownFnc}
            onMouseUp={mouseUpFnc}
            onMouseEnter={mouseEnterFnc}
            onMouseLeave={mouseLeaveFnc}
            className={buttonClass}
            disabled={disabled}
            type={type}
            style={{
                borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : undefined,
                ...style,
            }}
            autoFocus={autoFocus}
            title={showTitleWhileHover && typeof children == 'string' ? children : undefined}
        >
            <div className={[
                buttonStyle.stateLayer,
                typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            ].join(' ')}></div>
            {leadingIcon ? typeof leadingIcon === 'string' ? <IconGen className={[`leadingIcon`, buttonStyle.layoutIcon].join(' ')} svgName={leadingIcon} /> : <span className={[`leadingIcon`, buttonStyle.layoutIcon].join(' ')}>{leadingIcon}</span> : null}
            {children ? (
                <span className={[buttonStyle.layoutLabel, `typography-system-medium`].join(' ')}>
                    {children}
                </span>
            ) : null}
            {trailingIcon ? typeof trailingIcon === 'string' ? <IconGen className={buttonStyle.layoutIcon} svgName={trailingIcon} /> : <span className={buttonStyle.layoutIcon}>{trailingIcon}</span> : null}
        </button >
    );
})

export default React.memo(ButtonDefault);
