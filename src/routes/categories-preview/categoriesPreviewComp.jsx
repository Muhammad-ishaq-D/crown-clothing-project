import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/categoryPrview/categoryPreviewComp';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/category/categorySelector';
import Spinner from '../../components/spinner/spinnerComp'

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading)
  if (!categoriesMap || Object.keys(categoriesMap).length === 0) {
    return <p>No Product Founds</p>;
  }

  return (
    <>
    { isLoading ? (<Spinner />
    ) : (
      Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      }))}
    </>
  );
};

export default CategoriesPreview;
