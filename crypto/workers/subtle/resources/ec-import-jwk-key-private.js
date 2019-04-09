importScripts('../../../../resources/js-test-pre.js');
importScripts("../../../resources/common.js");

description("Test importing a JWK ECDH private key in workers");

jsTestIsAsync = true;

var jwkKey = {
    kty: "EC",
    use: "enc",
    ext: false,
    key_ops: ["deriveKey", "deriveBits"],
    crv: "P-256",
    x: "1FSVWieTvikFkG1NOyhkUCaMbdQhxwH6aCu4Ez-sRtA",
    y: "9jmNTLqM4cjBhdAnHcNI9YQV3O8LFmo-EdZWk8ntAaI",
    d: "ppxBSov3N8_AUcisAuvmLV4yE8e_L_BLE8bZb9Z1Xjg",
};
var nonExtractable = false;

debug("Importing a key...");
crypto.subtle.importKey("jwk", jwkKey, { name: "ECDH", namedCurve: "P-256" }, nonExtractable, ["deriveKey", "deriveBits"]).then(function(result) {
    privateKey = result;

    shouldBe("privateKey.toString()", "'[object CryptoKey]'");
    shouldBe("privateKey.type", "'private'");
    shouldBe("privateKey.extractable", "false");
    shouldBe("privateKey.algorithm.name", "'ECDH'");
    shouldBe("privateKey.algorithm.namedCurve", "'P-256'");
    shouldBe("privateKey.usages", "['deriveBits', 'deriveKey']");

    finishJSTest();
});
