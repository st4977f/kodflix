import React from 'react';
import { Link } from 'react-router-dom';
import './MenuLink.css';

interface MenuLinkProps {
    icon: string | React.ReactNode;
    text: string;
    link: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function MenuLink({ icon, text, link, onClick }: MenuLinkProps) {

    return (
        <Link
            to={link}
            className='menu-link'
            onClick={onClick}>
            <div>
                <img src={require(`./${icon}.svg`)} alt={ text } />
            </div>
            <div><h3>{ text }</h3></div>
        </Link>
    )
}