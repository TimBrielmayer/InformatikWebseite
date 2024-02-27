async function loadUsername() {
    const username = await getUsername();
    console.log('logged in user: ' + username);

    if (username == 0) {
        window.location.href = 'login.html';
    }
    else {
        const usernameElement = document.getElementById('username');
        usernameElement.textContent = username;
    }
}

async function getUsername() {
    try {
        const response = await fetch('/getUsername');

        if (response.status == 204) {
            //no user logged in
            return 0
        }
        else {
            const username = await response.json();
            return username;
        }

    } catch (error) {
        console.error('Error during getUsername:', error);
        return 0;
    }
}

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

    for (let i in allLists) {/*Laden der Auflistung der Listen*/

        var container = document.createElement("div");
        container.classList.add("List");
        container.setAttribute("onclick", `loadTaskList("${allLists[i].listname}",${allLists[i].lid})`)

        var list = document.createElement("p");/*Erstellung des Bereichs für den Listennamen*/
        list.classList.add("listedlistname"); /*ist die Klasse des Namen der Todoliste in der Auflistung*/
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
            console.error('Error during deleteTask:', error);
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
        window.location.reload();
    }
}

async function removeUserFromList(lid, uid) {
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

async function addUserToList(lid, users) {
    //console.log(users);
    try {
        const response = await fetch('/addUserToList', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                lid: lid,
                users: users
            })
        })

    } catch (error) {
        console.error('Error during addUserToList:', error);
    }
}

function loadTaskList(listname, lid) {
    var header = document.getElementById("TasklistHead");
    header.textContent = listname;

    loadTasks(lid);

    addTaskButton = document.getElementById('addTaskButton');
    addTaskButton.style.display = 'flex';
}

async function loadTasks(lid) {
    sessionStorage.setItem("lid", lid)

    const tasks = await getTasks(lid);
    var taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';
    for (let i in tasks) {
        var taskDiv = document.createElement('div');
        taskDiv.classList.add("Task")
        var checkBox = document.createElement('input');
        checkBox.setAttribute('id', `checkBox-${tasks[i].tid}`);
        checkBox.classList.add("checkbox");
        checkBox.setAttribute('type', 'checkbox');
        checkBox.checked = (tasks[i].done == 'TRUE');
        checkBox.setAttribute('onclick', `changeTaskState(${tasks[i].tid})`);
        var taskname = document.createElement('p');
        taskname.textContent = tasks[i].taskname;
        taskname.classList.add("taskname");
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

async function getListByName(listname) {

    console.log(listname);
    try {
        const response = await fetch('/getListByName', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                listname: listname,
            })
        })
        const data = await response.json();
        return data.data;

    } catch (error) {
        console.error('Error during getListByName', error);
    }
}

async function changeTaskState(tid) {
    const checkBox = document.getElementById(`checkBox-${tid}`);
    const state = (checkBox.checked) ? 'TRUE' : 'FALSE';

    try {
        const response = await fetch('/changeTaskState', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                tid: tid,
                state: state
            })
        });

    } catch (error) {
        console.error('Error during getListByName', error);
    }
}


function openUserMenu() {
    var popUp = document.getElementById('addUserToListPopUp');
    popUp.style.display = 'flex';

    loadAddedUsers();
}

async function loadAddedUsers() {
    const lid = sessionStorage.getItem('lid');
    try {
        const response = await fetch('/getUsersInList', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                lid: lid
            })
        });
        const data = await response.json();

        var allAddedUsers = document.getElementById('allAddedUsers');
        allAddedUsers.innerHTML = '';

        for (let i in data) {
            var user = document.createElement('p');
            user.textContent = data[i].username;
            allAddedUsers.appendChild(user);
        }

        const popUp = document.getElementById('addUserToListPopUp')
        var elements = popUp.getElementsByTagName("input");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].type == "text") {
                elements[i].value = "";
            }
        }

    } catch (error) {
        console.error('Error during getListByName', error);
    }
}

async function addNewUser() {
    const lid = sessionStorage.getItem('lid');

    const username = document.getElementById('newUsername').value;

    await addUserToList(lid, username)

    await loadAddedUsers();
}

function closeUserPopUp() {
    var popUp = document.getElementById('addUserToListPopUp');
    popUp.style.display = 'none';
    var elements = popUp.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == "text") {
            elements[i].value = "";
        }
    }
}