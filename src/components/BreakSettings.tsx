import React from 'react';
import { Coffee } from 'lucide-react';

interface BreakSettingsProps {
  breakInterval: number;
  breakDuration: number;
  onBreakIntervalChange: (interval: number) => void;
  onBreakDurationChange: (duration: number) => void;
}

export function BreakSettings({
  breakInterval,
  breakDuration,
  onBreakIntervalChange,
  onBreakDurationChange,
}: BreakSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-700">
        <Coffee className="w-5 h-5" />
        <h3 className="font-medium">Break Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">
            Break every (minutes)
          </label>
          <input
            type="number"
            value={breakInterval}
            onChange={(e) => onBreakIntervalChange(parseInt(e.target.value) || 0)}
            min="0"
            className="w-full px-3 py-2 rounded-lg border border-gray-200
              focus:ring-2 focus:ring-indigo-500 focus:outline-none
              bg-white/50 backdrop-blur-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-600">
            Break duration (minutes)
          </label>
          <input
            type="number"
            value={breakDuration}
            onChange={(e) => onBreakDurationChange(parseInt(e.target.value) || 0)}
            min="0"
            className="w-full px-3 py-2 rounded-lg border border-gray-200
              focus:ring-2 focus:ring-indigo-500 focus:outline-none
              bg-white/50 backdrop-blur-sm"
          />
        </div>
      </div>
    </div>
  );
}