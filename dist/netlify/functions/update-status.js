// netlify/functions/update-status.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { text, token, emoji } = JSON.parse(event.body);

    const response = await fetch("https://discordapp.com/api/v8/users/@me/settings", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        custom_status: {
          text: text,
          expires_at: new Date(Date.now() + 60000).toISOString()
        }
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};