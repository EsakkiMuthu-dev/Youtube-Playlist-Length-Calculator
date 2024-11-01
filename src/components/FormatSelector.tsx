import React from 'react';
import { Clock } from 'lucide-react';

interface FormatSelectorProps {
  format: string;
  onFormatChange: (format: string) => void;
}

export function FormatSelector({ format, onFormatChange }: FormatSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <Clock className="w-4 h-4 text-gray-500" />
      <select
        value={format}
        onChange={(e) => onFormatChange(e.target.value)}
        className="bg-transparent text-sm text-gray-600 border-none focus:ring-0 cursor-pointer
          hover:text-gray-900 transition-colors"
      >
        <option value="detailed">Detailed</option>
        <option value="days">Days</option>
        <option value="hours">Hours</option>
        <option value="minutes">Minutes</option>
      </select>
    </div>
  );
}