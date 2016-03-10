contract Etherdoc {
    address owner;
    
    function Etherdoc(){
        owner = msg.sender; 
    }
    
    // In case you sent funds by accident
    function empty(){
     uint256 balance = address(this).balance;
     address(owner).send(balance);
    }
    
    function newDocument(bytes32 hash) returns (bool success){
        if (documentExists(hash)) {
            success = false;
        }else{

            createHistory(hash, msg.sender, msg.sender);
            usedHashes[hash] = true;
            success = true;
        }
        return success;
    }
    function createHistory (bytes32 hash, address from, address to) internal{
            ++latestDocument;
            documentHashMap[hash] = to;
            usedHashes[hash] = true;
            history[latestDocument] = DocumentTransfer(block.number, hash, from, to);
            DocumentEvent(block.number, hash, from,to);
    }
    
    function transferDocument(bytes32 hash, address recipient) returns (bool success){
        success = false;
           
        if (documentExists(hash)){
            if (documentHashMap[hash] == msg.sender){
                createHistory(hash, msg.sender, recipient);
                success = true;
            }
        }
         
        return success;
    }
    
    function documentExists(bytes32 hash) constant returns (bool exists){
        if (usedHashes[hash]) {
            exists = true;
        }else{
            exists= false;
        }
        return exists;
    }
    
    function getDocument(uint docId) constant returns (uint blockNumber, bytes32 hash, address from, address to){
        DocumentTransfer doc = history[docId];
        blockNumber = doc.blockNumber;
        hash = doc.hash;
        from = doc.from;
        to = doc.to;
    }
    
    event DocumentEvent(uint blockNumber, bytes32 indexed hash, address indexed from, address indexed to);
    
    struct DocumentTransfer {
        uint blockNumber;
        bytes32 hash;
        address from;
        address to;
    }
    
    function getLatest() constant returns (uint latest){
        return latestDocument;
    }
    
    uint latestDocument;
    
    mapping(uint => DocumentTransfer) public history;
    mapping(bytes32 => bool) public usedHashes;
    mapping(bytes32 => address) public documentHashMap;
}
