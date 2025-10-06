import WeatherCard from "../components/WeatherCard"
import DaySelector from "../components/DaySelector"
import Recommendations from "../components/Recommendations"
import Alerts from "../components/Alerts"
import TouristList from "../components/TouristList"
import SearchFilter from "../components/SearchFilter"
import MapView from "../components/MapView"
import TemperatureChart from "../components/TemperatureChart";
import WindChart from "../components/WindChart";
import WeatherChatbot from "../components/WeatherChatbot"
import { useState } from "react"
import { motion } from "framer-motion"
import { Leaf, Sun, Mountain, Sparkles, AlertTriangle, Calendar } from "lucide-react"

function Home() {
  const [region, setRegion] = useState("Arequipa")
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-10">
      {/* 🌄 Hero Section */}
      <motion.section
        className="relative rounded-b-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-600 text-white shadow-2xl px-8 py-16 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('https://media.tacdn.com/media/attractions-splice-spp-674x446/06/f2/64/89.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-800/70 to-cyan-900/80" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30"
          >
            <Sparkles size={20} className="text-yellow-300" />
            <span className="font-semibold">Future Weather Forecasts for Peru</span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-6xl font-bold drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            🌿 Pacha<span className="text-cyan-300">Wayra</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-emerald-100 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Plan your perfect trip with accurate weather forecasts up to 6 months ahead
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
              <div className="flex items-center gap-3">
                <Calendar className="text-cyan-300" size={24} />
                <div className="text-left">
                  <p className="text-sm text-emerald-200">Selected Date</p>
                  <p className="text-lg font-bold text-white">
                    {selectedDate.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <SearchFilter onRegionChange={setRegion} />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 🗓️ Future Weather Selector */}
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-white rounded-3xl p-6 shadow-2xl border border-emerald-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-3">
              <Calendar className="text-emerald-600" size={28} />
              Select Your Travel Date
            </h2>
            <p className="text-gray-600 mt-2">
              Choose any date within the next 6 months for accurate weather forecasting
            </p>
          </div>
          <DaySelector 
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>
      </motion.div>

      {/* 🎯 Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Weather Forecast Summary */}
        <motion.div
          className="grid lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Future Weather Card */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-xl border border-cyan-100 hover:shadow-2xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <WeatherCard region={region} date={selectedDate} />
          </motion.div>

          {/* Recommendations */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-xl border border-emerald-100 hover:shadow-2xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <Recommendations region={region} date={selectedDate} />
          </motion.div>

          {/* Alerts */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100 hover:shadow-2xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <Alerts region={region} date={selectedDate} />
          </motion.div>
        </motion.div>

        {/* 🏞️ Tourism Section */}
        <div className="grid xl:grid-cols-3 gap-8">
          
          {/* Tourism Column */}
          <motion.div
            className="xl:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-teal-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-teal-100 rounded-2xl">
                  <Leaf className="text-teal-600" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-teal-800">
                    Best Time to Visit in {region}
                  </h2>
                  <p className="text-teal-600">
                    Tourist sites and optimal visiting conditions for your selected date
                  </p>
                </div>
              </div>
              <TouristList region={region} date={selectedDate} />
            </div>
          </motion.div>

          {/* Sidebar with Map and Additional Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
          >
            {/* Interactive Map */}
            <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
              <div className="p-6 pb-4">
                <h3 className="text-xl font-bold text-emerald-800 flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <Mountain className="text-emerald-600" size={20} />
                  </div>
                  Regional Map
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Weather conditions and attractions in {region}
                </p>
              </div>
              <MapView region={region} date={selectedDate} />

              
            </div>

            {/* Temperature Chart */}
            <div className="bg-white rounded-3xl shadow-2xl border border-cyan-100 overflow-hidden">
              <TemperatureChart region={region} date={selectedDate} />
            </div>
            
            {/* WindChart Chart */}
            <div className="bg-white rounded-3xl shadow-2xl border border-cyan-100 overflow-hidden">
              <WindChart region={region} date={selectedDate} />
            </div>

            {/* Travel Tips */}
            <div className="bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-3xl p-6 text-white shadow-2xl">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <AlertTriangle size={20} className="text-yellow-300" />
                Planning Tips
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Check weather forecasts 1-2 weeks before travel</li>
                <li>• Pack layers for changing mountain conditions</li>
                <li>• Monitor weather alerts for your travel dates</li>
                <li>• Consider altitude effects on weather perception</li>
                <li>• Have backup plans for outdoor activities</li>
              </ul>
            </div>

            {/* Date Context */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-amber-100">
              <div className="text-center">
                <p className="text-sm text-gray-600">Planning for</p>
                <p className="font-bold text-amber-700 text-lg">
                  {selectedDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.ceil((selectedDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days from now
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ✨ Footer */}
      <motion.div
        className="max-w-4xl mx-auto mt-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-emerald-100">
          <p className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-3 mb-4">
            <Sun size={28} className="text-amber-500" />
            Plan Your Perfect Journey With 
            <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              PachaWayra
            </span>
          </p>
          <p className="text-gray-600">
            From the majestic Andes to the vibrant Amazon, plan with confidence using our future weather forecasts.
          </p>
        </div>
      </motion.div>
      <WeatherChatbot 
        region={region}
        date={selectedDate}
      />
    </div>
  )
}

export default Home