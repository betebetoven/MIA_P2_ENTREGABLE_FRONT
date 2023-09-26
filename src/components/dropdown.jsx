import React, { useEffect, useState } from "react";
import axios from "axios";
import SVGHandler from "./SVGHandler";

function FileList() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showPreview, setShowPreview] = useState(true); // Added state variable to manage the visibility of the preview
    
    useEffect(() => {
        axios.get("http://localhost:8000/list-files")
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => console.error("Error fetching the files: ", error));
    }, []);
    
    const handlePreviewClick = async () => {
        if (!selectedFile) return;

        // If a preview is already being displayed, hide it and exit the function
        if (preview && showPreview) {
            setPreview(null);
            setShowPreview(false);
            return;
        }
        
        try {
            const response = await axios.get(`http://localhost:8000/get-image/${selectedFile.path}`, { responseType: 'blob' });
            setPreview(URL.createObjectURL(response.data));
            setShowPreview(true); // Set to true to display the preview
        } catch (error) {
            console.error("Error fetching the image: ", error);
        }
    };
    
    return (
        <div>
            <h2>File List: Reportes</h2>
            <select className="content-button status-button open"
                defaultValue="" 
                onChange={(e) => setSelectedFile(e.target.value ? files.find(file => file.path === e.target.value) : null)}
            >
                <option className="content-button status-button open" value="" disabled hidden>Reportes</option>
                {files.map(file => (
                    <option className="content-button status-button open" key={file.name} value={file.path}>
                        {file.name}
                    </option>
                ))}
            </select>
            <button className="content-button" onClick={handlePreviewClick} disabled={!selectedFile}>{showPreview ? "Hide" : "Show"}</button>
            <div className="content-section"></div>
            {
  preview && showPreview && (
    selectedFile.is_svg
    ? <div className={"content-wrapper-header" + (showPreview ? " shown" : "")}><SVGHandler src={preview} /></div>
    : <div className={"content-wrapper-header" + (showPreview ? " shown" : "")}><img className="content-wrapper-img" src={preview} alt="Preview" /></div>
  )
}

        </div>
    );
}

export default FileList;
