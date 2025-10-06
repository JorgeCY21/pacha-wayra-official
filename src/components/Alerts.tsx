import epidemicData from '../data/epidemics.json'
import { AlertTriangle, Shield, Calendar, Info, MapPin, Stethoscope } from 'lucide-react'

interface Props {
  region: string
  date: Date
}

interface EpidemicAlert {
  region: string
  title: string
  description: string
  risk_level: string
  affected_areas: string[]
  prevention_measures: string[]
  symptoms: string[]
}

function Alerts({ region, date }: Props) {
  const baseAlerts = (epidemicData as EpidemicAlert[]).filter((e: EpidemicAlert) => e.region === region)

  // Filter and enhance alerts based on date
  const getDateSpecificAlerts = (alerts: EpidemicAlert[], selectedDate: Date) => {
    const daysFromNow = Math.ceil((selectedDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    return alerts.map(alert => {
      let enhancedAlert = { ...alert };
      
      // Add timing context
      if (daysFromNow > 30) {
        enhancedAlert.description += ' - Long-term forecast may change';
      }
      
      return enhancedAlert;
    }).filter(alert => {
      // Filter out low risk alerts for distant future
      if (daysFromNow > 60 && alert.risk_level === 'low') return false;
      return true;
    });
  };

  const alerts = getDateSpecificAlerts(baseAlerts, date);
  const daysFromNow = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  if (alerts.length === 0) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
          <Shield className="text-green-600" size={32} />
        </div>
        <div>
          <p className="font-semibold text-green-800 text-lg">All Clear</p>
          <p className="text-sm text-green-600 mb-2">No active alerts for {region}</p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Calendar size={12} />
            <span>
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              {daysFromNow > 0 && ` (${daysFromNow} day${daysFromNow !== 1 ? 's' : ''} ahead)`}
            </span>
          </div>
        </div>
      </div>
    )
  }

  const getAlertColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'critical':
      case 'high': 
        return { 
          bg: 'bg-red-50', 
          border: 'border-red-200', 
          text: 'text-red-800',
          icon: 'text-red-600',
          badge: 'bg-red-100 text-red-700'
        };
      case 'medium': 
        return { 
          bg: 'bg-orange-50', 
          border: 'border-orange-200', 
          text: 'text-orange-800',
          icon: 'text-orange-600',
          badge: 'bg-orange-100 text-orange-700'
        };
      case 'low': 
        return { 
          bg: 'bg-yellow-50', 
          border: 'border-yellow-200', 
          text: 'text-yellow-800',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-100 text-yellow-700'
        };
      default: 
        return { 
          bg: 'bg-red-50', 
          border: 'border-red-200', 
          text: 'text-red-800',
          icon: 'text-red-600',
          badge: 'bg-red-100 text-red-700'
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-xl">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Health Alerts</h2>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Calendar size={14} />
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              {daysFromNow > 0 && ` (${daysFromNow} day${daysFromNow !== 1 ? 's' : ''} ahead)`}
            </p>
          </div>
        </div>
        {daysFromNow > 30 && (
          <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
            <Info size={12} />
            <span>Long-term</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {alerts.map((alert: EpidemicAlert, i: number) => {
          const colors = getAlertColor(alert.risk_level);
          return (
            <div key={i} className={`${colors.bg} border ${colors.border} rounded-xl p-4 space-y-3`}>
              {/* Header */}
              <div className="flex items-start gap-3">
                <AlertTriangle 
                  size={20} 
                  className={`${colors.icon} mt-0.5 flex-shrink-0`} 
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`font-bold text-lg ${colors.text}`}>{alert.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.badge}`}>
                      {alert.risk_level.toUpperCase()} RISK
                    </span>
                  </div>
                  <p className="text-gray-700">{alert.description}</p>
                </div>
              </div>

              {/* Affected Areas */}
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Affected Areas:</p>
                  <div className="flex flex-wrap gap-1">
                    {alert.affected_areas.map((area, index) => (
                      <span key={index} className="text-xs bg-white px-2 py-1 rounded border text-gray-600">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prevention Measures */}
              <div className="flex items-start gap-2">
                <Shield size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Prevention:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {alert.prevention_measures.map((measure, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{measure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Symptoms */}
              <div className="flex items-start gap-2">
                <Stethoscope size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Symptoms:</p>
                  <div className="flex flex-wrap gap-1">
                    {alert.symptoms.map((symptom, index) => (
                      <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Long-term warning */}
              {daysFromNow > 14 && (
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-white p-2 rounded border">
                  <Info size={12} />
                  <span>Monitor official updates as your travel date approaches</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Alerts