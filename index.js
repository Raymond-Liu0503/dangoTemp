import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import homePage from './home';
import StrawberryPage from './strawberryPage';
import FruitPage from './fruit';
import SpecialPage from './specialEdition';
import ClassicPage from './classic';
import CandyPage from './candy';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/strawberryPage",
    element: <StrawberryPage/>,
  },
  {
    path: "/fruit",
    element: <FruitPage/>,
  },
  {
    path: "/specialEdition",
    element: <SpecialPage/>,
  },
  {
    path: "/classic",
    element: <ClassicPage/>,
  },
  {
    path: "/candy",
    element: <CandyPage/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
