/**
 * 	Written for the V8 engine
 */

util.toJson = function(str)
{
	if(util.isString(str))
	{
		var inp = new String(str).replace(/\n|\r|\t/g, '')
		inp = inp
				.replace(/{\s*'/g, '{"')
				.replace(/:\s*'/g, ':"')
				.replace(/'\s*:/g, '":')
				.replace(/'\s*}/g, '"}')
		var json = JSON.parse(inp)
		return json
	}
	return str
}

util.toXml = function(str)
{
   var p = new DOMParser();
   var xml = p.parseFromString(str, "text/xml");
   return xml;
}
/* IE doesn't allow prototype extensions for the 
 * built in Object so we need a crossbrowser workaround.
 * */
function HTMLElement(o)
{
	this.node = o
	return this
}
/*
 * Could not use JQuery name (html) because 
 * of conflicts with IE
 * */
HTMLElement.prototype.setHtml = function(html)
{
	if(!util.isUndef(this.node) && !String(this.node.tagName).match(/TITLE/i))
	{
		this.node.innerHTML = html
	}
}

HTMLElement.prototype.appendChild = function(o)
{
	if(this.node)
		this.node.appendChild(o)
}

HTMLElement.prototype.removeChild = function(o)
{
	if(this.node)
		this.node.removeChild(o)
}

HTMLElement.prototype.addListener = function(evnt, l)
{
if(this.node && util.isFunction(this.node.addListener))
	this.node.addListener(evnt, l)
// Weird FF workaround:
else if(util.isFunction(this.addEventListener))
	this.addEventListener(evnt, l, false)
else
	this.node.attachEvent("on"+evnt, l)
}

HTMLElement.prototype.val = function(v)
{
	if(!util.isUndef(v))	
		this.node.value = v
	if(this.node)	
		return this.node.value
}

HTMLElement.prototype.style = function(style)
{
	if(util.isString(style) && this.node)
		this.node.setAttribute('style', style)
	if(this.node)	
		return this.node.style
}

HTMLElement.prototype.setAttribute = function(attr, str)
{
	if(this.node)
		this.node.setAttribute(attr, str)
}

HTMLElement.prototype.focus = function()
{
	if(this.node)
		this.node.focus()
}

HTMLElement.prototype.reset = function()
{
	if(this.node)
		this.node.reset()
}

HTMLElement.prototype.addClassName = function(className)
{
	var na = []
	var str = ''
	var _names = this.node.getAttribute('class')
	if(_names)
	{
		na = _names.split(' ')
	}
	na.forEach(function(name)
	{
		str += '.' + name 
	})
	if(!String(str).match(RegExp('.' + className)))
	{
		var class_ = na.join(' ') + ' ' + className
		this.node.setAttribute('class', class_)
	}
}

util.createElement = function(type)
{
	return new HTMLElement(document.createElement(type))
}
/* 
Object.prototype.setHtml = function(html)
{
	if(!String(this.tagName).match(/TITLE/i))
		this.innerHTML = html
	else
		this.nodeValue = html
}

Object.prototype.val = function(value)
{
	this.value = value
}
*/
// TESTS
//alert(util.toXml("<tag>&amp;</tag>").getElementsByTagName('tag')[0].childNodes[0].nodeValue)

//alert(util.toJson("{'name':'pieter's'}").name)
//alert(util.toJson("[{'name':'pieter\'s'},{'name':'lo  \\\\  pi'},{'name':'Kilo zei:\\\"Hoera!\\\"'}]")[2].name)