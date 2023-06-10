import React, { createContext, useContext, useState, useEffect } from "react";
import storage from "@/utils/storage";

const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function getFavoritesFromStorage() {
      const favorites = storage.get("favorite-pics");
      if (favorites && favorites.length) {
        setFavoriteList(favorites);
      }
    }
    getFavoritesFromStorage();
  }, []);

  const addFavoriteById = (id) => {
    const isCardFavorited =
      favoriteList.findIndex((item) => item.id === id) > -1;

    if (!isCardFavorited) {
      const newFavoriteList = [...favoriteList, { id }];

      setFavoriteList(newFavoriteList);
      storage.set("favorite-pics", newFavoriteList);
    }
  };

  const value = {
    favoriteList,
    addFavoriteById,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}

export { GlobalProvider, useGlobal };
