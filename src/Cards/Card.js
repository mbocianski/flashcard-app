import React from "react";
import DeleteCard from "./DeleteCard";
import {Link} from "react-router-dom";

function Card ({ card: {id, front, back, deckId}, removeCard}){

    return(
        <>
            <table>
                <tbody>
                    <tr>
                        <td>{front}</td>
                        <td>{back}</td>
                    </tr>
                </tbody>
            </table>
            <Link to={`/${deckId}/cards/${id}/edit`}>
                <button>Edit</button>
            </Link>
            <DeleteCard removeCard={removeCard} cardId={id} />
            
            
        </>    
    )



}

export default Card;