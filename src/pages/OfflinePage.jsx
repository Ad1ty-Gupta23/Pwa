import React from "react";
import { Link } from "react-router-dom";

function OfflinePage() {
  return (
    <div className="page offline-page">
      <header>
        <h1>Offline Mode</h1>
      </header>
      <div className="offline-message">
        <p>You are currently offline.</p>
        <p>Some features may not be available. Please check your internet connection.</p>
        <Link to="/" className="back-button">Go to Home</Link>
      </div>
    </div>
  );
}

export default OfflinePage;