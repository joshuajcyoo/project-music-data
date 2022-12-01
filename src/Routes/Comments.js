import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";

export default function Comments() {
    const allComments = useLoaderData();
    const params = useParams();
    const albumId = params.id;

    let albumComments = allComments.filter(comment => comment.album_id == albumId);

    return (
        <div className="display-comments">
            <h3>Comments</h3>
            
            <Link to={`/albums/${albumId}/comment`} className="link">
                Post your own comment!
            </Link>

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