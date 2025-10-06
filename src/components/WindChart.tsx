import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Wind } from 'lucide-react';

interface WindData {
  day: string;
  windSpeed: number;
}

interface WindChartProps {
  region: string;
  date: Date;
}

function WindChart({ region }: WindChartProps) {
  const generateWindData = (): WindData[] => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return days.map((day, index) => {
      // Simulación de velocidad del viento según la región
      const baseWind = region.toLowerCase().includes('cusco') ? 10 :
                       region.toLowerCase().includes('lima') ? 12 :
                       region.toLowerCase().includes('arequipa') ? 8 : 9;

      const variation = Math.sin(index * 0.6) * 3; // variación diaria
      const windSpeed = Math.round(baseWind + variation);

      return {
        day,
        windSpeed,
      };
    });
  };

  const data = generateWindData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow border text-sm">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">
            Wind Speed: <span className="font-bold">{payload[0].value} km/h</span>
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
          <Wind className="text-cyan-600" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-cyan-800">Weekly Wind Forecast</h2>
          <p className="text-gray-600">Average wind speed in {region} for the selected week</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="day" tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
            <YAxis tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} label={{ value: 'km/h', angle: -90, position: 'insideLeft', fill: '#6B7280' }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="windSpeed" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} activeDot={{ r: 6, fill: '#1D4ED8' }} name="Average Wind Speed" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WindChart;
