const express = require('express');
const router = express.Router();


router.post('/fooddata', (req, res) => {
    try {
        const fooddata = res.send([global.food_items,global.food_category]);
        console.log(fooddata);

        

    } catch (error) {
        console.error(error.message)
        res.send("server error");




    }


})

module.exports=router;