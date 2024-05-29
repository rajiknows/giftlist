const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const verifyProof = require('../utils/verifyProof');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const name  = "Bill Toy";
  const merkletree = new MerkleTree(niceList);
  const proof = merkletree.getProof(niceList.indexOf("Bill Toy"))
  const verify = verifyProof(proof,name,merkletree.getRoot());
  if(verifyProof){
    console.log("proved")
  }

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name
  });

  console.log({ gift });
}

main();