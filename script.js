const searchPlace = document.querySelector('.work-container_search');
const resultContainer = document.querySelector('.result-container');
const listContainer = document.querySelector('.list-container');
const autoComplite = document.createDocumentFragment();

let searchStop = false;
let timeId;

searchPlace.addEventListener('input', (e) => {
    let searchText = e.target.value;

    if (searchStop) {
        clearTimeout(timeId);

        getPost(searchText);

    } else {
        searchStop = true;

        getPost(searchText);
    }

    if (searchText == '' || searchText == ' ') {
        clearTimeout(timeId);
        clearResilt()
    }
});

//функции

function getPost(searchText) {
    
    timeId = setTimeout(() => {
        searchStop = false;
        clearResilt()
        
        let request = fetch(`https://api.github.com/search/repositories?q=${searchText}&per_page=5`);
        request
        .then(response => response.json())
        .then(createResult);
    }, 500);

}

function listAdd(name, owner, stars) {
    const list = document.createElement('div');
    list.classList.add('list');
    list.insertAdjacentHTML('afterbegin', `
    Name: ${name} <br>
    Owner: ${owner} <br>
    Stars: ${stars} <br> <button></button>
    `);
    listContainer.appendChild(list);
    const buttonDelete = list.querySelector('button');
    buttonDelete.addEventListener('click', () => {
        listContainer.removeChild(list);
    });
}

function createResult(posts) {
    posts.items.forEach(post => {
        const newPost = document.createElement('div');
        newPost.textContent = post.name;
        newPost.classList.add('result-container_result');
        autoComplite.appendChild(newPost);
        resultContainer.appendChild(autoComplite);
        newPost.addEventListener('click', () => {
            listAdd(post.name, post.owner.login, post.stargazers_count);
            clearResilt();
        });
    });
}

function clearResilt() {
    const result = resultContainer.querySelectorAll('.result-container_result');

        if (result) {
            for (child of result) {
                resultContainer.removeChild(child);
            }

        }
}
