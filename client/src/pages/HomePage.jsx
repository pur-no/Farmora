// client/src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leading-none sm:text-5xl">
            Welcome to
            <span className="text-green-400"> Farmora</span>
          </h1>
          <p className="px-8 mt-8 mb-12 text-lg">
            The all-in-one solution for modern farm management. Track products,
            manage inventory, and gain insights to grow your business.
          </p>
          <div className="flex flex-wrap justify-center">
            <Link
              to="/dashboard"
              className="px-8 py-3 m-2 text-lg font-semibold rounded bg-green-600 hover:bg-green-700"
            >
              Get Started
            </Link>
            <Link
              to="/products"
              className="px-8 py-3 m-2 text-lg border rounded border-gray-700 hover:bg-gray-800"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 text-gray-800">
        <div className="container mx-auto p-4 space-y-2 text-center">
          <h2 className="text-3xl font-bold">Why Choose Farmora?</h2>
          <p className="text-gray-600">
            Everything you need to succeed in one place.
          </p>
        </div>
        <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 my-6">
          <div className="flex flex-col items-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8 text-green-600"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h3 className="my-3 text-xl font-semibold">Product Management</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>Easily add, edit, and track</p>
              <p>all your farm's products</p>
              <p>from one central dashboard.</p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8 text-green-600"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h3 className="my-3 text-xl font-semibold">User Authentication</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>Secure accounts for you and</p>
              <p>your team, with protected routes</p>
              <p>to keep your data safe.</p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8 text-green-600"
            >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <h3 className="my-3 text-xl font-semibold">Modern Interface</h3>
            <div className="space-y-1 leading-tight text-center">
              <p>A clean, responsive design that</p>
              <p>works beautifully on desktop,</p>
              <p>tablet, and mobile devices.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;