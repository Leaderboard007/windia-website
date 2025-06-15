export default async function handler(req, res) {
  const apiKey = 'YOUR_REAL_API_KEY'; // Replace this
  const uid = '5ba1e93c-fc3e-4866-89b5-6008a888d7f7';
  const apiUrl = `https://roobet.com/_api/affiliate/leaderboard?affiliateId=${uid}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });

    const text = await response.text();

    // DEBUG: log the raw response to Vercel logs
    console.log('Roobet API response:', text);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch from Roobet' });
    }

    let rawData;
    try {
      rawData = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ error: 'Invalid JSON from Roobet' });
    }

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
    res.status(500).json({ error: 'Server error while retrieving leaderboard' });
  }
}
