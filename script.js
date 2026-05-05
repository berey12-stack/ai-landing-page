function generatePage() {
  const idea = document.getElementById('businessIdea').value.trim();

  if (!idea) {
    alert('Please enter a business idea first!');
    return;
  }

  const btn = document.getElementById('generateBtn');
  btn.textContent = 'Generating...';
  btn.disabled = true;

  setTimeout(() => {
    const result = generateContent(idea);
    displayResult(result);
    btn.textContent = 'Generate Landing Page';
    btn.disabled = false;
  }, 1200);
}

function generateContent(idea) {
  const words = idea.toLowerCase().split(' ');

  const prefixes = ['Nova', 'Spark', 'Bright', 'Swift', 'Peak', 'Zen', 'Bold', 'Pure', 'Wise', 'Glow'];
  const suffixes = ['Hub', 'Pro', 'Lab', 'Base', 'Spot', 'Desk', 'Flow', 'Nest', 'Box', 'Hive'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const keyword = words.find(w => w.length > 3) || words[0];
  const businessName = prefix + keyword.charAt(0).toUpperCase() + keyword.slice(1);

  const taglines = [
    `The smarter way to ${idea.toLowerCase()}.`,
    `Built for people who care about ${keyword}.`,
    `Your ${keyword} journey starts here.`,
    `Simple. Fast. Built around ${keyword}.`,
    `Redefining what ${keyword} really means.`
  ];
  const tagline = taglines[Math.floor(Math.random() * taglines.length)];

  const featureSets = [
    [
      `Lightning-fast ${keyword} experience`,
      `Smart tools designed for real results`,
      `Trusted by thousands of happy users`
    ],
    [
      `Simple setup, zero learning curve`,
      `Powerful features without the complexity`,
      `24/7 support whenever you need it`
    ],
    [
      `Built with your goals in mind`,
      `Seamless and intuitive from day one`,
      `Scales as your needs grow`
    ]
  ];
  const features = featureSets[Math.floor(Math.random() * featureSets.length)];

  const ctas = [
    'Get Started Free',
    'Try It Now',
    'Start Today',
    'Join for Free',
    'See It in Action'
  ];
  const cta = ctas[Math.floor(Math.random() * ctas.length)];

  return { businessName, tagline, features, cta };
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
