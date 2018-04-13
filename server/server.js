require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const chance = require('chance').Chance();

// Import mongoose models
const newcards = require('./db/CardsModel');

// MongoDB Information
const mongoUsername = process.env.MONGOUSER
const mongoPassword = process.env.MONGOPASS
const mongoApp = process.env.MONGOAPP
const mongoNum = process.env.MONGONUM
const mongoClient = process.env.MONGOCLIENT
//Connects to MongoDB
mongoose.connect(`mongodb://${mongoUsername}:${mongoPassword}@${mongoNum}.mlab.com:${mongoClient}/${mongoApp}`);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

function getRandomCards(maxNum,num){
  let indexArr = chance.unique(chance.integer, num, {min:1, max:maxNum});
  return indexArr;
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/')

// Get all the black cards information from MongoDB and fetch 21 black cards
// 5 players max
app.get('/getBlackCardInfo', (req,res) => {
  let blackInfo = [];
  newcards.find({CardType:'Prompt'}, (err, foundCards) => {
    if (err || !foundCards) res.status(418).send('Error when trying to get black card information', err);
    else {
        let indexArr = getRandomCards(foundCards.length,21);
        indexArr.forEach((indexNum) => {
            blackInfo.push(foundCards[indexNum]);
        })
    }
    res.send(blackInfo);
  });
})

// Get all the white cards information from MongoDB and fetch 30+20*(2*6) = 270 white cards
// 6 cards per person and max turnover is 2 cards per turn
app.get('/getWhiteCardInfo', (req,res) => {
    let whiteInfo = [];
    newcards.find({CardType:'Response'}, (err, foundCards) => {
      if (err || !foundCards) res.status(418).send('Error when trying to get white card information', err);
      else {
          let indexArr = getRandomCards(foundCards.length,270);
          indexArr.forEach((indexNum) => {
            whiteInfo.push(foundCards[indexNum]);
          })
      }
      res.send(whiteInfo);
    });
})

app.use(express.static(__dirname +'./../'));
app.listen(3000); 

module.exports = app;