import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  // validation
  const validateForm = () => {
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await loginUser(username, password);
      if (response && response.data) {
        console.log("Login successful:", response.data);

        login(response?.data?.accessToken, response?.data?.username);
        navigate("/");
      } else {
        alert("Login failed: User not found");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ ...errors, password: "Invalid username or password" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div>
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your username and password to sign in!
            </p>
          </div>
          <div>
            <div className="relative py-3 sm:py-2"></div>
            <form id="signin-form" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="Wanidu hasaranga"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && (
                    <p className="text-sm text-error-500">{errors.username}</p>
                  )}
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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

                <div>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => {
                      const form = document.getElementById("signin-form");
                      form?.dispatchEvent(
                        new Event("submit", { cancelable: true, bubbles: true })
                      );
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
