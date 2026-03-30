import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [role, setRole] = useState("cashier");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (role === "cashier") {
        if (pin.length !== 4) throw new Error("PIN must be exactly 4 digits");
        if (pin !== "1234" && pin !== "5678") throw new Error("Invalid PIN");
        login({ username: `cashier-${pin}`, role });
      } else {
        if (!username || !password) throw new Error("Username and password required");
        if (password.length !== 4) throw new Error("Password must be exactly 4 digits");
        if (
          (username === "admin" && password === "1234") ||
          (username === "manager" && password === "5678")
        ) {
          login({ username, role });
        } else {
          throw new Error("Invalid credentials");
        }
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: "admin", label: "Admin", icon: "⚙️" },
    { value: "manager", label: "Manager", icon: "📋" },
    { value: "cashier", label: "Cashier", icon: "🧾" },
  ];

  /* ── PIN dot indicator ── */
  const PinDots = ({ value, max = 4 }: { value: string; max?: number }) => (
    <div className="flex gap-4 justify-center py-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
            i < value.length
              ? "bg-amber-400 border-amber-400 scale-110"
              : "bg-transparent border-slate-600"
          }`}
        />
      ))}
    </div>
  );

  /* ── Number pad ── */
  const NumPad = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (v: string) => void;
  }) => {
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];
    return (
      <div className="grid grid-cols-3 gap-2 mt-3">
        {keys.map((k, i) =>
          k === "" ? (
            <div key={i} />
          ) : (
            <button
              key={k}
              type="button"
              disabled={loading}
              onClick={() => {
                if (k === "⌫") {
                  onChange(value.slice(0, -1));
                } else if (value.length < 4) {
                  onChange(value + k);
                }
              }}
              className={`h-12 rounded-xl font-bold text-lg transition-all duration-100 active:scale-95 select-none
                ${
                  k === "⌫"
                    ? "bg-slate-700 text-red-400 hover:bg-red-950 border border-slate-600 hover:border-red-700"
                    : "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 hover:border-amber-500 hover:text-amber-400"
                } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {k}
            </button>
          )
        )}
      </div>
    );
  };

  return (
    <div
      className="relative flex min-h-screen overflow-hidden"
      style={{ fontFamily: "'DM Mono', 'Courier New', monospace" }}
    >
      {/* ══ BACKGROUND ══ */}
      <div className="absolute inset-0 bg-slate-950">
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Dotted overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(#f59e0b 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Amber glow — top-left */}
        <div className="absolute -top-40 -left-40 w-[560px] h-[560px] bg-amber-400 rounded-full opacity-[0.10] blur-[90px]" />
        {/* Amber glow — bottom-right */}
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-amber-500 rounded-full opacity-[0.08] blur-[100px]" />
        {/* Cool blue accent — mid-right */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-sky-600 rounded-full opacity-[0.05] blur-[70px]" />
        {/* Diagonal amber beam across center */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, #f59e0b 50%, transparent 70%)",
          }}
        />
      </div>

      {/* ══ LEFT BRANDING PANEL ══ */}
      <div className="hidden lg:flex relative w-[46%] flex-col justify-between p-14 overflow-hidden">
        {/* Right-edge amber line */}
        <div className="absolute top-0 right-0 w-px h-full bg-amber-400 opacity-20" />
        {/* Top-left corner bracket */}
        <div className="absolute top-10 left-10 w-14 h-14 border-t-2 border-l-2 border-amber-400 opacity-25" />
        {/* Bottom-right corner bracket */}
        <div className="absolute bottom-10 right-14 w-14 h-14 border-b-2 border-r-2 border-amber-400 opacity-25" />
        {/* Giant watermark */}
        <div className="absolute -bottom-4 -left-6 text-[220px] font-black text-white opacity-[0.025] leading-none select-none tracking-tighter pointer-events-none">
          HH
        </div>

        {/* Logo mark */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 bg-amber-400 flex items-center justify-center">
            <span className="text-slate-950 font-black text-xl leading-none">H</span>
          </div>
          <div>
            <p className="text-white font-black text-lg tracking-[0.12em] uppercase leading-none">
              Hardware Hub
            </p>
            <p className="text-amber-400 text-[10px] tracking-[0.4em] uppercase font-bold mt-0.5">
              Point of Sale
            </p>
          </div>
        </div>

        {/* Hero headline */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[3px] bg-amber-400" />
            <span className="text-amber-400 text-[10px] tracking-[0.4em] uppercase font-black">
              Terminal v2.0
            </span>
          </div>
          <h1 className="text-white font-black text-[54px] leading-[1.0] tracking-tight mb-6">
            POWER
            <br />
            YOUR
            <br />
            <span className="text-amber-400">STORE.</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[260px]">
            A complete point-of-sale system for hardware retailers. Fast, reliable, and built for the floor.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10">
          <div className="w-full h-px bg-slate-800 mb-6" />
          <div className="flex gap-10">
            {[
              { label: "Uptime", value: "99.9%" },
              { label: "Support", value: "24/7" },
              { label: "Sync", value: "Live" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-amber-400 font-black text-2xl">{s.value}</p>
                <p className="text-slate-500 text-[10px] uppercase tracking-[0.25em] font-bold mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ RIGHT FORM PANEL ══ */}
      <div className="relative flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-[390px]">
          {/* Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Amber top bar */}
            <div className="h-1 w-full bg-amber-400" />

            <div className="p-8">
              {/* Mobile logo */}
              <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
                <div className="w-9 h-9 bg-amber-400 flex items-center justify-center">
                  <span className="text-slate-950 font-black text-base">H</span>
                </div>
                <span className="text-white font-black text-lg tracking-widest uppercase">
                  Hardware Hub
                </span>
              </div>

              {/* Heading */}
              <div className="mb-6">
                <h2 className="text-white font-black text-3xl tracking-tight">Sign In</h2>
                <p className="text-slate-500 text-[10px] tracking-[0.2em] uppercase font-bold mt-1">
                  Select your role to continue
                </p>
              </div>

              {/* Role pills */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => {
                      setRole(r.value);
                      setError("");
                      setPin("");
                      setPassword("");
                      setUsername("");
                    }}
                    className={`py-3 px-2 rounded-xl text-xs font-black tracking-wider border-2 transition-all duration-150 flex flex-col items-center gap-1.5 uppercase
                      ${
                        role === r.value
                          ? "bg-amber-400 border-amber-400 text-slate-950"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
                      }`}
                  >
                    <span className="text-base">{r.icon}</span>
                    {r.label}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-slate-800" />
                <span className="text-slate-600 text-[10px] tracking-widest uppercase font-bold">
                  {role === "cashier" ? "Enter PIN" : "Credentials"}
                </span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {role === "cashier" ? (
                  <div className="mb-4">
                    <div className="bg-slate-950 rounded-xl px-4 py-4 border-2 border-slate-700 mb-1">
                      <p className="text-slate-500 text-[10px] uppercase tracking-[0.25em] font-black text-center mb-3">
                        4-Digit PIN
                      </p>
                      <PinDots value={pin} max={4} />
                    </div>
                    <NumPad value={pin} onChange={setPin} />
                  </div>
                ) : (
                  <>
                    {/* Username */}
                    <div className="mb-4">
                      <label className="block text-slate-400 text-[10px] uppercase tracking-[0.25em] font-black mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border-2 border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={!loading}
                        disabled={loading}
                        autoComplete="off"
                      />
                    </div>

                    {/* Password — 4-digit numpad */}
                    <div className="mb-4">
                      <label className="block text-slate-400 text-[10px] uppercase tracking-[0.25em] font-black mb-2">
                        4-Digit Password
                      </label>
                      <div className="bg-slate-950 rounded-xl px-4 py-4 border-2 border-slate-700">
                        <PinDots value={password} max={4} />
                      </div>
                      <NumPad value={password} onChange={setPassword} />
                    </div>
                  </>
                )}

                {/* Error */}
                {error && (
                  <div className="mb-4 flex items-center gap-2 bg-red-950 border border-red-800 rounded-xl px-4 py-3">
                    <span className="text-red-400">⚠</span>
                    <p className="text-red-300 text-xs font-bold">{error}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={
                    loading ||
                    (role === "cashier"
                      ? pin.length !== 4
                      : !username || password.length !== 4)
                  }
                  className="w-full mt-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-4 rounded-xl tracking-[0.15em] uppercase text-sm transition-all duration-150 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
                >
                  {loading ? "Authenticating…" : "Access Terminal →"}
                </button>
              </form>

              <p className="text-slate-700 text-[10px] text-center mt-5 tracking-widest uppercase">
                Hardware Hub POS · v2.0 · {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;