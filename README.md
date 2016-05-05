#### NoterEth
NoterEth, pronounced "Notaryth", is a prototype notary and "Proof of Existence" DAPP. By submitting hashes of documents you can proof on a later date that you were privileged to certain information at a point in history.
The transfer of documents can enable other contracts to allow certain access based on who owns a hash.

You can see a working [demo here](http://notareth.herokuapp.com/). It does require a
local running Geth instance.

##### Running your own copy
If you want to play around with the contract I suggest loading up the
`contract.sol` file up in [Cosmo](http://meteor-dapp-cosmo.meteor.com/) and playing around with it there.

If you deploy the contract on your own chain be sure to edit `abi.js` and
edit in your own contract address.
