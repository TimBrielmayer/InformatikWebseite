function addTask() {
    var popUp = document.getElementById("addTaskPopUp");
    popUp.style.display = "flex";
}

function addList() {
    var popUp = document.getElementById("addListPopUp");
    popUp.style.display = "flex";
}

async function loadAllTaskLists() {
    const allLists = await getLists();

    const listContainer = document.getElementById("listContainer");
    listContainer.innerHTML = '';

    for (let i in allLists) {

        var container = document.createElement("div");
        container.classList.add("List");
        container.setAttribute("onclick", `loadTaskList("${allLists[i].listname}",${allLists[i].lid})`)

        var list = document.createElement("p");
        list.textContent = allLists[i].listname;
        container.appendChild(list);

        var trashIcon = document.createElement("img");
        trashIcon.classList.add("trashicon2");
        trashIcon.setAttribute("src", "pictures/trashcan2.png");
        trashIcon.setAttribute("onclick", `deleteList(${allLists[i].lid})`);
        container.appendChild(trashIcon);

        listContainer.appendChild(container);
    }
}

async function deleteTask(tid, lid) {
    if (confirm("Bist du dir sicher, dass du diese Task löschen willst?")) {
        try {
            const response = await fetch('/deleteTask', {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    tid: tid,
                })
            })
            loadTasks(lid);

        } catch (error) {
            console.error('Error during addtask:', error);
        }
    }
}

async function getTasks(lid) {
    try {
        const response = await fetch('/getTasks', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                lid: lid,
            })
        })
        const data = await response.json();
        return data.data;

    } catch (error) {
        console.error('Error during addtask:', error);
    }
}

async function getLists() {
    try {
        const response = await fetch('/getLists', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({})
        })
        const data = await response.json();
        return data.data;

    } catch (error) {
        console.error('Error during addtask:', error);
    }
}

async function deleteList(lid) {
    if (confirm("Bist du dir sicher, dass du diese Liste löschen willst?")) {
        try {
            const response = await fetch('/deleteList', {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
    
                },
                body: JSON.stringify({
                    lid: lid
                })
            })
            loadAllTaskLists();
        } catch (error) {
            console.error('Error during addtask:', error);
        }
    }
}

async function removeUserFromList() {
    const lid = 1;
    const uid = 2;
    try {
        const response = await fetch('/removeUserFromList', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                lid: lid,
                uid: uid
            })
        })

    } catch (error) {
        console.error('Error during addtask:', error);
    }
}

async function addUserToList() {
    const lid = 1;
    const uid = 2;
    try {
        const response = await fetch('/addUserToList', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                lid: lid,
                uid: uid
            })
        })

    } catch (error) {
        console.error('Error during addtask:', error);
    }
}

function loadTaskList(listname, lid) {
    var header = document.getElementById("TasklistHead");
    header.textContent = listname;

    loadTasks(lid);
}

async function loadTasks(lid) {
    sessionStorage.setItem("lid", lid)

    const tasks = await getTasks(lid);
    var taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';
    for (let i in tasks) {
        var taskDiv = document.createElement('div');
        taskDiv.classList.add("Task")
        var checkBox = document.createElement('input')
        checkBox.classList.add("checkbox");
        checkBox.setAttribute('type', 'checkbox');
        var taskname = document.createElement('p');
        taskname.textContent = tasks[i].taskname;
        var loeschen = document.createElement('img')
        loeschen.setAttribute('src', 'pictures/trashcan2.png');
        loeschen.setAttribute('onclick', `deleteTask(${tasks[i].tid}, ${lid})`);
        loeschen.classList.add('trashicon');

        taskDiv.appendChild(checkBox);
        taskDiv.appendChild(taskname)
        taskDiv.appendChild(loeschen)


        taskContainer.appendChild(taskDiv)
    }
}