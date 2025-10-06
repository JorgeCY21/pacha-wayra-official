import { Link } from 'react-router-dom'
import sitesData from '../data/tourist_sites.json'
import { MapPin, Star, Calendar, Sun, CloudRain } from 'lucide-react'

interface Props {
  region: string
  date: Date
}

function TouristList({ region, date }: Props) {
  const sites = (sitesData as any).filter((s: any) => s.region === region)

  // Get seasonal recommendations for sites
  const getSeasonalInfo = (site: any, selectedDate: Date) => {
    const month = selectedDate.getMonth();
    const daysFromNow = Math.ceil((selectedDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    const season = getSeason(month);
    const isPeakSeason = isPeakTouristSeason(month, site.category);
    const weatherSuitability = getWeatherSuitability(month, site.category);
    
    return {
      season,
      isPeakSeason,
      weatherSuitability,
      recommendation: getVisitRecommendation(month, site.category),
      daysFromNow
    };
  };

  const getSeason = (month: number) => {
    if (month >= 11 || month <= 2) return 'summer';
    if (month >= 3 && month <= 5) return 'autumn';
    if (month >= 6 && month <= 8) return 'winter';
    return 'spring';
  };

  const isPeakTouristSeason = (month: number, category: string) => {
    // Different peak seasons for different types of attractions
    if (category === 'Beach' || category === 'Coastal') return month >= 11 || month <= 2;
    if (category === 'Mountain' || category === 'Archaeological') return month >= 5 && month <= 9;
    return month >= 6 && month <= 8; // General peak season
  };

  const getWeatherSuitability = (month: number, category: string) => {
    const isRainy = month >= 11 || month <= 3;
    
    if (category === 'Beach' && isRainy) return 'poor';
    if (category === 'Mountain' && isRainy) return 'fair';
    if (category === 'Archaeological' && isRainy) return 'good'; // Ruins are fine in rain
    return 'excellent';
  };

  const getVisitRecommendation = (month: number, category: string) => {
    const suitability = getWeatherSuitability(month, category);
    const isPeak = isPeakTouristSeason(month, category);
    
    if (suitability === 'poor') return 'Not ideal weather conditions';
    if (isPeak) return 'Peak season - expect crowds';
    if (suitability === 'excellent') return 'Perfect visiting conditions';
    return 'Good time to visit';
  };

  const getSuitabilityIcon = (suitability: string) => {
    switch(suitability) {
      case 'excellent': return { icon: Sun, color: 'text-green-500', bg: 'bg-green-100' };
      case 'good': return { icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-100' };
      case 'fair': return { icon: CloudRain, color: 'text-orange-500', bg: 'bg-orange-100' };
      case 'poor': return { icon: CloudRain, color: 'text-red-500', bg: 'bg-red-100' };
      default: return { icon: Sun, color: 'text-gray-500', bg: 'bg-gray-100' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-teal-800">Best Sites to Visit</h2>
          <p className="text-teal-600 flex items-center gap-2">
            <Calendar size={16} />
            {date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Seasonal recommendations</p>
          <p className="text-xs text-gray-500">Based on your travel date</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
        {sites.map((site: any) => {
          const seasonalInfo = getSeasonalInfo(site, date);
          const suitability = getSuitabilityIcon(seasonalInfo.weatherSuitability);
          const SuitabilityIcon = suitability.icon;
          
          return (
            <Link
              key={site.id}
              to={`/site/${site.id}`}
              className="group bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 hover:border-emerald-300 hover:scale-[1.02] block" // ← AGREGAR 'block' AQUÍ
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-700">{site.region}</span>
                  </div>
                </div>
                <div className={`absolute top-3 right-3 ${suitability.bg} rounded-full p-2`}>
                  <SuitabilityIcon size={16} className={suitability.color} />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-emerald-700 transition-colors">
                    {site.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-amber-50 rounded-full px-2 py-1">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-semibold text-amber-700">4.8</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {site.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-cyan-600 bg-cyan-50 rounded-full px-3 py-1">
                      {site.category || "Attraction"}
                    </span>
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 rounded-full px-3 py-1">
                      {seasonalInfo.season}
                    </span>
                  </div>
                  
                  <div className={`text-xs font-medium rounded-full px-3 py-1 text-center ${
                    seasonalInfo.weatherSuitability === 'excellent' ? 'bg-green-100 text-green-700' :
                    seasonalInfo.weatherSuitability === 'good' ? 'bg-yellow-100 text-yellow-700' :
                    seasonalInfo.weatherSuitability === 'fair' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {seasonalInfo.recommendation}
                    {seasonalInfo.isPeakSeason && ' • Peak season'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-emerald-600">
                    Learn more →
                  </span>
                  {seasonalInfo.daysFromNow > 30 && (
                    <span className="text-xs text-gray-500">
                      Long-term forecast
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {sites.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏞️</div>
          <p className="text-gray-500 text-lg">No tourist sites found for {region}</p>
          <p className="text-gray-400">Try selecting a different region</p>
        </div>
      )}
    </div>
  )
}

export default TouristList