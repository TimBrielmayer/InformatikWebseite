function openAddTaskPopUp() { //öffnet das Fenster zum Hinzufügen einer Task zu einer Liste
    var popUp = document.getElementById("addTaskPopUp");
    popUp.style.display = "flex";
}

function openAddListPopUp() {   //öffnet das Fenster zum Erstellen einer Liste
    var popUp = document.getElementById("addListPopUp");
    popUp.style.display = "flex";
}

function openUserMenu() {   //öffnet das Fenster zum Hinzufügen eines Benutzers einer Liste
    var popUp = document.getElementById('addUserToListPopUp');
    popUp.style.display = 'flex';
    loadAddedUsers();
}

function closeListPopUp() { //schließt das Fenster zum Erstellen einer Liste
    var popUp = document.getElementById('addListPopUp');
    popUp.style.display = 'none';
    var elements = popUp.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == "text") {
            elements[i].value = "";
        }
    }
}

function closeTaskPopUp() {     //schließt das Fenster zum Erstellen einer Task
    var popUp = document.getElementById('addTaskPopUp');
    popUp.style.display = 'none';
    var elements = popUp.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == "text") {
            elements[i].value = "";
        }
    }
}

function closeUserPopUp() {     //schließt das User Menu einer Liste
    var popUp = document.getElementById('addUserToListPopUp');
    popUp.style.display = 'none';
    var elements = popUp.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == "text") {
            elements[i].value = "";
        }
    }
}