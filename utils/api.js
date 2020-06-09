import { AsyncStorage } from "react-native";

const data = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces",
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event",
      },
    ],
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
      },
    ],
  },
  Redux: {
    title: "Redux",
    questions: [],
  },
};

const DECKS_DB_STORAGE = "FlashCards:decks";
AsyncStorage.setItem(DECKS_DB_STORAGE, JSON.stringify(data));

export const getDecks = async () => {
  const results = await AsyncStorage.getItem(DECKS_DB_STORAGE);
  const data = JSON.parse(results);
  return data;
};
export const getDeck = async (id) => {
  const results = await AsyncStorage.getItem(DECKS_DB_STORAGE);
  const data = JSON.parse(results);
  return data[id];
};
export const addCardToDeck = async (deckTitle, card) => {
  const results = await AsyncStorage.getItem(DECKS_DB_STORAGE);
  const data = JSON.parse(results);
  const getSpecificDeck = data[deckTitle];
  await AsyncStorage.mergeItem(
    DECKS_DB_STORAGE,
    JSON.stringify({
      [deckTitle]: {
        questions: [...getSpecificDeck.questions].concat(card),
      },
    })
  );
};

export const saveDeckTitle = async (title) => {
  try {
    return await AsyncStorage.mergeItem(
      DECKS_DB_STORAGE,
      JSON.stringify({ [title]: { title, questions: [] } })
    );
  } catch (error) {
    console.log(error);
  }
};
