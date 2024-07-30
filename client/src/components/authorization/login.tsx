"use client"

import { useState, FormEvent, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginInput {
  email: string;
  password: string;
}

const defaultValues: LoginInput = {
  email: "",
  password: "",
};

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInput, setLoginInput] = useState<LoginInput>(defaultValues);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInput((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post("https://task-management-server-phi-five.vercel.app/user/login", loginInput);
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
      toast.success("Logged in Successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        setError(axiosError.response?.data?.message || 'An error occurred during login');
      } else {
        setError('An error occurred during login');
      }
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-300 flex items-center justify-center">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome to <span className="text-violet-600">Workflo</span>!
        </h1>
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4"
          >
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginInput.email}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter your email"
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6 relative"
          >
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={loginInput.password}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </motion.div>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition-colors"
            type="submit"
          >
            Login
          </motion.button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-violet-600 hover:underline">
            Create a new account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;