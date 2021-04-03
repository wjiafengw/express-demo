const crypto = require('crypto');

//加密
//要加密的字符串 和 公共密钥
function mycrypto(content, secretkey) {
    try {
        var cipher = crypto.createCipher('aes192', secretkey);//使用aes192加密
        var enc = cipher.update(content, "utf8", "hex");//编码方式从utf-8转为hex;
        enc += cipher.final('hex');//编码方式转为hex;
        return enc;
    } catch (e) {
        console.log(e);
    }
}


//解密
function mydecrypto(content, secretkey) {
    try {
        var decipher = crypto.createDecipher('aes192', secretkey);
        var dec = decipher.update(content, "hex", "utf8");
        dec += decipher.final("utf8");
        return dec;
    } catch (e) {
        console.log(e);
    }

}

module.exports = {
    mycrypto,
    mydecrypto,

}