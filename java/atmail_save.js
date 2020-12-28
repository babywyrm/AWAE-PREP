//send_email();


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

        var mails = JSON.parse(xhr.responseText);
	//var mails = document.getElementsByClassName('mail_row');

        console.log(mails[0].UID);
        var kill = mails[0].UID + "," + mails[1].UID
        console.log(kill)

}
xhr.open('GET', 'http://atmail/index.php/api/mail/list', true);
xhr.send(null);






