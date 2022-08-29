import React from "react";
import {readCard} from "../utils/api/index";
import CardForm from "./CardForm";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function EditCard ({editCard, deck}){

    const {cardId} = useParams();
    const [card, setCard] = useState([]);
    
    useEffect(() => {
        const controller = new AbortController();
        async function fetchData() {
            const data = await readCard(cardId, controller.signal)
            setCard(data);
        }

        fetchData();

        return () => controller.abort();

    }, [cardId]);



return (
    <CardForm 
        card={card} 
        deck={deck} 
        formFunction="edit" 
        editCard={editCard} />
)

}

export default EditCard;