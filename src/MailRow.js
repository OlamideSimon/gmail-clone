import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Checkbox, IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MailRow.css';
import { useDispatch } from 'react-redux'
import { selectMail } from './features/mailSlice';

function MailRow({ id, title, subject, description, time, history }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openMail = () => {
        dispatch(selectMail({
            id,
            title,
            subject,
            description,
            time,
            history
        })
        );

        navigate('mail');
    };

    return (
        <div onClick={openMail} className='mailRow'>
            <div className="mailRow__options">
                <Checkbox />
                <IconButton>
                    <StarBorderOutlinedIcon />
                </IconButton>
                <IconButton>
                    <LabelImportantOutlinedIcon />
                </IconButton>
            </div>

            <h3 className="mailRow__title">
                {title}
            </h3>

            <div className="mailRow__message">
                <h4>
                    {subject} {' '}
                    <span className="mailRow__description">-
                        {' '}{description}
                    </span>
                </h4>
            </div>

            <p className="mailRow__time">
                {time}
            </p>
        </div>
    )
}

export default MailRow;
