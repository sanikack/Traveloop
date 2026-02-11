// import React from "react";


// const Settings = () =>{
//     return(
//         <div className="settings-container">
//             <h3>Settings</h3>

            
//         </div>
//     )
// }


// export default Settings;




import React, { useState } from "react";
import "./Settings.scss";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "Travel Admin",
    supportEmail: "support@travelapp.com",
    allowRegistration: true,
    autoApproveReviews: false,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Saved settings:", settings);
    alert("Settings saved successfully");
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      {/* General Settings */}
      <div className="settings-card">
        <h3>General Settings</h3>

        <label>
          Website Name
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
          />
        </label>

        <label>
          Support Email
          <input
            type="email"
            name="supportEmail"
            value={settings.supportEmail}
            onChange={handleChange}
          />
        </label>
      </div>

      {/* User Settings */}
      <div className="settings-card">
        <h3>User Management</h3>

        <div className="toggle-row">
          <span>Allow User Registration</span>
          <input
            type="checkbox"
            name="allowRegistration"
            checked={settings.allowRegistration}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Review Settings */}
      <div className="settings-card">
        <h3>Review Moderation</h3>

        <div className="toggle-row">
          <span>Auto-approve Reviews</span>
          <input
            type="checkbox"
            name="autoApproveReviews"
            checked={settings.autoApproveReviews}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Appearance */}
      <div className="settings-card">
        <h3>Appearance</h3>

        <div className="toggle-row">
          <span>Enable Dark Mode</span>
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="settings-footer">
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
