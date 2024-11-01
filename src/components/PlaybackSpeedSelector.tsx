import React from 'react';
import { Gauge } from 'lucide-react';
import { cn } from '../lib/utils';

interface PlaybackSpeedSelectorProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const predefinedSpeeds = [0.5, 1, 1.25, 1.5, 2];

export function PlaybackSpeedSelector({ speed, onSpeedChange }: PlaybackSpeedSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-700">
        <Gauge className="w-5 h-5" />
        <h3 className="font-medium">Playback Speed</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {predefinedSpeeds.map((presetSpeed) => (
          <button
            key={presetSpeed}
            onClick={() => onSpeedChange(presetSpeed)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              speed === presetSpeed
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {presetSpeed}x
          </button>
        ))}
        
        <div className="relative">
          <input
            type="number"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value) || 1)}
            step="0.25"
            min="0.25"
            max="5"
            className="w-20 px-3 py-1.5 rounded-full text-sm bg-gray-100 
              focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Custom"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            x
          </span>
        </div>
      </div>
    </div>
  );
}