import React, { type CSSProperties } from 'react'

interface DividerProps {
    direction?: 'horizontal' | 'vertical',
    color?: string,
    thickness?: number | string,
    lenght?: number | string,
}

const Divider: React.FC<DividerProps> = ({ direction, color, thickness }) => {
    thickness = thickness || 1;
    direction = direction || 'horizontal';


    const styles: CSSProperties = {
        backgroundColor: color || 'var(--Schemes-Outline)',
        height: direction === 'horizontal' ? thickness || 1 : length || 'auto',
        width: direction === 'vertical' ? thickness || 1 : length || 'auto',
    };

    return <div
        className={`Divider-${direction}`}
        style={styles} />;
};

export default Divider;
