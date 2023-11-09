const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")

const privatekey = secp.secp256k1.utils.randomPrivateKey()

console.log("privateKey", toHex(privatekey))

const publicKey = secp.secp256k1.getPublicKey(privatekey)

console.log("publicKey", toHex(publicKey))