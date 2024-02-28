

document.getElementById("listSpeichern").addEventListener('click', async function (event) {
    event.preventDefault();

    const listname = document.getElementById("listname").value;
    const users = await getUsers();
    //var users = ['tim', 'philipp', 'jdfsfsl', 'tobias'];
    var uids = await getUid(users);
    console.log(uids);
    var uidRichtig = new Array();
    var uidFehler = new Array();
    for(i = 0; i < uids.length;i++){
        if(uids[i] == -1){
            uidFehler.push(users[i])
        }else{
            uidRichtig.push(uids[i]);
        }
    }

    console.log("f " + uidFehler);
    console.log("r " + uidRichtig);

    try {
        var response = await fetch('/createList', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                listname: listname,
                uids: uidRichtig
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
    alert("Folgende User existieren nicht " + uidFehler);
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
    var userList = document.getElementById('userlist').value;
    const activeUser = await getUsername();
    var users = [];

    if(userList) {
        userList = userList.replace(" ","");
        users = userList.split(',');
    }
    users.push(activeUser);
    return users;
}