

document.getElementById("listSpeichern").addEventListener('click', async function (event) {
    event.preventDefault();

    const listname = document.getElementById("listname").value;
    const users = await getUsers();
    console.log(users)
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

document.getElementById("listabbrechen").addEventListener('click', async function (event) {
    event.preventDefault();
    var popUp = document.getElementById("addListPopUp");
    popUp.style.display = "none";
});



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