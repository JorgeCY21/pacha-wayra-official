import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Heart, ArrowRight, Trash2 } from 'lucide-react'
import { useState } from 'react'

function Favorites() {
  const [favorites, setFavorites] = useState(() => 
    JSON.parse(localStorage.getItem('favorites') || '[]')
  )

  const removeFavorite = (siteId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const updatedFavorites = favorites.filter((site: any) => site.id !== siteId)
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white rounded-3xl p-12 shadow-xl border border-emerald-100">
              <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-rose-500" size={40} />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                No Favorites Yet
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Start exploring amazing tourist sites and add them to your favorites to see them here!
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Sites
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center">
                <Heart className="text-rose-500" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">My Favorites</h1>
                <p className="text-gray-600 mt-2">
                  Your personalized collection of amazing places
                </p>
              </div>
            </div>
            <div className="bg-rose-50 rounded-2xl p-4 inline-flex items-center gap-2">
              <Heart className="text-rose-500" size={20} />
              <span className="text-rose-700 font-semibold">
                {favorites.length} {favorites.length === 1 ? 'site' : 'sites'} saved
              </span>
            </div>
          </div>
        </motion.div>

        {/* Favorites Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {favorites.map((site: any, index: number) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link to={`/site/${site.id}`}>
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={site.image}
                      alt={site.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Remove Button */}
                    <button
                      onClick={(e) => removeFavorite(site.id, e)}
                      className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                    >
                      <Trash2 size={18} className="text-rose-500" />
                    </button>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {site.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {site.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin size={16} className="text-emerald-500" />
                      <span className="text-sm">{site.region}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {site.description}
                    </p>
                    
                    {/* View Details Button */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                        View Details
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      
                      {/* Favorite Indicator */}
                      <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                        <Heart size={16} className="text-rose-500 fill-rose-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Explore More Amazing Places
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Discover More Sites
                <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('favorites')
                  setFavorites([])
                }}
                className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Clear All Favorites
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Favorites