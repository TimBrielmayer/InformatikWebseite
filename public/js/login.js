function validateForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === '' || password === '') {
      alert("Please fill out all fields.")
      // Show error message
      document.getElementById('login-error-msg').style.display = 'block';
    } else {
      // Submit the form or perform other actions
      document.getElementById('login-error-msg').style.display = 'none';
      document.getElementById('login-form').submit();
    }
  }