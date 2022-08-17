import { Tooltip } from '@mui/material';
import React, { ReactElement } from 'react';

interface ITooltipComponent {
    children: ReactElement<any, any>
    title: string
}

const TooltipComponent: React.FC<ITooltipComponent> = ({ children, title }) => {
    return (
        <Tooltip title={title}>
            {children}
        </Tooltip>
    )
}

export default TooltipComponent;