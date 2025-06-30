import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebaseUtils';
import CategoriesPreview from '../categories-preview/categoriesPreviewComp';
import Category from '../category/categoryComp';
import { fetchCategoriesStart } from '../../store/category/categoryAction';


const Shop = () => {
  const dispatch = useDispatch();

//   useEffect(() => {
//       dispatch(fetchCategoriesStartAsync());
// }, []);

  useEffect(() => {
      dispatch(fetchCategoriesStart());
}, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
