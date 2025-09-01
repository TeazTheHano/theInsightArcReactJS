import React, { useMemo, forwardRef } from 'react'
import buttonStyle from './Button.module.css'
import { IconGen } from '../../assets/icon/OtherIcon';

interface ButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    label: string;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    autoFocus?: boolean;
    type?: 'button' | 'submit' | 'reset';
    styleMode?: 'Filled' | 'FillFixed' | 'Outlined' | 'Text' | 'Elevated';
    variantMode?: 'Default' | 'Icon' | 'IconRatio1W' | 'IconRatio1H' | 'Extreme'; //IconRatio1 mean it 1:1 width and height
    colorMode?: 'Primary' | 'Secondary' | 'Tertiary' | 'Default';
    scale?: `0_75` | `1` | `1_5` | `2`;
    iconMain?: React.ReactNode | string;
    iconRight?: React.ReactNode | string;
    borderRadius?: 'none' | 'default' | 'rounded' | number;
    mouseDownFnc?: () => void;
    mouseUpFnc?: () => void;
    mouseEnterFnc?: () => void;
    mouseLeaveFnc?: () => void;
}

const ButtonDefault = forwardRef<HTMLButtonElement, ButtonProps>(({
    onClick,
    children,
    label,
    className = '',
    style = {},
    disabled = false,
    colorMode = 'Primary',
    type = 'button',
    variantMode = 'Default',
    styleMode = 'Filled',
    scale = '1',
    iconMain,
    iconRight,
    borderRadius = 'rounded',
    autoFocus = false,
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
        >
            <div className={[
                buttonStyle.stateLayer,
                buttonStyle[`colorMode${colorMode}`],
                typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            ].join(' ')}></div>
            {iconMain && (
                typeof iconMain === 'string' ? (
                    <IconGen className={[`iconMain`, buttonStyle.layoutIcon].join(' ')} svgName={iconMain} />
                ) : (
                    <span className={[`iconMain`, buttonStyle.layoutIcon].join(' ')}>{iconMain}</span>
                )
            )}
            {children && (
                <span className={[buttonStyle.layoutLabel, `typography-system-medium`].join(' ')}>
                    {children}
                </span>
            )}
            {iconRight && (
                typeof iconRight === 'string' ? (
                    <IconGen className={buttonStyle.layoutIcon} svgName={iconRight} />
                ) : (
                    <span className={buttonStyle.layoutIcon}>{iconRight}</span>
                )
            )}
        </button >
    );
})

export default React.memo(ButtonDefault);
