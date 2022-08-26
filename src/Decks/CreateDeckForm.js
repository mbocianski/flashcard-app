import React from "react";
import {useState} from "react";
import {createDeck} from "../utils/api/index"
import {Link} from "react-router-dom"


function CreateDeckForm({decks, addDeck}){

    const initialFormData = {
        name: "",
        description: ""
    }

    const [formData, setFormData] = useState({...initialFormData});

    //Update form as you type via change Handler
    const changeHandler = ({target}) => {
        setFormData({
            ...formData,
            [target.name]:target.value
            });
    };

    //Send new deck to API and return newly deck data
    async function newDeck(formData) {
        const deckToAdd = await createDeck(formData);
        await addDeck(deckToAdd);
    }



    //On submit, call newDeck() and send data to addDeck function to update state.
    const submitHandler = (event) => {
        event.preventDefault();
        newDeck(formData);
        setFormData({...initialFormData});
        
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
                required={true} />
            </label>
            <button type="submit">Submit</button>
            <Link to="/">
            <button>Cancel</button>
            </Link>
        </form>
    )
}


export default CreateDeckForm;