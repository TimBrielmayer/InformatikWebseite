async function addTask() {
    const taskname = "waschen";
    const sdate = "20201202 10:10:01 AM";
    const edate = "20201202 12:10:01 AM";

    const lid = "1";
    try {
        const response = await fetch('/addtask', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body:JSON.stringify({
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