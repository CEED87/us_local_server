
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


const getServer1 = async () => {
    const res = await fetch('http://localhost:3000/todos');
    return res.json();
// console.log(res.json())
};

const setCont1 = async () => {
    const allItems = await getServer1();
    const li = document.querySelector('#list');
    li.innerHTML = '';
    allItems.forEach(el => {
        li.innerHTML += `
    <li class="task">${el.title} (${el.time} days)</li>
    });
    
    `;
    });
};

const title = document.querySelector('input');
const time = title.nextElementSibling;
// console.log(time)
const getServer2 = async () => {
    const res = await fetch('http://localhost:3000/todos', {
        method: "POST",
        body: JSON.stringify({
            "title": title.value,
            "time": time.value
        }),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    });
    return res.json();

};

const setCont2 = async () => {
    const allItems = await getServer2();
    //       const li = document.querySelector('#list');
    //       allItems.forEach(el => {
    //           li.innerHTML += `
    //       <li class="task">${el.title} (${el.time} days)</li>
    //       });

    //       `
    //   })
    setCont1();
};





const btn = document.querySelector('input[type="button"]');
btn.addEventListener('click', () => {
    getServer2();

});
// console.log(btn)

setCont1();

// getServer()