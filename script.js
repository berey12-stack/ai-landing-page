function setColor(btn) {
  document.querySelectorAll('.preset').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('themeColor').value = btn.dataset.color;
}

// sync custom color picker with presets
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('themeColor').addEventListener('input', () => {
    document.querySelectorAll('.preset').forEach(b => b.classList.remove('active'));
  });
});

function getThemeColor() {
  return document.getElementById('themeColor').value || '#7c3aed';
}

function generatePage() {
  const idea = document.getElementById('businessIdea').value.trim();
  if (!idea) { alert('Please describe your business first!'); return; }

  const btn = document.getElementById('generateBtn');
  btn.textContent = 'Generating...';
  btn.disabled = true;

  setTimeout(() => {
    const result = generateContent(idea);
    displayResult(result);
    btn.textContent = 'Generate Landing Page';
    btn.disabled = false;
  }, 1000);
}

function detectType(idea) {
  const text = idea.toLowerCase();
  if (/car|auto|vehicle|workshop|servic|tyre|mechanic|motor|engine|detailing/.test(text)) return 'automotive';
  if (/bak|pastry|bread|cake|cookie|dessert/.test(text)) return 'bakery';
  if (/coffee|cafe|brew|latte|espresso/.test(text))      return 'cafe';
  if (/eco|green|environment|sustainable|organic|recycle|nature|zero.waste|planet/.test(text)) return 'eco';
  if (/tech|app|software|saas|digital|ai|platform/.test(text)) return 'tech';
  if (/food|meal|kitchen|chef|deliver|restaurant/.test(text))  return 'food';
  if (/gym|fitness|health|wellness|yoga|workout/.test(text))   return 'fitness';
  if (/school|learn|course|teach|educat/.test(text))     return 'education';
  if (/clean|laundry|wash|home service/.test(text))      return 'service';
  if (/salon|hair|beauty|nail|spa|barber/.test(text))    return 'beauty';
  if (/shop|store|sell|retail|product|household|item/.test(text)) return 'shop';
  return 'general';
}

function generateContent(idea) {
  const type = detectType(idea);
  // Use the business name field if filled in, otherwise generate one
  const nameEl = document.getElementById('businessName_input');
  const customName = nameEl ? nameEl.value.trim() : '';

  const templates = {
    bakery: {
      names: ['CrustCo', 'DoughDelights', 'PastryNest', 'BakeCraft', 'GoldenLoaf'],
      taglines: ['Fresh from the oven, straight to your heart.', 'Every bite tells a story.', 'Handcrafted with love, baked to perfection.'],
      features: [
        ['Freshly baked daily with premium ingredients', 'Vintage recipes passed down through generations', 'Custom orders for any occasion'],
        ['Small-batch artisan baking every morning', 'Zero preservatives, all natural flavours', 'Delivery straight to your doorstep'],
      ],
      ctas: ['Order Now', 'See Our Menu', 'Get Fresh Bakes']
    },
    cafe: {
      names: ['BrewNest', 'SipCo', 'CafeBloom', 'RoastHaven', 'MugMate'],
      taglines: ['Your daily ritual, perfected.', 'Where great coffee meets good vibes.', 'Sip slow. Enjoy more.'],
      features: [
        ['Specialty single-origin beans sourced globally', 'Cozy space perfect for work or catch-ups', 'Seasonal drinks crafted by expert baristas'],
        ['Fresh pastries paired with every cup', 'Bean subscriptions delivered to your door', 'Loyalty rewards for every visit'],
      ],
      ctas: ['Visit Us Today', 'See the Menu', 'Order a Cuppa']
    },
    tech: {
      names: ['NovaPulse', 'StackFlow', 'CodeNest', 'ByteBase', 'LaunchPad'],
      taglines: ['Build faster. Ship smarter.', 'Technology that works as hard as you do.', 'Less complexity. More results.'],
      features: [
        ['Intuitive dashboard with real-time insights', 'Seamless integrations with your existing tools', 'Enterprise-grade security out of the box'],
        ['Auto-scaling infrastructure built for growth', 'One-click deployment with zero downtime', 'Dedicated support team available 24/7'],
      ],
      ctas: ['Start Free Trial', 'See a Demo', 'Get Early Access']
    },
    shop: {
      names: ['ShopNova', 'TrendVault', 'MarketNest', 'PickCart', 'StorePeak'],
      taglines: ['Shop smarter, not harder.', 'Quality products, unbeatable prices.', 'Everything you need, in one place.'],
      features: [
        ['Curated selection of top-quality products', 'Fast and reliable shipping nationwide', 'Hassle-free returns within 30 days'],
        ['Exclusive members-only deals every week', 'Secure checkout in under 60 seconds', 'Real-time order tracking at your fingertips'],
      ],
      ctas: ['Shop Now', 'Browse Collection', 'Get 10% Off Today']
    },
    food: {
      names: ['FreshPlate', 'MealNest', 'ChefDrop', 'YumBox', 'DishCo'],
      taglines: ['Great food, delivered fast.', 'Restaurant quality at your doorstep.', 'Eat well. Live better.'],
      features: [
        ['Chef-prepared meals using fresh local ingredients', 'Delivery in under 30 minutes guaranteed', 'Customisable meals to fit your diet'],
        ['New seasonal menus every week', 'Family and group meal options available', 'Eco-friendly packaging on every order'],
      ],
      ctas: ['Order Now', 'View Today\'s Menu', 'Get First Order Free']
    },
    fitness: {
      names: ['PeakForm', 'FitNova', 'ZenStrong', 'PulseGym', 'CoreFlow'],
      taglines: ['Your strongest self starts here.', 'Train hard. Recover smart.', 'Fitness made simple, results made real.'],
      features: [
        ['Personalised workout plans for every level', 'Expert coaches available online and in-person', 'Track your progress with real-time analytics'],
        ['Group classes for motivation and community', 'Flexible membership with no lock-in contracts', 'Nutrition guidance included with every plan'],
      ],
      ctas: ['Join Now', 'Book a Free Session', 'Start Your Journey']
    },
    education: {
      names: ['LearnSpark', 'BrightPath', 'EduNest', 'SkillBloom', 'WiseHub'],
      taglines: ['Learn at your pace, grow at your speed.', 'Knowledge that opens doors.', 'Skills for today. Careers for tomorrow.'],
      features: [
        ['Expert-led courses designed for real results', 'Learn from anywhere on any device', 'Certificates recognised by top employers'],
        ['Live sessions with Q&A and mentorship', 'Self-paced modules you can revisit anytime', 'Community of learners to keep you motivated'],
      ],
      ctas: ['Start Learning Free', 'Browse Courses', 'Get Certified']
    },
    eco: {
      names: ['GreenNest', 'EcoBloom', 'PureEarth', 'LeafCo', 'TerraCraft'],
      taglines: ['Good for you. Great for the planet.', 'Live green. Live better.', 'Small changes. Big impact.'],
      features: [
        ['100% eco-friendly and sustainably sourced products', 'Zero-waste packaging on every order', 'Every purchase plants a tree'],
        ['Natural ingredients, no harmful chemicals', 'Proudly carbon-neutral since day one', 'Trusted by thousands of conscious consumers'],
      ],
      ctas: ['Shop Sustainably', 'Go Green Today', 'Explore Products']
    },
    service: {
      names: ['ClearNest', 'SwiftServe', 'HomePro', 'CleanBase', 'BrightHome'],
      taglines: ['Your home, taken care of.', 'Reliable service you can count on.', 'We handle it so you don\'t have to.'],
      features: [
        ['Vetted and background-checked professionals', 'Book a service in under 2 minutes', 'Flexible scheduling that fits your day'],
        ['Eco-friendly products used on every job', 'Satisfaction guarantee on all services', 'Recurring bookings with priority slots'],
      ],
      ctas: ['Book a Service', 'Get a Free Quote', 'Schedule Now']
    },
    automotive: {
      names: ['AutoPro', 'RevWorks', 'DriveServ', 'TorqueLab', 'PitStop'],
      taglines: ['Your car deserves the best care.', 'Expert hands. Every service.', 'Drive in. Drive out confident.'],
      features: [
        ['Full car servicing by certified mechanics', 'Transparent pricing — no hidden charges', 'Same-day service available, walk-ins welcome'],
        ['Engine checks, tyre, brakes & more', 'Genuine parts used on every repair', 'Free inspection with every service booking'],
      ],
      ctas: ['Book a Service', 'Get a Free Quote', 'Call Us Now']
    },
    beauty: {
      names: ['GlowStudio', 'BloomSalon', 'VelvetTouch', 'PureGlow', 'NestBeauty'],
      taglines: ['Look good. Feel amazing.', 'Where beauty meets confidence.', 'Your glow-up starts here.'],
      features: [
        ['Expert stylists with years of experience', 'Premium products for lasting results', 'Relaxing atmosphere from the moment you walk in'],
        ['Flexible appointments 7 days a week', 'Personalised treatments for every skin type', 'Special packages for groups and events'],
      ],
      ctas: ['Book Now', 'See Our Services', 'Get a Makeover']
    },
    general: {
      names: ['NovaCo', 'SparkBase', 'BoldNest', 'PeakFlow', 'ZenHub'],
      taglines: ['Built for people who want better.', 'Simple idea. Powerful results.', 'The smarter way to get things done.'],
      features: [
        ['Designed around what customers actually need', 'Fast, reliable and easy to use from day one', 'Trusted by hundreds of happy customers'],
        ['Affordable plans for every budget', 'Friendly support team always on hand', 'New features added every month'],
      ],
      ctas: ['Get Started', 'Learn More', 'Try It Free']
    }
  };

  const t = templates[type];
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  return {
    businessName: customName || pick(t.names),
    tagline: pick(t.taglines),
    features: pick(t.features),
    cta: pick(t.ctas)
  };
}

function downloadPage() {
  const name = document.getElementById('businessName').textContent;
  const tagline = document.getElementById('tagline').textContent;
  const f1 = document.getElementById('feature1').textContent;
  const f2 = document.getElementById('feature2').textContent;
  const f3 = document.getElementById('feature3').textContent;
  const cta = document.getElementById('ctaBtn').textContent;
  const color = getThemeColor();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${name}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Segoe UI',sans-serif; background:#0f0f13; color:#f1f1f1; }
    .hero { background:${color}; padding:80px 24px; text-align:center; }
    h1 { font-size:2.8rem; font-weight:800; color:#fff; margin-bottom:16px; }
    .tagline { font-size:1.15rem; color:rgba(255,255,255,0.8); margin-bottom:32px; }
    .cta { padding:14px 40px; background:rgba(0,0,0,0.25); color:#fff; border:2px solid rgba(255,255,255,0.5); border-radius:50px; font-size:1rem; font-weight:600; cursor:pointer; }
    .features { display:grid; grid-template-columns:repeat(3,1fr); background:#fff; color:#111; }
    .feature { padding:32px 24px; border-right:1px solid #f3f4f6; text-align:center; font-size:0.95rem; line-height:1.6; }
    .feature:last-child { border-right:none; }
    .feature::before { content:'✦'; display:block; color:${color}; margin-bottom:10px; font-size:1.1rem; }
    .contact { background:#fafafa; color:#111; padding:48px 24px; text-align:center; border-top:1px solid #f3f4f6; }
    .contact h2 { font-size:1.4rem; margin-bottom:8px; }
    .contact p { color:#6b7280; margin-bottom:24px; }
    form { display:flex; flex-direction:column; gap:12px; max-width:420px; margin:0 auto; }
    input, textarea { padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:0.95rem; font-family:inherit; }
    form button { padding:13px; background:${color}; color:#fff; border:none; border-radius:10px; font-weight:600; cursor:pointer; }
    @media(max-width:600px){ .features{grid-template-columns:1fr;} h1{font-size:1.8rem;} }
  </style>
</head>
<body>
  <div class="hero">
    <h1>${name}</h1>
    <p class="tagline">${tagline}</p>
    <button class="cta">${cta}</button>
  </div>
  <div class="features">
    <div class="feature">${f1}</div>
    <div class="feature">${f2}</div>
    <div class="feature">${f3}</div>
  </div>
  <div class="contact">
    <h2>Get in Touch</h2>
    <p>Interested? Send us a message and we'll get back to you.</p>
    <form onsubmit="alert('Message sent!');return false;">
      <input type="text" placeholder="Your Name" required/>
      <input type="email" placeholder="Your Email" required/>
      <textarea rows="4" placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.toLowerCase().replace(/\s+/g, '-')}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

function generateBio() {
  const link = document.getElementById('userLink').value.trim();
  const name = document.getElementById('businessName').textContent;
  const tagline = document.getElementById('tagline').textContent;

  if (!link) { alert('Please paste your page link first!'); return; }

  const bio = `✨ ${name} ✨\n${tagline}\n\n🔗 Check us out here: ${link}\n\n📩 DM us or visit the link to get in touch!`;

  document.getElementById('bioText').textContent = bio;
  document.getElementById('bioOutput').style.display = 'flex';
  document.getElementById('copyConfirm').style.display = 'none';
}

function copyBio() {
  const bio = document.getElementById('bioText').textContent;
  navigator.clipboard.writeText(bio).then(() => {
    const confirm = document.getElementById('copyConfirm');
    confirm.style.display = 'inline';
    setTimeout(() => confirm.style.display = 'none', 2500);
  });
}

function handleContact(e) {
  e.preventDefault();
  alert('Thank you! Your message has been sent.');
  e.target.reset();
}

function displayResult(data) {
  document.getElementById('businessName').textContent = data.businessName;
  document.getElementById('tagline').textContent = data.tagline;
  document.getElementById('feature1').textContent = data.features[0];
  document.getElementById('feature2').textContent = data.features[1];
  document.getElementById('feature3').textContent = data.features[2];
  document.getElementById('ctaBtn').textContent = data.cta;

  // Apply theme color to preview
  const color = getThemeColor();
  document.querySelector('.preview-hero').style.background = color;
  document.querySelector('.cta-btn').style.background = color;
  document.querySelectorAll('.step-num').forEach(n => n.style.background = color);
  // Inject a <style> tag to override the ::before pseudo-element color
  const existing = document.getElementById('dynamic-accent');
  if (existing) existing.remove();
  const styleTag = document.createElement('style');
  styleTag.id = 'dynamic-accent';
  styleTag.textContent = `.feature-card::before { color: ${color} !important; }`;
  document.head.appendChild(styleTag);

  const output = document.getElementById('output');
  output.style.display = 'block';
  document.getElementById('publishSection').style.display = 'block';
  output.scrollIntoView({ behavior: 'smooth' });
}
