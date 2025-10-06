import weatherData from '../data/weather.json'
import { Thermometer, Wind, Gauge, Droplets, CloudRain, Snowflake, WindIcon, Calendar } from 'lucide-react'

interface Props {
  region: string
  date: Date
}

function WeatherCard({ region, date }: Props) {
  // Find base weather data for the region
  const baseData = (weatherData as any).find((w: any) => w.region === region)

  if (!baseData) return (
    <div className="text-center py-8">
      <p className="text-gray-500">No weather data available for {region}</p>
    </div>
  )

  // Calculate future weather based on date (this is simulated - you'll need real forecast data)
  const getFutureWeather = (baseData: any, selectedDate: Date) => {
    const today = new Date();
    const daysDiff = Math.ceil((selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Simulate seasonal variations for demonstration
    const month = selectedDate.getMonth();
    const isRainySeason = month >= 11 || month <= 3; // Dec-Mar in Peru
    const isWinter = month >= 5 && month <= 9; // Jun-Sep in highlands
    
    let temperature = baseData.temperature;
    let forecast = baseData.forecast;
    
    // Adjust temperature based on season and days ahead
    if (isWinter) {
      temperature -= 3 + (daysDiff * 0.1); // Colder in winter, more uncertainty further out
    } else if (isRainySeason) {
      temperature += 2;
      forecast = 'rainy';
    }
    
    // Add some randomness for future dates
    const randomVariation = (Math.random() - 0.5) * (daysDiff * 0.2);
    temperature += randomVariation;
    
    return {
      temperature: Math.round(temperature),
      forecast,
      humidity: Math.max(30, Math.min(90, baseData.humidity + (isRainySeason ? 15 : 0))),
      windSpeed: `${Math.round(8 + (daysDiff * 0.1))} km/h`,
      pressure: `${1010 + Math.round((Math.random() - 0.5) * 10)} hPa`,
      rain: isRainySeason ? `${Math.round(40 + (Math.random() * 40))}%` : `${Math.round(10 + (Math.random() * 20))}%`,
      snow: isWinter ? `${Math.round(Math.random() * 30)}%` : '0%',
      dust: daysDiff > 30 ? 'Moderate' : 'Low'
    };
  };

  const weatherDetails = getFutureWeather(baseData, date);
  const daysFromNow = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getWeatherIcon = (forecast: string) => {
    switch(forecast.toLowerCase()) {
      case 'sunny': return '☀️'
      case 'rainy': return '🌧️'
      case 'cloudy': return '☁️'
      case 'partly cloudy': return '⛅'
      case 'snowy': return '❄️'
      case 'windy': return '💨'
      default: return '🌈'
    }
  }

  const getConfidenceLevel = (daysAhead: number) => {
    if (daysAhead <= 3) return { level: 'High', color: 'text-green-600', bg: 'bg-green-100' };
    if (daysAhead <= 7) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Low', color: 'text-orange-600', bg: 'bg-orange-100' };
  };

  const confidence = getConfidenceLevel(daysFromNow);

  return (
    <div className="space-y-4">
      {/* Header with Date Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-100 rounded-xl">
            <Thermometer className="text-cyan-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Weather Forecast</h2>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Calendar size={14} />
              {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${confidence.bg} ${confidence.color}`}>
          {confidence.level} Confidence
        </div>
      </div>
      
      {/* Main Temperature and Icon */}
      <div className="flex items-center justify-between bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4">
        <div className="text-4xl">
          {getWeatherIcon(weatherDetails.forecast)}
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-800">{weatherDetails.temperature}°C</div>
          <div className="text-sm text-gray-600 capitalize">{weatherDetails.forecast}</div>
          <div className="text-xs text-gray-500 mt-1">
            {daysFromNow === 0 ? 'Today' : `${daysFromNow} day${daysFromNow !== 1 ? 's' : ''} from now`}
          </div>
        </div>
      </div>

      {/* Detailed Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Wind */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Wind size={18} className="text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">WIND</div>
            <div className="text-sm font-semibold text-gray-800">{weatherDetails.windSpeed}</div>
          </div>
        </div>

        {/* Pressure */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Gauge size={18} className="text-purple-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">PRESSURE</div>
            <div className="text-sm font-semibold text-gray-800">{weatherDetails.pressure}</div>
          </div>
        </div>

        {/* Humidity */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <Droplets size={18} className="text-cyan-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">HUMIDITY</div>
            <div className="text-sm font-semibold text-gray-800">{weatherDetails.humidity}%</div>
          </div>
        </div>

        {/* Rain */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="p-2 bg-blue-100 rounded-lg">
            <CloudRain size={18} className="text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">RAIN</div>
            <div className="text-sm font-semibold text-gray-800">{weatherDetails.rain}</div>
          </div>
        </div>

        {/* Snow */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <Snowflake size={18} className="text-cyan-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">SNOW</div>
            <div className="text-sm font-semibold text-gray-800">{weatherDetails.snow}</div>
          </div>
        </div>

        {/* Dust */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="p-2 bg-amber-100 rounded-lg">
            <WindIcon size={18} className="text-amber-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">DUST</div>
            <div className="text-sm font-semibold text-gray-800">{weatherDetails.dust}</div>
          </div>
        </div>
      </div>

      {/* Feels Like */}
      <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-3">
        <Thermometer size={18} className="text-orange-500" />
        <span className="text-sm font-medium text-gray-700">Feels like</span>
        <span className="text-sm font-bold text-gray-800">{weatherDetails.temperature + 2}°C</span>
      </div>
    </div>
  )
}

export default WeatherCard