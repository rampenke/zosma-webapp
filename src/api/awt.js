import { ethers } from "ethers";
import { TypedDataUtils } from 'ethers-eip712'

const zeroPad = (value, length) => {
	return ethers.utils.arrayify(ethers.utils.hexZeroPad(ethers.utils.hexlify(value), length))
}

export function getMsgHash(auth) {

	const domain = {
		name: 'Arcturus',
		version: '1',
	};

	const types = {
		EIP712Domain: [
			{name: "name", type: "string"},
			{name: "version", type: "string"},
		],
		Auth: [
			{ name: "chainId", type: "string"},
			{ name: "contract", type: "string"},			
			{ name: 'token', type: 'string' },
			{ name: 'expiry', type: 'string' },
		]
	};
	  
 
	const typedData = {
		types: types,
		domain: domain,
		primaryType: 'Auth',
		message: auth
	}
	console.log( domain, types, auth);
	const eip191Header = ethers.utils.arrayify('0x1901')
	console.log("eip191Header :", eip191Header);

	const domainHash = TypedDataUtils.hashStruct(typedData, 'EIP712Domain', typedData.domain)
	console.log("domainHash :", ethers.utils.hexlify(domainHash));

	const typedDataHash = TypedDataUtils.hashStruct(typedData, typedData.primaryType, typedData.message)
	console.log("typedDataHash :", ethers.utils.hexlify(typedDataHash));

	const pack = ethers.utils.solidityPack(
		['bytes', 'bytes32', 'bytes32'],
		[eip191Header, zeroPad(domainHash, 32), zeroPad(typedDataHash, 32)]
	  )
  
	const hash = ethers.utils.keccak256(pack);
	console.log("hash :", hash);
	return  hash;

}

export  function SignToken( privateKey, chainId, contract, token, expiry ) {

	let auth = {
		chainId: chainId,
		contract: contract,
		token:  token,
		expiry: expiry
	};

	let hash = getMsgHash(auth);

	const signingKey = new ethers.utils.SigningKey(privateKey);

	const _signature = signingKey.signDigest(hash);
	let signature = ethers.utils.joinSignature(_signature);
	//console.log("signature :", signature);

	const signatureB64 = ethers.utils.base64.encode(ethers.utils.arrayify(signature));
	console.log("signatureB64 :", signatureB64);

	let messageB64 = btoa(JSON.stringify(auth));
	console.log("messageB64 :", messageB64);

    let signedMessage = messageB64 + "." + signatureB64;
	console.log("signedMessage :", signedMessage);
	return signedMessage;
}

export  function VerifyToken( signedMessage ) {

	const msgArray = signedMessage.split(".");
	
	let messageB64 = msgArray[0];	
	let auth = JSON.parse(atob(messageB64))
	//console.log("auth :", auth)
	
	let signatureB64 = msgArray[1];
	let signature = ethers.utils.base64.decode(signatureB64);
	//console.log("signature :", signature)

	let hash = getMsgHash(auth);

	let address = ethers.utils.recoverAddress(hash, signature);
	console.log("address :", address);
    return address;
}
