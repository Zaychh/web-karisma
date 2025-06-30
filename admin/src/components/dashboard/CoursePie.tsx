import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Bootcamp 1', value: 400 },
    { name: 'Bootcamp 2', value: 300 },
    { name: 'Bootcamp 3', value: 300 },
    { name: 'Bootcamp 4', value: 200 },
    { name: 'Bootcamp 5', value: 278 },
    { name: 'Bootcamp 6', value: 189 },
    { name: 'Bootcamp 7', value: 239 },
    { name: 'Bootcamp 8', value: 349 },
    { name: 'Bootcamp 9', value: 200 },
];

const COLORS = [
    '#3b82f6', // blue
    '#f43f5e', // pink
    '#4ade80', // green
    '#fbbf24', // yellow
    '#60a5fa', // light blue
    '#a855f7', // purple
    '#f97316', // orange
    '#22c55e', // emerald
    '#eab308', // amber
];

export default function CoursePie() {
    return (
        <div className='bg-white rounded-xl shadow-md p-4'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>Course Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={4}
                        dataKey="value"
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>  
        </div>
    );
}  