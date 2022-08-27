import React from "react";
import DeleteCard from "./DeleteCard";
import {Link, Route, useLocation} from "react-router-dom";

function Card ({card: {id, front, back, deckId}, removeCard}){

    const {pathname} = useLocation();
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
            <Link to={`${pathname}/cards/${id}/edit`}>
                <button>Edit</button>
            </Link>
            <DeleteCard removeCard={removeCard} cardId={id} />
            
            
        </>    
    )



}

export default Card;