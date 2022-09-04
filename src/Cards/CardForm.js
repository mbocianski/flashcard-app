import React from "react";
import { useState, useEffect } from "react";
import { createCard, updateCard, readDeck } from "../utils/api";
import { Link, useHistory, useParams } from "react-router-dom";

function CardForm({ card, formFunction, addCard, editCard }) {
  // sets initial form as card data from either new or edit. Edits pulls in the card to be edited
  const initialFormData = card;
  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  //uses fetchData to return deck info using deckId (from params)
  useEffect(() => {
    setDeck([]);
    const controller = new AbortController();
    async function fetchData() {
      const data = await readDeck(deckId, controller.signal);
      setDeck(data);
    }

    fetchData();

    return () => controller.abort();
  }, [deckId]);

  //makes sure page is rerendered after hitting Save
  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  //updates state as form is edited
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  //adds a new card to via API and then updates state
  async function newCard(formData) {
    const CardToAdd = await createCard(deckId, formData);
    await addCard(CardToAdd);
  }
  // uses the updateCard api and edit Card to update state
  async function editCardInfo(formData) {
    await updateCard(formData);
    await editCard(formData);
    history.push(`/decks/${deckId}`);
  }

  // depending on the how the form is used will call the resprective functon
  const submitHandler = (event) => {
    event.preventDefault();
    if (formFunction === "new") newCard(formData);
    if (formFunction === "edit") editCardInfo(formData);
    setFormData(initialFormData);
  };

  // dynamic headers and buttons based on the new or edit case of the form
  // let header;
  let buttons;

  if (formFunction === "new") {
    buttons = (
      <div>
        <Link to={`/decks/${deckId}`}>
          <button className="btn btn-secondary">Done</button>
        </Link>
        <button className="btn btn-primary" type="submit">Save</button>
      </div>
    );
  }

  if (formFunction === "edit") {
    buttons = (
      <div>
        <Link to={`/decks/${deck.id}`}>
          <button className="btn btn-secondary" >Cancel</button>
        </Link>
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
    );
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
      <label className="form-label" htmlFor="front">
        Front
      </label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          required={true}
          placeholder="Text for the front of the Card"
          onChange={changeHandler}
          value={formData.front}
        />
      </div>
      <div className="mb-3">
      <label className="form-label" htmlFor="back">
        Back
        </label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          required={true}
          placeholder="Text for the back of the Card"
          onChange={changeHandler}
          value={formData.back}
        />
    
      </div>
      {buttons}
    </form>
  );
}

export default CardForm;
