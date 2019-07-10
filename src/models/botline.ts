const request = require("request");
export class BotlineModel {
    botLine(message) {
        request({
            method: 'POST',
            uri: 'https://notify-api.line.me/api/notify',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                bearer: 'TPQG4mGOTMb2xbZJVqBBlzVmEBrkWgHhRF1d2E3Ono8', //token
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