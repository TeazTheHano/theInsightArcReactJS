import React from 'react'

// Text Box component dùng như thiết kế trong figma

interface TextBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: string | React.ReactNode;
    className?: string;
    color?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    rest?: any // Thêm rest để có thể truyền thêm các props khác nếu cần
}

export const TextDisplaySmall: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-small ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Display-Family)',
                fontSize: 'var(--Display-Font-Size)',
                fontWeight: 'var(--Display-Weight)',
                lineHeight: 'var(--Display-Line-height)',
                letterSpacing: 'var(--Display-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextDisplayMedium: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-medium ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Display-Family)',
                fontSize: 'var(--Display-Font-Size)',
                fontWeight: 'var(--Display-Weight)',
                lineHeight: 'var(--Display-Line-height)',
                letterSpacing: 'var(--Display-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextDisplayLarge: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-large ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Display-Family)',
                fontSize: 'var(--Display-Font-Size)',
                fontWeight: 'var(--Display-Weight)',
                lineHeight: 'var(--Display-Line-height)',
                letterSpacing: 'var(--Display-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextHeadlineSmall: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-small ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Headline-Family)',
                fontSize: 'var(--Headline-Font-Size)',
                fontWeight: 'var(--Headline-Weight)',
                lineHeight: 'var(--Headline-Line-height)',
                letterSpacing: 'var(--Headline-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextHeadlineMedium: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-medium ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Headline-Family)',
                fontSize: 'var(--Headline-Font-Size)',
                fontWeight: 'var(--Headline-Weight)',
                lineHeight: 'var(--Headline-Line-height)',
                letterSpacing: 'var(--Headline-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextHeadlineLarge: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-large ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Headline-Family)',
                fontSize: 'var(--Headline-Font-Size)',
                fontWeight: 'var(--Headline-Weight)',
                lineHeight: 'var(--Headline-Line-height)',
                letterSpacing: 'var(--Headline-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextLabelSmall: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-small ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Label-Family)',
                fontSize: 'var(--Label-Font-Size)',
                fontWeight: 'var(--Label-Weight)',
                lineHeight: 'var(--Label-Line-height)',
                letterSpacing: 'var(--Label-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextLabelMedium: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-medium ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Label-Family)',
                fontSize: 'var(--Label-Font-Size)',
                fontWeight: 'var(--Label-Weight)',
                lineHeight: 'var(--Label-Line-height)',
                letterSpacing: 'var(--Label-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextLabelLarge: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-large ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Label-Family)',
                fontSize: 'var(--Label-Font-Size)',
                fontWeight: 'var(--Label-Weight)',
                lineHeight: 'var(--Label-Line-height)',
                letterSpacing: 'var(--Label-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextBodySmall: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-small ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Body-Family)',
                fontSize: 'var(--Body-Font-Size)',
                fontWeight: 'var(--Body-Weight)',
                lineHeight: 'var(--Body-Line-height)',
                letterSpacing: 'var(--Body-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextBodyMedium: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-medium ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Body-Family)',
                fontSize: 'var(--Body-Font-Size)',
                fontWeight: 'var(--Body-Weight)',
                lineHeight: 'var(--Body-Line-height)',
                letterSpacing: 'var(--Body-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextBodyLarge: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-large ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Body-Family)',
                fontSize: 'var(--Body-Font-Size)',
                fontWeight: 'var(--Body-Weight)',
                lineHeight: 'var(--Body-Line-height)',
                letterSpacing: 'var(--Body-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextTitleSmall: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-small ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Title-Family)',
                fontSize: 'var(--Title-Font-Size)',
                fontWeight: 'var(--Title-Weight)',
                lineHeight: 'var(--Title-Line-height)',
                letterSpacing: 'var(--Title-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextTitleMedium: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-medium ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Title-Family)',
                fontSize: 'var(--Title-Font-Size)',
                fontWeight: 'var(--Title-Weight)',
                lineHeight: 'var(--Title-Line-height)',
                letterSpacing: 'var(--Title-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}

export const TextTitleLarge: React.FC<TextBoxProps> = ({
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    ...rest
}) => {
    return (
        <div
            className={`typography-system-large ${className ?? ''}`}
            style={{
                fontFamily: 'var(--Title-Family)',
                fontSize: 'var(--Title-Font-Size)',
                fontWeight: 'var(--Title-Weight)',
                lineHeight: 'var(--Title-Line-height)',
                letterSpacing: 'var(--Title-Letter-spacing)',
                color: color,
                ...style,
            }}
            onClick={onClick}
            {...rest}
        >
            {children}
        </div>
    );
}