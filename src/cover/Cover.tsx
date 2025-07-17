import React from 'react';
import './Cover.css';

interface CoverProps {
    image: string;
    title: string;
    description: string;
}

export default class Cover extends React.Component<CoverProps> {
    render() {
        return (
            <div className='cover'>
                <img src={this.props.image} alt='' />
                <div className='cover-overlay'>
                    <h1>{this.props.title}</h1>
                    <p>{this.props.description}</p>
                </div>
            </div>
        )
    }
}