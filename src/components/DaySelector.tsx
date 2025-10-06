import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

interface DaySelectorProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

function DaySelector({ onDateSelect, selectedDate }: DaySelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Generate days from today until 6 months later
  const generateDays = () => {
    const days = [];
    const today = new Date();
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(today.getMonth() + 6);
    
    const currentDate = new Date(today);
    while (currentDate <= sixMonthsLater) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };

  const days = generateDays();
  
  // Filter days for current month grid
  const currentMonthDays = days.filter(day => 
    day.getMonth() === currentMonth.getMonth() && 
    day.getFullYear() === currentMonth.getFullYear()
  );

  const getWeatherIcon = (date: Date) => {
    // Simulate different weather based on day (you can connect to your API later)
    const dayIndex = Math.abs(date.getDate() + date.getMonth() * 31);
    const weatherTypes = [Sun, Cloud, CloudRain, Snowflake];
    const WeatherIcon = weatherTypes[dayIndex % 4];
    return <WeatherIcon size={16} />;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-2xl border border-emerald-100">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-emerald-50 rounded-xl transition-colors"
        >
          <ChevronLeft size={20} className="text-emerald-600" />
        </motion.button>
        
        <h3 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
          <Calendar className="text-emerald-600" size={24} />
          {formatMonth(currentMonth)}
        </h3>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-emerald-50 rounded-xl transition-colors"
        >
          <ChevronRight size={20} className="text-emerald-600" />
        </motion.button>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-semibold text-emerald-600 py-2">
            {day}
          </div>
        ))}
        
        {currentMonthDays.map(day => {
          const isDisabled = day.getTime() < new Date().setHours(0, 0, 0, 0);
          const isSelected = day.getTime() === selectedDate.setHours(0, 0, 0, 0);
          const isToday = day.getTime() === new Date().setHours(0, 0, 0, 0);
          
          return (
            <motion.button
              key={day.toISOString()}
              whileHover={!isDisabled ? { scale: 1.05 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              onClick={() => !isDisabled && onDateSelect(day)}
              disabled={isDisabled}
              className={`
                relative p-3 rounded-2xl text-sm font-semibold transition-all duration-200
                ${isSelected ? 'bg-emerald-500 text-white shadow-lg' : ''}
                ${isToday && !isSelected ? 'bg-cyan-100 text-cyan-700 border-2 border-cyan-300' : ''}
                ${!isSelected && !isToday && !isDisabled ? 'bg-white hover:bg-emerald-50 text-gray-700 border border-gray-100' : ''}
                ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex flex-col items-center gap-1">
                <span>{day.getDate()}</span>
                {!isDisabled && (
                  <div className="text-gray-500">
                    {getWeatherIcon(day)}
                  </div>
                )}
              </div>
              
              {isToday && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-cyan-100 border-2 border-cyan-300 rounded"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-emerald-500 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-100 rounded"></div>
          <span>Past</span>
        </div>
      </div>
    </div>
  );
}

export default DaySelector;