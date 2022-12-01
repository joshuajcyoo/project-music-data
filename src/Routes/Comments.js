import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import PostComment from "./PostComment";

export default function Comments() {
    const allComments = useLoaderData();
    const params = useParams();
    const albumId = params.id;

    const compare = ( a, b ) => {
        const aTime = new Date(a.timestamp);
        const bTime = new Date(b.timestamp);        
        return bTime - aTime;
      }
    
    const [albumComments, setAlbumComments] = useState(allComments.filter(comment => comment.album_id == albumId).sort(compare));

    console.log(albumComments);
    // albumComments = allComments.filter(comment => comment.album_id == albumId);

    const addComment = (name, body, timestamp) => {
        // add or re-render page with new comment data
        const comment = {
            name,
            body,
            timestamp
        };

        setAlbumComments([comment, ...albumComments]);
    }

    return (
        <div className="display-comments">
            <h3>Comments</h3>
            
            <PostComment onSubmit={addComment}/>

            <Outlet/>
            {albumComments.map((comment) => {
                return (
                    <div className="comment">
                        <div><u>User: {comment.name}</u></div>
                        <p>{comment.body}</p>
                        <div>Posted on {comment.timestamp}</div>
                    </div>
                );
            })}
        </div>
    );
    
}