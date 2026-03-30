import React, { useState } from "react";

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Cashier", value: "cashier" },
];

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("cashier");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add user creation logic (API call or local storage)
    alert(
      `User created:\nName: ${name}\nUsername: ${username}\nRole: ${role}\n` +
        (role === "cashier" ? `PIN: ${pin}` : `Password: ${password}`)
    );
    // Reset form
    setName("");
    setUsername("");
    setRole("cashier");
    setPassword("");
    setPin("");
    setPhone("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Add User</h2>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Username</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Role</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          {roles.map(r => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
      {role === "cashier" ? (
        <div className="mb-3">
          <label className="block mb-1 font-medium">PIN (4–6 digits)</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={pin}
            onChange={e => setPin(e.target.value)}
            maxLength={6}
            minLength={4}
            pattern="\d{4,6}"
            required
          />
        </div>
      ) : (
        <div className="mb-3">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
      )}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Phone (optional)</label>
        <input
          type="tel"
          className="w-full border rounded px-3 py-2"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Save
      </button>
    </form>
  );
};

const UsersPage = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <AddUserForm />
  </div>
);

export default UsersPage;
