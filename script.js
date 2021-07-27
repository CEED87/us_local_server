/*
На данном этапе у вас уже должен работать GET-запрос который получает список задач
 из файла db.json, и POST-запрос который добавляет новую задачу в db.json.
Вам необходимо реализовать следующее, для каждой задачи добавьте кнопеи “удалить”,
 “редактировать”.
 

 1 Напишите функцию, которая будет осуществлять PUT/PATCH запрос на сервер, при 
 нажатии на кнопку “Редактировать”. Данные должны изменяться в файле db.json.
2 Добавьте функцию удаления, с помощью DELETE-запроса. При клике на кнопку “Удалить”,
 удаляйте из файла db.json данные о задаче.
*/
const title = document.querySelector('input');
const time = title.nextElementSibling;
const btnAdd = document.querySelector('input[type="button"]');
let elementId;

const getData = () => {
    fetch('http://localhost:3000/todos').then(res => {
        return res.json();
    }).then(data => {
        const ol = document.querySelector('#list');
        data.forEach(el => {
            ol.innerHTML += `
                <li class="task">${el.title} (${el.time} days)</li>
                <button data-id="${el.id}">удалить</button>
                <button data-id="${el.id}">редактировать</button>
                `;
        });
    });
};

const clearInput = () => {
    title.value = '';
    time.value = '';
}

const postData = () => {
    fetch('http://localhost:3000/todos', {
        method: "POST",
        body: JSON.stringify({
            "title": title.value,
            "time": time.value
        }),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    }).then(res => {
        return res.json();
    });
};

btnAdd.addEventListener('click', () => {
    postData();
    clearInput();
});

document.addEventListener('click', (e) => {
    const editInfo = e.target;
    if (editInfo.tagName === 'BUTTON' && editInfo.textContent === 'редактировать') {
        elementId = e.target.dataset.id;
        putData();
        clearInput();
    }
    if (editInfo.tagName === 'BUTTON' && editInfo.textContent === 'удалить') {
        elementId = e.target.dataset.id;
        deleteData();
        clearInput();
    }
    
});

const putData = () => {
    fetch(`http://localhost:3000/todos/${elementId}`, {
        method: "PUT",
        body: JSON.stringify({
            "title": title.value,
            "time": time.value
        }),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    }).then(res => {
        return res.json();
    })
};

const deleteData = () => {
    fetch(`http://localhost:3000/todos/${elementId}`, {
        method: 'DELETE'
    });
};

getData();