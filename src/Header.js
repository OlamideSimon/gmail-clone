import React from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AppsIcon from '@mui/icons-material/Apps'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from './features/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch()

    const signout = () => {
        signOut(auth).then(() => {
            dispatch(logout());
        })
    }

    return (
        <div className='header'>
            <div className='header__left'>
                <IconButton>
                    <MenuIcon />
                </IconButton>
                <img 
                    src='https://cdn.vox-cdn.com/thumbor/8fWz6qpiMYMsZhY4vrc9Vhl5yL8=/0x110:1320x770/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/21939811/newgmaillogo.jpg'
                    alt='' 
                />
            </div>

            <div className='header__middle'>
                <SearchIcon />
                <input placeholder='Search mail' type='text' />
                <ArrowDropDownIcon className='header__inputCaret' />
            </div>

            <div className='header__right'>
                <IconButton>
                    <AppsIcon />
                </IconButton>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                <Avatar style={{cursor: 'pointer'}} src={user?.photoUrl} onClick={signout} />
            </div>
        </div>
    )
}

export default Header
