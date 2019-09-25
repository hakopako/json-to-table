function obj2html(obj) {
  if (typeof obj !== 'object'){
    var p = document.createElement('p');
    p.innerText = obj;
    return p;
  }

  if (obj instanceof Array) {
    var table = document.createElement('table');
    obj.forEach(function (element) {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.appendChild(obj2html(element));
      tr.appendChild(td);
      table.appendChild(tr);
    });
    return table;
  }

  if (obj instanceof Object) {
    var iterator = Object.keys(obj);
    var table = document.createElement('table');
    for (var key of iterator) {
      var tr = document.createElement('tr');
      var th = document.createElement('th');
      th.innerText = key;
      tr.appendChild(th);
      var td = document.createElement('td');
      td.appendChild(obj2html(obj[key]));
      tr.appendChild(td);
      table.appendChild(tr);
    }
    return table;
  }
}

function load() {
	var child, data;
	if (document.body && (document.body.childNodes[0] && document.body.childNodes[0].tagName == "PRE" || document.body.children.length == 0)) {
		var child = document.body.children.length ? document.body.childNodes[0] : document.body;
    var data = child.innerText;
    var json = JSON.parse(data);
    var table = obj2html(json);
    content = '<link rel="stylesheet" type="text/css" href="' + chrome.runtime.getURL("style.css") + '">';
    document.body.innerHTML = content;
    document.body.appendChild(table);
	}
}

load();
