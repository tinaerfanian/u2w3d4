// URL API
const booksApiUrl = 'https://striveschool-api.herokuapp.com/books';

// prendere la lista dei libri
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(booksApiUrl);
        const books = await response.json();
        displayBooks(books);
        loadCarrello();
    } catch (error) {
        console.error("Errore nella richiesta dei libri:", error);
    }
});

//dimostrare i libri
function displayBooks(books) {
    const booksContainer = document.getElementById('books-container');
    books.forEach(book => {
        const bookCard = createBookCard(book);
        booksContainer.appendChild(bookCard);
    });
}

// creo bookcard
function createBookCard(book) {
    const col = document.createElement('div');
    col.classList.add('col-md-4', 'col-lg-3');

    const card = document.createElement('div');
    card.classList.add('card', 'h-100');

    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = book.img;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = book.title;

    const price = document.createElement('p');
    price.classList.add('card-text');
    price.textContent = `Prezzo: €${book.price}`;

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');

    const discardButton = document.createElement('button');
    discardButton.classList.add('btn', 'btn-danger');
    discardButton.textContent = 'Scarta';
    discardButton.onclick = () => col.remove();

    const buyButton = document.createElement('button');
    buyButton.classList.add('btn', 'btn-success');
    buyButton.textContent = 'Compra ora';
    buyButton.onclick = () => addToCarrello(book);

    buttonGroup.appendChild(discardButton);
    buttonGroup.appendChild(buyButton);
    
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(buttonGroup);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
}

// carello
function addToCarrello(book) {
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];
    carrello.push(book);
    localStorage.setItem('carrello', JSON.stringify(carrello));
    updateCarrello();
}

// loading i libri in carello
function loadCarrello() {
    const carrello = JSON.parse(localStorage.getItem('carrello')) || [];
    carrello.forEach(book => {
        addBookToCarrello(book);
    });
}

// aggiungere libro a carello
function addBookToCarrello(book) {
    const carrelloLista = document.getElementById('carrello-lista');

    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    listItem.textContent = `${book.title} - €${book.price}`;

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'btn-danger', 'btn-sm');
    removeButton.textContent = 'Rimuovi';
    removeButton.onclick = () => {
        removeFromCarrello(book);
        listItem.remove();
    };

    listItem.appendChild(removeButton);
    carrelloLista.appendChild(listItem);
}

// aggiungere libro da carello
function removeFromCarrello(book) {
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];
    carrello = carrello.filter(item => item.isbn !== book.isbn);
    localStorage.setItem('carrello', JSON.stringify(carrello));
}

// aggiornare il carello
function updateCarrello() {
    const carrelloLista = document.getElementById('carrello-lista');
    carrelloLista.innerHTML = '';
    loadCarrello();
}
