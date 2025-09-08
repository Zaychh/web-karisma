import { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Users, DollarSign, GraduationCap } from 'lucide-react';

export default function SummaryCards() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalInstructors: 0,
    monthlyIncome: 0,
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/summary')
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.data) {
          setData(resData.data);
        }
      })
      .catch((err) => console.error("Failed to fetch summary:", err));
  }, []);

  const summaryData = [
    {
      title: "Total Peserta",
      value: data.totalUsers.toLocaleString(),
      icon: <Users className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Total Instructors",
      value: data.totalInstructors.toLocaleString(),
      icon: <GraduationCap className="text-green-600 w-6 h-6" />,
    },
    {
      title: "Monthly Income",
      value: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(data.monthlyIncome),
      icon: <DollarSign className="text-yellow-600 w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {summaryData.map((item, index) => (
        <Card key={index} className="p-4 flex items-center gap-4 shadow-md">
          <div className="p-3 rounded-full bg-gray-100">{item.icon}</div>
          <CardContent className="p-0">
            <p className="text-sm text-gray-500 mb-1">{item.title}</p>
            <h3 className="text-lg font-semibold text-gray-800">{item.value}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
