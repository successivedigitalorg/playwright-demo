'use client';

import React from 'react';
import Link from 'next/link';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Dashboard Application</h1>
            <p className="home-description">View your analytics and performance metrics in one place.</p>
            <div className="home-actions">
                <Link href="/dashboard" className="dashboard-link">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default HomePage;