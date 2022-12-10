import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PostComment(props) {
    const { onSubmit } = props;

    const params = useParams();
    const albumId = params.id;

    const errorSelect = "Fields must not be left blank.";

    const submit = async (event) => {
        event.preventDefault();

        const d = new Date();
        const timestamp = d[Symbol.toPrimitive]('string').slice(0, 24);

        const name = document.getElementById("post-comment-name").value;
        const body = document.getElementById("post-comment-body").value;

        // Requirement: Custom Form Validation
        if (!name && !body) {
            document.getElementById("name-error").className = "d-block text-danger";
            document.getElementById("body-error").className = "d-block text-danger";
            document.getElementById("post-comment-name").className = "form-control form-control-sm is-invalid";
            document.getElementById("post-comment-body").className = "form-control form-control-sm is-invalid";
        }
        else if (!name) {
            document.getElementById("name-error").className = "d-block text-danger";
            document.getElementById("post-comment-name").className = "form-control form-control-sm is-invalid";
            document.getElementById("body-error").className = "d-none text-danger";
            document.getElementById("post-comment-body").className = "form-control form-control-sm";
        }
        else if (!body) {
            document.getElementById("body-error").className = "d-block text-danger";
            document.getElementById("post-comment-body").className = "form-control form-control-sm is-invalid";
            document.getElementById("name-error").className = "d-none text-danger";
            document.getElementById("post-comment-name").className = "form-control form-control-sm";
        }
        else if (name && body) {
            document.getElementById("name-error").className = "d-none text-danger";
            document.getElementById("body-error").className = "d-none text-danger";
            document.getElementById("post-comment-name").className = "form-control form-control-sm";
            document.getElementById("post-comment-body").className = "form-control form-control-sm";

            // Requirement: POST call
            await fetch(
                `http://localhost:3000/comments`, {
                method: "POST",
                body: JSON.stringify({
                    album_id: albumId,
                    name: name,
                    body: body,
                    timestamp: timestamp,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                }
            );

            const response = await fetch (`http://localhost:3000/comments`);
            const commentData = await response.json();
            const findPostedComment = commentData.filter(comment => comment.timestamp == timestamp);
            const id = findPostedComment[0].id;

            onSubmit(name, body, timestamp, id);

            // Requirement: Toastify Notification
            toast.success('Comment successfully posted!', {
                position: toast.POSITION.TOP_RIGHT
            });
            document.getElementById("post-comment-name").value = "";
            document.getElementById("post-comment-body").value = "";
        }
    }

    return (
        <>
            <ToastContainer />
            <form onSubmit={submit}>
                <div className="form-group">
                    <label for="post-comment-name">Name</label>
                    <input id="post-comment-name" name="post-comment-name" className="form-control form-control-sm" type="text" />
                    <div id="name-error" className="d-none text-danger">{errorSelect}</div>

                    <label for="post-comment-body">Body</label>
                    <textarea id="post-comment-body" name="post-comment-body" className="form-control" rows="3" placeholder="Leave a comment..." />
                    <div id="body-error" className="d-none text-danger">{errorSelect}</div>
                </div>
                <button id="comment-submit" className="btn btn-light" type="submit">Post Comment</button> 
            </form>
        </>
    )
}