import React from "react";
import {useState, useEffect} from "react";
import { createCard, updateCard } from "../utils/api";
import {Link, useHistory} from "react-router-dom"



function CardForm ({card, deck, formFunction, addCard, editCard}) {

    // sets initial form as card data from either new or edit. Edits pulls in the card to be edited
    const initialFormData = card;
    const [formData, setFormData] = useState(initialFormData);
    const history = useHistory();

    //makes sure page is rerendered after hitting Save
    useEffect (() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    //updates state as form is edited
    const changeHandler = ({target}) => {
        setFormData({...formData,
                    [target.name]:target.value}
        )};
    //adds a new card to via API and then updates state
    async function newCard(formData) {
        const CardToAdd = await createCard(deck.id, formData);
        await addCard(CardToAdd);
    }
    // uses the updateCard api and edit Card to update state
    async function editCardInfo(formData) {
        await updateCard(formData);
        await editCard(formData);
        history.push(`/decks/${deck.id}`)
    }

    // depending on the how the form is used will call the resprective functon
    const submitHandler = (event) => {
        event.preventDefault();
        if (formFunction === "new") newCard(formData);
        if (formFunction === "edit") editCardInfo(formData);
        setFormData(initialFormData);
    }


    // dynamic heads and buttons based on the new or edit case of the form
    let header;
    let buttons;

    if (formFunction === "new"){
        header = <h2>{`${deck.name}: Add Card`}</h2>
        buttons = 
        <>
        <Link to={`/decks/${deck.id}`}>
        <button>Done</button>
    </Link>
        <button type="submit">Save</button>
        </>
    }

     if (formFunction === "edit"){
        header = <h2>Edit Card</h2>
        buttons = 
        <>
        <Link to={`/decks/${deck.id}`}>
        <button>Cancel</button>
    </Link>
        <button type="submit">Submit</button>
        </>
    }

    
    return(
        <>
        {header}
        <form onSubmit={submitHandler}>
            <label htmlFor="front">
                Front
                <textarea
                    id="front"
                    name="front"
                    required={true}
                    placeholder="Text for the front of the Card"
                    onChange={changeHandler}
                    value={formData.front}/>
                    
            </label>        
            <label htmlFor="back">
                Back
                <textarea
                    id="back"
                    name="back"
                    required={true}
                    placeholder="Text for the back of the Card"
                    onChange={changeHandler}
                    value={formData.back}/>
            </label>
            {buttons}
        </form>
        </>
    )

}


export default CardForm;