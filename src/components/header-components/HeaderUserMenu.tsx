import { Logout, AdminPanelSettings, PersonAdd, Settings } from '@mui/icons-material';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { userMenuPaperProps } from '../../constants/header';
import { BaseComponentProps } from '../../types/props';
import { bem } from '../../utils/helpers';
import { getUserNameFirstLetters } from '../../utils/text-helpers';

const b = bem('header-user-menu')

interface IHeaderUserMenu extends BaseComponentProps {
    
}

const HeaderUserMenu: React.FC<IHeaderUserMenu> = ({ store }) => {
    const { auth } = store
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpened = Boolean(anchorEl)

    const menuClicked = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
    const menuClosed = () => setAnchorEl(null)

    const adminButtonClicked = () => history.push('/admin')
    const logoutButtonClicked = async () => auth.logout()

    const { name, surname} = auth.user

    const firstNameLetters = getUserNameFirstLetters(name, surname)

    return (
        <div className={b('container')}>
            <IconButton
            onClick={menuClicked}
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 32, height: 32 }}>{firstNameLetters}</Avatar>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={menuOpened}
                onClose={menuClosed}
                onClick={menuClosed}
                PaperProps={userMenuPaperProps}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar /> 
                    Учетная запись
                </MenuItem>
                <MenuItem>
                    <Avatar /> 
                    Профиль
                </MenuItem>
                <Divider />
                <MenuItem onClick={logoutButtonClicked}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Выход
                </MenuItem>

                <MenuItem onClick={adminButtonClicked}>
                    <ListItemIcon>
                        <AdminPanelSettings fontSize="small" />
                    </ListItemIcon>
                    Администрирование
                </MenuItem>
            </Menu>
        </div>
    )
}

export default inject('store')(observer(HeaderUserMenu))