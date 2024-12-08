
"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";

const LandingPage = () => {
  // Animation Variants
  const textVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  const containerVariant = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-gray-50">
      {/* Landing Section */}
      <div className="flex flex-col md:flex-row items-center w-full py-12 px-6 md:px-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <motion.div
          className="w-full md:w-1/2"
          variants={textVariant}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Manage Your Gym with Ease
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            A modern platform to manage gym operations, track members, monitor
            employee, and streamline all processes effortlessly.
          </p>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 sm:px-16">
        <motion.div
          className="w-full max-w-6xl mx-auto"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
            Features That Simplify Gym Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center"
              variants={cardVariant}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                Member Tracking
              </h3>
              <p className="text-gray-600">
                Easily track member attendance, subscriptions, and activity
                levels in one place.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center"
              variants={cardVariant}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                Employee Management
              </h3>
              <p className="text-gray-600">
                Monitor employee performance, manage schedules, and assign
                tasks effortlessly.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center"
              variants={cardVariant}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                Financial Insights
              </h3>
              <p className="text-gray-600">
                Gain clear insights into revenue, expenses, and member
                subscriptions with detailed reports.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Pricing Section */}
      <motion.div
        className="py-16 bg-gray-100 w-full"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
          Flexible Pricing for Every Gym
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-11/12 max-w-7xl mx-auto">
          {/* Free Plan */}
          <motion.div
            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center"
            variants={cardVariant}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Free Plan
            </h3>
            <p className="text-xl text-gray-700 font-semibold mb-6">Free</p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>Up to 100 Members</li>
              <li>Up to 5 Employees</li>
              <li>Basic Member Tracking</li>
            </ul>
          </motion.div>

          {/* Professional Plan */}
          <motion.div
            className="bg-blue-600 text-white p-6 sm:p-8 rounded-lg shadow-lg text-center relative"
            variants={cardVariant}
          >
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
              Best Value
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Professional
            </h3>
            <p className="text-xl font-semibold mb-6">$19/month</p>
            <ul className="space-y-2 mb-6">
              <li>Up to 500 Members</li>
              <li>Up to 20 Employees</li>
              <li>Advanced Reports</li>
            </ul>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center"
            variants={cardVariant}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Enterprise
            </h3>
            <p className="text-xl text-gray-700 font-semibold mb-6">$39/month</p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>Unlimited Members</li>
              <li>Unlimited Employees</li>
              <li>Payment Integrations</li>

            </ul>
          </motion.div>
        </div>
      </motion.div>
      <div className="flex items-center justify-center w-full mb-10">
            <Link href={'/sign-up'}>
            <Button>
              Get Started
            </Button>
            </Link>
          </div>

          <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center">
            <p className="text-sm text-gray-400">
              © 2024 GymManager All Rights Reserved.
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-x-4 mt-6 md:mt-0">
            <Link href="#features" className="text-gray-400 hover:text-white">Features</Link>
            <Link href="#pricing" className="text-gray-400 hover:text-white">Pricing</Link>
            <Link href="#about" className="text-gray-400 hover:text-white">About</Link>
            <Link href="#contact" className="text-gray-400 hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
