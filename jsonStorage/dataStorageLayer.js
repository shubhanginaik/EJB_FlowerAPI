"use strict";
const { CODES, MESSAGES } = require("./statusCode");
const {
  getAllFromStorage,
  getOneFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
} = require("./storageLayer");

// Datastorage class
module.exports = class Datastorage {
  get CODES() {
    return CODES;
  } // getter end

  getAll() {
    return getAllFromStorage();
  } // getAll() end

  getOne(flowerId) {
    return new Promise(async (resolve, reject) => {
      if (!flowerId) {
        reject(MESSAGES.NOT_FOUND("--empty--"));
      } else {
        const result = await getOneFromStorage(flowerId);
        if (result) {
          resolve(result);
        } else {
          reject(MESSAGES.NOT_FOUND(flowerId));
        }
      }
    });
  } // getOne() end

  insert(flower) {
    return new Promise(async (resolve, reject) => {
      if (flower) {
        if (!flower.flowerId) {
          reject(MESSAGES.NOT_INSERTED());
        } else if (await getOneFromStorage(flower.flowerId)) {
          reject(MESSAGES.ALREADY_IN_USE(flower.flowerId));
        } else if (await addToStorage(flower)) {
          resolve(MESSAGES.INSERT_OK(flower.flowerId));
        } else {
          reject(MESSAGES.NOT_INSERTED());
        }
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  } // insert end

  update(flower){
    return new Promise(async (resolve,reject)=>{
        if(flower){
            if(await updateStorage(flower)){
                resolve(MESSAGES.UPDATE_OK(flower.flowerId));
            }
            else {
                reject(MESSAGES.NOT_UPDATED());
            }
        }
        else {
            reject(MESSAGES.NOT_UPDATED());
        }
    });
} //update end

remove(flowerId){
  return new Promise(async (resolve,reject)=>{
      if(!flowerId){
          reject(MESSAGES.NOT_FOUND('--empty--'));
      }
      else if(await removeFromStorage(flowerId)){
          resolve(MESSAGES.REMOVE_OK(flowerId));
      }
      else {
          reject(MESSAGES.NOT_REMOVED(flowerId))
      }
  });
} //remove end
}; // end of class
