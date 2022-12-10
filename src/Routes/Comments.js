import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import PostComment from "./PostComment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Additional Feature: Comment System
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

    const addComment = (name, body, timestamp, id) => {
        const comment = {
            name,
            body,
            timestamp,
            id
        };
        setAlbumComments([comment, ...albumComments]);
    }

    const deleteComment = async (id) => {
        
        // Requirement: DELETE call
        await fetch(
            `http://localhost:3000/comments/${id}`, 
            {method: "DELETE"}
        );
        
        setAlbumComments(albumComments.filter(function(obj) {
            return obj.id != id;
        }));

        toast.error('Comment successfully deleted!', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <div className="display-comments">
            <h3 id="comments-title">Comments</h3>
            
            <PostComment onSubmit={addComment}/>

            <div id="comment-section">
                {albumComments.map((comment) => {
                    return (
                        <div className="comment">
                            <div id="comment-user"><u>Username:</u> {comment.name}</div>
                            <p id="comment-body">{comment.body}</p>
                            <div id="comment-timestamp">Posted on {comment.timestamp}</div>

                            <button className="btn btn-danger btn-sm" id="comment-delete"
                                onClick={() => {
                                    deleteComment(comment.id);
                                }}
                            >Delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
    
}