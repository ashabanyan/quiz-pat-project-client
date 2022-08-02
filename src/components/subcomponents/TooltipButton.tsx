import React from 'react';
import { Button, Tooltip } from 'antd';
import { ButtonType } from 'antd/lib/button';

interface ITooltipButton {
    title: string
    onClick?: () => void
    onSubmit?: () => void
    className?: string
    type?: ButtonType
    children?: string
    disabled?: boolean
    isTooltipShown?: boolean
}

const TooltipButton: React.FC<ITooltipButton> = ({ title, children, isTooltipShown, className, ...rest}) => {
    return (
        <Tooltip className={className} title={title}>
            <Button {...rest}>
                {children}
            </Button>
        </Tooltip>
    )
}

export default TooltipButton



