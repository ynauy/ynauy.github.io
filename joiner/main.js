// ...前後のコードはそのまま...

    try {
        const url = `https://discord.com/api/v10/invites/${code}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token, // ここにトークンが入ります
                'Content-Type': 'application/json'
            },
            // Bodyに空のJSONオブジェクトを明示的に追加
            body: JSON.stringify({}) 
        });

        const data = await response.json();

        if (response.ok) {
            logArea.style.color = "#3ba55c";
            logArea.innerText += `>> Status: 200 OK\n>> Joined Server: ${data.guild?.name || 'Success'}`;
        } else {
            logArea.style.color = "#ed4245";
            // エラー内容を詳しく表示
            logArea.innerText += `>> Status: ${response.status}\n>> Error Code: ${data.code}\n>> Message: ${data.message}`;
        }
// ...以下そのまま...
