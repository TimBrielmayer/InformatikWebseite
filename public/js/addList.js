

document.getElementById("listSpeichern").addEventListener('click', async function (event) {
    event.preventDefault();

    const listname = document.getElementById("listname").value;
    const users = await getUsers();
    try {
        var response = await fetch('/createList', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                listname: listname,
                users: users
            })
            
        })
        var lid = await response.json()
        var popUp = document.getElementById("addListPopUp");
        popUp.style.display = "none";
        loadAllTaskLists();
        loadTaskList(listname,lid); 
    } catch (error) {
        console.error('Error during addtask:', error);
    }
});


function closeListPopUp() {
    var popUp = document.getElementById('addListPopUp');
    popUp.style.display = 'none';
    var elements = popUp.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == "text") {
            elements[i].value = "";
        }
    }
}


async function getUsers() {
    const userList = document.getElementById('userlist').value;
    const activeUser = await getUsername();
    var users = [];
    if(userList) {
        users = userList.split(',');
    }
    users.push(activeUser);
    return users;
}