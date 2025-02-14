import * as uint8arrays from 'uint8arrays'
import * as ipns from 'ipns'
import * as Digest from 'multiformats/hashes/digest'
import { identity } from 'multiformats/hashes/identity'
import { base36 } from 'multiformats/bases/base36'
import { CID } from 'multiformats/cid'
import { keys } from 'libp2p-crypto'
import * as JWT from '../../src/utils/jwt.js'
import { JWT_ISSUER } from '../../src/constants.js'
import { SALT } from './worker-globals.js'

const libp2pKeyCode = 0x72
const lifetime = 1000 * 60 * 60

export async function createNameKeypair () {
  const privKey = await keys.generateKeyPair('Ed25519', 2048)
  const digest = Digest.create(identity.code, privKey.public.bytes)
  return {
    id: CID.createV1(libp2pKeyCode, digest).toString(base36),
    privateKey: privKey.bytes
  }
}

/**
 * @param {Uint8Array} privKey Private key
 * @param {string} value IPFS path
 * @param {bigint} seqno Sequence number
 */
export async function createNameRecord (privKey, value, seqno = 0n) {
  const privKeyObj = await keys.unmarshalPrivateKey(privKey)
  const entry = await ipns.create(privKeyObj, uint8arrays.fromString(value), seqno, lifetime)
  return ipns.marshal(entry)
}

/**
 * @param {Uint8Array} privKey Private key
 * @param {Uint8Array} existingRecord Current IPNS record
 * @param {string} newValue IPFS path
 */
export async function updateNameRecord (privKey, existingRecord, newValue) {
  const privKeyObj = await keys.unmarshalPrivateKey(privKey)
  const existingEntry = ipns.unmarshal(existingRecord)
  const newEntry = await ipns.create(
    privKeyObj,
    uint8arrays.fromString(newValue),
    existingEntry.sequence + 1n,
    lifetime
  )
  return ipns.marshal(newEntry)
}

export function getTestJWT (sub = 'test-magic-issuer', name = 'test-magic-issuer') {
  return JWT.sign({ sub, iss: JWT_ISSUER, iat: 1633957389872, name }, SALT)
}
