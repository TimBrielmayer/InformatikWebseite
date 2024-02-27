document.getElementById('registerButton').addEventListener('click', async function (e) {
  e.preventDefault();
  await register();
});


async function register() {
  const username = document.getElementById('username-input').value;
  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password').value;
  const passwordRepeat = document.getElementById('passwordRepeat').value;

  if (password !== passwordRepeat) {
    alert("Passwords do not match");
    return;
  }

  if (username.includes(",")) {
    alert("Username must not include ,");
    return;
  }
  if (username.includes(" ")) {
    alert("Username must not include spaces");
    return;
  }
  

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      document.location.href = 'TODOs.html';
    } else {
      const error = await response.text();
      alert(error);
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
}

document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    register();
  }
});