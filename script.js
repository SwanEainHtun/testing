document.getElementById('companyForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const companyData = {
      companyName: document.getElementById('companyName').value,
      section: document.getElementById('section').value,
      division: document.getElementById('division').value,
      sector: document.getElementById('sector').value,
      industry: document.getElementById('industry').value,
      coverSituation: document.getElementById('coverSituation').value,
    };
  
    fetch('/.netlify/functions/addCompany', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(companyData)
    })
    .then(response => response.json())
    .then(data => alert('Company data saved successfully!'))
    .catch(error => console.error('Error:', error));
  });
  
  document.getElementById('searchBtn').addEventListener('click', function () {
    const searchQuery = document.getElementById('searchInput').value;
  
    fetch(`/.netlify/functions/searchCompany?name=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        const results = document.getElementById('searchResults');
        results.innerHTML = data.map(company => `<div>${company.companyName}</div>`).join('');
      })
      .catch(error => console.error('Error:', error));
  });
  