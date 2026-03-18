const joinBtn = document.getElementById('joinBtn');
const logArea = document.getElementById('log');
const loader = document.getElementById('loader');

document.getElementById('clearBtn').addEventListener('click', () => {
    logArea.innerText = "Console cleared.";
    logArea.style.color = "#00ff00";
});

joinBtn.addEventListener('click', async () => {
    const tokenText = document.getElementById('token').value;
    const code = document.getElementById('inviteCode').value;

    // 改行で分割し、空白を除去
    const tokens = tokenText.split(/\r?\n/).map(t => t.trim()).filter(t => t !== "");

    if (tokens.length === 0 || !code) {
        logArea.innerText = ">> Error: トークンまたは招待コードを入力してください。";
        logArea.style.color = "var(--danger)";
        return;
    }

    joinBtn.disabled = true;
    loader.style.display = "block";
    logArea.style.color = "#00ff00";
    logArea.innerText = `>> Task Started: ${tokens.length} accounts.\n`;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const displayToken = token.substring(0, 8) + "...";
        logArea.innerText += `\n[${i + 1}/${tokens.length}] User: ${displayToken}\n`;

        try {
            // Discord APIへのPOSTリクエスト
            const url = `https://discord.com/api/v10/invites/${code}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                // 無効なJSONエラーを避けるため空オブジェクトを送信
                body: JSON.stringify({})
            });

            const data = await response.json();

            if (response.ok) {
                logArea.innerText += `>> Result: SUCCESS (Joined: ${data.guild?.name || 'Unknown'})\n`;
            } else {
                logArea.innerText += `>> Result: FAILED (${response.status})\n>> Msg: ${data.message}\n`;
            }
        } catch (error) {
            logArea.innerText += `>> Network Error: ブラウザによる通信ブロックの可能性があります。\n`;
        }

        // 短時間に大量リクエストを避けるための微小待機（0.5秒）
        await new Promise(r => setTimeout(r, 500));
    }

    logArea.innerText += `\n>> All tasks completed.`;
    joinBtn.disabled = false;
    loader.style.display = "none";
});
