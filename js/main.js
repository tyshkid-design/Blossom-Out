/* ============================================================
   main.js — Global JS (runs on all pages)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR ── */
  const navbar    = document.getElementById('navbar');
  const sections  = document.querySelectorAll('section[id], #hero');
  const navLinks  = document.querySelectorAll('#navLinks a, #mobileDrawer a');

  function setActiveLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.remove('active');
      if (
        (path === 'index.html'   && (href === 'index.html'   || href === '#')) ||
        (path === 'about.html'   && href === 'about.html')   ||
        (path === 'services.html'&& href === 'services.html')||
        (path === 'contact.html' && href === 'contact.html')
      ) { a.classList.add('active'); }
    });
  }
  setActiveLink();

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── HAMBURGER ── */
  const hamburger    = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = mobileDrawer.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    mobileDrawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = [...(entry.target.parentElement?.querySelectorAll('.reveal:not(.visible)') || [])];
          const delay = siblings.indexOf(entry.target) * 80;
          setTimeout(() => entry.target.classList.add('visible'), Math.max(0, delay));
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => ro.observe(el));
  }

  /* ── SMOOTH SCROLL (same-page anchors) ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ── SERVICE MODAL ── */
  const serviceData = {
    school: {
      icon: '🏫',
      title: 'School Transformation Program',
      body: `
        <p>A comprehensive service designed to empower educational institutions and promote holistic growth. The program caters to all stakeholders within the school community.</p>
        <ul>
          <li><strong>School Directors</strong> – Strategic leadership, visionary planning, governance strategies</li>
          <li><strong>Management</strong> – Team management, performance evaluation, financial management</li>
          <li><strong>Teachers</strong> – Pedagogical excellence, classroom management, differentiated instruction</li>
          <li><strong>Support Staff</strong> – Teamwork and service training</li>
          <li><strong>PTA &amp; Parents</strong> – Parent-school partnerships, parenting skills</li>
          <li><strong>Students</strong> – Character development, life skills, personal well-being</li>
        </ul>`
    },
    growing: {
      icon: '🌱',
      title: 'Growing and Loving It',
      body: `
        <p>A Christian-based program supporting children and teenagers in flourishing spiritually, emotionally, and socially.</p>
        <ul>
          <li><strong>Spiritual Development</strong> – Biblical principles, prayer, identity in Christ</li>
          <li><strong>Character Formation</strong> – Honesty, kindness, integrity, compassion</li>
          <li><strong>Emotional Well-being</strong> – Resilience, stress management, healthy coping</li>
          <li><strong>Life Skills</strong> – Communication, goal-setting, time management</li>
          <li><strong>Positive Relationships</strong> – Friendships, conflict resolution, family bonds</li>
        </ul>
        <p style="margin-top:1rem;">Delivered via <em>one-on-one mentorship</em> and the annual <strong>"Growing and Loving It Camp"</strong> held every December (5 days).</p>`
    },
    journey: {
      icon: '🧭',
      title: 'Journey with Dr. Ruth',
      body: `
        <p>A one-year mentorship program tailored for young adults (18–24) and young professionals (24–35), led personally by Dr. Ruth Muthei.</p>
        <ul>
          <li>Personal Development &amp; Self-Awareness</li>
          <li>Career Planning, Resume Building &amp; Interview Skills</li>
          <li>Leadership &amp; Professional Skills</li>
          <li>Personal Branding &amp; Networking</li>
          <li>Financial Literacy &amp; Budgeting</li>
          <li>Work-Life Balance &amp; Self-care</li>
          <li>Emotional Intelligence &amp; Interpersonal Skills</li>
          <li>Mental Health &amp; Stress Resilience</li>
          <li>Life Transitions &amp; Decision Making</li>
        </ul>`
    },
    transition: {
      icon: '🔄',
      title: 'Transition Coaching',
      body: `
        <p>Personalized support through all of life's significant transitions — from childhood through retirement.</p>
        <ul>
          <li><strong>Childhood</strong> – Starting school, moving grade levels</li>
          <li><strong>Adolescence</strong> – Puberty, physical &amp; emotional changes</li>
          <li><strong>Education</strong> – High school, college/university, graduation</li>
          <li><strong>Relationships</strong> – Marriage, parenthood, divorce/separation</li>
          <li><strong>Midlife</strong> – Career changes, empty nest syndrome</li>
          <li><strong>Career</strong> – Job loss, resignation, relocation</li>
          <li><strong>Retirement</strong> – Pre-retirement planning, post-retirement life</li>
        </ul>`
    },
    corporate: {
      icon: '🏢',
      title: 'Corporate Consulting Services',
      body: `
        <p>Comprehensive corporate consulting designed to enhance organizational effectiveness, productivity, and success.</p>
        <ul>
          <li><strong>Leadership Development</strong> – Customized programs for executives and managers</li>
          <li><strong>Team Building &amp; Collaboration</strong> – Workshops to strengthen trust and communication</li>
          <li><strong>Organizational Effectiveness</strong> – Assessments, streamlined workflows</li>
          <li><strong>Change Management</strong> – Guiding organizations through transitions</li>
          <li><strong>Talent Development &amp; Succession Planning</strong></li>
          <li><strong>Employee Engagement &amp; Well-being</strong></li>
        </ul>`
    }
  };

  const overlay    = document.getElementById('modalOverlay');
  const mIcon      = document.getElementById('modalIcon');
  const mTitle     = document.getElementById('modalTitle');
  const mBody      = document.getElementById('modalBody');
  const mClose     = document.getElementById('modalClose');
  const mContactBtn= document.getElementById('modalContactBtn');

  function openModal(key) {
    const d = serviceData[key]; if (!d) return;
    mIcon.textContent  = d.icon;
    mTitle.textContent = d.title;
    mBody.innerHTML    = d.body;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-service]').forEach(btn =>
    btn.addEventListener('click', () => openModal(btn.dataset.service))
  );
  if (mClose)      mClose.addEventListener('click', closeModal);
  if (overlay)     overlay.addEventListener('click', e => { if (e.target===overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key==='Escape') closeModal(); });
  if (mContactBtn) mContactBtn.addEventListener('click', () => {
    closeModal();
    window.location.href = 'contact.html';
  });

  /* ── CHAT POPUP ── */
  const chatFab    = document.getElementById('chatFab');
  const chatPanel  = document.getElementById('chatPanel');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatBody   = document.getElementById('chatBody');
  const chatInput  = document.getElementById('chatInput');
  const chatSend   = document.getElementById('chatSend');
  const chatBadge  = document.getElementById('chatBadge');

  let chatOpened   = false;

  const botReplies = {
    school:     'Great choice! Our School Transformation Program covers everyone in the school community — directors, teachers, parents, and students. Would you like to <a href="services.html">learn more</a> or <a href="contact.html">get in touch</a>?',
    growing:    'The "Growing and Loving It" program is perfect for children and teens. It\'s Christian-based and covers spiritual growth, character, and life skills. <a href="services.html">Explore it here</a> or <a href="contact.html">contact us</a>!',
    journey:    '"Journey with Dr. Ruth" is a full one-year mentorship for young adults aged 18–35. It covers career, finances, branding and wellness. <a href="services.html">See full details</a> or <a href="contact.html">register interest</a>!',
    transition: 'Our Transition Coaching supports all life stages — school, career, relationships, retirement and more. <a href="services.html">Browse all transitions</a> or <a href="contact.html">book a session</a>!',
    corporate:  'Our Corporate Consulting covers leadership, team building, change management and employee engagement. <a href="services.html">See the full package</a> or <a href="contact.html">request a proposal</a>!'
  };

  function addBubble(text, type, isHTML = false) {
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    const b = document.createElement('div');
    b.className = `chat-bubble ${type}`;
    if (isHTML) b.innerHTML = text; else b.textContent = text;
    const t = document.createElement('div');
    t.className = `chat-bubble-time${type==='user'?' right':''}`;
    t.textContent = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    wrap.appendChild(b); wrap.appendChild(t);
    chatBody.appendChild(wrap);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showServiceButtons() {
    const existing = document.getElementById('chatServicesGrid');
    if (existing) return;
    const grid = document.createElement('div');
    grid.className = 'chat-services-grid';
    grid.id = 'chatServicesGrid';
    const services = [
      { key:'school',     icon:'🏫', name:'School Packages',     desc:'Transform your school community' },
      { key:'growing',    icon:'🌱', name:'Growth Packages',      desc:'For children & teens' },
      { key:'journey',    icon:'🧭', name:'Mentorship Packages',  desc:'Journey with Dr. Ruth' },
      { key:'transition', icon:'🔄', name:'Coaching',             desc:'Life transition support' },
      { key:'corporate',  icon:'🏢', name:'Corporate Consulting', desc:'For organizations' },
    ];
    services.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'chat-service-btn';
      btn.innerHTML = `
        <span class="csb-icon">${s.icon}</span>
        <span class="csb-text">
          <span class="csb-name">${s.name}</span>
          <span class="csb-desc">${s.desc}</span>
        </span>`;
      btn.addEventListener('click', () => {
        grid.remove();
        addBubble(s.name, 'user');
        setTimeout(() => addBubble(botReplies[s.key], 'bot', true), 600);
      });
      grid.appendChild(btn);
    });
    chatBody.appendChild(grid);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function openChat() {
    chatPanel.style.display = 'flex';
    requestAnimationFrame(() => chatPanel.classList.add('open'));
    if (chatBadge) chatBadge.style.display = 'none';
    if (!chatOpened) {
      chatOpened = true;
      setTimeout(() => addBubble('👋 Hi there! Welcome to blossom out Coaching & Consulting.', 'bot'), 300);
      setTimeout(() => addBubble('Which of our programs are you interested in?', 'bot'), 900);
      setTimeout(showServiceButtons, 1500);
    }
  }

  function closeChat() {
    chatPanel.classList.remove('open');
    setTimeout(() => { chatPanel.style.display = 'none'; }, 280);
  }

  if (chatFab)      chatFab.addEventListener('click', openChat);
  if (chatCloseBtn) chatCloseBtn.addEventListener('click', closeChat);

  if (chatSend && chatInput) {
    function sendUserMessage() {
      const txt = chatInput.value.trim(); if (!txt) return;
      addBubble(txt, 'user');
      chatInput.value = '';
      const lower = txt.toLowerCase();
      let reply = 'Thanks for reaching out! Would you like to <a href="contact.html">contact us</a> directly, or choose one of our programs below?';
      if (lower.includes('school'))      reply = botReplies.school;
      else if (lower.includes('grow') || lower.includes('child') || lower.includes('teen')) reply = botReplies.growing;
      else if (lower.includes('mentor') || lower.includes('ruth') || lower.includes('young')) reply = botReplies.journey;
      else if (lower.includes('coach') || lower.includes('transit')) reply = botReplies.transition;
      else if (lower.includes('corp') || lower.includes('business') || lower.includes('organization')) reply = botReplies.corporate;
      setTimeout(() => {
        addBubble(reply, 'bot', true);
        setTimeout(showServiceButtons, 500);
      }, 700);
    }
    chatSend.addEventListener('click', sendUserMessage);
    chatInput.addEventListener('keydown', e => { if (e.key==='Enter') sendUserMessage(); });
  }

  /* ── FOUNDER PHOTO UPLOAD ── */
  document.querySelectorAll('.photo-hint').forEach(hint => {
    hint.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file'; input.accept = 'image/*';
      const wrap = hint.closest('.founder-photo-wrap');
      const ph   = wrap.querySelector('.avatar-placeholder');
      input.addEventListener('change', () => {
        const file = input.files[0]; if (!file) return;
        const url = URL.createObjectURL(file);
        let img = wrap.querySelector('img');
        if (!img) { img = document.createElement('img'); img.alt = 'Founder photo'; wrap.insertBefore(img, hint); }
        img.src = url; img.style.display = 'block';
        if (ph) ph.style.display = 'none';
      });
      input.click();
    });
  });

});
