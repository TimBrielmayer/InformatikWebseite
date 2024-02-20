

document.getElementById("listSpeichern").addEventListener('click', async function (event) {
    event.preventDefault();

    const listname = document.getElementById("listname").value;
    const users = ["philipp"]
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

        //const data = await response.json();
        //console.log('Hier ' + data)
        //console.log(listname)
        //console.log("Hier "+await getListByName(listname));
        loadTaskList(listname,lid); //parameter 2 vanpasssen
    } catch (error) {
        console.error('Error during addtask:', error);
    }
});

document.getElementById("listabbrechen").addEventListener('click', async function (event) {
    event.preventDefault();
    var popUp = document.getElementById("addListPopUp");
    popUp.style.display = "none";
});



