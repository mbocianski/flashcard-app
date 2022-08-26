import React from "react";
import Card from "./Card";

function Cards({deck: {cards}}){
    console.log(cards);

function CardList(){ 
    return cards.map((card, index) => {
    return(
      <div className="border border-solid" key={index}>
        <Card card={card}/>
        </div>
      )
    });
}

    return (
        <CardList />
    )
}


export default Cards;