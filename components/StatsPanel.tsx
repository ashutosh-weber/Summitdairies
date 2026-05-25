'use client';

import { motion } from 'framer-motion';
import { Mountain, MapPin, Calendar, TrendingUp } from 'lucide-react';

interface Stats {
  totalLocations: number;
  exploredCount: number;
  plannedCount: number;
  unexploredCount: number;
  highestAltitude: number;
  highestLocation: string;
  regionsExplored: number;
  totalTrekDistance: number;
  locationsByYear: { [key: number]: number };
}

interface StatsPanelProps {
  stats: Stats | null;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  if (!stats) return null;

  const statCards = [
    {
      icon: Mountain,
      label: 'Explored',
      value: stats.exploredCount,
      color: 'from-green-500 to-emerald-600',
      iconColor: 'text-green-400',
    },
    {
      icon: Calendar,
      label: 'Planned',
      value: stats.plannedCount,
      color: 'from-yellow-500 to-orange-600',
      iconColor: 'text-yellow-400',
    },
    {
      icon: MapPin,
      label: 'Unexplored',
      value: stats.unexploredCount,
      color: 'from-red-500 to-pink-600',
      iconColor: 'text-red-400',
    },
    {
      icon: TrendingUp,
      label: 'Highest Peak',
      value: `${stats.highestAltitude.toLocaleString()} ft`,
      color: 'from-blue-500 to-purple-600',
      iconColor: 'text-blue-400',
      subtitle: stats.highestLocation,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl"
              style={{
                background: `linear-gradient(to right, var(--tw-gradient-stops))`,
              }}
            />
            <div className="relative p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Journey Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-400">Total Locations</p>
            <p className="text-xl font-bold text-white">{stats.totalLocations}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Regions Explored</p>
            <p className="text-xl font-bold text-white">{stats.regionsExplored}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Distance</p>
            <p className="text-xl font-bold text-white">
              {stats.totalTrekDistance > 0 ? `${stats.totalTrekDistance.toFixed(1)} km` : 'N/A'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Yearly Progress */}
      {Object.keys(stats.locationsByYear).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Expeditions by Year</h3>
          <div className="space-y-3">
            {Object.entries(stats.locationsByYear)
              .sort(([a], [b]) => Number(b) - Number(a))
              .map(([year, count]) => (
                <div key={year} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-400 w-16">{year}</span>
                  <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / Math.max(...Object.values(stats.locationsByYear))) * 100}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-end pr-3"
                    >
                      <span className="text-xs font-semibold text-white">{count}</span>
                    </motion.div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
