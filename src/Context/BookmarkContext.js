import React, { createContext, useState } from 'react';


export const BookmarkContext = createContext();


export const BookmarkProvider = ({ children }) => {
  const [bookmark, setBookmark] = useState([]);

  return (
    <BookmarkContext.Provider value={{ bookmark, setBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
