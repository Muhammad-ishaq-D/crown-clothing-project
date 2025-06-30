import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.scss'
import App from './App.jsx'
import { UserProvider } from './context/userContext.jsx'
import { CategoriesProvider } from './context/categoriesContext.jsx'
import { CartProvider } from './context/cartContext.jsx'
import { store, persistor } from './store/tkStore.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './utils/stripe/stripeUtils.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    {/* <UserProvider> */}
      {/* <CategoriesProvider> */}
        {/* <CartProvider> */}
        <Elements stripe = {stripePromise}>
          <App />
          </Elements>
        {/* </CartProvider> */}
      {/* </CategoriesProvider> */}
    {/* </UserProvider> */}
    </BrowserRouter>
    
    </PersistGate>
    </Provider>
  </StrictMode>,
)
