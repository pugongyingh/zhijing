if (typeof Readchar == "undefined" || !Readchar) {
	var Readchar = {};
};
Readchar.Browser = (function() {
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s; (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	return Sys;
})();
Readchar.Common = {
	extend: function(oTarget, oSource) {
		for (var p in oSource) {
			if (oSource.hasOwnProperty(p)) {
				oTarget[p] = oSource[p]
			}
		}
		return oTarget;
	}
}
Readchar.DOM = {
	findElements: function(Selector) {
		if (/^#\w+/i.test(Selector)) {
			var element = document.getElementById(Selector.substr(1));
			return element == null ? null: element;
		}
		 else if (/^\.\w+/i.test(Selector)) {
			var elements = document.getElementsByClassName(Selector.substr(1));
			return elements.length == 0 ? null: elements;
		}
		 else {
			var elements = document.getElementsByTagName(Selector);
			return elements.length == 0 ? null: elements;
		}
	},
	delectElements: function(elements) {
		var size = elements.length ? elements.length: null;
		if (size) {
			for (var i = 0; i < size; i++) {
				elements[0].parentNode.removeChild(elements[0]);
			}
		} else {
			elements.parentNode.removeChild(elements);
		}
	},
	addElements: function(parentElement, element, index) {
		if (index != null) {
			parentElement.insertBefore(element, parentElement.childNodes[index]);
		} else {
			parentElement.appendChild(element);
		}
	},
	createElements: function(tagName) {
		var elements = document.createElement(tagName);
		return elements ? elements: null;
	},
	replaceElement: function(oldElements, newElement) {
		try {
			if (oldElements.length) {
				for (var i = 0; i < oldElements.length; i++) {
					oldElements[i].parentNode.replaceChild(newElement, oldElements[i]);
				}
			} else {
				var parenetElement = oldElements.parentNode;
				parenetElement.replaceChild(newElement, oldElements);
			}
		} catch(e) {}
	}
}
var $Readchar = Readchar.DOM.findElements,
_$Readchar = Readchar.DOM.delectElements;
Readchar.Style = {
	getCurrentStyle: function(oEml, sOpation) {
		return oEml.currentStyle ? oEml.currentStyle[sOpation] : getComputedStyle(oEml, null)[sOpation];
	},
	getFullPageSize: function() {
		var fullPageSize = {};
		fullPageSize.width = window.innerWidth,
		fullPageSize.height = window.innerHeight;
		if (typeof pageWidth != "number") {
			if (document.compatMode == "CSS1Compat") {
				pageWidth = document.documentElement.clientWidth;
				pageHeight = document.documentElement.clientHeight;
			} else {
				pageWidth = document.body.clientWidth;
				pageHeight = document.body.clientHeight;
			}
		}
		return fullPageSize;
	}
}
Readchar.Event = {
	addEvent: function(oElm, sEventType, fnHandler) {
		if (oElm.addEventListener) {
			oElm.addEventListener(sEventType, fnHandler, false);
		} else if (oElm.attachEvent) {
			oElm.attachEvent("on" + sEventType, fnHandler);
		} else {
			oElm["on" + sEventType] = fnHandler;
		}
	},
	getEvent: function() {
		if (document.all) return window.event;
		func = Readchar.Event.getEvent.caller;
		while (func != null) {
			var arg0 = func.arguments[0];
			if (arg0)
			 {
				if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation))
				 {
					return arg0;
				}
			}
			func = func.caller;
		}
		return null;
	},
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	removeEvent: function(oElm, sEventType, fnHandler) {
		if (oElm.removeEventListener) {
			oElm.removeEventListener(sEventType, fnHandler, false);
		} else if (oElm.detachEvent) {
			oElm.detachEvent("on" + sEventType, fnHandler);
		} else {
			oElm["on" + sEventType] = null;
		}
	},
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},
	stopDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	getWheelDelta: function(event) {
		if (event.wheelDelta) {
			return (Readchar.Browser.opera < 9.5 ? -event.wheelDelta: event.wheelDelta)
		} else {
			return - event.detail * 40;
		}
	},
	getTouchStart: function(event) {
		this.stopDefault(event);
		if (!event.touches.length) return;
		return event.touches[0];
	},
	getTouchMove: function(event) {
		this.stopDefault(event);
		if (!event.touches.length) return;
		return event.touches[0];
	},
	buildWheel: function(fnHandler) {
		this.addEvent(document, "mousewheel", fnHandler);
		this.addEvent(document, "DOMMouseScroll", fnHandler);
	},
	unBuildWheel: function(fnHandler) {
		this.removeEvent(document, "mousewheel", fnHandler);
		this.removeEvent(document, "DOMMouseScroll", fnHandler);
	},
	drag: function(oElm, sDir) {
		if (!oElm) {
			return false;
		}
		oElm.style.position = "absolute";
		this.addEvent(oElm, "mouseover",
		function() {
			oElm.style.cursor = "move";
		});
		this.addEvent(oElm, "mouseout",
		function() {
			oElm.style.cursor = "default";
		})
		 this.addEvent(oElm, "mousemove",
		function() {})
	}
};
Readchar.Check = Rc = {
	checkEmail: function(sString) {
		var email = /^\w+([\.-]\w+)*@\w+([\.-]\w+)*\.\w{2,4}$/;
		return this.fn(sString, email);
	},
	checkUserName: function(sString) {
		var userName = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
		return this.fn(sString, userName);
	},
	checkPassWord: function(sString) {
		var passWord = /^([a-zA-Z0-9]|[_]){6,16}$/;
		return this.fn(sString, passWord);
	},
	checkChcode: function(sString) {
		var chCode = /^([0-9]){6}$/;
		return this.fn(sString, chCode);
	},
	checkEmCode: function(sString) {
		var chCode = /^([a-zA-Z0-9]){6}$/;
		return this.fn(sString, chCode);
	},
	checkMobilePhone: function(sString) {
		var mobileNumbe = /^((\+86)|(86))?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/;
		return this.fn(sString, mobileNumbe);
	},
	checkChineseName: function(sString) {
		var userName = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z]){1,10}$/;
		return this.fn(sString, userName);
	},
	checkAddress: function(sString) {
		var address = /^\S{1,80}$/;
		return this.fn(sString, address);
	}
};
function fn(sString, sCheck) {
	sString = sString.replace(/\s+/g, "")
	 if (sCheck.test(sString)) {
		return true;
	} else {
		return false;
	}
}