import { useState } from "react";
import axios from "axios";
import "daisyui";
import TermsAndConditions from "../components/TermsAndConditions";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function App() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuth = async (endpoint) => {
    try {
      const res = await API.post(`/${endpoint}`, form);
      if (endpoint === "login") {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        setMode("data");
      } else {
        setMessage("Registration successful! Please login.");
        setMode("login");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Error");
    }
  };

  const handleInsertData = async () => {
    try {
      const res = await API.post("/data", { value: form.value });
      setMessage("Data inserted: " + JSON.stringify(res.data.data));
    } catch (err) {
      setMessage("Insert failed: " + err.response?.data?.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await API.get("/me");
      setUser(res.data);
      setMessage("");
    } catch (err) {
      setMessage("Token invalid or expired");
      localStorage.removeItem("token");
      setUser(null);
      setMode("login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setMode("login");
  };

  return (
    <>
      <div
        className="min-h-screen bg-white z-0 flex flex-col items-center justify-center p-4"
        style={{
          backgroundImage: "url('/login.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Optional overlay */}
        <div className=" w-full h-full bg-cover  bg-white/60 z-10"></div>

        <div className=" relative z-20 w-full max-w-md shadow-xl bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl text-white font-bold text-center mb-4">
            {mode === "register"
              ? "Register"
              : mode === "login"
              ? "Login"
              : mode === "profile"
              ? "Profile"
              : "Insert Data"}
          </h2>

          {mode === "register" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAuth("register");
              }}
              className="form-control space-y-3 "
            >
              <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
                className="input input-bordered"
              />
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="input input-bordered bg-slate-500 text-white"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="input input-bordered bg-slate-500 text-white"
              />
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          )}

          {mode === "login" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAuth("login");
              }}
              className="form-control space-y-3"
            >
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="input input-bordered bg-slate-500 text-white"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="input input-bordered bg-slate-500 text-white"
              />
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          )}

          {mode === "data" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleInsertData();
              }}
              className="form-control space-y-3"
            >
              <input
                name="value"
                placeholder="Enter some data"
                onChange={handleChange}
                required
                className="input input-bordered bg-slate-500 text-white"
              />
              <button type="submit" className="btn btn-accent">
                Insert
              </button>
            </form>
          )}

          {mode === "profile" && (
            <div className="space-y-4">
              <button onClick={fetchProfile} className="btn btn-info">
                Load My Info
              </button>
              {user && (
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                  {/* {JSON.stringify(user, null, 2)} */}
                  <h1 className=" text-black ">{user.name}</h1>
                  <h3 className=" text-gray-800">{user.email}</h3>
                </pre>
              )}
            </div>
          )}

          {message && (
            <p className="mt-4 text-center text-red-600">{message}</p>
          )}

          <hr className="my-4" />

          <div className="flex justify-around">
            {!user && (
              <button
                onClick={() => setMode("register")}
                className="btn btn-sm"
              >
                Register
              </button>
            )}
            {!user && (
              <button onClick={() => setMode("login")} className="btn btn-sm">
                Login
              </button>
            )}
            {user && (
              <button onClick={() => setMode("data")} className="btn btn-sm">
                Insert
              </button>
            )}
            {user && (
              <button onClick={() => setMode("profile")} className="btn btn-sm">
                Profile
              </button>
            )}
            {user && (
              <button
                onClick={logout}
                className="btn btn-sm btn-outline btn-error"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="m-4">
        <TermsAndConditions></TermsAndConditions>
      </div>
    </>
  );
}
