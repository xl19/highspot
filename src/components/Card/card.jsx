import React from 'react';
import './card.scss';

export const Card = props => (
    <div className='item-container'>
        <img alt="card" src={props.card.imageUrl} />
    </div>
);