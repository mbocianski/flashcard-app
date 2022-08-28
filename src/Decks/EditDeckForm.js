import React from "react";
import {updateDeck, readDeck} from "../utils/api/index";
import {useHistory, useParams} from "react-router-dom";
import {useState, useEffect} from "react";

/*It was easter to duplcate the from data from CreateDeckForm and modify with editing functions
instead of passing multiple props over multiple components and attempting to consolidate with logic */

function EditDeckForm({editDeck}){

    //gets deckId for API
  const { deckId } = useParams();

    //uses fetchData to return deck info using deckId (from params)
    useEffect(() => {
        setFormData([]);
        const controller = new AbortController();
        async function fetchData() {
          const deck = await readDeck(deckId, controller.signal);
          const initialFormData = {
            name: deck.name,
            description: deck.description,
            id: deck.id
        };
          setFormData(initialFormData);
        }
  
        fetchData();
  
        return () => controller.abort();
      },[]);

    
   
    const [formData, setFormData] = useState([]);
      console.log("form data: ", formData);
    //Update form as you type via change Handler
    const changeHandler = ({target}) => {
        setFormData({
            ...formData,
            [target.name]:target.value
            });
    };

    //Send new deck to API and return updated deck data
    async function editDeckState(formData) {
        await updateDeck(formData);
        history.goBack();
    }
 

    let history = useHistory();

    //On submit, call editDeck() and send data to updateDeck function to update state.
    const submitHandler = (event) => {
        event.preventDefault();
        editDeck(formData)
        editDeckState(formData);
        setFormData(formData);
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
            <button>Cancel</button>
        </form>
    )
}


export default EditDeckForm;
