import React, { useContext, useEffect, useState } from 'react'
import './categoryStyles.scss'
import { useParams } from 'react-router'
import { CategoriesContext } from '../../context/categoriesContext';
import ProductCard from '../../components/productCard/productCard';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/category/categorySelector';
import Spinner from '../../components/spinner/spinnerComp';




export default function Category() {
    const { category } = useParams(); 
    // const { categoriesMap } = useContext(CategoriesContext);
      const categoriesMap = useSelector(selectCategoriesMap);
      const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
     setProducts(categoriesMap[category]);   
    }, [category, categoriesMap])
    
  return (
    <>
    <h2 className='category-title'>{category.toUpperCase()}</h2>
    {
      isLoading ? (<Spinner />
      ) : (
    <div className='category-container'>
        {
           products && products.map((product) => <ProductCard key={product.id} product={product}/>)
        }
    </div>
      )}

    </>
  )
}
