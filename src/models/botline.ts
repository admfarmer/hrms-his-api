const request = require("request");
// import moment from 'moment-timezone';
export class BotlineModel {

    mophNotify(message: any, message_text: string) {
        console.log(message);
        console.log(message_text);

        let json_message: any = {
            messages: [
                {
                    type: "flex",
                    altText: message_text,
                    contents: {
                        type: "bubble",
                        size: "mega",

                        body: {
                            type: "box",
                            layout: "vertical",
                            spacing: "md",
                            paddingAll: "lg",
                            contents: [

                                {
                                    type: "box",
                                    layout: "vertical",
                                    backgroundColor: "#E7F0FF",
                                    cornerRadius: "12px",
                                    paddingAll: "md",
                                    contents: [
                                        {
                                            type: "text",
                                            text: message_text,
                                            size: "lg",
                                            weight: "bold",
                                            color: "#1A237E",
                                            align: "center",
                                            wrap: true
                                        }
                                    ]
                                },

                                {
                                    type: "text",
                                    text: message,
                                    size: "sm",
                                    color: "#444444",
                                    wrap: true,
                                    lineSpacing: "6px"
                                },

                            ]
                        },

                        footer: {
                            type: "box",
                            layout: "vertical",
                            contents: [
                                {
                                    type: "separator"
                                },
                                {
                                    type: "text",
                                    text: "Smart Refer System",
                                    size: "xs",
                                    color: "#999999",
                                    align: "center",
                                    margin: "sm"
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
                        'client-key': '5cefbcb8e1a993f42616efc478fd60ca12cff83a',
                        'secret-key': 'STVALJIL3BEBTQUWV3UKY3DUEJ7I',
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