var mongoose = require('mongoose');
var notifi = require('./models/notificationSchema');

function sendMail()
{
  var email,Recommendation;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd='0'+dd
  } 
  if(mm<10) {
    mm='0'+mm
  } 
  today = dd+'/'+mm+'/'+yyyy;

  notifi.find({}, function(err, docs){
    for(var i=0; i<docs.length; i++)
    {
      email = docs[i].email;
      Recommendation = docs[i].Recommendation;
      var tempDate = new Date(docs[i].dateNoti);
      dd = tempDate.getDate();
      mm = tempDate.getMonth()+1; //January is 0!
      yyyy = tempDate.getFullYear();
      if(dd<10) {
        dd='0'+dd
      } 
      if(mm<10) {
        mm='0'+mm
      } 
      tempDate = dd+'/'+mm+'/'+yyyy;
    
      if(today === tempDate)
      {
          console.log("sending email");
          sendmail({
              from: 'mymedicalpro@gmail.com',
              to: email,
              subject: 'Notification from my medical',
              html: Recommendation,
            }, function(err, reply) {
              console.log(err && err.stack);
              console.dir(reply);
          });
      }
    }
  });
}

sendMail();