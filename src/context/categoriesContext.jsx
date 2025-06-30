import React, { createContext, useState, useEffect } from 'react'
// import SHOP_DATA from '../shop-data.js'
import { addCollectionAndDocument, getCategoriesAndDocuments } from '../utils/firebase/firebaseUtils.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export function CategoriesProvider({ children }) {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap }; 

    // useEffect(() => {           // we delete this after once we store collection inside DB.
    //   addCollectionAndDocument('categories', SHOP_DATA);
    // }, [])
    
    useEffect(() => {
      const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
        // console.log(categoryMap);
        setCategoriesMap(categoryMap);
      };
      getCategoriesMap();
    }, []);
    

  return (
    <CategoriesContext.Provider value={value}>
        {children}
    </CategoriesContext.Provider>
  )
}
