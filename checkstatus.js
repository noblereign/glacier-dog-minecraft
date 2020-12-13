
/* var PingModel = function (servers) {
    var self = this;
    var myServers = [];
    ko.utils.arrayForEach(servers, function (location) {
        myServers.push({
            name: location,
            status: ko.observable('unchecked')
        });
    });
    self.servers = ko.observableArray(myServers);
    ko.utils.arrayForEach(self.servers(), function (s) {
        new ping(s.name, function (status, e) {
			const suff = document.getElementById("suffix");
			suff.innerHTML = 'The server is currently <span id="response">...</span>';
			if (status === "responded") {
				const response = document.getElementById("response");
				const joinMessage = document.getElementById("joinmessage");
				response.innerHTML = "UP";
				response.setAttribute('style', "color: #5af754; text-shadow: 0 0 5px #5af754;");
				joinMessage.setAttribute('style', "");
			}
			else {
				const response = document.getElementById("response");
				response.innerHTML = "DOWN";
				response.setAttribute('style', "color: #f24646; text-shadow: 0 0 5px #f24646;");
			}
        });
    });
};
var komodel = new PingModel(['minecraft.glacier.dog:25565']); */

var xmlhttp = new XMLHttpRequest();
var url = "https://api.mcsrvstat.us/2/minecraft.glacier.dog:25565";

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    myFunction(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(server) {
	const suff = document.getElementById("suffix");
	suff.innerHTML = 'The server is currently <span id="response">...</span>';
	if (server.online) {
		const response = document.getElementById("response");
		const joinMessage = document.getElementById("joinmessage");
		const count = document.getElementById("count");
		const motd = document.getElementById("motd");
		const version = document.getElementById("version");
		response.innerHTML = "UP";
		response.setAttribute('style', "color: #5af754; text-shadow: 0 0 5px #5af754;");
		count.innerHTML = server.players.online + '/<span id="max">' + server.players.max + '</span> online';
		motd.innerHTML = '“' + server.motd.html + '”';
		version.innerHTML = 'running on version ' + server.version
		count.setAttribute('style', "");	
		motd.setAttribute('style', "");	
		version.setAttribute('style', "");	
		joinMessage.setAttribute('style', "");	
	}
	else {
		const response = document.getElementById("response");
		response.innerHTML = "DOWN";
		response.setAttribute('style', "color: #f24646; text-shadow: 0 0 5px #f24646;");
	}
}