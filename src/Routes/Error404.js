
// Requirement: 404 Page
export default function Error404() {
    document.title = "Error 404";
    
    return (
        <>
            <img src="/skullemoji.png" height="625" id="skull-emoji"/>
            <div id="msg-404"className="d-flex justify-content-center">You shouldn't be here...</div>
        </>
    );
}