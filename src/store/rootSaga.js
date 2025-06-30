import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './category/categorySaga';
import { userSagas } from './user/userSaga';

// Using E6 Generator Function (resemble async/await)
export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSagas)]);
};