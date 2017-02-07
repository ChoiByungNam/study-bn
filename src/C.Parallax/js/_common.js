/*! _common.js */
(function(win, doc, $, project){
	'use strict';

	project.parallax = {
		def: {
		},
		init: function(obj){
		}
	};

	$(function(){
		project.parallax.init(); // Parallax
	});

	/* project 객체 글로벌 노출 */
	if (!window.project) {
		window.project = project;
	}
}(this, this.document, this.jQuery, window.project || {}));
