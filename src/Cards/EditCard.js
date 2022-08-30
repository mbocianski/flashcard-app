import React from "react";
import { readCard } from "../utils/api/index";
import CardForm from "./CardForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditCard({ editCard, deck }) {
  const { cardId } = useParams();
  const [card, setCard] = useState([]);
// reads the card based upon cardID from param using readCard
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      const data = await readCard(cardId, controller.signal);
      setCard(data);
    }

    fetchData();

    return () => controller.abort();
  }, [cardId]);
// passes card data to the cardform to prefill data
  return (
    <CardForm card={card} deck={deck} formFunction="edit" editCard={editCard} />
  );
}

export default EditCard;
