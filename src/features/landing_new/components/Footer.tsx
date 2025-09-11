import React from "react";

export default function Footer(){
    return (
        <footer className="footer">
            <div className="container">
                <div className="brand-line"><strong>VirtualHomeOpen</strong> — cinematic virtual tours & staging for agents</div>
                <div className="copyright">© {new Date().getFullYear()} VirtualHomeOpen. All rights reserved.</div>
            </div>
        </footer>
    );
}