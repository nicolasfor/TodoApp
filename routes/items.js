const express = require("express");
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const Item = require("../models/Item");


router.get("/loadItems", (req, res) => {

    Item.find({}, (error, items) => {
        if (error) {
            res.sendStatus(500).json({ error })
        }
        else {
            res.json({
                items: items.map(el => {
                    const { title, description, done, id: el_id } = el
                    return { title, description, done, id: el_id };
                })
            })
        }
    });
});

router.post("/addItem", (req, res) => {
    const { title, description } = req.body

    var item = new Item({ title, description, done: false });

    item.save(function (error, itemSaved) {
        if (error) {
            res.send(500).json({ error })
        }
        else {
            const { title, description, _id, done } = itemSaved.toObject();
            res.json({ title, description, id: _id, done })
        }

    });
});

router.post("/switchDone", (req, res) => {
    const { id } = req.body

    Item.findByIdAndUpdate( new ObjectId(id),{done:true},null,(error)=>{
        if(error){
            res.sendStatus(500).json({ error })
        }
        else{
            res.sendStatus(200);
        }

    })
});
router.post("/removeDone", (req, res) => {
    const { id } = req.body

    Item.findByIdAndRemove( new ObjectId(id),null,(error)=>{
        if(error){
            res.sendStatus(500).json({ error })
        }
        else{
            res.sendStatus(200);
        }
    })
});

module.exports = router;