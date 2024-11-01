import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface DurationDisplayProps {
  label: string;
  duration: number;
  format: string;
  className?: string;
  icon?: React.ReactNode;
}

export function DurationDisplay({ 
  label, 
  duration, 
  format, 
  className,
  icon = <Clock className="w-5 h-5" />
}: DurationDisplayProps) {
  const formatDuration = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    switch (format) {
      case 'days':
        return `${days.toFixed(1)} days`;
      case 'hours':
        return `${(seconds / 3600).toFixed(1)} hours`;
      case 'minutes':
        return `${(seconds / 60).toFixed(0)} minutes`;
      case 'detailed':
      default:
        const parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
        return parts.join(' ');
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm text-gray-600">{label}</p>
      </div>
      <p className="text-2xl font-semibold bg-clip-text text-transparent 
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {formatDuration(duration)}
      </p>
    </div>
  );
}