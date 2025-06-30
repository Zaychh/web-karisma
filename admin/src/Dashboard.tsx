import React from 'react';
import SummaryCards from './components/dashboard/Summary';
import TrafficSource from './components/dashboard/TrafficSource';
import CoursePie from './components/dashboard/CoursePie';
import Calender from './components/dashboard/Kalender';
import TabelInstruktor from './components/dashboard/TabelInstruktor';
import Chart from './components/dashboard/Chart';
import AdminLayout from './AdminLayout';

export default function Dashboard() {
    return (
    <AdminLayout>
        <div className='space-y-6'>
            <SummaryCards />

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <div className='lg:col-span-2 space-y-6'>
                    <Chart />
                    <TrafficSource />
            </div>
            <div className='space-y-6'>
                <Calender />
                <CoursePie />
            </div>
            </div>
            <TabelInstruktor />
            </div>
    </AdminLayout>
    );
}
