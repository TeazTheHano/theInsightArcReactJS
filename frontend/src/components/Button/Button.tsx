import React, { useMemo, useState, useCallback, useEffect } from 'react'
import buttonStyle from './Button.module.css'

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    styleMode?: 'Filled' | 'Outlined' | 'Text';
    variantMode?: 'Default' | 'Icon' | 'IconRatio1W' | 'IconRatio1H' | 'Extreme'; //IconRatio1 mean it 1:1 width and height
    colorMode?: 'Primary' | 'Secondary' | 'Tertiary';
    scale?: `0_75` | `1` | `1_5` | `2`;
    state?: 'default' | 'hover' | 'active' | 'pressed' | 'focus' | 'disabled';
    iconMain?: React.ReactNode;
    iconRight?: React.ReactNode;
    borderRadius?: 'none' | 'default' | 'rounded' | number;
}

export const ButtonDefault: React.FC<ButtonProps> = ({
    onClick,
    children,
    className = '',
    style = {},
    disabled = false,
    colorMode = 'Primary',
    type = 'button',
    variantMode = 'Default',
    styleMode = 'Filled',
    scale = '1',
    state = 'default',
    iconMain,
    iconRight,
    borderRadius = 'default'
}) => {
    // Internal state to manage button state
    const [internalState, setInternalState] = useState(state);

    // Đồng bộ hóa internalState với prop 'state'
    useEffect(() => {
        setInternalState(state);
    }, [state]); // Chạy lại khi prop 'state' thay đổi

    // Memoize the button class to avoid recomputation on every render
    const buttonClass = useMemo(() => {
        return [
            buttonStyle.layoutButtonWrapper,
            buttonStyle[`variantMode${variantMode}`],
            buttonStyle[`colorMode${colorMode}`],
            buttonStyle[`styleMode${styleMode}`],
            buttonStyle[`${internalState}`],
            buttonStyle[`scaleFactor${scale}`],
            typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            `typography-system-medium`,
            className
        ].join(' ').trim();
    }, [styleMode, variantMode, colorMode, internalState, scale, borderRadius, className]);

    // handle click event
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || internalState === 'disabled') {
            event.preventDefault();
            return;
        }
        // Toggle pressed state on click
        setInternalState(prevState => (prevState === 'pressed' ? 'default' : 'pressed'));
        if (onClick) {
            onClick();
        }
    }, [disabled, internalState, onClick]);

    // handle mouse down event to set active state
    const handleMouseDown = useCallback(() => {
        if (!disabled && internalState !== 'disabled' && internalState !== 'active') {
            setInternalState('active');
        }
    }, [disabled, internalState]);

    // handle mouse up event to revert active state
    const handleMouseUp = useCallback(() => {
        if (!disabled && internalState === 'active') {
            setInternalState('default');
        }
    }, [disabled, internalState]);

    // handle mouse enter event to set hover state
    const handleMouseEnter = useCallback(() => {
        if (!disabled && internalState !== 'disabled' && internalState !== 'hover') {
            setInternalState('hover');
        }
    }, [disabled, internalState]);

    // handle mouse leave event to revert hover state
    const handleMouseLeave = useCallback(() => {
        if (!disabled && internalState === 'hover') {
            setInternalState('default');
        }
    }, [disabled, internalState]);

    return (
        <button
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={buttonClass}
            disabled={disabled || internalState === 'disabled'}
            type={type}
            style={{
                borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : undefined,
                ...style,
            }}
        >
            <div className={[buttonStyle.stateLayer, buttonStyle[`colorMode${colorMode}`], internalState === 'disabled' ? buttonStyle.disabled : ''].join(' ')}></div>
            {iconMain && <span className={[`iconMain`, buttonStyle.layoutIcon].join(' ')}>{iconMain}</span>}
            <span className={buttonStyle.layoutLabel}>{children}</span>
            {/* <p style={{
                fontFamily: 'var(--Headline-Family, Epilogue)',
                fontSize: 'calc(var(--Headline-Font-Size, 20px) * var(--scale-factor, 1))',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'calc(var(--Headline-Line-height, 24px) * var(--scale-factor, 1))',
                letterSpacing: 'calc(var(--Headline-Letter-spacing, 0px) * var(--scale-factor, 1))',
            }}>Teeeey</p> */}
            {iconRight && <span className={buttonStyle.layoutIcon}>{iconRight}</span>}
        </button >
    );
}
