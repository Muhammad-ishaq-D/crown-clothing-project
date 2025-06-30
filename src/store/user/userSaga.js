import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from '../../utils/firebase/firebaseUtils';
import {
  signInStart,
  signInSuccess,
  signInFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
} from './userReducer'; 


// Sagas
export function* signInWithGoogleSaga() {
  try {
    yield put(signInStart());
    const { user } = yield call(signInWithGooglePopup);
    const userSnapshot = yield call(createUserDocumentFromAuth, user);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmailSaga(action) {
  try {
    yield put(signInStart());
    const { email, password } = action.payload;
    const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
    const userSnapshot = yield call(createUserDocumentFromAuth, user);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUpSaga(action) {
  try {
    yield put(signInStart());
    const { email, password, displayName } = action.payload;
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield call(createUserDocumentFromAuth, user, { displayName });
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signOutSaga() {
  try {
    yield put(signOutStart());
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* checkUserSessionSaga() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

 function* userSagas() {
  yield all([
    takeLatest('user/signInWithGoogle', signInWithGoogleSaga),
    takeLatest('user/signInWithEmail', signInWithEmailSaga),
    takeLatest('user/signUp', signUpSaga),
    takeLatest('user/signOut', signOutSaga),
    takeLatest('user/checkUserSession', checkUserSessionSaga),
  ]);
}

export { userSagas };


