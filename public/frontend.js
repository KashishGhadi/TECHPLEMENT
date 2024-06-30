document.addEventListener('DOMContentLoaded', () => {
    const randomQuoteButton = document.getElementById('random-quote');
    const searchButton = document.getElementById('search-quote');
    const quoteDisplay = document.getElementById('quote-display');
    const authorInput = document.getElementById('author-input');

    randomQuoteButton.addEventListener('click', async () => {
        const response = await fetch('/random');
        const quote = await response.json();
        quoteDisplay.textContent = `${quote.text} - ${quote.author}`;
    });

    searchButton.addEventListener('click', async () => {
        const author = authorInput.value;
        const response = await fetch(`/quote?author=${author}`);
        const quotes = await response.json();
        quoteDisplay.innerHTML = quotes.map(q => `<p>${q.text} - ${q.author}</p>`).join('');
    });
});
