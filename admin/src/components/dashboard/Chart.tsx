import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Jan', users: 400, instructors: 24 },
    { month: 'Feb', users: 300, instructors: 13 },
    { month: 'Mar', users: 200, instructors: 98 },
    { month: 'Apr', users: 278, instructors: 39 },
    { month: 'May', users: 189, instructors: 48 },
];

export default function Chart() {
    return (
        <div className='bg-white rounded-xl shadow-md p-4'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="instructors" stroke="#10b981" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}