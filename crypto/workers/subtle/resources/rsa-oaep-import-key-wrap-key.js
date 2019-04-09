importScripts('../../../../resources/js-test-pre.js');
importScripts('../../../resources/common.js');

description("Test wrapping a JWK oct key with RSA-OAEP using an imported key in workers");

jsTestIsAsync = true;

var extractable = true;
var jwkKey = {
    kty: "RSA",
    alg: "RSA-OAEP",
    use: "enc",
    key_ops: ["wrapKey"],
    ext: true,
    n: "rcCUCv7Oc1HVam1DIhCzqknThWawOp8QLk8Ziy2p10ByjQFCajoFiyuAWl-R1WXZaf4xitLRracT9agpzIzc-MbLSHIGgWQGO21lGiImy5ftZ-D8bHAqRz2y15pzD4c4CEou7XSSLDoRnR0QG5MsDhD6s2gV9mwHkrtkCxtMWdBi-77as8wGmlNRldcOSgZDLK8UnCSgA1OguZ989bFyc8tOOEIb0xUSfPSz3LPSCnyYz68aDjmKVeNH-ig857OScyWbGyEy3Biw64qun3juUlNWsJ3zngkOdteYWytx5Qr4XKNs6R-Myyq72KUp02mJDZiiyiglxML_i3-_CeecCw",
    e: "AQAB"
};
var rawKey = asciiToUint8Array("jnOw99oOZFLIEPMr");

crypto.subtle.importKey("jwk", jwkKey, {name: "rsa-oaep", hash: "sha-1"}, extractable, ["wrapKey"]).then(function(result) {
    wrappingKey = result;
    return crypto.subtle.importKey("raw", rawKey, "aes-cbc", extractable, ["encrypt", "decrypt"]);
}).then(function(result) {
    key = result;
    return crypto.subtle.wrapKey("jwk", key, wrappingKey, "rsa-oaep");
}).then(function(result) {
    wrappedKey = result;

    shouldBe("wrappedKey.byteLength", "256");

    finishJSTest();
});
