const steamIdInput = document.getElementById('steamIdInput');
const fetchDataBtn = document.getElementById('fetchDataBtn');
const achievementsContainer = document.getElementById('achievementsContainer');

fetchDataBtn.addEventListener('click', () => {
  const steamId = steamIdInput.value;
  const apiKey = 'A6EEA2452D40C0E24E12C0FC03E8AAEF'; 
  const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?appid=730&key=${apiKey}&steamid=${steamId}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to retrieve achievements');
      }
    })
    .then(data => {
      const achievements = data.playerstats.achievements;

      achievementsContainer.innerHTML = '';

      achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.classList.add('achievement');
        achievementElement.innerHTML = `<h3>${achievement.apiname}</h3><p>${achievement.description}</p>`;
        achievementsContainer.appendChild(achievementElement);
      });
    })
    .catch(error => {
      console.error('Failed to retrieve achievements:', error);
    });
});