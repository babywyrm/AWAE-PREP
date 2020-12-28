
fetch('http://atmail/index.php/api/mail/list')
    .then(res => res.json())
    .then(res => {
        res.data.map(user => {
                console.log(mails[0].UID);
                var kill = mails[0].UID + "," + mails[1].UID
                console.log(kill)
	});
    });



////////////////////////////////////////
//    return fetch('http://atmail/index.php/api/mail' + mails); // make a 2nd request and return a promise
//  })
//  .then(function(response) {
//    return response.json();
//  })
//  .catch(function(error) {
//    console.log('Request failed', error)
//   })

// I'm using the result variable to show that you can continue to extend the chain from the returned promise
//result.then(function(r) {
//  console.log(r); // 2nd request result

});
