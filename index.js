var web3= require('./getweb3');
var express = require('express');
var app = express();
var path=require('path');

app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    //console.log('----ok')
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/accounts',function(req,res){
    web3.eth.getAccounts((err, accounts)=>{
       // web3.eth.accounts((err, accounts)=>{
        if(!err){
            console.log('----ok',accounts);
            res.send(accounts);
           
        }
    }).then(console.log);
})

app.get('/addaccounts',function(req,res){
     var inputpwd=req.query.inputpwd;
      web3.eth.personal.newAccount(inputpwd).then(address=>res.send(address))
})

app.get('/transfer',function(req,res){
    var from1=req.query.from1;
    var to1=req.query.to1;
    var amount1=req.query.amount1;
    var password1=req.query.password1;
    console.log('Success1:',from1);
    console.log('Success2:',to1);
    console.log('Success3:',amount1);
    console.log('Success4:',password1);

    web3.eth.personal.unlockAccount(from1,password1,600,function(){
        console.log('Success？:',password1);
        web3.eth.sendTransaction({
            from:from1,
            to:to1,
            value:web3.utils.toWei(amount1,"ether")
        },function(err, tranSactionHash){
         if(!err){
            res.send(tranSactionHash);
            console.log('Success5:',tranSactionHash)
         }else{
            console.log('err>>>',err)
         }
        })
    })
})

app.get('/balance',function(req,res){
    var balanceadress=req.query.balance;
   
    console.log('Success4:',balanceadress);

    web3.eth.getBalance(balanceadress).then(balance1=>{
        balance1=web3.utils.fromWei(balance1,"ether");
        res.send(balance1)
    })
})


app.listen(5000, () => console.log('服务器port5000已就绪'))

//app=server