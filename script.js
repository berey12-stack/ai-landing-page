function generatePage() {
  const idea = document.getElementById('businessIdea').value.trim();
  if (!idea) { alert('Please enter a business idea first!'); return; }

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
  if (/bak|pastry|bread|cake|cookie|dessert/.test(text)) return 'bakery';
  if (/coffee|cafe|brew|latte|espresso/.test(text))      return 'cafe';
  if (/tech|app|software|saas|digital|ai|platform/.test(text)) return 'tech';
  if (/shop|store|sell|retail|product/.test(text))       return 'shop';
  if (/food|meal|kitchen|chef|deliver|restaurant/.test(text))  return 'food';
  if (/gym|fitness|health|wellness|yoga|workout/.test(text))   return 'fitness';
  if (/school|learn|course|teach|educat/.test(text))     return 'education';
  if (/clean|laundry|wash|home service/.test(text))      return 'service';
  return 'general';
}

function generateContent(idea) {
  const type = detectType(idea);

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
    service: {
      names: ['ClearNest', 'SwiftServe', 'HomePro', 'CleanBase', 'BrightHome'],
      taglines: ['Your home, taken care of.', 'Reliable service you can count on.', 'We handle it so you don\'t have to.'],
      features: [
        ['Vetted and background-checked professionals', 'Book a service in under 2 minutes', 'Flexible scheduling that fits your day'],
        ['Eco-friendly products used on every job', 'Satisfaction guarantee on all services', 'Recurring bookings with priority slots'],
      ],
      ctas: ['Book a Service', 'Get a Free Quote', 'Schedule Now']
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
    businessName: pick(t.names),
    tagline: pick(t.taglines),
    features: pick(t.features),
    cta: pick(t.ctas)
  };
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

  const output = document.getElementById('output');
  output.style.display = 'block';
  output.scrollIntoView({ behavior: 'smooth' });
}
