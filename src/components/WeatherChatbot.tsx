import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  X,
  Bot,
  Thermometer,
  ThermometerSun,
  ThermometerSnowflake,
} from 'lucide-react'

interface WeatherChatbotProps {
  region: string
  date: Date
  touristSite?: string
  temperature?: number
}

function WeatherChatbot({
  region,
  date,
  touristSite,
  temperature,
}: WeatherChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')

  const getCharacterByTemperature = () => {
    if (temperature === undefined || temperature === null) {
      return {
        image: '/characters/normal-bot.png',
        alt: 'Normal Weather Guide',
        bgColor: 'from-emerald-400 to-teal-500',
        icon: <Thermometer className="text-emerald-600" size={20} />,
        bubbleColor: 'bg-emerald-100 border-emerald-300',
      }
    }

    if (temperature > 25) {
      return {
        image: '/characters/hot-bot.png',
        alt: 'Hot Weather Guide',
        bgColor: 'from-orange-400 to-red-500',
        icon: <ThermometerSun className="text-orange-600" size={20} />,
        bubbleColor: 'bg-orange-100 border-orange-300',
      }
    } else if (temperature < 15) {
      return {
        image: '/characters/ice-bot.png',
        alt: 'Cold Weather Guide',
        bgColor: 'from-cyan-400 to-blue-500',
        icon: <ThermometerSnowflake className="text-cyan-600" size={20} />,
        bubbleColor: 'bg-cyan-100 border-cyan-300',
      }
    } else {
      return {
        image: '/characters/normal-bot.png',
        alt: 'Normal Weather Guide',
        bgColor: 'from-emerald-400 to-teal-500',
        icon: <Thermometer className="text-emerald-600" size={20} />,
        bubbleColor: 'bg-emerald-100 border-emerald-300',
      }
    }
  }

  const character = getCharacterByTemperature()

  useEffect(() => {
    const locationName = touristSite || region
    const temp = temperature || 20

    let temperatureContext = ''
    if (temp > 25) temperatureContext = 'hot weather'
    else if (temp < 15) temperatureContext = 'cool weather'
    else temperatureContext = 'perfect weather'

    const messages = [
      `Exploring ${locationName} in ${temperatureContext}? I've got the best tips for you! 🌡️`,
      `Planning your ${locationName} trip? Let me help you prepare for ${temp}°C conditions! 🎒`,
      `Getting ready for ${locationName}'s ${temperatureContext}? I'm here to guide you! 📍`,
      `Want to make the most of ${locationName} in ${temp}°C? I know all the secrets! 💎`,
      `Visiting ${locationName} with ${temperatureContext}? Let's plan your perfect day! 🗺️`,
      `Curious about ${locationName} in ${temp}°C? I can share the best activities! 🌤️`,
    ]

    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setCurrentMessage(randomMessage)
  }, [region, touristSite, date, temperature])

  return (
    <>
      {/* Chatbot Button with bubble to the LEFT */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Speech bubble now to the LEFT of character */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className={`${character.bubbleColor} border rounded-2xl px-4 py-3 shadow-lg max-w-xs text-left`}
            >
              <p className="text-sm font-medium text-gray-800">
                {currentMessage}
              </p>
              <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 rotate-45 w-3 h-3 bg-inherit border-r border-b border-inherit"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character Button */}
        <motion.button
          className="relative hover:scale-110 transition-transform duration-300 overflow-visible"
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
        >
          <div className="relative">
            <img
              src={character.image}
              alt={character.alt}
              className="w-48 h-48 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const fallback = document.createElement('div')
                fallback.className = `w-48 h-48 rounded-full bg-gradient-to-br ${character.bgColor} flex items-center justify-center`
                fallback.innerHTML =
                  '<svg class="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm3 0h-2v-6h2v6zm3 0h-2v-6h2v6z"/></svg>'
                target.parentNode?.appendChild(fallback)
              }}
            />

            {/* Online indicator */}
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-400 border-2 border-white rounded-full shadow-lg"></div>
          </div>
        </motion.button>
      </div>

      {/* Chat Modal (sin cambios) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end pb-6 pr-6 sm:pb-8 sm:pr-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md h-96 flex flex-col"
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div
                className={`bg-gradient-to-r ${character.bgColor} rounded-t-3xl p-4 text-white`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      {character.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Weather Guide</h3>
                      <p className="text-white/80 text-sm">
                        {temperature !== undefined ? `${temperature}°C • ` : ''}
                        Online • Ready to help
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="flex justify-center -mt-8 mb-2">
                <motion.div
                  className="overflow-visible"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <img
                    src={character.image}
                    alt={character.alt}
                    className="w-24 h-24 object-contain"
                  />
                </motion.div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                <div className="text-center mb-6">
                  <p className="text-gray-600 text-sm">
                    Hi! I'm your {character.alt.toLowerCase()}
                    {temperature !== undefined && ` for ${temperature}°C`}
                  </p>
                </div>

                <div className="flex items-start gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <p className="text-gray-800 text-sm">{currentMessage}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full text-left bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl px-4 py-3 hover:from-emerald-100 hover:to-teal-100 transition-colors">
                    <p className="font-semibold text-emerald-800 text-sm">
                      Best activities for {temperature}°C
                    </p>
                    <p className="text-emerald-600 text-xs">
                      Perfect things to do in this weather
                    </p>
                  </button>

                  <button className="w-full text-left bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl px-4 py-3 hover:from-blue-100 hover:to-cyan-100 transition-colors">
                    <p className="font-semibold text-blue-800 text-sm">
                      Packing guide
                    </p>
                    <p className="text-blue-600 text-xs">
                      What to wear for {temperature}°C
                    </p>
                  </button>

                  <button className="w-full text-left bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-2xl px-4 py-3 hover:from-purple-100 hover:to-violet-100 transition-colors">
                    <p className="font-semibold text-purple-800 text-sm">
                      Local tips for {touristSite || region}
                    </p>
                    <p className="text-purple-600 text-xs">
                      Hidden gems and best spots
                    </p>
                  </button>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Ask about ${temperature}°C weather, activities, or tips...`}
                    className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl px-4 py-3 hover:from-emerald-600 hover:to-teal-600 transition-colors">
                    <MessageCircle size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default WeatherChatbot
