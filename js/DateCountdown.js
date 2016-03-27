function DateCountdown (options) {
	this.element = document.querySelector(options.element);
	this.endDate = options.endDate;

	this.displayRemainingDays();
}

DateCountdown.prototype = {
	constructor: DateCountdown,
	calculateRemainingDays: function () {
		var today = new Date(),
			millisPerDay = 24 * 60 * 60 * 1000;

		return Math.round(Math.abs((today - this.endDate) / millisPerDay));
	},
	displayRemainingDays: function () {
		var days = this.calculateRemainingDays();

		days = document.createTextNode(days)
		this.element.appendChild(days);

		return days;
	}
};
