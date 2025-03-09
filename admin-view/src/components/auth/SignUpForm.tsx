import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { registerUser } from "../../api/auth";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // validation
  const validateForm = () => {
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error); // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await registerUser(username, password);
      if (response) {
        console.log("Registration successful:", response);
        navigate("/signin");
      } else {
        alert("Registration failed: User is already there");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({
        ...errors,
        password: "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your username and password to sign up!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Username */}
                <div>
                  <Label>
                    Username<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-error-500">{errors.username}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-error-500">{errors.password}</p>
                  )}
                </div>

                {/* Button */}
                <div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account? {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
