document.addEventListener('DOMContentLoaded', function () {
    const filmsList = document.getElementById('films');

    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => {
            const placeholderLi = filmsList.querySelector('.placeholder');
            if (placeholderLi) {
                filmsList.removeChild(placeholderLi);
            }

            data.forEach(movie => {
                const li = document.createElement('li');
                li.className = 'film item';
                li.innerHTML = `
                    <img src="${movie.poster}" alt="${movie.title}" class="poster">
                    <h2 class="title">${movie.title}</h2>
                    <p class="description">${movie.description}</p>
                    <p class="showtime">Showtime: ${movie.showtime}</p>
                    <p id="ticket-count-${movie.id}">Available Tickets: ${movie.capacity - movie.tickets_sold}</p>
                    <button id="buy-ticket-btn-${movie.id}" class="buy-ticket-btn" onclick="updateTicketCount(${movie.id})">Buy Ticket</button>
                `;
                filmsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
        });
});

