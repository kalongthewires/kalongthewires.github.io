'use strict';

function DateCountdown (options) {
	this.element = document.querySelector(options.element);
	this.endDate = options.endDate;
}

DateCountdown.prototype = {
	constructor: DateCountdown,
	init: function () {
		var days = this.calculateRemainingDays();

		this.displayRemainingDays(days);
	},
	calculateRemainingDays: function () {
		var today = new Date(),
			millisPerDay = 24 * 60 * 60 * 1000;

		return Math.round(Math.abs((today - this.endDate) / millisPerDay));
	},
	displayRemainingDays: function (days) {
		days = document.createTextNode(days);
		this.element.appendChild(days);
	}
};
