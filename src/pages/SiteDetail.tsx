import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Utensils, Activity} from 'lucide-react'
import sitesData from '../data/tourist_sites.json'
import weatherData from '../data/weather.json'
import departmentData from '../data/departments.json'
import PDFExporter from '../components/PDFExporter';
import WeatherChatbot from '../components/WeatherChatbot'; // Añade esta importación

function SiteDetail() {
  const { id } = useParams()
  const [selectedDate] = useState(new Date())
  
  const site = (sitesData as any).find((s: any) => String(s.id) === id)  
  
  if (!site) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Site Not Found</h1>
          <Link to="/" className="text-emerald-600 hover:text-emerald-700 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Get weather data based on site's region and date
  const getSiteWeather = (site: any, date: Date) => {
    const baseData = (weatherData as any).find((w: any) => w.region === site.region)
    if (!baseData) return null

    const today = new Date()
    const daysDiff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const month = date.getMonth()
    
    // Simulate weather based on location and date
    const isHighAltitude = site.lat > -12 // Approximate for Andes region
    const isCoastal = site.lat < -14 // Coastal areas
    const isRainySeason = month >= 11 || month <= 3
    const isWinter = month >= 5 && month <= 9
    
    let temperature = baseData.temperature
    let forecast = baseData.forecast
    
    // Adjust for altitude
    if (isHighAltitude) {
      temperature -= 5
      if (isWinter) temperature -= 3
    }
    
    // Adjust for coastal areas
    if (isCoastal && isRainySeason) {
      temperature += 2
      forecast = 'humid'
    }
    
    return {
      temperature: Math.round(temperature + (Math.random() - 0.5) * 4),
      forecast,
      humidity: Math.max(40, Math.min(85, baseData.humidity + (isRainySeason ? 20 : 0))),
      windSpeed: `${Math.round(5 + (Math.random() * 15))} km/h`,
      daysFromNow: daysDiff
    }
  }

  const weather = getSiteWeather(site, selectedDate)

  // Get food recommendations based on region and weather
  // Función getActivities actualizada
  const getActivities = (site: any, weather: any) => {
    const departmentInfo = departmentData.find((d: any) => d.department === site.region)
    if (!departmentInfo) {
      // Fallback activities si no encuentra el departamento
      return ['Cultural tours', 'Local exploration', 'Photography', 'Sightseeing']
    }
    
    const temp = weather?.temperature || 20
    const isHot = temp > 20
    const activities = isHot ? departmentInfo.hot.activities : departmentInfo.cold.activities
    
    return activities.slice(0, 8)
  }

  // Función getFoodRecommendations actualizada
  const getFoodRecommendations = (site: any, weather: any) => {
    const departmentInfo = departmentData.find((d: any) => d.department === site.region)
    if (!departmentInfo) {
      // Fallback foods si no encuentra el departamento
      return ['Local cuisine', 'Traditional dishes', 'Regional specialties']
    }
    
    const temp = weather?.temperature || 20
    const isHot = temp > 20
    const foods = isHot ? departmentInfo.hot.foods : departmentInfo.cold.foods
    
    return foods.slice(0, 8)
  }

  // Get packing recommendations
  const getPackingGuide = (weather: any, site: any) => {
    const temp = weather?.temperature || 20
    const items = []
    
    if (temp < 15) {
      items.push('Thermal layers', 'Winter jacket', 'Warm hat', 'Gloves', 'Warm socks')
    } else if (temp > 25) {
      items.push('Light clothing', 'Sun hat', 'Sunglasses', 'Sunscreen', 'Light jacket')
    } else {
      items.push('Layered clothing', 'Light sweater', 'Comfortable shoes', 'Light rain jacket')
    }
    
    // Site-specific items
    if (site.category === 'Archaeological') {
      items.push('Comfortable walking shoes', 'Hat for sun protection', 'Water bottle')
    }
    
    if (site.category === 'Mountain') {
      items.push('Hiking boots', 'Backpack', 'Water purification tablets')
    }
    
    if (site.category === 'Beach') {
      items.push('Swimwear', 'Beach towel', 'Sandals', 'Beach bag')
    }
    
    return items.slice(0, 10)
  }

  const activities = getActivities(site, weather)
  const foods = getFoodRecommendations(site, weather)
  const packingItems = getPackingGuide(weather, site)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-emerald-100 transition-colors mb-4">
            <ArrowLeft size={20} />
            Back to Explore
          </Link>
          <h1 className="text-3xl font-bold">{site.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-emerald-100">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{site.region}, Peru</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Site Info and Image */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={site.image}
                alt={site.name}
                className="w-full h-64 lg:h-96 object-cover"
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {site.name}</h2>
              <p className="text-gray-700 leading-relaxed">{site.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  {site.category}
                </span>
                <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
                  {site.region} Region
                </span>
              </div>
            </motion.div>

            {/* Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Activity className="text-emerald-600" />
                Recommended Activities
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Food Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Utensils className="text-amber-600" />
                Local Food & Drinks
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {foods.map((food, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">{food}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Weather and Practical Info */}
          <div className="space-y-6">
            {/* Weather Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Weather Forecast</h2>
              {weather ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-4xl">
                      {weather.forecast === 'rainy' ? '🌧️' : 
                       weather.forecast === 'cloudy' ? '☁️' : 
                       weather.forecast === 'snowy' ? '❄️' : '☀️'}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-800">{weather.temperature}°C</div>
                      <div className="text-sm text-gray-600 capitalize">{weather.forecast}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Humidity</div>
                      <div className="font-semibold">{weather.humidity}%</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Wind</div>
                      <div className="font-semibold">{weather.windSpeed}</div>
                    </div>
                  </div>
                  {weather.daysFromNow > 0 && (
                    <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg text-center">
                      Forecast for {weather.daysFromNow} day{weather.daysFromNow !== 1 ? 's' : ''} from now
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Weather data not available</p>
              )}
            </motion.div>

            {/* Packing Guide */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Packing Guide</h2>
              <div className="space-y-3">
                {packingItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Travel Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl"
            >
              <h2 className="text-xl font-bold mb-3">Travel Tips</h2>
              <ul className="space-y-2 text-sm">
                <li>• Check local COVID-19 regulations</li>
                <li>• Carry local currency (Peruvian Sol)</li>
                <li>• Learn basic Spanish phrases</li>
                <li>• Stay hydrated at high altitudes</li>
                <li>• Respect local customs and traditions</li>
              </ul>
            </motion.div>
              
              {weather && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-none rounded-2xl p-6 "
                >
                  <PDFExporter 
                    site={site}
                    weather={weather}
                    activities={activities}
                    foods={foods}
                    packingItems={packingItems}
                  />
                </motion.div>
              )}
          </div>
        </div>
      </div>

      {/* 🌟 AÑADE EL CHATBOT AQUÍ - FUERA DEL CONTENEDOR PRINCIPAL */}
      <WeatherChatbot 
        region={site.name}
        date={selectedDate}
        touristSite={site.name}
      />
    </div>
  )
}

export default SiteDetail