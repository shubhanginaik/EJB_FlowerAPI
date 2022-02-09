'use strict';

const http = require('http');
const path = require('path');

const express = require('express');
const app = express();

const {port,host,storage} = require('./serverconfig.json')

const DataStorage=
require(path.join(__dirname,storage.storageFolder,storage.dataLayer));

const dataStorage = new DataStorage();

const server= http.createServer(app);

 app.set('view engine','ejs');
 app.set('views', path.join(__dirname,'pageviews'));

 app.use(express.urlencoded({extended:false}));
 app.use(express.static(path.join(__dirname,'public')));

 const menuPath=path.join(__dirname,'menu.html');
 app.get('/',(req,res)=>res.sendFile(menuPath));

 // Get all flowers
 app.get('/all',(req,res)=>dataStorage.getAll()
 .then(data=>res.render('allFlowers',{result:data})));

 // Get a flower
 app.get('/getFlower',(req,res)=>res.render('getFlower',{
    title:'get',
    header:'Get a flower',
    action:'/getFlower'
}));
 app.post('/getFlower',(req,res)=>{
     
     if(!req.body) res.sendStatus(500);

     const flowerId = req.body.flowerId;
     dataStorage.getOne(flowerId)
     .then(flower =>res.render('flowerPage',{result:flower}))
     .catch(error=>sendErrorPage(res,error));
 })

 app.get('/removeflower',(req,res)=>res.render('getFlower',{
    title:'Remove',
    header:'Remove a flower',
    action:'/removeflower'
}));

app.post('/removeflower', (req,res)=>{
    if(!req.body) res.sendStatus(500);
    const flowerId=req.body.flowerId;
    dataStorage.remove(flowerId)
        .then(status=>sendStatusPage(res,status))
        .catch(error=>sendErrorPage(res,error));
});


 // Input/add a flower
 app.get('/inputform',(req,res)=>res.render('form',
 {
     title:'add a flower',
     header:'Add a new flower',
     action:'/insert',
     flowerId:{value:'',readonly:''},
     name:{value:'',readonly:''},
     stock:{value:'',readonly:''},
     site:{value:'',readonly:''},
     farmer:{value:'',readonly:''}
 }));

 app.post('/insert',(req,res)=>{
     if(!req.body) res.sendStatus(500);
     dataStorage.insert(req.body)
     .then(status=>sendStatusPage(res,status))
     .catch(error=>sendStatusPage(res,error));
 });

 // update/modify a flower
 app.get('/updateform', (req, res) => res.render('form', {
    title: 'Update flower',
    header: 'Update flower data',
    action: '/updatedata',
    flowerId: { value: '', readonly: '' },
    name: { value: '', readonly: 'readonly' },
    stock: { value: '', readonly: 'readonly' },
    site: { value: '', readonly: 'readonly' },
    farmer: { value: '', readonly: 'readonly' }
}));

app.post('/updatedata',(req,res)=>{
    if(!req.body) res.sendStatus(500);
    dataStorage.getOne(req.body.flowerId)
        .then(flower=> res.render('form',{
            title:'update flower',
            header:'Update flower data',
            action:'/update',
            flowerId:{value:flower.flowerId, readonly:'readonly'},
            name:{value:flower.name, readonly:''},
            stock:{value:flower.stock, readonly:''},
            site:{value:flower.site,readonly:''},
            farmer:{value:flower.farmer, readonly:''}
        }))
        .catch(error=>sendErrorPage(res,error));
});

app.post('/update', (req, res) => {
    if (!req.body) res.sendStatus(500);
    dataStorage.update(req.body)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error));
});


server.listen(port,host,()=>console.log(`${host}:${port} is listening`));

function sendErrorPage(res, error, title='Error',header='Error'){
    sendStatusPage(res, error,title,header);
}

function sendStatusPage(res, status,title='Status', header='Status'){
    return res.render('statusPage',{title,header,status});
    // return res.render('statusPage', { title:title, header:header, status:status });
}