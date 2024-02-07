async function getTasks(uid) {
  try {
    const response = await fetch(`http://localhost:4000/tasks`);
    if (!response.ok) {
      throw new Error(`Fehler bei der Anfrage: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    displayTasks(data.data);
  } catch (error) {
    console.error(error);
  }
}