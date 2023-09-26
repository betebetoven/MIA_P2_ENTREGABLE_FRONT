import React, { useState } from "react";
import axios from "axios";
import FileList from "./dropdown";
import WebSocketLogs from "./connection";
import AuthComponent from "./AuthComponent";
import WebSocketStatus from "./status";

function TextSender() {
  const [inputText, setInputText] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [loading, setLoading] = useState(false);
  const [graphUrls, setGraphUrls] = useState([]);  // New state for graph URLs
  const token = "<Your Token Here>"; // Replace with actual token
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRespuesta("");
    setGraphUrls([]);  // Resetting the graphUrls state
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/query`,
        { input: inputText, documents: [] },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setRespuesta(response.data.received_text);
      
       // Update the state with the new URLs
      
    } catch (error) {
      setRespuesta("Error occurred: " + error.toString());
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="text-sender">
      
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your text here..."
      />
      <button className="content-button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Send Text"}
      </button>
      <div className="content-section"><WebSocketLogs/> </div>
      <FileList />
      <WebSocketStatus />
      <AuthComponent />
    </div>
  );
}

export default TextSender;
