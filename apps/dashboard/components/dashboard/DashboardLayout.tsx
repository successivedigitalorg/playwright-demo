import React from 'react';
import DashboardHeader from './DashboardHeader';
import Container from '../ui/Container';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Container>
            <DashboardHeader />
            <main>{children}</main>
        </Container>
    );
};

export default DashboardLayout;