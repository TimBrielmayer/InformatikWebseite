document.getElementById("taskSpeichern").addEventListener('click', async function (event) { //Task speichern bei Buttonklick
    event.preventDefault();
    const taskname = document.getElementById("taskname").value;

    const inputEDate = document.getElementById("edate").value;
    const edateObject = new Date(inputEDate);
    const edate = `${edateObject.getFullYear()}${(edateObject.getMonth() + 1).toString().padStart(2, '0')}${edateObject.getDate().toString().padStart(2, '0')} ${edateObject.getHours().toString().padStart(2, '0')}:${edateObject.getMinutes().toString().padStart(2, '0')}:00 AM`;

    if (taskname == '') { alert('Please name youre task!'); return; }

    const lid = sessionStorage.getItem("lid");
    try {
        const response = await fetch('/addtask', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                taskname: taskname,
                edate: edate,
                lid: lid,
            })
        })
        var popUp = document.getElementById("addTaskPopUp");
        popUp.style.display = "none";

        loadTasks(lid)

    } catch (error) {
        console.error('Error during addtask:', error);
    }
});