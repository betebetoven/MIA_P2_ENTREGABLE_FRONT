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
    
    const textLines = inputText.split('\n').filter(line => line.trim() !== "" && line !== "\n");
    //alert(textLines)


    let combinedResponseText = "";
    //alert(textLines)
    for (const line of textLines) {
      if (line.trim() === "pause") {
        const userConfirmed = window.confirm("Please confirm to continue sending the text to the server");
        if (!userConfirmed) {
          // If user declines, break out of the loop and stop processing
          break;
        }
        // If user confirms, we don't send the "pause" to the server and just continue to the next line
        continue;
      }
      if (line.trim().startsWith("#")) {
        continue;
      }
      
  
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/query`,
          { input: line+"\n", documents: [] },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        combinedResponseText += response.data.received_text + '\n';
      } catch (error) {
        combinedResponseText += "Error occurred for a line: " + error.toString() + '\n';
      }
    }
  
    setRespuesta(combinedResponseText);
    setLoading(false);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputText(e.target.result);
      };
      reader.readAsText(file);
    } else {
      setInputText("");
      alert("Please upload a valid text file");
    }
  };
  
  return (
    <div className="text-sender">
      <div className="content-section"><WebSocketLogs/> </div>
       <input className="content-button" type="file" onChange={handleFileChange} accept=".txt" />
       <div className="content-section"> </div>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your text here..."
      />
      <button className="content-button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Send Text"}
      </button>
      
      <FileList />
      <WebSocketStatus />
      <AuthComponent />
    </div>
  );
}

export default TextSender;
