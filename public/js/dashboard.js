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
        var list = document.createElement("p");
        list.classList.add("List");
        list.textContent = allLists[i].listname;
        list.setAttribute("onclick", `loadTasks(${allLists[i].lid})`)

        listContainer.appendChild(list);
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

    } catch (error) {
        console.error('Error during addtask:', error);
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