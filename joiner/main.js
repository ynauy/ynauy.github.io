const joinBtn = document.getElementById('joinBtn');
const logArea = document.getElementById('log');
const loader = document.getElementById('loader');

document.getElementById('clearBtn').addEventListener('click', () => {
    logArea.innerText = "Console cleared.";
    logArea.style.color = "#00ff00";
});

joinBtn.addEventListener('click', async () => {
    const token = document.getElementById('token').value;
    const code = document.getElementById('inviteCode').value;

    if (!token || !code) {
        logArea.innerText = ">> Error: Missing Token or Invite Code.";
        logArea.style.color = "var(--danger)";
        return;
    }

    joinBtn.disabled = true;
    loader.style.display = "block";
    logArea.innerText = ">> Initializing request to Discord API...\n";

    try {
        // サーバー参加用のAPIエンドポイント
        const url = `https://discord.com/api/v10/invites/${code}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            logArea.style.color = "#3ba55c"; // 成功時の色
            logArea.innerText += `>> Status: 200 OK\n>> Joined Server!`;
        } else {
            logArea.style.color = "#ed4245"; // エラー時の色
            logArea.innerText += `>> Status: ${response.status}\n>> Message: ${data.message}`;
        }
    } catch (error) {
        logArea.style.color = "#ed4245";
        logArea.innerText += `>> Network Error: Request failed.\n>> Reason: Likely CORS block or invalid endpoint.`;
    } finally {
        joinBtn.disabled = false;
        loader.style.display = "none";
    }
});
