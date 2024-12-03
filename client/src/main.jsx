import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Cart from './pages/Cart.jsx';
import Category from './pages/Category.jsx';
import Dashboard from './pages/Dashboard.jsx';

// The router is saved here
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
      <Route index={true} path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/category/:id' element={<Category />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Route>
  )
)

// The store is saved in the Provider here
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
  
)