import { createSelector } from 'reselect'

//Memoization process through createSelector
const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        console.log('Selector Fired')
      return  categories.reduce((acc, category) => {
        const { title, items } = category ;
        acc[title.toLowerCase()] = items;
        return acc;
      }, {})}
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
