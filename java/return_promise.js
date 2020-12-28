//
//
//function wipe_email()
////////////////////////////////////////
//
var url = 'http://atmail/index.php/api/mail/list';

var result = fetch(url, {
    method: 'get',
  }).then(function(response) {
    return response.json(); // pass the data as promise to next then block
  }).then(function(data) {                

//    var mails = JSON.parse(result.responseText);
//    var mails = data.UID;
//    console.log(mails, '\n');
 
    console.log(data[0].UID);
//  var kill = data[0].UID + "," + data[1].UID
    var toast = data[0].UID
    console.log(toast)

    return fetch('http://atmail/index.php/mail/mail/movetofolder/fromFolder/INBOX/toFolder/INBOX.Trash?resultContext=messageList&mailId%5B%5D=' + toast); // make a 2nd request and return a promise
  })
  .then(function(response) {
    return response.json();
  })
  .catch(function(error) {
    console.log('Request failed', error)
  })

// I'm using the result variable to show that you can continue to extend the chain from the returned promise
result.then(function(r) {
  console.log(r); // 2nd request result
});
