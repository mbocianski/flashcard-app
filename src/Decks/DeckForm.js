import React from "react";
import {useState} from "react";
import {createDeck, updateDeck} from "../utils/api/index"
import {Link, useHistory} from "react-router-dom"


function DeckForm({formFunction, deck, addDeck, editDeck}){

    const initialFormData = deck;

    const [formData, setFormData] = useState(initialFormData);


    //Update form as you type via change Handler
    const changeHandler = ({target}) => {
        setFormData({
            ...formData,
            [target.name]:target.value
            });
    };

   

    const history = useHistory();


     //Send new deck to API and return newly deck data
     async function newDeck(formData) {
        const deckToAdd = await createDeck(formData);
        await addDeck(deckToAdd)
        history.push(`/decks/${deckToAdd.id}`)
   
    }

    //Send updted deck to API and update decks state with editDeck
    async function editDeckTasks(formData) {
        await updateDeck(formData);
        await editDeck(formData)
        history.push(`/decks/${deck.id}`);
    }       

     //On submit, call newDeck() or Edit Deck() based on the formfunction, 
     // and then reset the form.
    const submitHandler = (event) => {
        const controller = new AbortController();
        event.preventDefault();
        if (formFunction === "create") newDeck(formData);
        if (formFunction === "edit") editDeckTasks(formData);
        setFormData({...initialFormData});
        return () => controller.abort();

    }

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="name">Name
            <input 
                id="name"
                name="name"
                value={formData.name}
                type="text"
                onChange={changeHandler}
                placeholder="Enter a name"
                required={true} />
            </label>
            <label htmlFor="description">
                Description
            <textarea 
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={changeHandler}
                placeholder="enter a description"
                required={true} />
            </label>
            <button type="submit">Submit</button>
            <Link to="/">
                <button>Cancel</button>
            </Link>
        </form>
    )
}


export default DeckForm;