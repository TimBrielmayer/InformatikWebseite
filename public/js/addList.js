document.getElementById("listSpeichern").addEventListener('click', async function (event) {
    event.preventDefault();

    const list = document.getElementById("listname").value;
    const users = [1]
    try {
        const response = await fetch('/createList', {
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
        var popUp = document.getElementById("addListPopUp");
        popUp.style.display = "none";
        loadAllTaskLists();

    } catch (error) {
        console.error('Error during addtask:', error);
    }
});