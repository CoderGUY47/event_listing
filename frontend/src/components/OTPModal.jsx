import { useState, useEffect } from "react";
import { X } from "lucide-react";
import api from "../api";
import toast from "react-hot-toast";

const OTPModal = ({ isOpen, onClose, email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/verify-otp", { email, otp });

      if (response.data.success) {
        toast.success("Email verified successfully!");
        onVerified(response.data.token, response.data.user);
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);

    try {
      const response = await api.post("/auth/resend-otp", { email });

      if (response.data.success) {
        toast.success("New OTP sent to your email!");
        setTimer(600);
        setCanResend(false);
        setOtp("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Verify Your Email
            </h2>
            <p className="text-slate-600">
              We've sent a 6-digit code to
              <br />
              <span className="font-semibold text-slate-900">{email}</span>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Enter OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                className="w-full px-4 py-3 text-center text-2xl font-bold tracking-widest border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="000000"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">
                {timer > 0 ? (
                  <>
                    Time remaining:{" "}
                    <span className="font-semibold text-indigo-600">
                      {formatTime(timer)}
                    </span>
                  </>
                ) : (
                  <span className="text-red-600 font-semibold">
                    OTP Expired
                  </span>
                )}
              </span>
              {canResend && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                  className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors disabled:opacity-50"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-4">
            Didn't receive the code? Check your spam folder
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
