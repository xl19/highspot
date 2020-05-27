import React from 'react';
import './card-list.scss';
import Card from 'react-bootstrap/Card';

export const CardList = props => {
    return <div className='card-list'>
        {
            props.cards.map(card => (
                <Card key={card.name}>
                    <Card.Img variant="top" src={card.imageUrl} />
                </Card>
            ))
        }
    </div>;
}