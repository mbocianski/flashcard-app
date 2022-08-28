import React from "react";
import Card from "./Card";

function Cards({deck: {cards=[]}, removeCard}){

    return cards.map((card, index) => {
        return(
        <div className="border border-solid" key={index}>
            <Card 
                card={card} 
                removeCard={removeCard}
                />
            </div>
        )
        });
}





export default Cards;