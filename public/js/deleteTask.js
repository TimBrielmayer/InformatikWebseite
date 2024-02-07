async function deleteTask() {
    console.log("hallo")
    const tid = 10;
    try {
        const response = await fetch('/deleteTask', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body:JSON.stringify({
                tid: tid,
            })
        })

    } catch (error) {
        console.error('Error during addtask:', error);
    }
}