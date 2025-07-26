import React, { useMemo, useCallback } from 'react'
import segmentedButtonStyle from './SegmentedButton.module.css'
import { DivFlexRowCenter } from '../LayoutDiv/LayoutDiv';
import { IconGen } from '../../assets/icon/OtherIcon';

interface SegmentedButtonProps {
    dataList?: { label?: string, value: string, icon?: string | React.ReactNode }[];
    preSelected?: string | null;
    onChange?: (value: string) => void;
    className?: string;
    style?: React.CSSProperties;
    disabled?: string[] | 'all' | null;
    iconOnSelected?: string | React.ReactNode;
    styleMode?: 'Filled' | 'Outlined' | 'Text';
    colorMode?: 'Primary' | 'Secondary' | 'Tertiary';
    borderRadius?: 'none' | 'default' | 'rounded' | number;
}

const SegmentedButton: React.FC<SegmentedButtonProps> = ({
    dataList = [
        { label: 'Option 1', value: 'option1', icon: 'arrow_outward' },
        { label: 'Option 2', value: 'option2', icon: 'arrow_outward' },
        { label: 'Option 3', value: 'option3', icon: 'arrow_outward' },
    ],
    preSelected = null,
    onChange,
    className = '',
    style,
    disabled = null,
    iconOnSelected,
    styleMode = 'Filled',
    colorMode = 'Primary',
    borderRadius = 'rounded',
}) => {

    const [selectedValue, setSelectedValue] = React.useState(preSelected);

    const buttonClass = useMemo(() => {
        return [
            segmentedButtonStyle.itemWrapper,
            segmentedButtonStyle[`colorMode${colorMode}`],
            segmentedButtonStyle[`styleMode${styleMode}`],
            'typography-system-medium',
        ].join(' ');
    }, [styleMode, colorMode]);

    const handleButtonClick = useCallback((value: string) => {
        if (onChange) {
            onChange(value);
        }
        setSelectedValue(value);

        console.log(`Button ${value} clicked`);

    }, [onChange]);

    const borderRadiusClass = typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '';
    const borderRadiusStyle = typeof borderRadius === 'number' ? { borderRadius: `${borderRadius}px` } : {};

    return (
        <DivFlexRowCenter
            className={[borderRadiusClass, className, segmentedButtonStyle.buttonWrapper].filter(Boolean).join(' ')}
            style={{ ...borderRadiusStyle }}
        >
            {dataList.map((item) => {
                const isDisabled = disabled === 'all' || (disabled?.includes(item.value) ?? false);
                const isSelected = selectedValue === item.value;

                const iconToRender = isSelected && iconOnSelected ? iconOnSelected : item.icon;

                const iconElement = iconToRender ? (
                    typeof iconToRender === 'string' ? (
                        <IconGen className={['iconMain', segmentedButtonStyle.layoutIcon].join(' ')} svgName={iconToRender} />
                    ) : (
                        <span className={['iconMain', segmentedButtonStyle.layoutIcon].join(' ')}>{iconToRender}</span>
                    )
                ) : null;

                return (
                    <>
                        <button
                            key={item.value}
                            onClick={() => handleButtonClick(item.value)}
                            disabled={isDisabled}
                            aria-label={item.label}
                            className={buttonClass}
                            style={{
                                ...borderRadiusStyle,
                                ...style,
                            }}
                        >
                            <div
                                className={[
                                    segmentedButtonStyle.stateLayer,
                                    segmentedButtonStyle[`colorMode${colorMode}`],
                                ].filter(Boolean).join(' ')}
                            />
                            {iconElement}
                            {item.label && (
                                <span className={[segmentedButtonStyle.layoutLabel, 'typography-system-medium'].join(' ')}>
                                    {item.label}
                                </span>
                            )}
                        </button>
                    </>
                );
            })}
        </DivFlexRowCenter>
    );
};

export default React.memo(SegmentedButton);
