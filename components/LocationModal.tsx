'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mountain, Calendar, MapPin, Thermometer, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Location {
  _id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  status: 'unexplored' | 'planned' | 'explored';
  altitude: number;
  region: string;
  difficulty: string;
  bestSeason?: string[];
  weatherInfo?: string;
  routeInformation?: string;
  estimatedDuration?: string;
  preparationChecklist?: string[];
  suggestedEquipment?: string[];
  travelNotes?: string;
  planningNotes?: string;
  plannedDate?: string;
  exploredDate?: string;
  exploredYear?: number;
  memories?: {
    story?: string;
    weatherConditions?: string;
    temperature?: string;
    emotionalNotes?: string;
  };
  images?: Array<{ url: string; caption?: string; type: string }>;
  videos?: Array<{ url: string; caption?: string; type: string }>;
  trekDistance?: string;
  trekDuration?: string;
}

interface LocationModalProps {
  location: Location | null;
  onClose: () => void;
  onUpdate: (id: string, data: any) => void;
}

export default function LocationModal({ location, onClose, onUpdate }: LocationModalProps) {
  const [isPlanning, setIsPlanning] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [plannedDate, setPlannedDate] = useState('');
  const [planningNotes, setPlanningNotes] = useState('');
  const [hasCheckedCompletion, setHasCheckedCompletion] = useState(false);
  const [memoryData, setMemoryData] = useState({
    story: '',
    weatherConditions: '',
    temperature: '',
    emotionalNotes: '',
    exploredDate: '',
  });

  // Reset states when location changes
  useEffect(() => {
    if (location) {
      setHasCheckedCompletion(false);
      setIsCompleting(false);
      setIsAddingMemory(false);
      setIsPlanning(false);
    }
  }, [location?._id]);

  // Check if planned date has arrived - only once per location
  useEffect(() => {
    if (location && location.status === 'planned' && location.plannedDate && !hasCheckedCompletion) {
      const planned = new Date(location.plannedDate);
      const today = new Date();
      
      // Set time to start of day for accurate comparison
      planned.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      
      if (today >= planned) {
        setHasCheckedCompletion(true);
        setTimeout(() => setIsCompleting(true), 500);
      }
    }
  }, [location, hasCheckedCompletion]);

  if (!location) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'moderate': return 'text-yellow-400';
      case 'difficult': return 'text-orange-400';
      case 'extreme': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadge = () => {
    switch (location.status) {
      case 'explored':
        return <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">Explored</span>;
      case 'planned':
        return <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">Planned</span>;
      case 'unexplored':
        return <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">Unexplored</span>;
    }
  };

  const handlePlanTrip = async () => {
    if (!plannedDate) return;
    
    const selectedDate = new Date(plannedDate);
    const today = new Date();
    
    // Set to start of day for comparison
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    // If date is in the past, directly mark as completed
    if (selectedDate < today) {
      // Set the memory data with the selected date
      setMemoryData({
        ...memoryData,
        exploredDate: plannedDate,
      });
      setIsPlanning(false);
      setIsAddingMemory(true);
    } else {
      // Future date - mark as planned
      await onUpdate(location._id, {
        status: 'planned',
        plannedDate: selectedDate,
        planningNotes,
      });
      
      setIsPlanning(false);
      setPlannedDate('');
      setPlanningNotes('');
    }
  };

  const handleCompleteTrip = async (completed: boolean) => {
    if (completed) {
      // User confirmed completion
      setIsCompleting(false);
      setHasCheckedCompletion(true); // Prevent popup from showing again
      
      // Pre-fill the explored date with the planned date
      setMemoryData({
        ...memoryData,
        exploredDate: location.plannedDate || new Date().toISOString().split('T')[0],
      });
      
      setIsAddingMemory(true);
    } else {
      // User said not yet - just close the popup
      setIsCompleting(false);
      setHasCheckedCompletion(true); // Mark as checked so it doesn't show again
    }
  };

  const handleSaveMemory = async () => {
    const exploredDate = new Date(memoryData.exploredDate);
    
    await onUpdate(location._id, {
      status: 'explored',
      exploredDate,
      exploredYear: exploredDate.getFullYear(),
      memories: {
        story: memoryData.story,
        weatherConditions: memoryData.weatherConditions,
        temperature: memoryData.temperature,
        emotionalNotes: memoryData.emotionalNotes,
      },
    });
    
    setIsAddingMemory(false);
    setMemoryData({
      story: '',
      weatherConditions: '',
      temperature: '',
      emotionalNotes: '',
      exploredDate: '',
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-mountain-dark to-mountain-blue rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-mountain-darker/95 backdrop-blur-lg border-b border-white/10 p-6 flex justify-between items-start z-10">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">{location.name}</h2>
              <div className="flex items-center gap-3 flex-wrap">
                {getStatusBadge()}
                <span className={`text-sm font-medium ${getDifficultyColor(location.difficulty)}`}>
                  {location.difficulty}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                <Mountain className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Altitude</p>
                  <p className="text-lg font-semibold text-white">{location.altitude.toLocaleString()} ft</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Region</p>
                  <p className="text-lg font-semibold text-white">{location.region}</p>
                </div>
              </div>

              {location.estimatedDuration && (
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="text-lg font-semibold text-white">{location.estimatedDuration}</p>
                  </div>
                </div>
              )}

              {location.weatherInfo && (
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  <Thermometer className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Weather</p>
                    <p className="text-sm font-medium text-white">{location.weatherInfo}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Best Season */}
            {location.bestSeason && location.bestSeason.length > 0 && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Best Season</h3>
                <div className="flex gap-2 flex-wrap">
                  {location.bestSeason.map((season, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {season}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Route Information */}
            {location.routeInformation && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Route Information</h3>
                <p className="text-white">{location.routeInformation}</p>
              </div>
            )}

            {/* Status-specific content */}
            {location.status === 'unexplored' && !isPlanning && (
              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">Plan Your Expedition</h3>
                <p className="text-gray-300 mb-4">Ready to explore this location? Add it to your planned journeys!</p>
                <button
                  onClick={() => setIsPlanning(true)}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  Plan This Trek
                </button>
              </div>
            )}

            {isPlanning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white/5 rounded-lg border border-white/10 space-y-4"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Plan Your Journey</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Planned Date
                  </label>
                  <input
                    type="date"
                    value={plannedDate}
                    onChange={(e) => setPlannedDate(e.target.value)}
                    className="w-full px-4 py-2 bg-mountain-darker border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Planning Notes
                  </label>
                  <textarea
                    value={planningNotes}
                    onChange={(e) => setPlanningNotes(e.target.value)}
                    rows={4}
                    placeholder="Add your planning notes, preparation checklist, etc..."
                    className="w-full px-4 py-2 bg-mountain-darker border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handlePlanTrip}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Save Plan
                  </button>
                  <button
                    onClick={() => setIsPlanning(false)}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {location.status === 'planned' && (
              <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                <h3 className="text-xl font-semibold text-white mb-2">Planned Expedition</h3>
                {location.plannedDate && (
                  <p className="text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Planned for: {new Date(location.plannedDate).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                )}
                {location.planningNotes && (
                  <p className="text-gray-400 text-sm mt-2">{location.planningNotes}</p>
                )}
              </div>
            )}

            {isCompleting && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <div className="bg-mountain-dark rounded-2xl p-8 max-w-md w-full border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-4">Trip Completion</h3>
                  <p className="text-gray-300 mb-6">
                    Your planned date has arrived! Have you completed this trek?
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleCompleteTrip(true)}
                      className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Yes, Completed!
                    </button>
                    <button
                      onClick={() => handleCompleteTrip(false)}
                      className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-5 h-5" />
                      Not Yet
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {isAddingMemory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white/5 rounded-lg border border-white/10 space-y-4"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Add Your Memories</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Completion Date
                  </label>
                  <input
                    type="date"
                    value={memoryData.exploredDate}
                    onChange={(e) => setMemoryData({ ...memoryData, exploredDate: e.target.value })}
                    className="w-full px-4 py-2 bg-mountain-darker border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Story
                  </label>
                  <textarea
                    value={memoryData.story}
                    onChange={(e) => setMemoryData({ ...memoryData, story: e.target.value })}
                    rows={4}
                    placeholder="Share your expedition story..."
                    className="w-full px-4 py-2 bg-mountain-darker border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Weather Conditions
                    </label>
                    <input
                      type="text"
                      value={memoryData.weatherConditions}
                      onChange={(e) => setMemoryData({ ...memoryData, weatherConditions: e.target.value })}
                      placeholder="e.g., Snowfall, Clear sky"
                      className="w-full px-4 py-2 bg-mountain-darker border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Temperature
                    </label>
                    <input
                      type="text"
                      value={memoryData.temperature}
                      onChange={(e) => setMemoryData({ ...memoryData, temperature: e.target.value })}
                      placeholder="e.g., -4°C"
                      className="w-full px-4 py-2 bg-mountain-darker border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Emotional Notes
                  </label>
                  <textarea
                    value={memoryData.emotionalNotes}
                    onChange={(e) => setMemoryData({ ...memoryData, emotionalNotes: e.target.value })}
                    rows={3}
                    placeholder="How did you feel? What made this special?"
                    className="w-full px-4 py-2 bg-mountain-darker border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveMemory}
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Save Memories
                  </button>
                  <button
                    onClick={() => setIsAddingMemory(false)}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {location.status === 'explored' && location.memories && (
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                  <h3 className="text-xl font-semibold text-white mb-2">Explored Journey</h3>
                  {location.exploredDate && (
                    <p className="text-gray-300 mb-4">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Completed on: {new Date(location.exploredDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  )}
                  
                  {location.memories.story && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Story</h4>
                      <p className="text-white italic">"{location.memories.story}"</p>
                    </div>
                  )}

                  {location.memories.weatherConditions && (
                    <div className="mb-2">
                      <span className="text-sm text-gray-400">Weather: </span>
                      <span className="text-white">{location.memories.weatherConditions}</span>
                      {location.memories.temperature && (
                        <span className="text-white"> • {location.memories.temperature}</span>
                      )}
                    </div>
                  )}

                  {location.memories.emotionalNotes && (
                    <div className="mt-4 p-4 bg-white/5 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Reflections</h4>
                      <p className="text-gray-300 text-sm">{location.memories.emotionalNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Equipment List */}
            {location.suggestedEquipment && location.suggestedEquipment.length > 0 && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Suggested Equipment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {location.suggestedEquipment.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preparation Checklist */}
            {location.preparationChecklist && location.preparationChecklist.length > 0 && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Preparation Checklist</h3>
                <div className="space-y-2">
                  {location.preparationChecklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
