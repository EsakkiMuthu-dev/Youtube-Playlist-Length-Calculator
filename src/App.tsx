import React, { useState } from "react";
import { Youtube, Clock, ArrowRight, Timer } from "lucide-react";
import { PlaybackSpeedSelector } from "./components/PlaybackSpeedSelector";
import { BreakSettings } from "./components/BreakSettings";
import { DurationDisplay } from "./components/DurationDisplay";
import { FormatSelector } from "./components/FormatSelector";
import { ThemeToggle } from "./components/ThemeToggle";
import { getPlaylistDuration } from "./lib/youtube";

function App() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [breakInterval, setBreakInterval] = useState(30);
  const [breakDuration, setBreakDuration] = useState(0);
  const [format, setFormat] = useState("detailed");
  const [loading, setLoading] = useState(false);
  const [baseDuration, setBaseDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const calculateTotalDuration = () => {
    const adjustedDuration = baseDuration / playbackSpeed;
    if (breakInterval <= 0 || breakDuration <= 0) return adjustedDuration;

    const breakCount = Math.floor(adjustedDuration / (breakInterval * 60));
    const totalBreakTime = breakCount * (breakDuration * 60);

    return adjustedDuration + totalBreakTime;
  };

  const handleCalculate = async () => {
    if (!playlistUrl.trim()) {
      setError("Please enter a YouTube playlist URL");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const videos = await getPlaylistDuration(playlistUrl);
      const totalDuration = videos.reduce(
        (acc, video) => acc + video.duration,
        0
      );
      setBaseDuration(totalDuration);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch playlist data"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-300/20 via-pink-300/20 to-indigo-300/20 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-indigo-900/20 blur-3xl -z-10" />
          <h1
            className="text-5xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-4
            animate-gradient bg-300%">
            YouTube Playlist Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Plan your learning journey by calculating total watch time
          </p>
        </div>

        <div
          className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 space-y-8
          border border-gray-100 dark:border-dark-border transition-all duration-300
          hover:shadow-purple-500/10 dark:hover:shadow-purple-500/5">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Youtube className="w-5 h-5" />
              <h3 className="font-medium">Playlist URL</h3>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
              <input
                type="url"
                value={playlistUrl}
                onChange={(e) => setPlaylistUrl(e.target.value)}
                placeholder="https://www.youtube.com/playlist?list=..."
                className="relative w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-border
                  focus:ring-2 focus:ring-purple-500 focus:outline-none
                  bg-white dark:bg-dark-input dark:text-white transition-all duration-300"
              />
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2
                  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                  text-white px-4 py-1.5 rounded-lg
                  hover:opacity-90 transition-all duration-300 shadow-md
                  hover:shadow-lg disabled:opacity-50 animate-glow">
                {loading ? "Calculating..." : "Calculate"}
              </button>
            </div>
            {error && (
              <div
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                rounded-lg p-4 mt-4 animate-fade-in">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {error}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PlaybackSpeedSelector
              speed={playbackSpeed}
              onSpeedChange={setPlaybackSpeed}
            />
            <BreakSettings
              breakInterval={breakInterval}
              breakDuration={breakDuration}
              onBreakIntervalChange={setBreakInterval}
              onBreakDurationChange={setBreakDuration}
            />
          </div>

          {baseDuration > 0 && (
            <div
              className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-white 
              dark:from-dark-input dark:to-dark-input rounded-xl
              border border-gray-100 dark:border-dark-border transition-all duration-300
              hover:shadow-lg dark:hover:shadow-purple-500/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Duration Estimate
                  </h3>
                </div>
                <FormatSelector format={format} onFormatChange={setFormat} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DurationDisplay
                  label="Base Duration"
                  duration={baseDuration}
                  format={format}
                  icon={
                    <Clock className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  }
                />

                <DurationDisplay
                  label="Total Duration"
                  duration={calculateTotalDuration()}
                  format={format}
                  icon={
                    <ArrowRight className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  }
                  className="md:border-l md:pl-6 dark:border-dark-border"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
