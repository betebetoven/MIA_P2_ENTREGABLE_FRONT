import React, { useEffect, useState } from "react";

function WebSocketLogs() {
    const [logs, setLogs] = useState([]);
    
    useEffect(() => {
        const socket = new WebSocket(`${process.env.REACT_APP_API_BASE_URL_WS}/ws/logs`);
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'log') {
                setLogs((prevLogs) => [...prevLogs, data.message]);
            }
        };
        return () => socket.close();
    }, []);
    
    const createMarkup = (log) => {
        return {__html: '<pre>' + log + '</pre>'};
    };

    return (
        <div>
            <h2>Server Logs:</h2>
            <ul>
                {
                    logs.map((log, index) => (
                        <li key={index} dangerouslySetInnerHTML={createMarkup(log)} />
                    ))
                }
            </ul>
        </div>
    );
}

export default WebSocketLogs;
