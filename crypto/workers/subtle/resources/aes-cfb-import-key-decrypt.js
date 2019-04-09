importScripts('../../../../resources/js-test-pre.js');
importScripts('../../../resources/common.js');

description("Test decrypting using AES-CFB with an imported 128bit key in workers");

jsTestIsAsync = true;

var extractable = false;
var cipherText = hexStringToUint8Array("a572525a0baef88e6f5b198c6f");
var aesCfbParams = {
    name: "aes-cfb-8",
    iv: asciiToUint8Array("jnOw99oOZFLIEPMr"),
}
var rawKey = asciiToUint8Array("jnOw99oOZFLIEPMr");
var expectedPlainText = "Hello, World!";

crypto.subtle.importKey("raw", rawKey, "aes-cfb-8", extractable, ["decrypt"]).then(function(key) {
    return crypto.subtle.decrypt(aesCfbParams, key, cipherText);
}).then(function(result) {
    plainText = result;

    shouldBe("bytesToASCIIString(plainText)", "expectedPlainText");

    finishJSTest();
});
