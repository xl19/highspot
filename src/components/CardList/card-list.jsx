import React from 'react';
import './card-list.scss';
import { Card } from '../Card/card';

// Iterate over the input data set to show a grid of cards
export const CardList = props => (
    <div className='item-list'>
        {
            props.data.map(card => (
                <Card key={card.name} card={card}></Card>
            ))
        }
    </div>
);