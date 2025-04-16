import React, { createContext, useState } from "react";

const initalValues = {
  nom: "",
  motDePasse: "",
  image: null,
  audio: null,
  couleur: "#ffffff",
  loggedIn: false,
  setLoggedIn: () => {},
};
export const PersonContext = createContext(initalValues);

export const PersonProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [person, setPerson] = useState({
    nom: "",
    motDePasse: "",
    image: null,
    audio: null,
    couleur: "#ffffff",
  });

  return (
    <PersonContext.Provider
      value={{ person, setPerson, loggedIn, setLoggedIn }}
    >
      {children}
    </PersonContext.Provider>
  );
};
