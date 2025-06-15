export default async function handler(req, res) {
  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTFlOTNjLWZjM2UtNDg2Ni04OWI1LTYwMDhhODg4ZDdmNyIsIm5vbmNlIjoiMzVlMjQyZjEtNGUxYS00YTQ2LWFjODctNTg5ZDc0Y2NjNzgzIiwic2VydmljZSI6ImFmZmlsaWF0ZVN0YXRzIiwiaWF0IjoxNzM5MjUxMTYxfQ.PM-6IMX0i8vB0zzZ4vFuG22rUi6DMqN64I8OIsqw9VU'; // 🔁 Replace this with your actual API key
  const uid = '5ba1e93c-fc3e-4866-89b5-6008a888d7f7';
  const apiUrl = `https://roobet.com/_api/affiliate/leaderboard?affiliateId=${uid}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch leaderboard data' });
    }

    const rawData = await response.json();

    // Sort by weighted wager (highest first), limit to top 15
    const cleaned = rawData
      .sort((a, b) => b.weightedWagered - a.weightedWagered)
      .slice(0, 15)
      .map(entry => ({
        username: entry.username,
        weightedWagered: entry.weightedWagered
      }));

    res.status(200).json(cleaned);

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Server error retrieving leaderboard' });
  }
}
