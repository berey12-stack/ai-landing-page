async function generatePage() {
  const idea = document.getElementById('businessIdea').value.trim();

  if (!idea) {
    alert('Please enter a business idea first!');
    return;
  }

  const btn = document.getElementById('generateBtn');
  btn.textContent = 'Generating...';
  btn.disabled = true;

  try {
    const result = await callClaude(idea);
    displayResult(result);
  } catch (error) {
    alert('Something went wrong. Please try again.');
    console.error(error);
  } finally {
    btn.textContent = 'Generate Landing Page';
    btn.disabled = false;
  }
}

async function callClaude(idea) {
  const API_KEY = 'YOUR_API_KEY_HERE'; // We will fill this in next step

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `You are a branding expert. Given this business idea, respond ONLY with valid JSON (no markdown, no explanation).

Business idea: "${idea}"

JSON format:
{
  "businessName": "a catchy business name",
  "tagline": "a short inspiring tagline",
  "features": ["feature 1", "feature 2", "feature 3"],
  "cta": "a call-to-action button text"
}`
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content[0].text;
  return JSON.parse(text);
}

function displayResult(data) {
  document.getElementById('businessName').textContent = data.businessName;
  document.getElementById('tagline').textContent = data.tagline;
  document.getElementById('feature1').textContent = data.features[0];
  document.getElementById('feature2').textContent = data.features[1];
  document.getElementById('feature3').textContent = data.features[2];
  document.getElementById('ctaBtn').textContent = data.cta;

  const output = document.getElementById('output');
  output.style.display = 'block';
  output.scrollIntoView({ behavior: 'smooth' });
}
