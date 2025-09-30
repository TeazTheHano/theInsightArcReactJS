import React from "react";

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    img?: string;
    children?: React.ReactNode;
    actions1?: React.ReactNode;
    actions2?: React.ReactNode;
    destructiveAction?: React.ReactNode;
    maxWidth?: string;
    fullWidth?: boolean;
    fullScreen?: boolean;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
}

function Dialog(props: DialogProps) {
    // Implementation of the Dialog component
    return (
        <div>
            <h1>dialog work</h1>
            <h2>{props.title}</h2>
        </div>
    );
}

export default React.memo(Dialog);