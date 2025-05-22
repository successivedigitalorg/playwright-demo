import React from 'react';

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <div>{children}</div>
        </div>
    );
};

export default Card;