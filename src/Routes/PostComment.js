import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PostComment(props) {
    // use onSubmit prop to pass new commment data to Comments.js
    const { onSubmit } = props;

    const params = useParams();
    const albumId = params.id;

    const errorSelect = "Fields must not be left blank.";

    const submit = async (event) => {
        event.preventDefault();

        const d = new Date();
        const timestamp = d[Symbol.toPrimitive]('string').slice(0, 24);

        const name = document.getElementById("comment-name").value;
        const body = document.getElementById("comment-body").value;

        if (!name) {
            document.getElementById("name-error").className = "d-block text-danger"
        }
        if (!body) {
            document.getElementById("body-error").className = "d-block text-danger"
        }
        if (name && body) {
            document.getElementById("name-error").className = "d-none text-danger"
            document.getElementById("body-error").className = "d-none text-danger"

            // FP Req: POST call
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

            onSubmit(name, body, timestamp);
            toast.success('Comment successfully posted!', {
                position: toast.POSITION.TOP_RIGHT
            });
            document.getElementById("comment-name").value = "";
            document.getElementById("comment-body").value = "";
        }
    }

    return (
        <>
            <ToastContainer />
            <form onSubmit={submit}>
                <div className="form-group">
                    <label for="comment-name">Name</label>
                    <input id="comment-name" name="comment-name" className="form-control form-control-sm" type="text" />
                    <div id="name-error" className="d-none text-danger">{errorSelect}</div>

                    <label for="comment-body">Body</label>
                    <textarea id="comment-body" name="comment-body" className="form-control" rows="3" placeholder="Leave a comment..." />
                    <div id="body-error" className="d-none text-danger">{errorSelect}</div>
                </div>
                <button id="comment-submit" className="btn btn-primary" type="submit">Submit</button>
            </form>
        </>
    )
}