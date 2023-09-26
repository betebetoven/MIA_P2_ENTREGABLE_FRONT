import React, { useState } from "react";
import axios from "axios";

function AuthComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const formattedText = `login -user=${username} -pass=${password} -id=${id}`;
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/query`,
        { input: formattedText }
      );
      // assuming that the server sends back a response indicating a successful login
      setLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/query`,
        { input: "logout" }
      );
      // assuming that the server sends back a response indicating a successful logout
      setLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="search-bar">
      {!isLoggedIn ? (
        <>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="ID" 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
          />
          <button className="content-button" onClick={handleLogin}>Login</button>
        </>
      ) : (
        <button className="content-button" onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default AuthComponent;
