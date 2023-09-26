import React, { useEffect, useState } from "react";

function WebSocketStatus() {
    const [status, setStatus] = useState("");

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/ws/status");
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'log') {
                // Set the new message directly, replacing the old one.
                setStatus(data.message);
            }
        };
        return () => socket.close();
    }, []);
    
    const createMarkup = () => {
        return { __html: '<pre>' + status + '</pre>' };
    };

    return (
        <div>
            <h2>Server Status:</h2>
            <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
    );
}

export default WebSocketStatus;
