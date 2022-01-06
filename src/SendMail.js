import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeSendMessage } from './features/mailSlice';
import { db } from './firebase';
import './SendMail.css';

function SendMail() {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = formData => {
        console.log(formData)
        addDoc(collection(db, 'emails'), {
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
            timestamp: serverTimestamp(),
        });

        dispatch(closeSendMessage());
    }

    return (
        <div className='sendMail'>
            <div className="sendMail__header">
                <h3>New Message</h3>
                <CloseIcon 
                    className='sendMail__close' 
                    onClick={() => dispatch(closeSendMessage())}
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    placeholder='To' 
                    type='email' 
                    {...register('to', {required: true})}
                />
                {errors.to && <p className='sendMail__error'>To is required</p>}

                <input 
                    placeholder='Subject' 
                    type='text' 
                    {...register('subject', {required: true})}    
                />
                {errors.subject && <p className='sendMail__error'>Subject is required</p>}

                <input 
                    className='sendMail__message'
                    placeholder='Message...' 
                    type='text' 
                    {...register('message', {required: true})}
                />
                {errors.message && <p className='sendMail__error'>Message is required</p>}

                <div className="sendMail__options">
                    <Button 
                        className='sendMail__send'
                        variant='contained'
                        color='primary'
                        type='submit'
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SendMail
