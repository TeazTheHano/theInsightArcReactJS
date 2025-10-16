import React, { useEffect, useCallback } from "react";
import styles from './Dialog.module.css'
import { DivFlexColumn, DivFlexRowCenter, DivFlexRowSpaceBetween, DivFlexRow } from "../LayoutDiv/LayoutDiv";
import { TextBodyLarge, TextTitleLarge, TextTitleSmall } from "../TextBox/textBox";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import useCheckScreenSize from "../../hooks/useCheckScreenSize";

export interface DialogProps {
    open?: boolean;
    title?: string;
    subTitle?: string;
    contentText?: string;
    img?: string;
    bgDark?: boolean;
    children?: React.ReactNode;
    verticalActionBar?: boolean;
    primaryAction?: React.ReactNode;
    secondaryAction?: React.ReactNode;
    defaultCloseButton?: 'none' | 'close' | 'cancel-destruction' | 'cancel-normal'
    topLeftCloseButton?: boolean;
    destructive?: boolean;
    sizeMode?: 'fit' | 'fill' | 300 | 600 | 900;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
    onClose?: () => void;
}

function Dialog(props: DialogProps) {
    const { t } = useTranslation('common');

    const {
        open,
        title,
        subTitle,
        contentText,
        img,
        bgDark,
        children,
        verticalActionBar,
        primaryAction,
        secondaryAction,
        defaultCloseButton = 'close',
        topLeftCloseButton = true,
        destructive,
        sizeMode = 'fit',
        disableBackdropClick,
        disableEscapeKeyDown,
        onClose,
    } = props;

    // Manage body overflow when dialog is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    // Handle escape key
    useEffect(() => {
        if (!open || disableEscapeKeyDown || !onClose) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, disableEscapeKeyDown, onClose]);

    const handleBackdropClick = useCallback(() => {
        if (!disableBackdropClick && onClose) {
            onClose();
        }
    }, [disableBackdropClick, onClose]);

    const handleCloseClick = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const ContainerStyle: React.CSSProperties = {
        width: sizeMode === 'fit' ? 'fit-content' : '100%',
        maxWidth: (typeof sizeMode === 'number') ? `${sizeMode}px` : 'undefined',
    };

    const setActionBarVertical = verticalActionBar || useCheckScreenSize(['sm'])

    if (!open) return null;

    return (
        <DivFlexRowCenter
            className={[styles.dialogBG, bgDark ? styles.bgDark : ''].join(' ').trim()}
            onClick={handleBackdropClick}
        >
            <DivFlexColumn
                className={[
                    styles.dialogContent,
                    `shadow-5`,
                    destructive ? styles.destructive : '',
                    `CM-border-radius-mode-default`
                ].join(' ').trim()}
                style={ContainerStyle}
                onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking inside
            >
                {/* Header */}
                <DivFlexRowSpaceBetween>
                    <DivFlexColumn className={styles.textPadding}>
                        <TextTitleLarge children={title} color="currentColor" />
                        <TextTitleSmall children={subTitle} />
                    </DivFlexColumn>
                    {topLeftCloseButton && (
                        <Button
                            label={t('close')}
                            variantMode="Icon"
                            styleMode="Text"
                            colorMode="Default"
                            leadingIcon="cancel_filled"
                            onClick={handleCloseClick}
                        />
                    )}
                </DivFlexRowSpaceBetween>

                {/* Content */}
                {img && <img src={img} alt="Dialog" style={{ maxWidth: '100%', marginBottom: 'var(--Spacing-Spacing-XS)' }} />}
                {contentText && <TextBodyLarge children={contentText} className={styles.textPadding} />}
                {children}

                {/* Actions */}
                <DivFlexRow className={setActionBarVertical ? styles.full : undefined} style={{ gap: 'var(--Spacing-Spacing-XS)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    {
                        defaultCloseButton === 'none' ?
                            null :
                            <Button
                                label={defaultCloseButton === 'close' ? t('close') : t('cancel')}
                                children={defaultCloseButton === 'close' ? t('close') : t('cancel')}
                                styleMode="Outlined"
                                colorMode={defaultCloseButton === 'cancel-destruction' ? 'Error' : 'Default'}
                                onClick={handleCloseClick}
                                showTitleWhileHover
                            />
                    }
                    {(primaryAction || secondaryAction) && (
                        <DivFlexRow style={{ flex: 1, justifyContent: 'flex-end', gap: 'var(--Spacing-Spacing-XS)', flexWrap: 'wrap' }}>
                            {secondaryAction}
                            {primaryAction}
                        </DivFlexRow>
                    )}
                </DivFlexRow>
            </DivFlexColumn>
        </DivFlexRowCenter>
    );
}

export default React.memo(Dialog);
