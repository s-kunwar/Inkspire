import React, { useState } from 'react';
import { signUp } from '../services/authService';
import type { UserSignUp } from '../types';
import { SignUpIllustration } from './illustrations/SignUpIllustration';

interface SignUpProps {
  onSignUpSuccess: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUpSuccess }) => {
  const [formData, setFormData] = useState<UserSignUp>({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // FIX: Add missing handleChange function to update form state on input change.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await signUp(formData);
      if (response.success) {
        setMessage(response.message);
        setFormData({ name: '', email: '', password: '' });
        // Call the success handler after a short delay to allow user to read the message
        setTimeout(() => {
          onSignUpSuccess();
        }, 1000);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="signup" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center bg-slate-800 dark:bg-slate-800 rounded-lg p-8 md:p-12 shadow-2xl">
          <div className="md:w-1/2 text-white mb-8 md:mb-0 md:pr-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Inkspire Today</h2>
            <p className="text-slate-300 mb-8">
              Sign up to receive curated book recommendations, join our vibrant community, and start your journey towards more mindful reading.
            </p>
            <SignUpIllustration className="w-full h-auto max-w-sm mx-auto" />
          </div>
          <div className="md:w-1/2 w-full">
            <div className="bg-white dark:bg-slate-700 p-8 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 dark:hover:bg-teal-400 transition-all disabled:bg-slate-400"
                >
                  {loading ? 'Signing Up...' : 'Create Account'}
                </button>
              </form>
              {message && <p className="mt-4 text-center text-green-600 dark:text-green-500">{message}</p>}
              {error && <p className="mt-4 text-center text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;