import weatherData from '../data/weather.json'
import { Calendar, Sun, CloudRain, Snowflake, Wind } from 'lucide-react'

interface Props {
  region: string
  date: Date
}

function Recommendations({ region, date }: Props) {
  const baseData = (weatherData as any).find((w: any) => w.region === region)
  if (!baseData) return null

  // Calculate future weather conditions based on date
  const getFutureRecommendations = (baseData: any, selectedDate: Date) => {
    const today = new Date();
    const daysDiff = Math.ceil((selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const month = selectedDate.getMonth();
    
    // Adjust temperature based on season
    let temperature = baseData.temperature;
    const isRainySeason = month >= 11 || month <= 3; // Dec-Mar in Peru
    const isWinter = month >= 5 && month <= 9; // Jun-Sep in highlands
    
    if (isWinter) {
      temperature -= 3 + (daysDiff * 0.1);
    } else if (isRainySeason) {
      temperature += 2;
    }
    
    // Generate recommendations based on adjusted weather
    let clothingAdvice = '';
    let accessories: string[] = [];
    let icon = Sun;
    
    if (temperature < 10) {
      clothingAdvice = 'Heavy winter clothing essential';
      accessories = ['Thermal layers', 'Winter jacket', 'Warm boots', 'Gloves', 'Beanie'];
      icon = Snowflake;
    } else if (temperature < 15) {
      clothingAdvice = 'Warm layers recommended';
      accessories = ['Jacket', 'Sweater', 'Long pants', 'Closed shoes'];
      icon = CloudRain;
    } else if (temperature > 28) {
      clothingAdvice = 'Light summer clothing';
      accessories = ['Light shirt', 'Shorts', 'Sun hat', 'Sunglasses', 'Sandals'];
      icon = Sun;
    } else if (temperature > 22) {
      clothingAdvice = 'Comfortable light clothing';
      accessories = ['T-shirt', 'Light pants', 'Comfortable shoes', 'Sun protection'];
      icon = Sun;
    } else {
      clothingAdvice = 'Layered clothing ideal';
      accessories = ['Light sweater', 'Long sleeves', 'Comfortable shoes', 'Light jacket'];
      icon = Wind;
    }
    
    // Add seasonal considerations
    if (isRainySeason) {
      accessories.push('Rain jacket', 'Waterproof shoes');
      icon = CloudRain;
    }
    
    if (daysDiff > 30) {
      accessories.push('Check forecast updates');
    }

    return {
      temperature: Math.round(temperature),
      clothingAdvice,
      accessories,
      icon,
      daysAhead: daysDiff,
      season: getSeason(month)
    };
  };

  const getSeason = (month: number) => {
    if (month >= 11 || month <= 2) return 'summer';
    if (month >= 3 && month <= 5) return 'autumn';
    if (month >= 6 && month <= 8) return 'winter';
    return 'spring';
  };

  const recommendations = getFutureRecommendations(baseData, date);
  const IconComponent = recommendations.icon;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <IconComponent className="text-emerald-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Packing Guide</h2>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Calendar size={14} />
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-800">{recommendations.temperature}°C</div>
          <div className="text-xs text-gray-500 capitalize">{recommendations.season}</div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
        <h3 className="font-semibold text-emerald-800 mb-2">Clothing Recommendation</h3>
        <p className="text-gray-700">{recommendations.clothingAdvice}</p>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-700 text-sm">Essential Items:</h4>
        <div className="grid grid-cols-2 gap-2">
          {recommendations.accessories.map((item, index) => (
            <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-2 border border-gray-100">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {recommendations.daysAhead > 14 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-700 text-center">
            ⏰ For trips {recommendations.daysAhead} days away, check forecast updates closer to your travel date
          </p>
        </div>
      )}
    </div>
  )
}

export default Recommendations