var connection = require('../config');
var express = require("express");
var router = express.Router();


// router.post('/request', function (req, res) {
   
//          let sql = "INSERT INTO notification SET ?";
//         let notification = {
//               user_id: 5,
//               title: "Notification",
//               description: "Request for new leave",
//           };
    

//     connection.query(sql, notification, function (error, results, fields) {
//         if (error) {
//             res.json({
//                 status: false,
//                 message: 'there are some error with query'
//             })
//             console.log(error);
//         }
        
//     });
// });



router.get("/:uid", function(req, res) {
  let sql = `SELECT count(id) as count FROM notification where status='1';
   SELECT id,title,description FROM notification where status='1' AND uid='${req.params.uid}' ORDER BY id DESC`;
  let query = connection.query(sql, (error, result) => {
    if (error) {
      res.json({
               status: false,
               message: 'there are some error with query'
                })
      console.log(error);
    }

    res.json({ result });
  });
});

router.get("/get/:id", (req, res) => {
  let sqlstatus = `UPDATE notification SET status='1' WHERE id='${req.params.id}'`;
  querystatus = connection.query(sqlstatus, (err, result) => {
    if (err) {
      
      console.log(err);
    }else{
      res.send({message:"status updated"});
    }
    res.redirect("/");
  });
});

module.exports = router;
