import JsonBigint from "json-bigint";

const REQUEST_TIMEOUT_SEC = 120000

export async function callLlama2Service(backendUrl, botContext, prompt, numWords, authToken) {
    const queryStartTime = new Date()
    const response = await Promise.race([
        (await fetch(backendUrl + `/api/query`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    //'Bypass-Tunnel-Reminder': "go",
                    //'mode': 'no-cors',
                    //'Authorization': "Bearer " + authToken
                },
                body: JSON.stringify([[
                    {
                        "role": "system",
                        "content": botContext
                    },
                    {
                    "role": "user",
                    "content": prompt
                },
            ]])                
            }
        ).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response
        })).text(), new Promise((_, reject) => setTimeout(
            () => reject(new Error('Timeout')), REQUEST_TIMEOUT_SEC))
    ]);

    return {
        'executionTime': Math.round(((new Date() - queryStartTime) / 1000 + Number.EPSILON) * 100) / 100,
        'generatedStory': response
    }
}

