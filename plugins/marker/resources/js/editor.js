/*

 js/editor.js

 Copyright 2010 MarkLogic Corporation 

 Licensed under the Apache License, Version 2.0 (the "License"); 
 you may not use this file except in compliance with the License. 
 You may obtain a copy of the License at 

        http://www.apache.org/licenses/LICENSE-2.0 

 Unless required by applicable law or agreed to in writing, software 
 distributed under the License is distributed on an "AS IS" BASIS, 
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 See the License for the specific language governing permissions and 
 limitations under the License. 

*/
// relies on jquery, jquery UI datepicker http://blog.w3visions.com/2009/04/date-time-picker-with-jquery-ui-datepicker/
var MarkerEditor = {
	
	addField: function(container, field, element) {
		var formElementName = field.name;
		var formElementLabel = field.label;
		var helpText = (field.helpText) ? "<span class='marker-field-help'>" + field.helpText + "</span>" : "";
		var label = "<label for='" + formElementName + "'>" + formElementLabel + "</label>";
		container.append(label + element + helpText + MarkerEditor.getEditorFieldSeparator());	
	},
	

	addTextField: function(container, field) {
		var formElementName = field.name;
		var el = "<input type='text' name='" + formElementName + "'/>";
		MarkerEditor.addField(container, field, el);
	},

	addXHTMLField: function(container, field) {
		var formElementName = field.name;
        /* class needed still ? XXX */
		var el = "<textarea  name='" + formElementName + "' class='tinymce'></textarea>";
		MarkerEditor.addField(container, field, el);
	},

	addDateTimeField: function(container, field) {
		var formElementName = field.name;
		
		// brute force in a formatted "now" date
		var now = new Date();
		var dy = now.getFullYear(); // Get full year (as opposed to last two digits only)
		var dm = ((now.getMonth() + 1) < 10) ? ("0" + (now.getMonth() + 1)) : now.getMonth + 1 // Get month and correct it (getMonth() returns 0 to 11)
		var dd = (now.getDate() < 10) ? ("0" + now.getDate()) : now.getDate();
		var mm = (now.getMinutes() < 10) ? ("0" + now.getMinutes()) : now.getMinutes();
		var hh = (now.getHours() < 10) ? ("0" + now.getHours()) : now.getHours();
		var formattedNow = dy + '-' + dm + '-' + dd + ' ' + hh + ":" + mm + ":00";
		
		var el = "<input type='text' name='" + formElementName + "' class='datetime' value='" + formattedNow + "'/>";
		MarkerEditor.addField(container, field, el);
	},

	getEditorFieldSeparator: function() {
		return "<div class='marker-editor-field-separator'></div>";
	},
	
	initializeDateTimeFields: function() {
		$("input.datetime").datetime({
			userLang	: 'en',
			americanMode: true
		});
	},

	setupFields: function(contenType) {
		var container = $("#marker-ctd-editor-fields");
		
		container.html("");
		$.each(contenType.element_type, function(index, field) {
			if(field.type == "string") {
				MarkerEditor.addTextField(container, field);
			}
			else if(field.type == "xhtml") {
				MarkerEditor.addXHTMLField(container, field);
			}
			else if(field.type == "dateTime") {
				MarkerEditor.addDateTimeField(container, field);
			}
					
		});
		
		MarkerEditor.initializeTinymceEditors();
		MarkerEditor.initializeDateTimeFields();
	
	},
	init: function(type) {
		$.get("/api/types/" + type + ".xml", function(data) {
			var json = $.xml2json(data);
			MarkerEditor.setupFields(json);			
		});	
		
	}	

}



