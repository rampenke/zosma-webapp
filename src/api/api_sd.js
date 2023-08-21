import JsonBigint from "json-bigint";

const REQUEST_TIMEOUT_SEC = 60000

export async function callSDService(backendUrl, text, numImages, message) {
    const queryStartTime = new Date()
    const response = await Promise.race([
        (await fetch(backendUrl + `/sdapi/v1/txt2img`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    //'Bypass-Tunnel-Reminder': "go",
                    //'mode': 'no-cors',
                    //'Authorization': "Bearer " + message
                },
                body: JSON.stringify({
                        "prompt": text,
                        "negative_prompt" : "ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, " +
                            "mutation, mutated, extra limbs, extra legs, extra arms, disfigured, deformed, cross-eye, " +
                            "body out of frame, blurry, bad art, bad anatomy, blurred, text, watermark, grainy",
                        "width": 512,
                        "height": 512,
                        "restore_faces": true,
                        "enable_hr": false,
                        "hr_resize_x": 512,
                        "hr_resize_y": 512,
                        "denoising_strength": 0.7,
                        "batch_size": 1,
                        "seed": -1,
                        "subseed": -1,
                        "subseed_strength": 0,
                        "sampler_name": "Euler a",
                        "cfg_scale": 9,
                        "steps": 20,
                        "n_iter": 1
                    })
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
        'serverResponse': JsonBigint.parse(response)
    }
}
