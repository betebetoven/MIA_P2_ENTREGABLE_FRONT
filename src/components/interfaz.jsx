import React, { useState } from "react";
import axios from "axios";
import FileList from "./dropdown";

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
      
      const graphs = response.data.graphs || [];  // Assume that response.data.graphs contains the list of GraphViz codes
      const urls = graphs.map(graph => 
        `https://quickchart.io/graphviz?format=png&graph=${encodeURIComponent(graph)}`
      );  // Generate URLs for QuickChart
      setGraphUrls(urls);  // Update the state with the new URLs
      
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
      <p>{respuesta}</p>
      
      {/* Rendering the graphs */}
      {graphUrls.map((url, index) => (
        <img key={index} src={url} alt={`Graph ${index + 1}`} />
      ))}
      <div className="content-section"></div>
      <FileList />
    </div>
  );
}

export default TextSender;
