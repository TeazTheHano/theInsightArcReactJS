import React, { type CSSProperties } from 'react'

interface DividerProps {
    direction?: 'horizontal' | 'vertical',
    color?: string,
    thickness?: number | string,
    length?: number | string,
    className?: string,
    style?: React.CSSProperties,
    rest?: React.HTMLAttributes<HTMLDivElement>
}

const Divider: React.FC<DividerProps> = ({ direction, color, thickness, length, className, style, ...rest }) => {
    thickness = thickness || 1;
    direction = direction || 'horizontal';


    const styles: CSSProperties = {
        backgroundColor: color || 'var(--Schemes-Outline)',
        height: direction === 'horizontal' ? thickness || 1 : length || 'auto',
        width: direction === 'vertical' ? thickness || 1 : length || 'auto',
        ...style,
    };

    return <div
        className={`Divider-${direction} ${className}`}
        style={styles}
        {...rest}
    />;
};

export default Divider;
