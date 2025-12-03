import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [form, setForm] = useState({ name: "", email: "" });
  const nav = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!form.name.trim() || !form.email.trim()) {
      alert("Please enter name and email");
      return;
    }
    try {
      await API.post("/users", form);
      nav("/");
    } catch (err) {
      console.error("Create failed", err);
      alert("Failed to create user");
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} type="text" />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} type="email" />
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
