
	Obtain a copy of the source [here](http://github.com/pieterhoekstra/util.js/)

	Copyright (C) 2012 by pieter@nr8.nl

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	
	
	
	Introduction:

	Because app interfaces are written for specific HTML5 browsers I felt the 
	need to write a lightweight js lib with page elements rather than pages. The 
	names have been taken from JQuery for desktops and if you dive into the 
	structure you can think of util.js in a Dojo-like manner. It's a bit of 
	modular and is made primarily for abstracting app natural language specific 
	data structures, in short: for displaying text. 


	Util.js was tested on :

	- Android 2.2, 2.3.4 native browser
	- Chrome 15
	- Opera 11.60
	- Opera Mini Simulator 4.2
	- Opera Mobile Emulator 11.5
	- Firefox 8 
	- Safari 5
	- IE9


	Goals of util.js:
	
	simple, easy to learn, lightweight, lean & mean, powerfull 
	in an object oriented way, specially made for apps, multiple 
	languages & formats, string formatting, number & currency formatting 
	
	Util proper is the two files validations.js and util.js :
	
==CODE============================================================================	
	<script type='text/javascript' src='pathToUtil/validations.js'></script>
	<script type='text/javascript' src='pathToUtil/util.js'></script>
==END=============================================================================	
	
	You can also use the full version by using the loader:
	
==CODE============================================================================	
	<script type="text/javascript">
	var utilConfig = {
		defLocale: 'en',
		locales: ['it', 'nl']
	}
	</script>
	<script type='text/javascript' src='pathToUtil/loader.js'></script>
==END=============================================================================		

	String formatting (util proper):
	
	1) Capitalizes first non-tag string character of string or dot terminated phrases
	2) Adds space after dot in a phrase
	3) Removes double space
	4) Removes space before dot
	5) Leaves abbreviations as they are
	6) Truncates to number of characters and tries to round up on space
	7) Adds an optional string or ' ...' (to the last open fitting tag) when the string 
	   has been truncated


	HTML5 datePicker:
	
	If you add the datepicker module to the loader, it will add datePicker behaviour
	to any html input tag with the attribute 'type' set to 'date'. The module is dependent
	on the date module and, to a lesser extend, on the current util.locale.
	

	A note on IE9 compatible CSS selectors
	
	Because IE9 WILL support all CSS selectors a way  to overcome this problem is to 
	write compatible selectors like:
	
	ul > li:nth-child(2)  (IE will fail)
	ul > li:first-child + li (the same intention, but success with IE)
	

	Examples:

	i. builtin elements
	
==CODE===========================================================================
	// Push 'home' breadcrumb
	// 'home' is a langId, eg. util.lang.home and util._lang['en'].home
	util.crumbs.push(new util.crumb('home', clientResume))
	// Assign selector
	util.crumbs.setSel('#crumbs')

	var langs = [{iso_code:'en', label:'english'},
	             {iso_code:'nl', label:'nederlands'},
	             {iso_code:'it', label:'italiano'}]
	util.langbar.setLanguages(langs)
	
	// Assign selector
	util.langbar.display('#langSelector')
	
	// Get locale on Android	
	util.curLang = navigator.util.getLocale();
	util.langbar.selectLang(util.curLang)
	
	// Set what needs to be done when user selects language form langbar
	util.langbar.setOnUpdate(function()
	{
		clientResume()
	})
==END============================================================================


	ii. util.js dev
	
==CODE============================================================================	

	util.ready(function() // If using the loader
	{
		util.debug.setGetAppState(function()
		{
			return 'state=' + state + ', abo=' + abo;
		})
		util.debug.setMsgContainerSel('.info')
	
		var msg = 'fits in as many words as possible when first word in string is shorter then limit'
			.toLimitedFormattedHTML(23)
			
		// msg now eq: 'Fits in as many words ...'
	})
	
	// strip all dots and space:
		util.trim('1000 AA', true)
		
	// format numbers to type and locale
		var res = 'average of &%'.format([1.5], 'precision:1', '&')

	// handle input			
		util.trim(null).isEmpty() // false
		
		util.isObject(null) // false

	// no parser, just the ones builtin (json and xml)
		util.toJson("[
			{'name':'pieter\'s'},
			{'name':'lo  \\\\  pi'},
			{'name':'Kilo zei:\\\"Hoera!\\\"'}]")[2].name		
	
	// with a struct:	
		var msg = new util.struct([String], {msg1:'total %', msg2:'Bye '})
		var d = msg.format.apply(msg.data.msg1, [[1.5], 'float:2'])
		var m = msg.toLimitedFormattedText.apply(d, [15])


	// example enum:
		util.unum('1000', '1002').forEach(function(pnumber)
		{
			util.unum(pnumber + 'AZ', pnumber + 'BB', 
			{
				regexp:RegExp(/\d{4}[A-Z]{2}/),
				onunumNext:function(pcode)
				{
					alert(pcode)
				}
			})
		})	


	// example options:
	option = ['optionFoo', 'optionBar', 'optionBaz'].unum()
                    
	config = new util.struct([util.options], {value:0})

	config.set([option.optionFoo, !option.optionBar])

	config.get() & option.optionFoo // True
	


	// example cardgame setup
	var deck = []
	var set = {A:'spade',B:'coppe', C:'denari', D:'bastoni'}
	
	function card()
	{	
		return this
	}
	card.prototype.display = function()
	{
		alert(set[this.data.kind].toString().toFirstCharUppercase() + " " + this.data.name)
	}

	util.unum('A', 'D')
	 .forEach(
		function(kind)
		{
			util.unum('AA', 'AD')
			 .concat(util.unum(2, 10))
				.forEach(
					function(n)
					{
						var c = util.mixin(card, {kind:kind, name:n, value:n})
						deck.push(c)
						c.display()
					}
				)		
		}
	)
	
			
==END=============================================================================