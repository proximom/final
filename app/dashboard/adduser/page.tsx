'use client';

import React, { useState } from 'react';
import { createCustomer } from '@/app/lib/createcustomeraction'; // Ensure this path matches your project structure

interface Errors {
  name?: string[];
  email?: string[];
  imageUrl?: string[];
}

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('imageUrl', imageUrl);

    const result = await createCustomer({}, formData);

    if (result && result.errors) {
      setErrors(result.errors);
      setMessage(result.message);
    } else {
      setMessage('Customer created successfully.');
      setName('');
      setEmail('');
      setImageUrl('');
      setErrors({});
    }
  };

  return (
    <div className="flex h-screen justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="max-w-md w-full p-4 bg-black rounded-lg shadow-md">
        <h2 className="text-md font-bold mb-4">Create Customer</h2>
        {message && <div className="mb-4 text-red-500 text-sm">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name[0]}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm">
              Enter Email.....
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-gray-200 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.email ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email[0]}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2 text-sm">
              Enter Image URL.....
            </label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.imageUrl ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.imageUrl && <span className="text-red-500 text-xs">{errors.imageUrl[0]}</span>}
          </div>
          <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 text-sm">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
