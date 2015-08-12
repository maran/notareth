var abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "documentHashMap",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "hash",
        "type": "bytes32"
      }
    ],
    "name": "newDocument",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "docId",
        "type": "uint256"
      }
    ],
    "name": "getDocument",
    "outputs": [
      {
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "name": "hash",
        "type": "bytes32"
      },
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      }
    ],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "history",
    "outputs": [
      {
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "name": "hash",
        "type": "bytes32"
      },
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      }
    ],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "usedHashes",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getLatest",
    "outputs": [
      {
        "name": "latest",
        "type": "uint256"
      }
    ],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "hash",
        "type": "bytes32"
      }
    ],
    "name": "documentExists",
    "outputs": [
      {
        "name": "exists",
        "type": "bool"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "hash",
        "type": "bytes32"
      },
      {
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "transferDocument",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "empty",
    "outputs": [],
    "type": "function"
  },
  {
    "inputs": [],
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "hash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      }
    ],
    "name": "DocumentEvent",
    "type": "event"
  }
]
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8080"));
notaryContract = web3.eth.contract(abi).at("0x5548e21695f8f5e4edbcd8abc2de0924c718daca");
