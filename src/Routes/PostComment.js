import {Form, Outlet} from "react-router-dom";

export default function PostComment() {
    const d = new Date();
    const timestamp = d[Symbol.toPrimitive]('string').slice(0, 24);
        
    return (
        <Form method="post">
            <div className="form-group">
                <label for="comment-name">Name</label>
                <input id="comment-name" name="comment-name" className="form-control form-control-sm" type="text"/>

                <label for="comment-body">Body</label>
                <textarea id="comment-body" name="comment-body" className="form-control" rows="3" placeholder="Leave a comment..."/>

                <input id="comment-time" name="comment-time" className="d-none form-control" type="text" value={timestamp}/>
            </div>
            <button id="comment-submit" className="btn btn-primary" type="submit">Submit</button>
        </Form>
        // <Outlet/>
    )
}