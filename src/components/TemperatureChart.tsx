import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Sun } from 'lucide-react';

interface TemperatureData {
  day: string;
  temperature: number;
}

interface TemperatureChartProps {
  region: string;
  date: Date;
}

function TemperatureChart({ region }: TemperatureChartProps) {
  const generateTemperatureData = (): TemperatureData[] => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return days.map((day, index) => {
      const baseTemp = region.toLowerCase().includes('cusco') ? 15 : 
                       region.toLowerCase().includes('lima') ? 22 : 
                       region.toLowerCase().includes('arequipa') ? 18 : 20;

      const variation = Math.sin(index * 0.8) * 5;
      const temperature = Math.round(baseTemp + variation);

      return {
        day,
        temperature,
      };
    });
  };

  const data = generateTemperatureData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow border text-sm">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">
            Temperature: <span className="font-bold">{payload[0].value}°C</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-2xl border border-cyan-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-cyan-100 rounded-xl">
          <Sun className="text-cyan-600" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-cyan-800">Weekly Temperature</h2>
          <p className="text-gray-600">Average temperatures in {region} for the selected week</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="day" tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
            <YAxis tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} label={{ value: '°C', angle: -90, position: 'insideLeft', fill: '#6B7280' }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="temperature" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} activeDot={{ r: 6, fill: '#1D4ED8' }} name="Average Temperature" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TemperatureChart;
