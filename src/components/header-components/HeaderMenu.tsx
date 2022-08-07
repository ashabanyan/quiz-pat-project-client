import { Button, ButtonGroup } from '@mui/material';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { menuPages } from '../../constants/header';
import { bem } from '../../utils/helpers';

const b = bem('header-menu')

const HeaderMenu: React.FC = () => {
    const history = useHistory()

    const handleClick = (path: string) => history.push(path)

    return (
        <ButtonGroup className={b('nav')} variant="text" aria-label="text button group">
            {menuPages.map((item, index) => <Button onClick={() => handleClick(item.link)} key={index}>{item.title}</Button>)}
        </ButtonGroup>
    )
}

export default HeaderMenu