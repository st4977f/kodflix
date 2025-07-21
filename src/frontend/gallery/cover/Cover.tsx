import React from 'react';
import './Cover.css';
import { Link } from 'react-router-dom';

interface CoverProps {
    id: string;
    title: string;
    description: string;
}

class Cover extends React.Component<CoverProps> {
    render() {
        const { id, title, description } = this.props;
        return (
            <Link to={`/${id}`} className='cover'>
                <img src={require (`../../../../public/common/images/${id}.jpg`)} id={id} alt='' />
                <div className='cover-overlay'>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
            </Link>
        );
    }
}

export default Cover;
