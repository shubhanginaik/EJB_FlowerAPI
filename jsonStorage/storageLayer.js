'use strict';

const path = require('path');

const { readStorage, writeStorage} = require('./readerWriter');
const {storageFile,adapterFile} = require('./storageConfig.json');

const {adapt} = require(path.join(__dirname,adapterFile));

const storageFilePath = path.join(__dirname,storageFile);

async function getAllFromStorage(){
    return readStorage(storageFilePath)
}

async function getOneFromStorage(flowerId){
    const storage = await readStorage(storageFilePath);
    return storage.find(item=>item.flowerId == flowerId) || null;

}

async function addToStorage(newObject){
    const storage = await readStorage(storageFilePath);
    storage.push(adapt(newObject));
    return await writeStorage(storageFilePath,storage);
}
 async function updateStorage(updatedObject){
     const storage = await readStorage(storageFilePath);
     const oldObject = storage.find(item=> item.flowerId == updatedObject.flowerId);
     if(oldObject){
         Object.assign(oldObject, adapt(updatedObject));
         return await writeStorage(storageFilePath,storage)
     }
     return false;
 }

 async function removeFromStorage(flowerId){
     const storage = await readStorage(storageFilePath);
     const i = storage.findIndex(item=>item.flowerId == flowerId);
     if(i<0) return false
     storage.splice(i,1);
     return await writeStorage(storageFilePath,storage);
 }

 module.exports={
     getAllFromStorage,
     getOneFromStorage,
     addToStorage,
     updateStorage,
    removeFromStorage
}