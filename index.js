const net = require("net");

const teamName = '冲冲冲冲';
const config = {
    host: '127.0.0.1',
    port: '8888',
};

const socket = net.connect(config, () => console.log('连接到服务器！'));
socket.setEncoding('utf8');

socket.on('data', function (data) {
    const length = parseInt(data.substr(0, 4));
    console.log('json字符串长度为：' + length);
    const json = data.substr(4);
    console.log('json为：' + json);
    if (utf8Strlen(json) !== length) {
        console.log('json字符串长度与报文所给长度不一致');
    }
    const jsonObj = JSON.parse(json);
    const type = jsonObj.type;
    switch (type) {
        case 'login':
            login();
            break;
        case 'jump':
            break;
        case 'posion':
            break;
        case 'info':
            break;
        default:
            break;
    }

});

function login() {
    console.log('登陆');
    let obj = {};
    obj.name = teamName;
    send(obj)
}

function send(jsonObj) {
    const json = JSON.stringify(jsonObj);
    console.log('发送数据：' + json);
    const length = utf8Strlen(json);
    console.log((Array(4).join(0) + length).slice(-4) + json);

    socket.write((Array(4).join(0) + length).slice(-4) + json);
}

function utf8Strlen(str) {
    var cnt = 0;
    for (i = 0; i < str.length; i++) {
        var value = str.charCodeAt(i);
        if (value < 0x080) {
            cnt += 1;
        } else if (value < 0x0800) {
            cnt += 2;
        } else {
            cnt += 3;
        }
    }
    return cnt;
}