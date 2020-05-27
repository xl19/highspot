import React from 'react';
import './card-list.scss';
import { Card } from '../Card/card';

export const CardList = props => (
    <div className='card-list'>
        {
            props.data.map(card => (
                <Card key={card.name} card={card}></Card>
            ))
        }
    </div>
);