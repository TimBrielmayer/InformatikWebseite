document.getElementById('loginButton').addEventListener('click', async function(event) {
  event.preventDefault(); // Verhindert das Standardverhalten des Buttons (Seitenneuladen)

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      console.log("login success")
      document.location.href = 'TODOs.html';
    } else {
      const error = await response.text();
      alert(error);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
});


function validateForm() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (username === '' || password === '') {
    alert("Please fill out all fields.")
    document.getElementById('login-error-msg').style.display = 'block';
  } else {
    document.getElementById('login-error-msg').style.display = 'none';
    document.getElementById('login-form').submit();
  }
}

async function login() {

  validateForm();

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      console.log("login success")
      document.location.href = 'TODOs.html';
    } else {
      const error = await response.text();
      alert(error);
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
}