async function loadAddedUsers() {   //lädt alle an einer Liste beteiligte Benutzer in das Usermenü
    const lid = sessionStorage.getItem('lid');
    const data = await getUsersInList(lid);

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
}

async function getUsersInList(lid) {    //gibt alle Benutzer einer Liste zurück
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
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during ^2:', error);
    }
}

async function removeUserFromList(lid) {    //entfernt einen Benutzer aus einer Liste
    console.log(lid);
    if (confirm("Bist du dir sicher, dass du diesen User entfernen möchtest?")) {
        try {
            const response = await fetch('/removeUserFromList', {
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
            console.error('Error during removeUserFromList1:', error);

        }
        window.location.reload();
    }
}

async function addNewUser() {   //fügt einen Benutzer zu einer Liste hinzu
    const lid = sessionStorage.getItem('lid');

    const username = document.getElementById('newUsername').value;

    await addUserToList(lid, username)

    await loadAddedUsers();
}

async function addUserToList(lid, users) {  //speichert neuen Benutzer der Liste in der Datenbank
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