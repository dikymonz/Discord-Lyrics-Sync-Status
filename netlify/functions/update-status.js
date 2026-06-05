const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { text, emoji, token } = JSON.parse(event.body);

    if (!token) {
      return { statusCode: 400, body: JSON.stringify({ error: "Token required" }) };
    }

    const response = await fetch("https://discord.com/api/v9/users/@me/settings", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        custom_status: {
          text: text || "",
          emoji_name: emoji || null,
          expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 menit
        }
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};