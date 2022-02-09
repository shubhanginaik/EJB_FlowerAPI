'use strict';

const CODES = {
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    NOT_INSERTED:3,
    ALREADY_IN_USE:4,
    REMOVE_OK:5,
    NOT_REMOVED:6,
    UPDATE_OK:7,
    NOT_UPDATED:8
};

const MESSAGES = {
    PROGRAM_ERROR:()=>({
        message: 'Sorry! Error in the program',
        code:CODES.PROGRAM_ERROR,
        type:'error'
    }),
    NOT_FOUND:flowerId => ({
        message:`No flower found with id ${flowerId}`,
        code: CODES.NOT_FOUND,
        type:'error'
    }),
    INSERT_OK: flowerId => ({
        message:`Flower ${flowerId} is inserted`,
        code: CODES.INSERT_OK,
        type:'info'
    }),
    NOT_INSERTED: ()=>({
        message:'Flower is not inserted',
        code: CODES.NOT_INSERTED,
        type: 'error'
    }),
    ALREADY_IN_USE: flowerId=>({
        message:`FlowerId ${flowerId} was already in use`,
        code:CODES.ALREADY_IN_USE,
        type:'error',
    }),
    REMOVE_OK: flowerId=>({
        message:`Flower ${flowerId} is removed`,
        code:CODES.REMOVE_OK,
        type:'info',
    }),
    NOT_REMOVED: flowerId=>({
        message:`Flower ${flowerId} is not removed`,
        code:CODES.NOT_REMOVED,
        type:'error',
    }),
    UPDATE_OK:flowerId=>({
        message:`Flower ${flowerId} is updated`,
        code:CODES.UPDATE_OK,
        type:'info'
    }),
    NOT_UPDATED: ()=>({
        message:'Data is not updated',
        code:CODES.NOT_UPDATED,
        type:'error',
    })
};
module.exports = {CODES,MESSAGES}