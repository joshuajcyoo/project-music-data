import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import PostComment from "./PostComment";

// FP Req: Comment System
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

    const addComment = (name, body, timestamp) => {
        const comment = {
            name,
            body,
            timestamp
        };
        setAlbumComments([comment, ...albumComments]);
    }

    const deleteComment = async (id) => {
        // FP Req: DELETE call
        await fetch(
            `http://localhost:3000/comments/${id}`, 
            {method: "DELETE"}
        );
        
        setAlbumComments(albumComments.filter(function(obj) {
            return obj.id != id;
        }));
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

                        <button className="btn btn-danger btn-sm" 
                            onClick={() => {
                                deleteComment(comment.id);
                            }}
                        >Delete</button>
                    </div>
                );
            })}
        </div>
    );
    
}