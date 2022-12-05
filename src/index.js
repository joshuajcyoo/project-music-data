import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import {fetchAllAlbums, fetchAlbum, fetchAllSongs, fetchSong, fetchAllComments, fetchAllUsers} from './api';
import Root from './Routes/Root';
import Home from './Routes/Home';
import Scores from './Routes/Scores';
import SpotifyStats from './Routes/SpotifyStats';
import Album from './Routes/Album';
import AlbumSongs from './Routes/AlbumSongs';
import Song from './Routes/Song';
import Comments from './Routes/Comments';
import PostComment from './Routes/PostComment';
import Admin from "./Routes/Admin";
import EditAlbum from './Routes/EditAlbum';

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
        loader({}) {
          return;
        },
      //   children: [
      //     {
      //       path: "/stats/:id/comments",
      //       element: <Comments />
      //     }
      //   ]
      },
      {
        path: "/scores",
        element: <Scores />,
        loader () {
          return fetchAllAlbums();
        },
        children: [
      //     {
      //       path: "/scores/comments",
      //       element: <Comments />
      //     },
        ]
      },
      {
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
                },
                children: [
                  {
                    path: "/albums/:id/comment",
                    element: <PostComment/>
                    // action({ request, params }) {
                    //   return request.formData().then((formData) => {
                    //     return postComment(params.id, formData.get("comment-name"), formData.get("comment-body"), formData.get("comment-time")).then(() => {
                    //       toast.success("Your comment was successfully posted.");

                    //       return redirect(`/albums/${params.id}/`);
                    //     })
                    //   })
                    // }
                  }
                ]
              }
            ]
          },
        ]
      },
      {
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
    },
    // children: [
    //   {
    //     path: "/admin/edit/:id",
    //     element: <EditAlbum />,
    //     loader ({ params }) {
    //       return fetchAlbum(params.id);
    //     }
    //   }
    // ]
  },
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
