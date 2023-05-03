const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { STATUS_CODES } = require("http");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/", function(req, res){
    const first = req.body.top;
    const last = req.body.middle;
    const email = req.body.bottom;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first,
                    LNAME: last,
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    
    const url = "https://us4.api.mailchimp.com/3.0/lists/76b9dd8045"
    const options = {
        method: "POST",
        auth: "codedvictor:4135adf7d117312742b718135fd39114-us4",
    }
    const request = https.request(url, options, function(response){
        
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        // response.on("data", function(data){
        //     console.log(JSON.parse(data));
        // })
    })  
    request.write(jsonData);
    request.end();
});
app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})


// const mailchimp = require("@mailchimp/mailchimp_marketing");

// mailchimp.setConfig({
//     apiKey: "4135adf7d117312742b718135fd39114-us4",
//     server: "https://us4.admin.mailchimp.com/",
// });

// async function run() {
//     const response = await mailchimp.ping.get();
//     console.log(response);
//   }
  
//   run();
// API TOken: 4135adf7d117312742b718135fd39114-us4
//list id: 76b9dd8045