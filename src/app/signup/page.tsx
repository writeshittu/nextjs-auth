'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string()
    .min(2, 'First name is too short')
    .max(50, 'First name is too long')
    .regex(/^[a-zA-Z\s-']+$/, 'First name contains invalid characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
});

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    try {
      signupSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle signup logic here
      // For demo purposes, redirect to signin
      signIn(undefined, { callbackUrl: '/signin' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-center text-2xl font-semibold mb-8">
          Sign up to read Stears
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black ${
                errors.firstName ? 'border-red-500' : ''
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg p-3 hover:bg-gray-800"
          >
            Sign up
          </button>
        </form>

        <div className="text-center mt-6">
          <button className="text-gray-600 hover:text-black">
            Sign in with social
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/signin" className="text-blue-600 hover:text-blue-800">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}