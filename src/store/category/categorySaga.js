import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebaseUtils";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "./categoryAction";
import { CATEGORIES_ACTION_TYPES } from "./categoryTypes";

export function* fetchCategoriesAsync() {
  try {
      const categoriesArray = yield call(getCategoriesAndDocuments, ('categories'));
      yield put(fetchCategoriesSuccess(categoriesArray));  //use put() instead of dispatch
      
    } catch (error) {
      yield put(fetchCategoriesFailure(error));
    }  
};

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
};

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
};
