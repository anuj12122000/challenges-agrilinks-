const express = require("express");
const mongoose = require("mongoose");
const reportDetailsSchema = require("../Models/Schemas/reportDetailsSchema");
const reportDetailsModel = mongoose.model(
  "reportDetailsModel",
  reportDetailsSchema
);

exports.addReport = async (req, res, next) => {
  try {
    const {
      userID,
      marketID,
      marketName,
      cmdtyID,
      cmdtyName,
      priceUnit,
      convFctr,
      price,
    } = req.body;

    let ID;

    const prevRecord = await reportDetailsModel.findOne({
      cmdtyID: cmdtyID,
      marketID: marketID,
    });
    
    // console.log(prevRecord);
    if (prevRecord) {

        ID = prevRecord["_id"]
        if(!prevRecord.users.includes(userID)){
            prevRecord.users.push(userID);
        }
      
      
      const convPrice = price / convFctr;
      prevRecord.prices.push(convPrice);
      await prevRecord.save();
    } else {
      const newReport = new reportDetailsModel({
        marketID: marketID,
        marketName: marketName,
        cmdtyID: cmdtyID,
        cmdtyName: cmdtyName,
        timestamp: Date.now(),
        priceUnit: "Kg",
      });

      newReport.users.push(userID);
      const convPrice = price / convFctr;
      newReport.prices.push(convPrice);
      ID = newReport["_id"]
      await newReport.save();
    }

    res.status(200).json({ success: true, message: "ban gaye  bhai", ID });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal servor error , check console" });
  }
};


exports.getReport=async(req,res,next)=>{

    
    try{
        const reportId = req.query.reportID;
        const report = await reportDetailsModel.findById(reportId);
        if(!report){
            res.status(400).json({message:"report not found"});
        }

        const prices = report.prices;

        const length = prices.length;
       
        const pricessum = prices.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue;
          }, 0);

        const avg = pricessum/length;

    //     report.price = avg;
   

    //    await report.save();

       const result = {
         "_id": report["_id"],
         "cmdtyName": report.cmdtyName,
         "cmdtyID" : report.cmdtyID,
         "marketID": report.marketID,
         "users":report.users,
         "timestamp":report.timestamp,
         "priceUnit":"Kg",
         "price":avg,

       };
    
        res.status(200).json({result});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"galte dekhle console main bhai"});
    }


};

