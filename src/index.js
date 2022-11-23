import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { toast } from 'react-toastify';

import Root from './Routes/Root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/stats",
        element: <SpotifyStats />,
        loader({ }) {
          return;
        },
        children: [
          {
            path: "/stats/:id/comments",
            element: <Comments />
          }
        ]
      },
      {
        path: "/scores",
        element: <Scores />,
        loader ({}) {
          return;
        },
        children: [
          {
            path: "/scores/:id/comments",
            element: <Comments />
          },
          {
            path: "/scores/:album",
            element: <Album />,
            loader ({}) {
              return;
            },
            children: [
              {
                path: "/scores/:album/:song",
                element: <Song />,
                loader ({}) {
                  return; 
                }
              }
            ]
          }
        ]
      },
      {
        path: "/admin",
        element: <Admin />,
        loader ({}) {
          return;
        }
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
