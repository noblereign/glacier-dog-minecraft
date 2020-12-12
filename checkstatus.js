function ping(ip, callback) {
    if (!this.inUse) {
        this.status = 'unchecked';
        this.inUse = true;
        this.callback = callback;
        this.ip = ip;
        var _that = this;
        this.img = new Image();
        this.img.onload = function () {
            _that.inUse = false;
            _that.callback('responded');

        };
        this.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('responded', e);
            }

        };
        this.start = new Date().getTime();
        this.img.src = "http://" + ip;
        this.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('timeout');
            }
        }, 1500);
    }
}
var PingModel = function (servers) {
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
var komodel = new PingModel(['mc.glacier.dog:25565']);
ko.applyBindings(komodel);