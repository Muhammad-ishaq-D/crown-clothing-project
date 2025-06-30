// import { createStore, applyMiddleware, compose } from 'redux';
// import { rootReducer } from './root-reducer';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import logger from 'redux-logger';
// // import { thunk } from 'redux-thunk'
// import createSagaMiddleware from 'redux-saga';
// import { rootSaga } from './rootSaga';

// const persistConfig = {
//     key: 'root',
//     storage,
//     // blacklist: ['user'],
//     whitelist: ['cart'],
// }; 

// // Create saga Middleware
// const sagaMiddleware = createSagaMiddleware();

// const persistedReducer = persistReducer(persistConfig, rootReducer);
 
// // A middleware small library helper that run/hit before an action hit through dispatch the reducer.
// // const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);
//  const middleWares = [
//     process.env.NODE_ENV === 'development' && logger, 
//     //thunk,
//     sagaMiddleware,
//    ].filter(Boolean);

// const composeEnhancer =
//   (process.env.NODE_ENV !== 'production' &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;


// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// export const store = createStore(persistedReducer, undefined, composedEnhancers);

// sagaMiddleware.run(rootSaga);
// export const persistor = persistStore(store);
