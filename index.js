const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const webpush = require("web-push");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 ");
});
// console.log(webpush.generateVAPIDKeys());

const publicKey =
  "BBoxhsUgSBQ2fco3Zbse3e0pY_g4u2ok9Jn5SxzYeOkq4WCVcNWreakwQZiWAbCrOfrJLAfNvEEwlO7QPCyq-WY";
const privateKey = "4qPawW1SJlfCswr1LyYEd1qfmew5uyVI2c9h0Q5lWwA";

//DB stored values
var sub = {"endpoint":"https://fcm.googleapis.com/fcm/send/fGa1dSzkX9M:APA91bGOn2uyWK9jnY80SceA7CUplNCb5A6hpVvj2p_An8Fee3251SEgmNXRuiIWKzHAQYW5uTT6EpOvL1FQ4boklud9DGmAXbJBqjENFPZbUT12YjF60bWHHyAq7mVdoNb87VoMrBWb","expirationTime":null,"keys":{"p256dh":"BKXlU2H_ocDuq1lRv2GrDh9EYd-yu4D-e_LUp1iBr3q1Pvt_jYY6ReSzV9iS91qRPaNQnU0VAQg_ELMd2d6bYiU","auth":"zrCWxuYvpM4jYAHIVqw6AA"}}

webpush.setVapidDetails('mailto:example@yourdomain.org', publicKey, privateKey);

const payLoad = {
  notification: {
    data: { url: 'https://www.youtube.com/' },
    title: 'PWAs Notification',
    vibrate: [100, 50, 100],
  },
};

// webpush.sendNotification(sub, JSON.stringify(payLoad));
app.get("/",(req,res)=>{
  res.send("hello from backend")
})
app.post("/data", (req, res) => {
  console.log("request recived");
  const userData = req.body;
  console.log(JSON.stringify(userData));
  res.send(userData);
});


app.post("/notification",(req,res)=>{
  // console.log(req.body.keys)
  
  webpush.sendNotification(req.body.keys, JSON.stringify(payLoad));
  console.log("notification sent ", req.body.keys)
  res.send(sub)
  
})