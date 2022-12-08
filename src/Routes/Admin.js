import { Outlet, Link, useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditAlbum from "./EditAlbum";
import Modal from "../Modal";

export default function Admin() { 
    document.tite = "Admin";
    
    // Login Variables
    const allUsers = useLoaderData();
    const emptyFields = "Fields must not be left blank.";
    const invalidEmail = "No account exists with the entered email.";
    const invalidPassword = "Password is incorrect.";
    const [loginClass, setLoginClass] = useState("");
    const [adminClass, setAdminClass] = useState("d-none");

    // Admin Variables
    const [isAlbumSet, setIsAlbumSet] = useState(false);
    const [allComments, setAllComments]  = useState([]);
    const [noneChecked, setNoneChecked] = useState(true);
    const [allChecked, setAllChecked] = useState(false);
    const [allAlbums, setAllAlbums] = useState([]);
    const [modalState, setModalState] = useState(false);
    
    const compareTime = (a, b) => {
        const aTime = new Date(a.timestamp);
        const bTime = new Date(b.timestamp);        
        return bTime - aTime;
    }

    const compareId = (a, b) => {        
        return b.id - a.id;
    }
    
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

                    const commentResponse = await fetch('http://localhost:3000/comments');
                    const commentData = await commentResponse.json();
                    setAllComments(commentData.sort(compareTime));

                    const albumResponse = await fetch('http://localhost:3000/albums');
                    const albumData = await albumResponse.json();
                    setAllAlbums(albumData.sort(compareId));
                }
            }
        }
    }

    const testCheckboxes = () => {
        const grabAllComments = document.getElementsByClassName('admin-comment-check');

        let testNoneChecked = true;
        let testAllChecked = true;
        for (let comment of grabAllComments) {
            if (comment.checked) {
                testNoneChecked = false;
            }
            if (!comment.checked) {
                testAllChecked = false;
            }
        }
        console.log("Test All Checked: " + testAllChecked);
        console.log("Test None Checked: " + testNoneChecked);
        setNoneChecked(testNoneChecked);
        setAllChecked(testAllChecked);
    }

    const selectAll = () => {
        if (!allChecked) {
            const grabAllComments = document.getElementsByClassName('admin-comment-check');
            for (let comment of grabAllComments) {
                comment.checked = true;
            }
            testCheckboxes();
        }
        else if (allChecked) {
            const grabAllComments = document.getElementsByClassName('admin-comment-check');
            for (let comment of grabAllComments) {
                comment.checked = false;
            }
            testCheckboxes();
        }
    }

    const deleteComments = async (event) => {
        event.preventDefault();

        setModalState(false);

        const grabAllComments = document.getElementsByClassName('admin-comment-check');
        let selectedComments = [];
        for (let comment of grabAllComments) {
            if (comment.checked) {
                selectedComments.push(comment);
            }
        }
        console.log(selectedComments);

        for (let commentDelete of selectedComments) {
            const commentId = parseInt(commentDelete.value);
            console.log(`http://localhost:3000/comments/${commentId}`);
        //     await fetch(
        //         `http://localhost:3000/comments/${commentId}`, 
        //         {method: "DELETE"}
        //     );
        }

        let toastMessage;
        if (selectedComments.length == grabAllComments.length) {
            toastMessage = "ALL COMMENTS SUCCESSFULLY DELETED!"
        }
        else if (selectedComments.length < grabAllComments.length) {
            toastMessage = "Comment(s) successfully deleted!"
        }
        toast.error(toastMessage, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const displayEditForm = (uniqueId, isAlbumSet) => {
        if (!isAlbumSet) {
            console.log("Clicked on album.");
            document.getElementById(uniqueId).className = "";
            setIsAlbumSet(true);
        }
        else {
            console.log("Clicked off album.");
            document.getElementById(uniqueId).className = "d-none";
            setIsAlbumSet(false);
        }
        
    }

    useEffect(() => {
        if (allChecked) {
            document.getElementById("admin-select-all").indeterminate = false;
            document.getElementById("admin-select-all").checked = true;
            console.log("All Checked");
        }
        else if (noneChecked) {
            document.getElementById("admin-select-all").indeterminate = false;
            document.getElementById("admin-select-all").checked = false;
            console.log("None Checked");
        }
        else {
            console.log("Some Checked");
            document.getElementById("admin-select-all").indeterminate = true;
            document.getElementById("admin-select-all").checked = false;
        }
    }, [noneChecked, allChecked, isAlbumSet])

    return (
        <div id="admin">
            <ToastContainer />
            {/* Login Page */}
            <div id="login-page" className={loginClass}>
                <h1>Admin Access</h1>
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

            {/* Admin Page */}
            <div id="admin-page" className={adminClass}>
                <h1>Admin</h1>
                <h4 id="admin-comments-header">Manage Comments</h4>
                <form onSubmit={deleteComments} id="admin-comments-form">
                    <input className="form-check-input" type="checkbox" id="admin-select-all" onChange={selectAll}/>
                    <label id="admin-select-all-label" class="form-check-label" for="admin-select-all">Select All</label>
                    {allComments.map((comment) => {
                        const checkId = "comment-check-id" + comment.id;
                        return (
                            <div className="admin-comment-row">
                                <input 
                                    className="form-check-input admin-comment-check" type="checkbox" 
                                    value={comment.id} 
                                    id={checkId} 
                                    onChange={testCheckboxes}
                                />
                                <label class="form-check-label admin-comment-body" for={checkId}>
                                    {comment.body}
                                </label>
                                <div className="admin-comment-info">
                                    <div><u>User</u>: {comment.name}</div>
                                    <div>{comment.timestamp}</div>
                                </div>
                            </div>
                        );
                    })}
                {noneChecked ? 
                    (<div>
                        Select comments to delete.
                    </div>) :
                    (<div>
                        <button type="button" className="btn btn-sm btn-danger" onClick={() => {
                            setModalState(!modalState);
                        }}>Delete</button>
                        {modalState && (
                            <Modal 
                                onClick={deleteComments}
                                onClose={() => {setModalState(false)}}/>
                        )}
                    </div>)
                }
                </form>
                
                <div id="edit-albums">
                    <h4>Edit Album Info</h4>
                    <table id="admin-album-table" className="table table-sm table-hover w-50">
                        <thead>
                            <tr>
                                <th className="th-album-admin">Album</th>
                                <th className="th-artist-admin">Artist</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allAlbums.map((album) => {
                            const uniqueId = "display-album" + album.id;
                            return (
                                <tr>
                                    <td>
                                        <div className="edit-album-click" onClick={() => {
                                                displayEditForm(uniqueId, isAlbumSet);
                                            }}
                                        >{album.album}</div>
                                        <div className="d-none" id={uniqueId}>
                                            <EditAlbum 
                                                id={album.id} 
                                                album={album.album}
                                                artist={album.artist}
                                                release_date={album.release_date}
                                                genre={album.genre}
                                                number_of_tracks={album.number_of_tracks}
                                                score={album.score}
                                            />
                                        </div>
                                    </td>
                                    <td>{album.artist}</td>
                                </tr>
                            );
                            })}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}