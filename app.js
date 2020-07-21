const express 		= require('express'),
      app 			= express();
      
      
      
var url = process.env.DATABASEURL;

app.use(express.urlencoded({
    extended: true
  }));

app.use(express.static(__dirname + "/public"));
app.set("view engine", "html");


app.get("/", (req, res) => {
    res.render("./Homepage/Homepage");
});

app.listen(process.env.PORT || 3000, process.env.IP, () =>{
	console.log("Award System Server Started!");
});