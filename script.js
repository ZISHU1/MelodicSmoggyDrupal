
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const inputs = this.querySelectorAll('input');
  const username = inputs[0].value;
  const password = inputs[1].value;
  
  if (username && password) {
    window.location.href = 'https://www.instagram.com/accounts/login/';
  }
});
