importScripts('../../../../resources/js-test-pre.js');
importScripts("../../../resources/common.js");

description("Test importing a JWK RSA-OAEP private key with SHA-1 in workers.");
jsTestIsAsync = true;

var jwkKey = {
    kty: "RSA",
    alg: "RSA-OAEP",
    use: "enc",
    key_ops: ["decrypt", "unwrapKey"],
    ext: true,
    n: "rcCUCv7Oc1HVam1DIhCzqknThWawOp8QLk8Ziy2p10ByjQFCajoFiyuAWl-R1WXZaf4xitLRracT9agpzIzc-MbLSHIGgWQGO21lGiImy5ftZ-D8bHAqRz2y15pzD4c4CEou7XSSLDoRnR0QG5MsDhD6s2gV9mwHkrtkCxtMWdBi-77as8wGmlNRldcOSgZDLK8UnCSgA1OguZ989bFyc8tOOEIb0xUSfPSz3LPSCnyYz68aDjmKVeNH-ig857OScyWbGyEy3Biw64qun3juUlNWsJ3zngkOdteYWytx5Qr4XKNs6R-Myyq72KUp02mJDZiiyiglxML_i3-_CeecCw",
    e: "AQAB",
    d: "eNLS37aCz7RXSNPD_DtLBJ6j5T8cSxdzRBCjPaI6WcGqJp16lq3UTwuoDLAqlA9oGYm238dsIWpuucP_lQtbWe-7SpxoI6_vmYGf7YVUHv1-DF9qiOmSrMmdxMnVOzYXY8RaT6thPjn_J5cfLV2xI_LwsrMtmpdSyNlgX0zTUhwtuahgAKMEChYjH2EnjHdHw6sY2-wApdcQI7ULE0oo5RzbQZpmuhcN9hiBc0L3hhF0qo50mbl02_65_GQ7DpVkXBxNgRBLzlPabmzzG2oAhfefLgYmSC1opaCkXE6vRWQNWNL45RZNZFYM3uoJghOMqGeocM0BpjdChHrPOlFvSQ",
    p: "4miTuAjKMeH5uJ5KB397QUwhbkYEgSbcA2mifmSkvE2018gb55qkBHK1eVryf1_m43LNlc6O_ak6gfzdZIZvS5NCGjPl0q09plUpu8qFOSspBwA67qGH76lFlZLn_d4yglS7wfLru4_5Ys8qLLs-DqVLviwposOnyyWqwM5AXp0",
    q: "xHYrzkivtmnz_sGchnWGc0q-pDOkKicptRpv2pMFIIXxnFX5aMeEXIZjVujXtwUy1UlFIN2GZJSvy5KJ79mu_XyNnFHMzedH-A3ee3u8h1UUrZF-vUu1_e4U_x67NN1dedzUSKynN7pFl3OkuShMBWGV-cwzOPdcVAfVuZlxUMc",
    dp: "fBzDzYDUBmBQGop7Hn0dvf_T27V6RqpctWo074CQZcFbP2atFVtKSj3viWT3xid2VHzcgiDHdfpM3nEVlEO1wwIonGCSvdjGEOZiiFVOjrZAOVxA8guOjyyFvqbXke06VwPIIVvfKeSU2zuhbP__1tt6F_fxow4Kb2xonGT0GGk",
    dq: "jmE2DiIPdhwDgLXAQpIaBqQ81bO3XfVT_LRULAwwwwlPuQV148H04zlh9TJ6Y2GZHYokV1U0eOBpJxfkb7dLYtpJpuiBjRf4yIUEoGlkkI_QlJnFSFr-YjGRdfNHqWBkxlSMZL770R9mIATndGkH7z5x-r9KwBZFC4FCG2hg_zE",
    qi: "YCX_pLwbMBA1ThVH0WcwmnytqNcrMCEwTm7ByA2eU6nWbQrULvf7m9_kzfLUcjsnpAVlBQG5JMXMy0Sq4ptwbywsa5-G8KAOOOR2L3v4hC-Eys9ftgFM_3i0o40eeQH4b3haPbntrIeMg8IzlOuVYKf9-2QuKDoWeRdd7NsdxTk",
};
var extractable = true;

shouldReject('crypto.subtle.importKey("jwk", {kty: "RSA", n: n, e: e, d: d}, {name: "RSA-OAEP", hash: "sha-1"}, extractable, ["encrypt", "wrapKey"])');

debug("Importing a key...");
crypto.subtle.importKey("jwk", jwkKey, {name: "RSA-OAEP", hash: "SHA-1"}, extractable, ["decrypt", "unwrapKey"]).then(function(result) {
    privateKey = result;

    shouldBe("privateKey.toString()", "'[object CryptoKey]'");
    shouldBe("privateKey.type", "'private'");
    shouldBe("privateKey.extractable", "true");
    shouldBe("privateKey.algorithm.name", "'RSA-OAEP'");
    shouldBe("privateKey.algorithm.modulusLength", "2048");
    shouldBe("bytesToHexString(privateKey.algorithm.publicExponent)", "'010001'");
    shouldBe("privateKey.algorithm.hash.name", "'SHA-1'");
    shouldBe("privateKey.usages", "['decrypt', 'unwrapKey']");

    finishJSTest();
});
