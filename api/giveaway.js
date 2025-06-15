
const { google } = require('googleapis');
const axios = require('axios');

// YOUTUBE API SETUP
const API_KEY = 'AIzaSyCjPeB_QxBiYNT55FxT0QWVw5ifG86v4KQ';
const CHANNEL_IDS = [
  'UCNjbFCeNd7JDs9IZNYfp_Eg',
  'UCfVLx176hs6ePDuc1pwWy0w'
];

// Simulated KICK chat (real implementation needs websocket which Vercel doesn't support)
const fakeKickChatters = [
  "KickFan1", "ProBettor", "LuckyStrike", "SpinMaster", "GameLover"
];

async function getYouTubeChatters() {
  const youtube = google.youtube({ version: 'v3', auth: API_KEY });
  let chatters = [];

  for (const channelId of CHANNEL_IDS) {
    try {
      const liveResp = await youtube.search.list({
        part: 'snippet',
        channelId: channelId,
        eventType: 'live',
        type: 'video',
        maxResults: 1
      });

      if (!liveResp.data.items.length) continue;

      const liveChatId = (await youtube.videos.list({
        part: 'liveStreamingDetails',
        id: liveResp.data.items[0].id.videoId
      })).data.items[0]?.liveStreamingDetails?.activeLiveChatId;

      if (!liveChatId) continue;

      const chatResp = await youtube.liveChatMessages.list({
        liveChatId,
        part: 'snippet,authorDetails',
        maxResults: 100
      });

      const names = chatResp.data.items.map(msg => msg.authorDetails.displayName);
      chatters.push(...names);
    } catch (e) {
      console.error("YT error:", e.message);
    }
  }

  return chatters;
}

module.exports = async (req, res) => {
  try {
    const ytChatters = await getYouTubeChatters();
    const allChatters = [...ytChatters, ...fakeKickChatters];
    res.status(200).json({ chatters: allChatters });
  } catch (err) {
    console.error("Giveaway API error:", err.message);
    res.status(500).json({ error: "Failed to fetch chatters" });
  }
};
