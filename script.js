document.addEventListener('DOMContentLoaded', function () {
    const amountInput = document.getElementById('amount');
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    const convertBtn = document.getElementById('convert-btn');
    const resultDiv = document.getElementById('result');

    // Fetch available currency codes from API
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencyCodes = Object.keys(data.rates);
            currencyCodes.forEach(code => {
                const option1 = document.createElement('option');
                option1.value = code;
                option1.textContent = code;
                const option2 = option1.cloneNode(true);
                fromSelect.appendChild(option1);
                toSelect.appendChild(option2);
            });
        })
        .catch(error => console.error('Error fetching currency codes:', error));

    // Function to convert currency
    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromSelect.value;
        const toCurrency = toSelect.value;
        fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency];
                const convertedAmount = amount * rate;
                resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
            })
            .catch(error => console.error('Error fetching exchange rates:', error));
    }

    // Event listener for convert button
    convertBtn.addEventListener('click', convertCurrency);
});
