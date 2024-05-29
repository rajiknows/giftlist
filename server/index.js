const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree')
const niceList = require('../utils/niceList.json')
const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
let mtree = new MerkleTree(niceList)
const MERKLE_ROOT = mtree.getRoot();

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {name} = req.body;

  // TODO: prove that a name is in the list 
  const proof = mtree.getProof(niceList.indexOf(name))

  console.log(name)
  
  const isInTheList = verifyProof(proof,name,mtree.getRoot()) ? true : false 
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send(`You are not on the list :( ${name}` );
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
