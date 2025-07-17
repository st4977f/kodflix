import React from 'react';
import './Cover.css';

interface CoverProps {
    image: string;
    title: string;
    description: string;
}

const Cover: React.FC<CoverProps> = ({ image, title, description }) => {
    return (
        <div className='cover'>
            <img src={image} alt='' />
            <div className='cover-overlay'>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Cover;
