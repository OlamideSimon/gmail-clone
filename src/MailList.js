import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/Inbox';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from '@mui/icons-material/People';
import RedoIcon from '@mui/icons-material/Redo';
import SettingsIcon from '@mui/icons-material/Settings';
import { Checkbox, IconButton } from '@mui/material';
import { collection, onSnapshot, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import './MailList.css';
import MailRow from './MailRow';
import Section from './Section';

function MailList() {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        onSnapshot(collection(db, 'emails'), orderBy('timestamp', 'desc'), (snapshot) => {
            setEmails(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, []);

    return (
        <div className='mailList'>
            <div className="mailList__settings">
                <div className="mailList__settingsLeft">
                    <Checkbox />
                    <IconButton>
                        <ArrowDropDownIcon />
                    </IconButton>
                    <IconButton>
                        <RedoIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <div className="mailList__settingsRight">
                    <IconButton>
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton>
                        <ChevronRightIcon />
                    </IconButton>
                    <IconButton>
                        <KeyboardHideIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </div>
            </div>

            <div className="mailList__sections">
                <Section Icon={InboxIcon} title='Primary' color='red' selected />
                <Section Icon={PeopleIcon} title='Social' color='#1a73e8'  />
                <Section Icon={LocalOfferIcon} title='Promotions' color='green' />
            </div>

            <div className="mailList__list">
                {emails.map(({ id, data: {to, subject, message, timestamp } }) => (
                    <MailRow 
                        id={id}
                        key={id}
                        title={to}
                        subject={subject}
                        description={message}
                        time={new Date(timestamp?.seconds * 1000).toUTCString()}
                    />
                ))}
            </div>
        </div>
    )
}

export default MailList
