 // Function to fetch data using async/await
 async function fetchDataAsyncAwait() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Function to fetch data using .then
  function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
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
        <td>${coin.name}</td>
        <td>${coin.symbol}</td>
        <td>${coin.current_price}</td>
        <td>${coin.total_volume}</td>
        <td>${coin.market_cap}</td>
        <td>${coin.price_change_percentage_24h}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Function to handle sorting
  function sortData(key) {
    const tableBody = document.getElementById('tableBody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((a, b) => {
      const aValue = parseFloat(a.querySelector(`td:nth-child(${key === 'marketCap' ? 5 : 6})`).textContent.replace(/[$,]/g, ''));
      const bValue = parseFloat(b.querySelector(`td:nth-child(${key === 'marketCap' ? 5 : 6})`).textContent.replace(/[$,]/g, ''));

      return aValue - bValue;
    });

    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));
  }

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
  fetchDataAsyncAwait().then(data => renderTable(data));

  // Initial fetch using .then
  // fetchDataWithThen();
