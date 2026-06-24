document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    if (signupForm) {
	signupForm.addEventListener('submit', async (e) => {
	    e.preventDefault();

	    const username = document.getElementById('username').value;
	    const email = document.getElementById('email').value;
	    const password = document.getElementById('password').value;


	    try {
		const res = await fetch('/api/signup', {
		    method: 'POST',
		    headers: { 'Content-Type': 'application/json' },
		    body: JSON.stringify({ username, email, password })
		});
		const data = await res.json();

		if (res.ok) {
		    alert(data.message);
		    window.location.href = '/login.html';
		} else {
		    alert(data.error);
		}
	    } catch (err) {
		alert('An error occurred during registration. Please try again');
	    }
	});
    }

    if (loginForm) {
	loginForm.addEventListener('submit', async(e) => {
	    e.preventDefault();

	    const email = document.getElementById('email').value;
	    const password = document.getElementById('password').value;

	    try {
		const res = await fetch('/api/login', {
		    method: 'POST',
		    headers: { 'Content-Type' : 'application/json' },
		    body: JSON.stringify({ email, password })

		});
		const data = await res.json();

		if (data.success) {
		    window.location.href = '/index.html';
		} else {
		    alert(data.error);
		}
	    } catch (error) {
		alert("An error occurred during login. Please try again");
	    }
	});
    }
});
