const request = require("request");
export class BotlineModel {
    botLine(message) {
        console.log('xxxxx');

        request({
            method: 'POST',
            uri: 'https://notify-api.line.me/api/notify',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                // bearer: 'Rq2ta2TqDemOz5vak601weoXiq4VSrsSKKPm4GgO9G0', //token
                bearer: '', //token
            },
            form: {
                message: message, //ข้อความที่จะส่ง
            },
        }, (err, httpResponse, body) => {
            if (err) {
                console.log(err)
            } else {
                console.log(body)
            }
        })
    }
}