$(function () {
	var outputWrapperRef = $(".output-wrapper"),
		addDeviceOrientationListener = function () {
			$(window).on("deviceorientation", getOrientation);
		},
		getOrientation = function (event) {
			$(window).off("deviceorientation");
			setTimeout(function () {
				return displayResult(event);
			}, 2000);
		},
		displayResult = function (event) {
			event.stopPropagation();
			var event = event.originalEvent,
				text = "Alpha: " + event.alpha + "     " + 
			"Beta: " + event.beta + "     " + 
			"Gamma: " + event.gamma;
			outputWrapperRef.append("<br/><span>" + text + "</span><br/>");
			addDeviceOrientationListener();
		};
	$("#start").on("click", function () {
		if (window.DeviceOrientationEvent) {
			alert("Brace yourselves!");
			addDeviceOrientationListener();
		} else {
			alert("Sorry, you got no luck!");
		}
	});
});