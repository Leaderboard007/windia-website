export default async function handler(req, res) {
  const API_URL = 'https://roobetconnect.com/affiliate/v2/stats';
  const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTFlOTNjLWZjM2UtNDg2Ni04OWI1LTYwMDhhODg4ZDdmNyIsIm5vbmNlIjoiMzVlMjQyZjEtNGUxYS00YTQ2LWFjODctNTg5ZDc0Y2NjNzgzIiwic2VydmljZSI6ImFmZmlsaWF0ZVN0YXRzIiwiaWF0IjoxNzM5MjUxMTYxfQ.PM-6IMX0i8vB0zzZ4vFuG22rUi6DMqN64I8OIsqw9VU'; // 🔁 Replace with real token
  const USER_ID = '5ba1e93c-fc3e-4866-89b5-6008a888d7f7'; // Your UID

  // Date logic (same as Render)
  function getStartEndDates() {
    const today = new Date();
    const currentDay = today.getDate();
    let startDate, endDate;

    if (currentDay >= 23) {
      startDate = new Date(today.getFullYear(), today.getMonth(), 23);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 22, 23, 59, 59);
    } else {
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 23);
      endDate = new Date(today.getFullYear(), today.getMonth(), 22, 23, 59, 59);
    }

    return {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    };
  }

  function maskUsername(username) {
    const first = username.slice(0, 2);
    const last = username.slice(-2);
    return `${first}****${last}`;
  }

  const { start, end } = getStartEndDates();

  try {
    const response = await fetch(`${API_URL}?userId=${USER_ID}&startDate=${start}&endDate=${end}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Roobet API Error:', errorText);
      return res.status(response.status).json({ error: 'Failed to fetch leaderboard data' });
    }

    const raw = await response.json();

    const cleaned = raw
      .filter(user => user.weightedWagered > 0)
      .sort((a, b) => b.weightedWagered - a.weightedWagered)
      .slice(0, 15)
      .map(user => ({
        username: maskUsername(user.username),
        weightedWagered: user.weightedWagered
      }));

    return res.status(200).json(cleaned);
  } catch (err) {
    console.error('Server Error:', err.message);
    return res.status(500).json({ error: 'Server error while retrieving leaderboard' });
  }
}
