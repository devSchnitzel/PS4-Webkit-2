importScripts('../../../../resources/js-test-pre.js');
importScripts('../../../resources/common.js');

description("Test encrypting using RSA-OAEP SHA-1 with an imported key and a label in workers");

jsTestIsAsync = true;

var extractable = false;
var plainText = asciiToUint8Array("Hello, World!");
var jwkKey = {
    kty: "RSA",
    alg: "RSA-OAEP",
    use: "enc",
    key_ops: ["encrypt", "wrapKey"],
    ext: true,
    n: "rcCUCv7Oc1HVam1DIhCzqknThWawOp8QLk8Ziy2p10ByjQFCajoFiyuAWl-R1WXZaf4xitLRracT9agpzIzc-MbLSHIGgWQGO21lGiImy5ftZ-D8bHAqRz2y15pzD4c4CEou7XSSLDoRnR0QG5MsDhD6s2gV9mwHkrtkCxtMWdBi-77as8wGmlNRldcOSgZDLK8UnCSgA1OguZ989bFyc8tOOEIb0xUSfPSz3LPSCnyYz68aDjmKVeNH-ig857OScyWbGyEy3Biw64qun3juUlNWsJ3zngkOdteYWytx5Qr4XKNs6R-Myyq72KUp02mJDZiiyiglxML_i3-_CeecCw",
    e: "AQAB"
};
var rsaOaepParams = {
    name: "rsa-oaep",
    label: asciiToUint8Array("WebKit.org"),
}

crypto.subtle.importKey("jwk", jwkKey, {name: "RSA-OAEP", hash: "SHA-1"}, extractable, ["encrypt"]).then(function(key) {
    return crypto.subtle.encrypt(rsaOaepParams, key, plainText);
}).then(function(result) {
    cipherText = result;

    shouldBe("cipherText.byteLength", "256");

    finishJSTest();
});
