//import messageSchema from '../models/message-schema.js';
import mongoose from "mongoose";

const messageModel = mongoose.model('message');

/*const messages = [{id:0, name:"Bill", msgText:"Hi All!"},
       {id:1, name:"Ann",  msgText:"ICS 221 is fun!"},
       {id:2, name:"Johnny", msgText:"I'm stranded!"},
       {id:3, name:"Barb",    msgText:"Hi"},
       {id:4, name:"Frank",  msgText:"Who's tired?"},
       {id:5, name:"Sarah", msgText:"I heart React"}];*/

// GET Request Handler
const getAllMessages = async (req, res) => { 
    try { 
      //let messages = await messageModel.find( {}, '', { sort: { _id: -1 } }
      //).exec();
        //res.status(200).json(messages); 
        res.status(200).json({"siu" : "siu"}); 
    } catch (err) { 
        res.status(400).send('Bad Request'); 
    }
}; 
   
  // POST Request Handler
const addNewMessage = async (req, res) => { 
    //res.status(200).send('Successful API POST Request'); 
    try { 
      //let message = await messageSchema.validate(req.body); 
      //message.id = messages.length;
      //messages.unshift(message);
      let message = await messageModel.create(req.body);
      res.status(201).json(message); 
      //console.log(messages);
    } catch (err) { 
        res 
          .status(400) 
          .send('Bad Request. The message in the body of the \ Request is either missing or malformed.'); 
    }
}; 
   
const updateMessage = async (req, res) => {
  //res.status(200).send('Successful API Update Message PATCH Request');
  try {
    let message = await messageModel.findById(req.params.messageId).exec();
    if (!message) {
      // there wasn't an error, but the message wasn't found
      // i.e. the id given doesn't match any in the database
      res.sendStatus(404);
    } else {
      // message found - is the user authorized?
      if ( message.name === req.user.username ) {
        // auth user is owner of message, proceed w/ update
        message.msgText = req.body.msgText;
        await message.save();
        // send back 204 No Content
        res.sendStatus(204);
      } else {
        // auth user is not owner, unauthorized
        res.sendStatus(401);
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
   }
}

const deleteMessage = async (req, res) => {
  //res.status(200).send('Successful API Update Message DELETE Request');
  try {
    let message = await messageModel.findById(req.params.messageId).exec();
    if (!message) {
      // there wasn't an error, but the message wasn't found
      // i.e. the id given doesn't match any in the database
      res.sendStatus(404);
    } else {
      // message found - is the user authorized?
      if ( message.name === req.user.username ) {
        // auth user is owner of message, proceed w/ delete
        await message.remove();
        // send back 204 No Content
        res.sendStatus(204);
      } else {
        // auth user is not owner, unauthorized
        res.sendStatus(401);
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
   }
}

export { getAllMessages, addNewMessage, updateMessage, deleteMessage };