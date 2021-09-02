//TO GET INPUT TEXT
const getInputText = () => {
    const textFromSearchBox = document.getElementById('search');
    const inputText = textFromSearchBox.value;
    textFromSearchBox.value = '';
    const url = ` http://openlibrary.org/search.json?q=${inputText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => bookUi(data.docs));
}

//FUCNTION FOR CREATE BOOKS UI
const bookUi = (data) => {
    const books = document.getElementById('books');
    books.innerHTML = `
    <h1 class='text-center mb-5' style=" font-style: italic; color: #2d3436;">Search result total ${data.length}</h1>
    `;
//IF THE CONTENT IS ZERO
    if(data.length === 0) {
        const div = document.createElement('div');
        div.classList.add('col-lg-12', 'col-md-6');
        div.innerHTML = `
            <div class="card">
            <h5 class="card-header">No Featured</h5>
            <div class="card-body">
                <h5 class="card-title">There is no content please search again.....</h5>
                <h1>OOps 404 Error!</h1>
            </div>
            </div>
        `;
        books.appendChild(div);
    }
//creating ui maping the data
    data.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('col-md-3', 'mb-4');
            div.innerHTML = `
            <div class="card">
                <img src="${`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`}" class="card-img-top" style="width: 100%; height: 250px; object-fit: cover;">
                <div class="card-body">
                <h5 class="text-muted mb-3">book name: ${item.title}</h5>
                <h5 class="text-muted mb-3">writer name: ${item.author_name}</h5>
                <h5 class="text-muted mb-3">publisher: ${item.publisher}</h5>
                <p class="text-muted mb-3">first published: in ${item.first_publish_year}</p>
                </div>
            </div>
            `;
            books.appendChild(div);
       
    })
}