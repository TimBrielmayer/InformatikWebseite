async function deleteTask() {
  console.log("hallo")
  const tid = 2;
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

async function getTasks() {
  const lid = 1;
  try {
      const response = await fetch('/getTasks', {
          method: 'POST',
          headers:
          {
              'Content-Type': 'application/json',

          },
          body:JSON.stringify({
              lid: lid,
          })
      })
      const data = await response.json();
      console.log(data.data)

  } catch (error) {
      console.error('Error during addtask:', error);
  }
}

async function getLists() {
  try {
      const response = await fetch('/getLists', {
          method: 'POST',
          headers:
          {
              'Content-Type': 'application/json',

          },
          body:JSON.stringify({})
      })
      const data = await response.json();
      console.log(data.data)

  } catch (error) {
      console.error('Error during addtask:', error);
  }
}

async function createList() {
  const listname = "uni";
  const users = [2]
  try {
      const response = await fetch('/createList', {
          method: 'POST',
          headers:
          {
              'Content-Type': 'application/json',

          },
          body:JSON.stringify({
            listname: listname,
            users: users
          })
      })

  } catch (error) {
      console.error('Error during addtask:', error);
  }
}

async function deleteList() {
  const lid = 3;
  try {
      const response = await fetch('/deleteList', {
          method: 'POST',
          headers:
          {
              'Content-Type': 'application/json',

          },
          body:JSON.stringify({
            lid: lid
          })
      })

  } catch (error) {
      console.error('Error during addtask:', error);
  }
}

async function removeUserFromList() {
  const lid = 1;
  const uid = 2;
  try {
      const response = await fetch('/removeUserFromList', {
          method: 'POST',
          headers:
          {
              'Content-Type': 'application/json',

          },
          body:JSON.stringify({
            lid: lid,
            uid: uid
          })
      })

  } catch (error) {
      console.error('Error during addtask:', error);
  }
}

async function addUserToList() {
  const lid = 1;
  const uid = 2;
  try {
      const response = await fetch('/addUserToList', {
          method: 'POST',
          headers:
          {
              'Content-Type': 'application/json',

          },
          body:JSON.stringify({
            lid: lid,
            uid: uid
          })
      })

  } catch (error) {
      console.error('Error during addtask:', error);
  }
}