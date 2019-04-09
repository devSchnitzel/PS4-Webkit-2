importScripts('../../../../resources/js-test-pre.js');
importScripts("../../../resources/common.js");

description("Test importing a PKCS8 ECDH key in workers");

jsTestIsAsync = true;

// From OpenSSL
var pkcs8Key = Base64URL.parse("MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDCmchQf8pIqW87DnVZ/hRK5k4ueQK58pYL9KZ5pRl0HIl/Y9NOOy9SQydZKjZclxRihZANiAARP6PR5oBstUk0PY3rdA5G3MzRKnspHAjWdQq1CrP0GMud8hVU06JaCj+x2MYs6p/l0XtlKGaVRUqRBjP3yd9PXBt3z1EPuBxCscXzoW6YOj+KefYs9/geXx+tH0sGahso");
var extractable = true;

debug("Importing a key...");
crypto.subtle.importKey("pkcs8", pkcs8Key, {name: "ECDH", namedCurve: "P-384"}, extractable, ["deriveKey", "deriveBits"]).then(function(result) {
    publicKey = result;

    shouldBe("publicKey.toString()", "'[object CryptoKey]'");
    shouldBe("publicKey.type", "'private'");
    shouldBe("publicKey.extractable", "true");
    shouldBe("publicKey.algorithm.name", "'ECDH'");
    shouldBe("publicKey.algorithm.namedCurve", "'P-384'");
    shouldBe("publicKey.usages", "[ 'deriveBits', 'deriveKey' ]");

    finishJSTest();
});
