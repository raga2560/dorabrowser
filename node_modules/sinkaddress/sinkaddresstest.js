bitcoin = require('bitcoinjs-lib');
sa = require('./sinkaddress');
bufferReverse = require('buffer-reverse')



var keyPair1 = bitcoin.ECPair.fromWIF(
'cRgnQe1TQngWfnsLo9YUExBjx3iVKNHu2ZfiRcUivATuojDdzdus',
 bitcoin.networks.testnet);
var keyPair2 = bitcoin.ECPair.fromWIF(
      '91avARGdfge8E4tZfYLoxeJ5sGBdNJQH4kvjJoQFacbgx3cTMqe',
       bitcoin.networks.testnet);
var keyPair3 = bitcoin.ECPair.fromWIF(
      '91avARGdfge8E4tZfYLoxeJ5sGBdNJQH4kvjJoQFacbgww7vXtT',
 bitcoin.networks.testnet);

var Pk1 = keyPair1.getPublicKeyBuffer();
var Pk2 = keyPair2.getPublicKeyBuffer();
var Pk3 = keyPair3.getPublicKeyBuffer();

var sa1 = sa.getSAfromPK(Pk1, Pk2, Pk3, bitcoin.networks.testnet);
var rd1 = sa.getRDScriptfromPK(Pk1, Pk2, Pk3, bitcoin.networks.testnet);


console.log("sinkaddress="+ sa1);
console.log("rdhash="+(bitcoin.crypto.hash160(rd1)).toString('hex'));

var scriptPubKey1 = bitcoin.script.scriptHashOutput(bitcoin.crypto.hash160(rd1))

console.log("sscriptpubkey="+scriptPubKey1.toString('hex'));

var commissionaddress = "2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF";
var scriptPubKey = bitcoin.address.toOutputScript(commissionaddress, bitcoin.networks.testnet); 
console.log("sscriptpubkey1="+scriptPubKey.toString('hex'));

// unlock using custom contract input
var tx1 = "cf8f86497592096c24840d35f58ba54343b31c02dfb1c7aef4cf49b86f42be65";
var indextospend = 0;
var sequence = 141155;
var outscriptPubKey = scriptPubKey1;
var contractinput = keyPair1.getPublicKeyBuffer();
var available = 64998000;
var commision = 6499800; // 1%
var commaddr = scriptPubKey; // 1%
var fees = 1000;
var amount = available - commision - fees;
var redeemScript = rd1;
var tx = sa.getSignedTxToGetFundfromSA(sa,redeemScript, outscriptPubKey, 
  indextospend, amount, commision, commaddr, sequence,
  tx1 , keyPair2, bitcoin.networks.testnet);

console.log(tx.toHex());

