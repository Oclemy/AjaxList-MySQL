/*
 0 	UNSENT 	Client has been created. open() not called yet.
 1 	OPENED 	open() has been called.
 2 	HEADERS_RECEIVED 	send() has been called, and headers and status are available.
 3 	LOADING 	Downloading; responseText holds partial data.
 4 	DONE 	The operation is complete.
 */

var title=document.getElementById("titleID");
var body=document.getElementById("bodyID");
var displaySection=document.getElementById("displaySectionID");
/*
 - HTTP CLIENT CLASS
 - We make HTTP Get and HTTP Post requests here.
 - We use xmlhhtpprequest api.
 - We then programmatically create a list to display our retrieved data.
 */
var HttpClient = function () {
    //INSTANCE VARIABLES
    var requestType = "GET";
    var isAsynchronous = true;

    //GET FUNCTION
    this.get = function (targetURL, onMyDataRetrieved) {
        //AJAX USING XMLHTTPREQUEST
        var xmlhttprequest = new XMLHttpRequest();
        xmlhttprequest.onreadystatechange = function () {
            //IF OPERATION IS COMPLETED
            if (this.readyState == 4){
                //IF HTTP RESPONSE STATUS IS OK:200
                if(this.status == 200) {
                    onMyDataRetrieved(this.responseText);
                }else
                {
                    onMyDataRetrieved("GET Error, the Request has not succeeded")
                }
            }
        };
        //OPEN CONNECTION AND SEND ASYNCHRONOUS REQUEST
        xmlhttprequest.open(requestType, targetURL, isAsynchronous);
        xmlhttprequest.send();
    }

    //POST REQUEST
    this.post = function (targetURL, onMyDataSent) {
        var data = new FormData();
        data.append('action','save');
        data.append('title', title.value);
        data.append('body', body.value);

        //AJAX USING XMLHTTPREQUEST
        var xmlhttprequest = new XMLHttpRequest();
        xmlhttprequest.onreadystatechange = function () {
            //IF OPERATION IS COMPLETED
            if (this.readyState == 4){
                //IF HTTP RESPONSE STATUS IS OK:200
                if(this.status == 200) {
                    onMyDataSent(this.responseText);
                }else
                {
                    onMyDataSent("POST Error, the Request has not succeeded")
                }
            }
        };
        //OPEN CONNECTION AND SEND ASYNCHRONOUS REQUEST
        xmlhttprequest.open('POST', targetURL, isAsynchronous);
        xmlhttprequest.send(data);
    }
}

/*
SEN DATA TO SERVER VIA POST REQUEST
 */
function sendData(targetURL)
{
    var client = new HttpClient();
    client.post(targetURL,function (response) {
        console.log(response);
        var parsedResponse = JSON.parse(response);
        //RESET TEXTBOXES IF SUCCESSFULL
        if(parsedResponse.indexOf("Success")>-1)
        {
            title.value="";
            body.value="";
            getData("RequestHandler.php");
        }
    });
}
/*
 IMPLEMENT OUR HTTP CLIENT GET REQUEST
 */
function getData(targetURL) {
    var client = new HttpClient();
    client.get(targetURL, function (receivedData) {
        //console.log(receivedData);
        var posts = JSON.parse(receivedData);
        displaySection.innerHTML="";
        displaySection.appendChild(createListVew(posts));
    });
}

/*
CREATE LIST TO SHOW OUR DATA
 */
function createListVew(spacecrafts)
{
    var listView=document.createElement('ol');
    listView.className="collection";
    for(var i=0;i<spacecrafts.length;i++)
    {
        var listViewItem=document.createElement('li');
        listViewItem.className="collection-item";
        listViewItem.appendChild(document.createTextNode(spacecrafts[i]));
        listView.appendChild(listViewItem);
    }
    return listView;
}
getData("RequestHandler.php");

//end of file