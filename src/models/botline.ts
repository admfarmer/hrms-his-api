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
    mophNotify(message: any, message_text: string, clientkey: any, secretkey: any) {
        let json_message: any = {
            messages: [
                {
                    type: "flex",
                    altText: message_text,
                    contents: {
                        type: "bubble",
                        size: "mega",

                        // header: {
                        //     type: "box",
                        //     layout: "vertical",
                        //     paddingAll: "0px",
                        //     contents: [
                        //         {
                        //             type: "image",
                        //             url: "https://ubon.moph.go.th/wp-content/uploads/smart-refer/Logoe.png",
                        //             size: "full",
                        //             aspectMode: "cover",
                        //             aspectRatio: "3120:885"
                        //         }
                        //     ]
                        // },

                        body: {
                            type: "box",
                            layout: "vertical",
                            spacing: "md",
                            paddingAll: "lg",
                            contents: [

                                // 🔹 ชื่อหน่วยบริการ
                                {
                                    type: "box",
                                    layout: "vertical",
                                    backgroundColor: "#E7F0FF",
                                    cornerRadius: "16px",
                                    paddingAll: "md",
                                    contents: [
                                        {
                                            type: "text",
                                            text: message_text,
                                            align: "center",
                                            size: "lg",
                                            weight: "bold",
                                            color: "#1A237E",
                                            wrap: true
                                        }
                                    ]
                                },

                                // 🔹 รายละเอียดข้อความ
                                {
                                    type: "text",
                                    text: message,
                                    size: "sm",
                                    color: "#444444",
                                    wrap: true,
                                    lineSpacing: "6px",
                                    adjustMode: "shrink-to-fit"
                                },

                                // 🔹 เส้นคั่น
                                {
                                    type: "separator",
                                    margin: "lg"
                                },

                                // 🔹 วันที่ / เวลา
                                {
                                    type: "box",
                                    layout: "horizontal",
                                    margin: "md",
                                    contents: [
                                        {
                                            type: "box",
                                            layout: "horizontal",
                                            flex: 1,
                                            contents: [
                                                {
                                                    type: "text",
                                                    text: "วันที่",
                                                    size: "sm",
                                                    color: "#666666",
                                                    flex: 0
                                                },
                                                {
                                                    type: "text",
                                                    text: moment().tz('Asia/Bangkok').format('YYYY-MM-DD'),
                                                    size: "sm",
                                                    weight: "bold",
                                                    margin: "md"
                                                }
                                            ]
                                        },
                                        {
                                            type: "box",
                                            layout: "horizontal",
                                            flex: 1,
                                            contents: [
                                                {
                                                    type: "text",
                                                    text: "เวลา",
                                                    size: "sm",
                                                    color: "#666666",
                                                    flex: 0
                                                },
                                                {
                                                    type: "text",
                                                    text: moment().tz('Asia/Bangkok').format('HH:mm:ss'),
                                                    size: "sm",
                                                    weight: "bold",
                                                    margin: "md"
                                                }
                                            ]
                                        }
                                    ]
                                }

                            ]
                        }
                    }
                }
            ]
        };


        return new Promise((resolve, reject) => {
            request(
                {
                    method: 'POST',
                    uri: 'https://morpromt2f.moph.go.th/api/notify/send',
                    headers: {
                        'Content-Type': 'application/json',
                        'client-key': clientkey,
                        'secret-key': secretkey,
                    },
                    body: json_message, // ต้องเป็น { messages: [...] }
                    json: true,
                },
                (err: any, httpResponse: any, body: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            statusCode: httpResponse.statusCode,
                            body: body
                        });
                    }
                }
            );
        });
    }
}