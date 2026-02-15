import { useEffect, useState } from "react";
import "./Settings.scss";
import Swal from "sweetalert2";
import { FaTrashAlt, FaCamera, FaEdit } from "react-icons/fa";



const ProfileSettings = () => {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // fetch logged-in user
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/settings`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  // update name & phone
  const updateProfile = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/settings/update`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        phone: user.phone
      })
    });

    if (res.ok) {
      Swal.fire("Saved", "Profile updated successfully", "success");
      setEditMode(false);
    }
  };

  // upload avatar
  const uploadAvatar = async () => {
    if (!avatar) return;

    const fd = new FormData();
    fd.append("avatar", avatar);

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/settings/avatar`, {
      method: "PUT",
      credentials: "include",
      body: fd
    });

    if (res.ok) {
      Swal.fire("Updated", "Profile image updated", "success");
    }
  }

  // delete account
  const deleteAccount = async () => {
    const confirm = await Swal.fire({
      title: "Delete account?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d11a2a"
    });

    if (!confirm.isConfirmed) return

    await fetch(`${process.env.REACT_APP_API_URL}/api/settings/delete`, {
      method: "DELETE",
      credentials: "include"
    });

    window.location.href = "/";
  };

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* LEFT SIDE */}
        <div className="profile-left">
          <div className="avatar-wrapper">
            <img src={user.avatar || "./images/user/userIcon.jpg"} alt="profile" />

            <label className="camera-icon">
              <FaCamera />
              <input
                type="file"
                hidden
                onChange={e => setAvatar(e.target.files[0])}
              />
            </label>
          </div>

          <button className="upload-btn" onClick={uploadAvatar}>
            Change photo
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="profile-right">

          {/* USER DETAILS */}
          <div className="profile-info">
            <div>
              <span>Name</span>
              <p>{user.name}</p>
            </div>

            <div>
              <span>Email</span>
              <p>{user.email}</p>
            </div>

            <div>
              <span>Phone</span>
              <p>{user.phone || "Not added"}</p>
            </div>
          </div>

          {/* EDIT */}
          <div className="edit-row" onClick={() => setEditMode(!editMode)}>
            <FaEdit />
            <span>Edit Profile</span>
          </div>

          {editMode && (
            <div className="edit-box">
              <input
                type="text"
                placeholder="Full Name"
                value={user.name || ""}
                onChange={e => setUser({ ...user, name: e.target.value })}
              />

              <input
                type="text"
                placeholder="Phone"
                value={user.phone || ""}
                onChange={e => setUser({ ...user, phone: e.target.value })}
              />

              <button onClick={updateProfile}>
                Save Changes
              </button>
            </div>
          )}

          {/* DELETE */}
          <div className="danger-zone" onClick={deleteAccount}>
            <FaTrashAlt />
            <span>Delete Account</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
