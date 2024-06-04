  const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
 
 // Function to fetch data using async/await
 async function fetchDataAsyncAwait() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      renderTable(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Function to fetch data using .then
  function fetchDataWithThen() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => renderTable(data))
      .catch(error => console.error('Error fetching data:', error));
  }

  // Function to render table
  function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(coin => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${coin.image} alt="${coin.name}" width="30"></td>
        <td>${coin.name}</td>
        <td>${coin.symbol}</td>
        <td>${coin.current_price}</td>
        <td>${coin.total_volume}</td>
        <td>${coin.market_cap}</td>
        <td>${coin.market_cap_change_percentage_24h}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Function to handle sorting
  document.getElementById('sortMarketCap').addEventListener('click', () => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => a.market_cap - b.market_cap);
        renderTable(sortedData);
    })
    .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('sortPercentageChange').addEventListener('click', () => {
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const sortedData = data.sort((a, b) => a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h);
    renderTable(sortedData);
})
.catch(error => console.error('Error fetching data:', error));
});
  

  // Function to handle search
  function search() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const tableRows = document.querySelectorAll('#tableBody tr');

    tableRows.forEach(row => {
      const coinName = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
      const coinSymbol = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

      if (coinName.includes(searchTerm) || coinSymbol.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  // Initial fetch using async/await
  fetchDataAsyncAwait();

  // Initial fetch using .then
  // fetchDataWithThen();
