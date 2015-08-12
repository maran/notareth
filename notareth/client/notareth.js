if (Meteor.isClient) {
  Document = new Mongo.Collection('documents', {connection: null}); // the current users identity
  new PersistentMinimongo(Document);

  Session.setDefault('counter', 0);

  // ugly, must be an other way
  Session.set("documentHash", undefined);
  Session.set("exists", undefined);
  Session.set("owned", undefined);
  Session.set("isAccount", undefined);
  Session.set("notice", undefined);

  Template.debug.checkConnection = function(){
    Meteor.setTimeout(function(){
      Session.set("isConnected",web3.isConnected());
      Template.debug.checkConnection()
    }, 2000)
  }
  Template.debug.created = function(){
    Template.debug.checkConnection()
  }

  Template.debug.helpers({
    "balance": function(){
      return web3.fromWei(web3.eth.getBalance(web3.eth.coinbase).toString())
    }
  })

  Template.transferDocument.events({
    "submit form#transfer": function(event){
      event.preventDefault()
      var docHash = event.target.documentHash.value
      var doc = event.target.account.value
      if(doc && docHash && web3.isAddress(doc)){
        notaryContract.transferDocument(docHash, doc, {from: web3.eth.coinbase, gas: 1800000})
        Session.set("notice", "Your document has been transferred and the transaction should show up soon.")
      }
    },
    "change #account": function(event){
      var account = event.target.value
      Session.set("isAccount", web3.isAddress(account))
    },
    "change #docHash": function(event){
      var hash = event.target.value
      Session.set("exists", notaryContract.documentExists(hash))
      Session.set("owned", notaryContract.documentHashMap(hash) == web3.eth.coinbase)
    }
  })

  Template.transferDocument.helpers({
    isDisabled: function(){
      if( Session.get("exists") == false || Session.get("owned") == false || Session.get("isAccount") == false){
        return "disabled"
      }
    },
    hasErrors: function(){
      if( Session.get("exists") == false || Session.get("owned") == false || Session.get("isAccount") == false){
        return "has-error"
      }
    }
  })

  Template.newDocument.helpers({
    isDisabled: function(){
      if(Session.get("documentHash") == undefined) {
        return "disabled"
      }else{
        return ""
      }
    },
    documentHash: function(){
      return Session.get("documentHash")
    }
  })

  Template.notice.helpers({
    hostName: function(){
      url = "http://"
      if(window.location.port){
        return url + window.location.hostname + ":" + window.location.port
      }else{
        return url + window.location.hostname
      }
    },
    notConnected: function(){
      return !Session.get("isConnected")
    },
    notice: function(){
      return Session.get("notice");
    }
  })

  Template.newDocument.events({
    'submit form#submitDoc': function(event){
      event.preventDefault();
      console.log("Submitting")

      var hash = event.target.documentHash.value;

      console.log(hash)

      if(hash != undefined || hash == ""){
        notaryContract.newDocument(hash, {from: web3.eth.coinbase, gas: 1800000})
        Session.set("notice", "Your document has been submitted, it should show up as soon as it's included in a block.")
        Meteor.setTimeout(function(){ Session.set("notice", undefined)}, 5000)
      }
    },

    'submit form#calcHash': function(event){
      event.preventDefault();
      console.log(event.target.fileUpload);
      var f = event.target.fileUpload.files[0]

    handleFileSelect(f);

    var progress = function(p) {
      var w = ((p*100).toFixed(0));
    }

    var  finished = function(result) {
      console.log(result.toString(CryptoJSH.enc.Hex))
      Session.set("documentHash",result.toString(CryptoJSH.enc.Hex).substring(0,31))
    }

    function handleFileSelect(f) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        setTimeout(function() {
          var a = CryptoJSH.SHA256(data,progress,finished);
        }, 200);
      };
      reader.onprogress = function(evt) {
        if (evt.lengthComputable) {
          var w = (((evt.loaded / evt.total)*100).toFixed(2));
        }
      }
      reader.readAsBinaryString(f);
    }
    }
  });

  Template.documentTable.helpers({
    myTransactions: function(){
      return Document.find({to: eth.coinbase, from: eth.coinbase})
    },
    transactions: function(){
      notaryContract.DocumentEvent({}, {fromBlock:0, toBlock:"latest"}).watch(function(a,b){

        var hash = web3.toAscii(b.args.hash)
        var doc = Document.findOne({hash: hash, to: b.args.to})

        if(doc == undefined){
          Document.insert({hash: hash, to: b.args.to, from: b.args.from, blockNumber: b.args.blockNumber.toString()})
        }
      })
      return Document.find({},{sort: {blockNumber: -1}})
    }
    ,
    counter: function(){
      return notaryContract.getLatest()
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
