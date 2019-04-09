importScripts('../../../../resources/js-test-pre.js');
importScripts('../../../resources/common.js');

description("Test unwrapping a JWK RSA public key with AES-CBC using an imported key in workers");

jsTestIsAsync = true;

var extractable = true;
var jwkKey = {
    kty: "RSA",
    alg: "RSA-OAEP",
    use: "enc",
    key_ops: ["encrypt"],
    ext: true,
    n: "rcCUCv7Oc1HVam1DIhCzqknThWawOp8QLk8Ziy2p10ByjQFCajoFiyuAWl-R1WXZaf4xitLRracT9agpzIzc-MbLSHIGgWQGO21lGiImy5ftZ-D8bHAqRz2y15pzD4c4CEou7XSSLDoRnR0QG5MsDhD6s2gV9mwHkrtkCxtMWdBi-77as8wGmlNRldcOSgZDLK8UnCSgA1OguZ989bFyc8tOOEIb0xUSfPSz3LPSCnyYz68aDjmKVeNH-ig857OScyWbGyEy3Biw64qun3juUlNWsJ3zngkOdteYWytx5Qr4XKNs6R-Myyq72KUp02mJDZiiyiglxML_i3-_CeecCw",
    e: "AQAB"
};
var rawKey = asciiToUint8Array("jnOw99oOZFLIEPMr");
var aesCbcParams = {
    name: "aes-cbc",
    iv: asciiToUint8Array("jnOw99oOZFLIEPMr"),
}
var wrappedKey = hexStringToUint8Array( "848aa2f70ee18e2953520132a79cf47946e00c99362340bb690edc9ab5315757462c128278c6232e770e7437c56ed722a8e1703855f7f3e565394e1a6a0305c4ef1b30fa4c7f72d1a239cc6c6ba067898798a36a75132c66b4a2d3fb942886affd3ea3b2756b0ddc886c01e3b93107469b82124468408ef8ab548b85aa8f206c312d74ce4f2c679eb147a275cefda64d5bdc4a2b5b90a4ac9ad3eb5f2cf19f5f87653211f59b4731ba61125582a233951097dea65db05899d587d1dcfccab9ab7410ab3010b89066506dbacbc6b73e4b564792751388fa0f58d55c59c14a08c9dfb0f78100b0f5cc29d62328822636d30a6a153ec5cd4727ad5e47b419c48544565637ac5789863d43b7da78cf4383d09d66e9d458e436dbfbee75e382b2bab49eec2c7491ff93cf099fe92feaf4658e30889fd12d3ae61cd5e8c8e1e56a079b662f90cd10cdbdbb4d12eefb36d825e1a043e82f5a98f8960d655d3f9ed5af31e581fa846cc582f6cee5c25e0b3c32050534ae957ce27860d470ba26da2c7d6fa621b0faa8becad58e9e55bb2a9d984b042f25df21482529870d271cbf5508a0edfc3cb37316c11f16b342bc1f1f98aa");


crypto.subtle.importKey("raw", rawKey, "aes-cbc", extractable, ["unwrapKey"]).then(function(unwrappingKey) {
    return crypto.subtle.unwrapKey("jwk", wrappedKey, unwrappingKey, aesCbcParams, {name: "rsa-oaep", hash: "sha-1"}, extractable, ["encrypt"]);
}).then(function(cryptoKey) {
    return crypto.subtle.exportKey("jwk", cryptoKey);
}).then(function(result) {
    unwrappedKey = result;

    shouldBe("unwrappedKey.kty", "jwkKey.kty");
    shouldBe("unwrappedKey.alg", "jwkKey.alg");
    shouldBe("unwrappedKey.key_ops", "jwkKey.key_ops");
    shouldBe("unwrappedKey.ext", "jwkKey.ext");
    shouldBe("unwrappedKey.n", "jwkKey.n");
    shouldBe("unwrappedKey.e", "jwkKey.e");

    finishJSTest();
});
