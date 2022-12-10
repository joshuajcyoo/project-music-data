import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {fetchAllAlbums, fetchAlbum, fetchAllSongs, fetchSong, fetchAllComments, fetchAllUsers} from './api';
import Root from './Routes/Root';
import Home from './Routes/Home';
import Scores from './Routes/Scores';
import SpotifyStats from './Routes/SpotifyStats';
import Album from './Routes/Album';
import AlbumSongs from './Routes/AlbumSongs';
import Song from './Routes/Song';
import Comments from './Routes/Comments';
import Admin from "./Routes/Admin";
import Error404 from './Routes/Error404';

// Requirement: Routing
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
        loader () {
          return fetchAllAlbums();
        }
      },
      {
        path: "/scores",
        element: <Scores />,
        loader () {
          return fetchAllAlbums();
        }
      },
      {
        // Requirement: URL Parameter
        path: "/albums/:id/",
        element: <Album />,
        loader ({ params }) {
          return fetchAlbum(params.id);
        },
        children: [
          {
            path: "/albums/:id/",
            element: <AlbumSongs />,
            loader () {
              return fetchAllSongs();
            },
            children: [
              {
                path: "/albums/:id/",
                element: <Comments/>,
                loader () {
                  return fetchAllComments();
                }
              }
            ]
          }
        ]
      },
      {
        // Requirement: URL Parameter
        path: "/songs/:id",
        element: <Song />,
        loader ({ params }) {
          return fetchSong(params.id); 
        }
      }
    ]
  },
  {
    path: "/admin",
    element: <Admin />,
    loader () {
      return fetchAllUsers();
    }
  },
  {
    // Requirement: 404 Page
    path: "*",
    element: <Error404 />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
