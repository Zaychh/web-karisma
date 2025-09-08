import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';

const trafficData = [
  { source: 'Direct', users: 500 },
  { source: 'Instagram', users: 320 },
  { source: 'YouTube', users: 280 },
  { source: 'LinkedIn', users: 190 },
  { source: 'Referral', users: 100 },
];

export default function TrafficSource() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Traffic Sources</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={trafficData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="source" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#3b82f6" name="Visitors" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
