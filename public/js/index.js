document.addEventListener('DOMContentLoaded', () => {
    const msgbox = document.getElementById('msgbox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    if (!sendBtn || !userInput || !msgbox) return;

    const sendMsg = async () => {
	const text = userInput.value.trim();
	if (!text) return;

	msgbox.innerHTML += `<div class="user-msg"< You: ${text}</div>`;
	userInput.value = ' ';
	msgbox.scrollTop = msgbox.scrollHeight;
	// get a response from server
	try {
	    const res = await fetch('/api/tutor', {
		method: 'POST',
		headers: { 'Content-Type' : 'application/json' },
		body: JSON.stringify({ message: text })
	    });
	    const data = await res.json();

	    msgbox.innerHTML += `<div class="ai-msg"><b>Tutor:</b> ${data.reply || data.error}</div>`;
	} catch (error) {
	    msgbox.innerHTML += `<div class ="ai-msg" style="color:red;"> Error connecting to server</div>`;
	}
	msgbox.scrollTop = msgbox.scrollHeight;
    };

    sendBtn.addEventListener('click', sendMsg);
    userInput.addEventListener('keypress', (e) => {
	if (e.key == 'Enter') {
	    sendMsg();
	}
    });
});
