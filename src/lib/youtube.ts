const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

interface PlaylistItem {
  title: string;
  duration: number;
}

export async function getPlaylistDuration(playlistUrl: string): Promise<PlaylistItem[]> {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YouTube API key is not configured. Please add VITE_YOUTUBE_API_KEY to your environment variables.');
  }

  try {
    const playlistId = extractPlaylistId(playlistUrl);
    if (!playlistId) {
      throw new Error('Invalid playlist URL. Please ensure you\'re using a valid YouTube playlist link.');
    }

    // First, get playlist items
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`
    );
    const playlistData = await playlistResponse.json();

    if (playlistData.error) {
      if (playlistData.error.code === 403) {
        throw new Error('Invalid API key. Please check your YouTube API key configuration.');
      } else if (playlistData.error.code === 404) {
        throw new Error('Playlist not found. Please check if the playlist exists and is public.');
      }
      throw new Error(playlistData.error.message || 'Failed to fetch playlist');
    }

    if (!playlistData.items?.length) {
      throw new Error('No videos found in this playlist. The playlist might be empty or private.');
    }

    const videoIds = playlistData.items
      .map((item: any) => item.contentDetails?.videoId)
      .filter(Boolean)
      .join(',');

    // Then, get video details
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    const videosData = await videosResponse.json();

    if (videosData.error) {
      throw new Error(videosData.error.message || 'Failed to fetch video details');
    }

    return videosData.items.map((video: any) => ({
      title: video.snippet?.title || '',
      duration: parseDuration(video.contentDetails?.duration || ''),
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching the playlist data');
  }
}

function extractPlaylistId(url: string): string | null {
  const patterns = [
    /[?&]list=([^&]+)/, // Standard playlist URL
    /youtu\.be\/.*[?&]list=([^&]+)/, // Shortened URL with playlist
    /youtube\.com\/playlist\?list=([^&]+)/ // Direct playlist URL
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const [, hours, minutes, seconds] = match;
  return (parseInt(hours || '0') * 3600) +
         (parseInt(minutes || '0') * 60) +
         parseInt(seconds || '0');
}