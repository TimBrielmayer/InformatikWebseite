document.getElementById("taskSpeichern").addEventListener('click', async function (event) {
    event.preventDefault();

    const taskname = document.getElementById("taskname").value;

    const inputSDate = document.getElementById("sdate").value;
    const sdateObject = new Date(inputSDate);
    const sdate = `${sdateObject.getFullYear()}${(sdateObject.getMonth() + 1).toString().padStart(2, '0')}${sdateObject.getDate().toString().padStart(2, '0')} ${sdateObject.getHours().toString().padStart(2, '0')}:${sdateObject.getMinutes().toString().padStart(2, '0')}:00 AM`;

    const inputEDate = document.getElementById("edate").value;
    const edateObject = new Date(inputEDate);
    const edate = `${edateObject.getFullYear()}${(edateObject.getMonth() + 1).toString().padStart(2, '0')}${edateObject.getDate().toString().padStart(2, '0')} ${edateObject.getHours().toString().padStart(2, '0')}:${edateObject.getMinutes().toString().padStart(2, '0')}:00 AM`;

    const lid = "1";
    try {
        const response = await fetch('/addtask', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                taskname: taskname,
                sdate: sdate,
                edate: edate,
                lid: lid,
            })
        })

    } catch (error) {
        console.error('Error during addtask:', error);
    }
});


async function addTask() {
    event.preventDefault();
    const taskname = document.getElementById("taskname").value;
    console.log(taskname);
    return
    //const taskname = "lernen";
    const sdate = "20201202 10:10:01 AM";
    const edate = "20201202 12:10:01 AM";
    const lid = "3";
    try {
        const response = await fetch('/addtask', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                taskname: taskname,
                sdate: sdate,
                edate: edate,
                lid: lid,
            })
        })

    } catch (error) {
        console.error('Error during addtask:', error);
    }
}