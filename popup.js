chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	var tab = tabs[0];
	var protocol = tab.url.split('//')[0];
	var baseUrl = tab.url.split('//')[1].split('/')[0];
	var robotsTxtUrl = baseUrl + '/robots.txt';
	document.getElementById('url').innerHTML = baseUrl;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var robotsTxt = xhr.responseText;
			var re = /^(.*):\s+(\/.*)$/gm; 
			var subst = '<a target="__blank" href="' + protocol + '//' + baseUrl + '$2" class="$1">$1: $2</a>'; 
			var result = robotsTxt.replace(re, subst);
			if(result == "") {
				result = "Robots.txt empty...";
			}
			document.getElementById('robots').innerHTML = result;
		} else {
			document.getElementById('robots').innerHTML = 'Sorry, no robots.txt found at<br/>' + protocol + '//' + robotsTxtUrl + '';
			if(protocol == 'chrome:') {
				document.getElementById('robots').innerHTML = 'You have to try it on a real site...';
			}
		}
	}
	xhr.open("GET", protocol + '//' + robotsTxtUrl, true);
	xhr.send();
});