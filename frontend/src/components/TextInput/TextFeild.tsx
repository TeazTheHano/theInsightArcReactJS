import React, { useState, type ChangeEvent, forwardRef } from 'react'
import { DivFlexColumn, DivFlexRowCenter, DivFlexRowSpaceBetweenBaseline, DivFlexRowSpaceBetweenCenter } from '../LayoutDiv/LayoutDiv';

import TextFeildStyle from './TextFeild.module.css';
import { IconGen } from '../../assets/icon/OtherIcon';
import { TextBodyMedium, TextBodySmall } from '../TextBox/textBox';
import Divider from '../Divider/Divider';
import Button from '../Button/Button';

const Perfect_Typo_length_Sized_Paragraph_Min_4char = 'aaaa';
const Perfect_Typo_length_Sized_Paragraph_Short_20_char = 'aaaaaaaaaaaaaaaaaaaa';
const Perfect_Typo_length_Sized_Paragraph_Med_40_char = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const Perfect_Typo_length_Sized_Paragraph_Long_60_char = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

export interface TextFeildProps {
    label?: string,
    placeholder?: string,
    type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    disabled?: boolean,
    required?: boolean,
    style?: React.CSSProperties,
    className?: string,
    autoFocus?: boolean,
    maxLength?: number,
    minLength?: number,
    pattern?: string,
    readOnly?: boolean,
    title?: string,
    id?: string,
    name?: string,
    autoComplete?: string,
    spellCheck?: boolean,
    inputMode?: 'text' | 'tel' | 'email' | 'url' | 'numeric' | 'decimal' | 'search',
    list?: string,
    size?: number,
    step?: number,
    multiple?: boolean,
    form?: string,
    formAction?: string,
    formEncType?: string,
    formMethod?: string,
    formNoValidate?: boolean,
    formTarget?: string,
    widthMode?: 'fit' | 'fill' | 'none' | 'fix-perfect-length' | 'min-width-perfect-length' | 'max-width-perfect-length',
    perfectLengthSizedParagraph?: 'Short' | 'Med' | 'Long' | 'Min',
    variant?: 'Outlined' | 'Filled',
    compactMode?: boolean,
    colorMode?: 'Primary' | 'Secondary' | 'Tertiary' | 'Default';
    borderRadius?: 'none' | 'default' | 'rounded' | number;
    autoShowClearButton?: boolean,
    errorMessage?: string,
    supportText?: string,
    trailingSupportText?: string,
    trailingIcon?: React.ReactNode | string,
    trailingIconAction?: () => void,
    leadingIcon?: React.ReactNode | string,
}

const generateRandomId = () => `textField-${Math.random().toString(36).substr(2, 9)}`;

const TextFeild = forwardRef<HTMLDivElement, TextFeildProps>(({
    label,
    placeholder,
    type = 'text',
    onChange,
    value,
    disabled = false,
    required = false,
    style,
    className,
    autoFocus = false,
    maxLength,
    minLength,
    pattern,
    readOnly = false,
    title,
    id,
    name,
    autoComplete,
    spellCheck = false,
    inputMode,
    list,
    size,
    step,
    multiple = false,
    form,
    formAction,
    formEncType,
    formMethod,
    formNoValidate = false,
    formTarget,
    widthMode = 'none',
    perfectLengthSizedParagraph = 'Short',
    variant = 'Outlined',
    compactMode = false,
    colorMode = 'Default',
    borderRadius = 'default',
    autoShowClearButton = false,
    errorMessage,
    supportText,
    trailingSupportText,
    trailingIcon,
    trailingIconAction,
    leadingIcon,
}, ref) => {
    const isControlled = value !== undefined;
    const [currentValue, setCurrentValue] = useState<string>(value || '');
    const [focused, setFocused] = useState<boolean>(false);
    const effectiveValue = isControlled ? value : currentValue;
    const isError = !!errorMessage;
    const showClearButton = autoShowClearButton && (effectiveValue.length > 0 && focused) && !disabled && !readOnly;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setCurrentValue(e.target.value);
        }
        if (onChange) {
            onChange(e);
        }
    };

    const handleClear = () => {
        const emptyEvent = {
            target: {
                value: ''
            }
        } as ChangeEvent<HTMLInputElement>;
        if (!isControlled) {
            setCurrentValue('');
        }
        if (onChange) {
            onChange(emptyEvent);
        }
    };

    return (
        <DivFlexColumn
            ref={ref}
            className={[
                TextFeildStyle.component,
                TextFeildStyle[variant],
                TextFeildStyle[colorMode],
                disabled ? TextFeildStyle.disabled : '',
                isError ? TextFeildStyle.error : '',
                // TextFeildStyle.error,
                focused ? TextFeildStyle.focused : '',
                readOnly ? TextFeildStyle.readOnly : '',
                compactMode ? TextFeildStyle.compactMode : '',
                typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
                TextFeildStyle[`widthMode-${widthMode}`],
                className || ''].join(' ')}
            style={{
                ...style,
                ...(typeof borderRadius === 'number' ? { borderRadius: `${borderRadius}px` } : {})
            }}

        >
            {/* state layer */}
            <div className={[
                TextFeildStyle.stateLayer,
                typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            ].join(' ')}></div>
            {/* end of state layer */}

            {/* outlined label */}
            {variant === 'Outlined' && label && (
                <label
                    htmlFor={id}
                    className={TextFeildStyle.label}
                    style={{ paddingLeft: 'var(--Spacing-Spaceing-XS)' }}
                >
                    <TextBodyMedium children={`${label} ${required ? '*' : ''}`} color='currentColor' />
                </label>
            )}
            {/* end of outlined label */}

            {/* main */}
            <DivFlexRowCenter
                className={[
                    TextFeildStyle.main,
                    typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
                ].join(' ').trim()}
            >
                {/* leading icon */}
                {leadingIcon && typeof leadingIcon === 'string' ? <IconGen className={TextFeildStyle.leadingIcon} svgName={leadingIcon} /> : <span className={[`leadingIcon`, TextFeildStyle.icon].join(' ')}>{leadingIcon}</span>}
                {/* end of leading icon */}

                {/* Text */}



                <DivFlexRowSpaceBetweenCenter>
                    {/* input row */}
                    <DivFlexColumn className={TextFeildStyle.inputRow}>
                        {/* filled label */}
                        {variant === 'Filled'
                            && label
                            && (placeholder || currentValue)
                            && (
                                <label
                                    htmlFor={id}
                                    className={TextFeildStyle.label}
                                >
                                    <TextBodyMedium children={`${label} ${required ? '*' : ''}`} color='currentColor' />
                                </label>
                            )}
                        {/* end of filled label */}
                        <div>
                            {/* Perfect length */}
                            {widthMode === 'fix-perfect-length' || widthMode === 'min-width-perfect-length' || widthMode === 'max-width-perfect-length' && (
                                <div
                                    aria-hidden="true"
                                    className={TextFeildStyle.perfectLengthSizer}
                                >
                                    <span style={{ visibility: 'hidden', whiteSpace: 'pre' }}>
                                        {perfectLengthSizedParagraph === 'Short' ? Perfect_Typo_length_Sized_Paragraph_Short_20_char : perfectLengthSizedParagraph === 'Med' ? Perfect_Typo_length_Sized_Paragraph_Med_40_char : perfectLengthSizedParagraph === 'Long' ? Perfect_Typo_length_Sized_Paragraph_Long_60_char : Perfect_Typo_length_Sized_Paragraph_Min_4char}
                                    </span>
                                </div>
                            )}
                            {/* end of Perfect length */}
                            <DivFlexRowSpaceBetweenBaseline >

                                {/* compact mode label */}
                                {label
                                    && (compactMode || variant == 'Filled')
                                    && !(placeholder || currentValue)
                                    && (
                                        <label
                                            htmlFor={id}
                                            className={[TextFeildStyle.label, TextFeildStyle.labelCompactMode].join(' ')}
                                        >
                                            <TextBodyMedium children={`${label} ${required ? '*' : ''}`} color='currentColor' />
                                        </label>
                                    )}
                                {/* end of compact mode label */}

                                <input
                                    id={id || generateRandomId()}
                                    name={name}
                                    type={type}
                                    value={effectiveValue}
                                    onChange={handleChange}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setTimeout(() => { setFocused(false) }, 200)}
                                    disabled={disabled}
                                    required={required}
                                    autoFocus={autoFocus}
                                    maxLength={maxLength}
                                    minLength={minLength}
                                    pattern={pattern}
                                    placeholder={placeholder}
                                    readOnly={readOnly}
                                    title={title}
                                    autoComplete={autoComplete}
                                    spellCheck={spellCheck}
                                    inputMode={inputMode}
                                    list={list}
                                    size={size}
                                    step={step}
                                    multiple={multiple}
                                    form={form}
                                    formAction={formAction}
                                    formEncType={formEncType}
                                    formMethod={formMethod}
                                    formNoValidate={formNoValidate}
                                    formTarget={formTarget}
                                    className={[TextFeildStyle.inputFeild, TextFeildStyle.filledInput, isError ? TextFeildStyle.error : ''].join(' ').trim()}
                                />

                                {trailingSupportText && <TextBodySmall children={trailingSupportText} />}
                            </DivFlexRowSpaceBetweenBaseline>
                            {/* end of input row */}
                        </div>
                    </DivFlexColumn>

                    {/* trailing items */}
                    <DivFlexRowCenter>
                        {showClearButton && (
                            <Button
                                label='clear'
                                // TODO: language
                                variantMode='Icon'
                                leadingIcon='cancel'
                                styleMode='Text'
                                colorMode='Default'
                                onClick={handleClear}
                            />
                        )}
                        {trailingIcon && trailingIconAction && (
                            <Button
                                label='action'
                                variantMode='Icon'
                                styleMode='Text'
                                colorMode='Primary'
                                leadingIcon={trailingIcon}
                                onClick={trailingIconAction}
                            />
                        )}
                        {/* {isError && <IconGen className={[`errorIcon`, TextFeildStyle.icon].join(' ')} fillMode styles={{ color: 'var(--Schemes-Error)' }} svgName='error' title={errorMessage} />} */}
                        {isError &&
                            <Button
                                label={errorMessage || 'error'}
                                variantMode='Icon'
                                styleMode='Text'
                                colorMode='Error'
                                leadingIcon='error_filled'
                                onClick={() => {
                                    // TODO: show error message dialog
                                }}
                            />
                        }

                        <div className={TextFeildStyle.iconHeightKeeper} />
                    </DivFlexRowCenter>
                    {/* end of trailing items */}
                </DivFlexRowSpaceBetweenCenter>


            </DivFlexRowCenter>
            {/* end of main */}

            {/* filled support text */}
            {
                supportText
                && variant == 'Filled'
                && !compactMode
                && (
                    <>
                        <div style={{ position: 'relative', }}>
                            <Divider
                                thickness={focused ? 4 : 1}
                                borderRadius={'rounded'}
                                className={TextFeildStyle.divider}
                            />
                        </div>
                        <div style={{ padding: 'var(--Spacing-Spaceing-XXXS, 4px) var(--Spacing-Spaceing-M, 24px) 0 var(--Spacing-Spaceing-M, 24px)' }}>
                            <TextBodySmall color={isError ? 'var(--Schemes-Error)' : 'var(--Schemes-On-Surface-Variant)'} children={supportText} />
                        </div>
                    </>
                )
            }
            {/* end of filled support text */}

            {/* outlined support text */}
            {
                supportText
                && variant == 'Outlined'
                && !compactMode
                && (
                    <div style={{ padding: 'var(--Spacing-Spaceing-XXXS, 4px) var(--Spacing-Spaceing-M, 24px) 0 var(--Spacing-Spaceing-XS, 12px)' }}>
                        <TextBodySmall color={isError ? 'var(--Schemes-Error)' : 'var(--Schemes-On-Surface-Variant)'} children={supportText} />
                    </div>
                )
            }
            {/* end of outlined support text */}
        </DivFlexColumn >
    )
})

export default React.memo(TextFeild);

// TODO: 
// 1. edit width mode in CSS
// 2. add error icon button to show error message dialog
// 3. handle edit value when props.value changed from outside or props.value is existed
// 4. handle output for onChange fnc