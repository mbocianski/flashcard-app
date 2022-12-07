import React from "react";
import { useState, useEffect } from "react";
import { createDeck, updateDeck, readDeck } from "../utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";
import NavBar from "../Common/NavBar";
import Loading from "../Common/Loading";

function DeckForm({ formFunction, addDeck, editDeck, deck }) {
  // for new deck.
  const initialFormData = {
    name: "",
    description: "",
  };

  const [loaded, setLoaded] = useState(true);

  const { deckId } = useParams();
  const [formData, setFormData] = useState(initialFormData);

  //uses fetchData to return deck info using deckId (from params)
  useEffect(() => {
    const controller = new AbortController();

    if (formFunction === "edit") {
      setLoaded(false);
      async function fetchData() {
        const data = await readDeck(deckId, controller.signal);
        setFormData(data);
        setLoaded(true);
      }

      fetchData();
    }

    return () => controller.abort();
  }, [deckId, formFunction]);

  //Update form as you type via change Handler
  const changeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const history = useHistory();

  let header;

  if (formFunction === "create") {
    header = <h2>Create Deck</h2>;
  }

  if (formFunction === "edit") {
    header = <h2>Edit Deck</h2>;
  }

  //Send new deck to API and return newly deck data
  async function newDeck(formData) {
    const deckToAdd = await createDeck(formData);
    addDeck(deckToAdd);
    history.push(`/decks/${deckToAdd.id}`);
  }

  //Send updted deck to API and update decks state with editDeck
  async function editDeckTasks(formData) {
    updateDeck(formData);
    editDeck(formData);
    history.push(`/decks/${deckId}`);
  }

  //On submit, call newDeck() or Edit Deck() based on the formfunction,
  // and then reset the form.
  const submitHandler = (event) => {
    const controller = new AbortController();
    event.preventDefault();
    if (formFunction === "create") newDeck(formData);
    if (formFunction === "edit") editDeckTasks(formData);
    setFormData({ ...initialFormData });
    return () => controller.abort();
  };

  if (!loaded) {
    return <Loading />;
  }

  return (
    <div>
      <NavBar deck={deck} />
      {header}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            type="text"
            onChange={changeHandler}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={changeHandler}
              required={true}
            />
        </div>
        <div className="mb-3">
          <Link to="/">
            <button className="btn btn-secondary">Cancel</button>
          </Link>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeckForm;
