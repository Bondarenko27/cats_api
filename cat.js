const express = require('express')
const app = express()
const port = process.env.PORT||3000;
const mysql = require('mysql');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cats = [
{id:1, name:'miu',size:'80cm', weight:'12kg'},
{id:2, name:'tom',size:'100cm', weight:'15kg'},
{id:3, name:'coco',size:'90cm', weight:'18kg'},
]
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:'',
    database: "catapi"
});

app.get('/', (req, res) => {
  res.send(cats)
});
    
app.post('/newcat', (req, res) => {

    var is_success = false;

    //get data
    var catName = (req.body.name);
    var catSize = (req.body.catSize);
    var catWeight = (req.body.catWeight);
    var MaxSize = 120;
    var MaxWeight = 20;
    console.log(catName,catSize,catWeight);
    //validation before insertion of data

    if(catName != NaN && catName == ''){
        res.send('are you shure it is a cat name?');
    }
    
    else if(catSize, catWeight == null && catSize, catWeight ==''){
        res.send('oops, its empty')
    }
    else if(catSize > MaxSize){
        res.send('it is veryyyy biiiig caaat');
    }
    else if(catWeight > MaxWeight){
        res.send('your cat is tooooo fat?')
    }
    //insert db
    else {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
       var sql = "INSERT INTO cats (catName, catSize, catWeight) VALUES ('" + catName + "', '" + catSize + "', '" + catWeight + "');";
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.send("1 record inserted");
        
            });
        });

    }

});
    



app.post('/deletecat',(req, res) => {

    const id = req.body.id;
    if(id != null && id != '') {

     //here put logic to delete from database and return success if true
     var sql = "DELETE FROM cats WHERE catID = '" + id + "'";
     //end verification
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            con.query(sql, function (err, result) {
            if (err) throw err;

            console.log('result: ' + result + ', deleted id:' + id);
            res.send('deleted' + id );
            
             });
        });
    }
    else{
        res.send('something went wrong');
        }
    }); 


   // res.send('result is_deleted: ' + is_deleted);
 


app.get('/listcats', (req, res) => {
    //put logic here to show cats
        con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM cats";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log('here is our list of cats:',result);
            res.send(result);
        });
        
    });

});
    



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
