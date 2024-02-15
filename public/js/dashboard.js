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

        listContainer.appendChild(list);
    }
}

async function deleteTask() {
    const tid = 2;
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

    } catch (error) {
        console.error('Error during addtask:', error);
    }
}

async function getTasks() {
    const lid = 1;
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
        console.log(data.data)

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

async function deleteList() {
    const lid = 3;
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