bitcoin = require('bitcoinjs-lib');
bc = require('bitcoincontrol');
bufferReverse = require('buffer-reverse')



// publickey
function getSAfromPK(Pk1, Pk2, Pk3, network)
{

var smartcontract = bitcoin.script.compile( [bitcoin.opcodes.OP_1, Pk1,
                        Pk2, Pk3, bitcoin.opcodes.OP_3,
                        bitcoin.opcodes.OP_CHECKMULTISIG ]);

var addr = bc.customlib.getCustomContractAddress(smartcontract, network);


return addr;

}

function getRDScriptfromPK(Pk1, Pk2, Pk3, network)
{

var smartcontract = bitcoin.script.compile( [bitcoin.opcodes.OP_1, Pk1,
                        Pk2, Pk3, bitcoin.opcodes.OP_3,
                        bitcoin.opcodes.OP_CHECKMULTISIG ]);


return smartcontract;

}

// keypair
function getSignedTxToGetFundfromSA (sa,redeemScript, scriptPubKey,
 indextospend, amount, commision, commaddr, sequence, tx1, keypair, network)
{
 
var outscriptPubKey = scriptPubKey;
var lock = redeemScript;
var txb = new bitcoin.TransactionBuilder (network);

var hashType = 1 ; 
txb.addInput(tx1, indextospend, sequence);
txb.addOutput(outscriptPubKey, amount);
txb.addOutput(commaddr, commision);
txb.sign(0, keypair, redeemScript, hashType);
 var tx = txb.build();

return tx;

}



module.exports = {
     getSignedTxToGetFundfromSA: getSignedTxToGetFundfromSA,
     getSAfromPK: getSAfromPK,
     getRDScriptfromPK: getRDScriptfromPK
}
