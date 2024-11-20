const express = require('express');
const bodyParser = require('body-parser');
const path=require('path')
const LogInCollection=require('./mongo')
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }))

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,"login.html"))
})
app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,"signup.html"))
})
app.post('/signup', async (req, res) => {
    const {  username,
        password,
        usertype } = req.body;
  
    const data = {
      username,
      password,
      usertype
    };
  
    try {
      const checking = await LogInCollection.findOne({ username });
      if (checking) {
        res.status(400).send("User details already exist");
        return;
      }
      const newUser = new LogInCollection(data);
      await newUser.save();
      res.redirect("http://127.0.0.1:5501/bloodislife-master/bloodislife-master/index.html#!/");
      // res.redirect("/");

    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    }
  });
  
 
  app.post('/login', async (req, res) => {
    try {
      const check = await LogInCollection.findOne({ username: req.body.username });
      if (!check || check.password !== req.body.password) {
        res.status(401).send("Invalid email or password");
        return;
      }
    
      res.redirect("http://127.0.0.1:5501/bloodislife-master/bloodislife-master/index.html#!/");
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    }
  });

  app.listen(800);