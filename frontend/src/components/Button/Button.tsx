import React, { useMemo, useState, useCallback, useEffect, forwardRef, memo, useRef } from 'react'
import buttonStyle from './Button.module.css'
import { IconGen } from '../../assets/icon/OtherIcon';

interface ButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    styleMode?: 'Filled' | 'Outlined' | 'Text';
    variantMode?: 'Default' | 'Icon' | 'IconRatio1W' | 'IconRatio1H' | 'Extreme'; //IconRatio1 mean it 1:1 width and height
    colorMode?: 'Primary' | 'Secondary' | 'Tertiary';
    scale?: `0_75` | `1` | `1_5` | `2`;
    state?: 'default' | 'hover' | 'active' | 'pressed' | 'focus' | 'disabled';
    iconMain?: React.ReactNode | string;
    iconRight?: React.ReactNode | string;
    borderRadius?: 'none' | 'default' | 'rounded' | number;
    autoFocus?: boolean;
}

const ButtonWithRef = forwardRef<HTMLButtonElement, ButtonProps>(({
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
    borderRadius = 'rounded',
    autoFocus = false,
}, ref) => {
    // Internal state to manage button state
    const [internalState, setInternalState] = useState(state);

    // Sync internalState with 'state' prop
    useEffect(() => {
        setInternalState(state);
    }, [state]); // Reruns when 'state' prop changes

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

    // handle focus event
    const handleFocus = useCallback(() => {
        if (!disabled && internalState !== 'disabled' && internalState !== 'focus') {
            setInternalState('focus');
        }
    }, [disabled, internalState]);

    // handle blur event
    const handleBlur = useCallback(() => {
        if (!disabled && internalState === 'focus') {
            setInternalState('default');
        }
    }, [disabled, internalState]);

    return (
        <button
            ref={ref}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={buttonClass}
            disabled={disabled || internalState === 'disabled'}
            type={type}
            style={{
                borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : undefined,
                width: 'fit-content',
                ...style,
            }}
            autoFocus={autoFocus}
        >
            <div className={[
                buttonStyle.stateLayer,
                buttonStyle[`colorMode${colorMode}`],
                internalState === 'disabled' ? buttonStyle.disabled : '',
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

ButtonWithRef.displayName = 'ButtonDefault';

export const ButtonDefault = memo(ButtonWithRef);
