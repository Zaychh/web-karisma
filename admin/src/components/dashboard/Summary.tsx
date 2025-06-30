import React from "react";
import { Card, CardContent } from '../ui/card';
import { Users, DollarSign, GraduationCap} from 'lucide-react';

const summaryData = [
    {
        title: 'Total Peserta',
        value: '1,271',
        icon: <Users className="w-6 h-6 text-blue-600" />,
    },
    {
        title: 'Total Instructors',
        value: '86',
        icon: <GraduationCap className="text-green-600 w-6 h-6" />,
    },
    {
        title: 'Monthly Income',
        value: 'Rp 12.340.000',
        icon: <DollarSign className="text-yellow-600 w-6 h-6" />,
    },
];

export default function SummaryCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaryData.map((item, index) => (
                <Card key={index} className="p-4 flex items-center gap-4 shadow-md">
                    <div className="p-3 rounded-full bg-gray-100">
                        {item.icon}
                    </div>
                    <CardContent className="p-0">
                        <p className="text-sm text-gray-500 mb-1">{item.title}</p>
                        <h3 className="text-lg font-semibold text-gray-800">{item.value}</h3>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}