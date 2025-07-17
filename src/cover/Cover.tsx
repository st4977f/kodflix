import React from 'react';
import './Cover.css';
import { Link } from 'react-router-dom';

interface CoverProps {
    image: string;
    title: string;
    description: string;
}

const Cover: React.FC<CoverProps> = ({ image, title, description }) => {
    return (
        <Link to={`/details`} className='cover'>
            <img src={image} alt='' />
            <div className='cover-overlay'>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </Link>
    )
}

export default Cover;
