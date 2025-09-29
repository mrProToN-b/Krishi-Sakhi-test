import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';

// Features page using functional component with hooks
const Features2 = () => {
    // useState hook for managing features data and loading state
    const [features, setFeatures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect hook for loading features data when component mounts
    useEffect(() => {
        // Simulate API call to fetch features data
        const loadFeatures = async () => {
            setIsLoading(true); // Set loading to true

            // Simulate API delay
            setTimeout(() => {
                // Set features data using useState
                setFeatures([
                    {
                        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-coins-icon lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" /><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 16 6 6" /><circle cx="16" cy="9" r="2.9" /><circle cx="6" cy="5" r="3" /></svg>,
                        title: 'Market Prices',
                        description: 'Live market rates for crops, vegetables, and agricultural products in your area.'
                    },
                    {
                        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-column-increasing-icon lucide-chart-column-increasing"><path d="M13 17V9" /><path d="M18 17V5" /><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M8 17v-3" /></svg>,
                        title: 'Farm Activity Tracking',
                        description: 'Track planting, harvesting, irrigation, and other farm activities with smart reminders.'
                    },
                    {
                        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2-icon lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg>,
                        title: 'Storage Booking',
                        description: 'Find and book nearby storage facilities for your harvest with transparent pricing.'
                    },
                    {
                        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap-icon lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" /><path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" /></svg>,
                        title: 'Farming Community',
                        description: 'Join a farmer network to share experiences, ask questions, and learn from experts and peers.'
                    },
                    {
                        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-basket-icon lucide-shopping-basket"><path d="m15 11-1 9" /><path d="m19 11-4-7" /><path d="M2 11h20" /><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" /><path d="M4.5 15.5h15" /><path d="m5 11 4-7" /><path d="m9 11 1 9" /></svg>,
                        title: 'E-Mandi',
                        description: 'Check real-time crop prices, sell produce online, and connect directly with buyers for fair deals.'
                    },
                    {
                        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark-icon lucide-landmark"><path d="M10 18v-7" /><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z" /><path d="M14 18v-7" /><path d="M18 18v-7" /><path d="M3 22h18" /><path d="M6 18v-7" /></svg>,
                        title: 'Government Scheme & Policy',
                        description: 'Stay updated on the latest schemes, subsidies, and policies with easy guides and timely alerts.'
                    },
                ]);
                setIsLoading(false); // Set loading to false when data is loaded
            }, 1000);
        };

        loadFeatures(); // Call the function
    }, []); // Empty dependency array means this runs once when component mounts

    // Show loading state while data is being fetched
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">

                <div className="flex justify-center items-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading features...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}

            {/* Features Content */}
            <main className="pt-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Hero Section */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Powerful Features for{' '}
                            <span className="text-green-600">Kerala Farmers</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover how our AI-powered platform helps farmers make better decisions,
                            increase productivity, and improve crop yields.
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {features?.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature?.icon}
                                title={feature?.title}
                                description={feature?.description}
                                index={index} // For staggered animation in FeatureCard component
                            />
                        ))}
                    </div>

                    {/* facts */}

                    <div class="w-full  pt-24 pb-32 px-4 ">
                        <div class="flex items-center mb-12">
                            <span class="text-yellow-500 text-4xl"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb-icon lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg></span>
                            <h1 class="ml-2 text-4xl font-semibold text-gray-800">
                                Supporting Facts
                            </h1>

                        </div>


                        <ul class="text-2xl space-y-4 text-gray-700">
                            <li class="flex items-start pb-2">
                                <span class="text-green-600 mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg></span>
                                <p>
                                    According to <span class="font-semibold">FAO & NABARD</span> reports,
                                    over <span class="font-semibold">70%</span> of smallholder farmers in India lack timely advisory access,
                                    leading to <span class="font-semibold">20–30% yield losses</span>.
                                </p>
                            </li>

                            <li class="flex items-start pb-2">
                                <span class="text-green-600 mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg></span>
                                <p>
                                    According to the <span class="font-semibold">Indian Council of Agricultural Research (ICAR)</span> , unpredictable weather and climate change cause <span class="font-semibold">15–25%</span> crop losses annually, making digital weather alerts crucial.
                                </p>
                            </li>
                            <li class="flex items-start pb-2">
                                <span class="text-green-600 mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg></span>
                                <p>
                                    A <span class="font-semibold">2022 NITI Aayog</span> study highlights that
                                    digital agri-advisory platforms can improve farmer income by
                                    <span class="font-semibold">25–30%</span>.
                                </p>
                            </li>

                            <li class="flex items-start pb-2">
                                <span class="text-green-600 mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg></span>
                                <p>
                                    Kerala's government is actively promoting
                                    <span class="font-semibold">Digital Agriculture Mission (2021–2025)</span>,
                                    opening opportunities for public-private solutions.
                                </p>
                            </li>
                        </ul>
                    </div>




                    {/* Call-to-Action Section */}
                    <motion.div
                        className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-soft border border-gray-200"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Ready to Transform Your Farm?
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                            Join thousands of farmers who are already using Krishi Sakhi to improve
                            their agricultural practices and increase their profits.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <motion.a
                                href="/auth"
                                className="px-8 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Started Free
                            </motion.a>
                            <motion.a
                                href="/chat"
                                className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-md font-semibold hover:bg-green-600 hover:text-white transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Try AI Assistant
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </main>
            {/* Footer */}

        </div>
    );
};

export default Features2;