import { useState, useContext } from "react";
import { X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import OTPModal from "./OTPModal";
import api from "../api";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const payload =
        mode === "login"
          ? { email: formData.email, password: formData.password }
          : formData;

      const response = await api.post(endpoint, payload);

      if (response.data.success) {
        if (mode === "register") {
          // Show OTP modal for registration
          toast.success(response.data.message);
          setRegisteredEmail(formData.email);
          setShowOTPModal(true);
          onClose();
        } else {
          // Direct login
          login(response.data.token, response.data.user);
          toast.success("Login successful!");
          onClose();
          setFormData({ name: "", email: "", password: "" });
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setError(errorMsg);
      toast.error(errorMsg);

      // If email is not verified, resend OTP and show modal
      if (errorMsg === "Please verify your email first") {
        try {
          // Set email immediately so modal has it
          setRegisteredEmail(formData.email);

          await api.post("/auth/resend-otp", { email: formData.email });
          toast.success("Verification code resent. Please check your email.");
          setShowOTPModal(true);
        } catch (resendErr) {
          toast.error("Failed to resend verification code");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerified = (token, user) => {
    login(token, user);
    toast.success("Email verified successfully! Welcome to EventHub!");
    setShowOTPModal(false);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/google", {
        idToken: credentialResponse.credential,
      });

      if (response.data.success) {
        login(response.data.token, response.data.user);
        onClose();
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
    setFormData({ name: "", email: "", password: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-slate-600 mb-6">
            {mode === "login"
              ? "Sign in to access your account"
              : "Join us to discover amazing events"}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="outline"
              size="large"
              text={mode === "login" ? "signin_with" : "signup_with"}
              width="100%"
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={switchMode}
                className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        email={registeredEmail}
        onVerified={handleOTPVerified}
      />
    </div>
  );
};

export default AuthModal;
