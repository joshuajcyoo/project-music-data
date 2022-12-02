import { useLoaderData } from "react-router-dom";
import { useState } from "react";

export default function Admin() { 
    const allUsers = useLoaderData();

    const emptyFields = "Fields must not be left blank.";
    const invalidEmail = "No account exists with the entered email.";
    const invalidPassword = "Password is incorrect.";

    const [loginClass, setLoginClass] = useState("");
    const [adminClass, setAdminClass] = useState("d-none");

    const [allComments, setAllComments]  = useState([]);
    
    const loginSubmit = async (event) => {
        event.preventDefault();

        const email = document.getElementById("login-email");
        const password = document.getElementById("login-password");

        if (!email.value) {
            document.getElementById("email-error").className = "d-block text-danger";
        }
        if (!password.value) {
            document.getElementById("password-error").className = "d-block text-danger";
        }
        if (email.value && password.value) {
            document.getElementById("email-error").className = "d-none text-danger";
            document.getElementById("password-error").className = "d-none text-danger";

            const findEmail = allUsers.filter(user => user.email === email.value);
            if (findEmail.length === 0) {
                document.getElementById("invalid-email").className = "text-danger";
            }
            else if (findEmail.length === 1) {
                document.getElementById("invalid-email").className = "d-none text-danger";

                if (findEmail[0].password != password.value) {
                    document.getElementById("invalid-password").className = "text-danger";
                }
                else {
                    document.getElementById("invalid-password").className = "d-none text-danger";

                    setLoginClass("d-none");
                    setAdminClass("");

                    const response = await fetch('http://localhost:3000/comments');
                    const commentData = await response.json();

                    setAllComments(commentData);
                }
            }
        }
    }

    return (
        <div id="admin">
            <div id="login-page" className={loginClass}>
                <h1>Login</h1>
                <form onSubmit={loginSubmit}>
                    <div className="form-group">
                        <label for="login-email">Email</label>
                        <input id="login-email" name="login-email" className="form-control form-control-sm" type="email"/>
                        <div id="email-error" className="d-none text-danger">{emptyFields}</div>
                        <div id="invalid-email" className="d-none text-danger">{invalidEmail}</div>

                        <label for="login-password">Password</label>
                        <input id="login-password" name="login-password" className="form-control form-control-sm" type="password"/>
                        <div id="password-error" className="d-none text-danger">{emptyFields}</div>
                        <div id="invalid-password" className="d-none text-danger">{invalidPassword}</div>
                        
                        <button className="btn btn-sm btn-primary" id="login-button">Login</button>
                    </div>
                </form>
            </div>

            <div id="admin-page" className={adminClass}>
                <h1>Admin</h1>
                <ul>
                    {allComments.map((comment) => {
                        return (
                            <li>{comment.body}</li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}