async function addTask() {
    console.log("hallo")
    const task = "waschen";
    const sdate = "20201202 10:10:01 AM";
    const edate = "20201202 12:10:01 AM";
    try {
        const response = await fetch('/addtask', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body:JSON.stringify({
                task: task,
                sdate: sdate,
                edate: edate,
            })
        })

    } catch (error) {
        console.error('Error during addtask:', error);
    }
}