import "./Modal.css";
import { createPortal } from "react-dom";

// Requirement: Modal
export default function Modal(props) {
    return createPortal(
        <>
            <div className="custom-modal-backdrop"></div>
            <div className="custom-modal">
                <div>Are you sure you want to delete these comment(s)?</div>
                <button type="button" className="btn btn-secondary btn-sm" onClick={props.onClose}>Cancel</button>
                <button type="button" className="btn btn-danger btn-sm"  onClick={props.onClick}>Delete</button>
            </div>
        </>,

        document.getElementById("modal-container")
    );
}