"use strict";

module.exports = {

    /**
     * Calculates the duration of a track in milliseconds based on a time string
     * (i.e. "01:24" or "-2:32")
     *
     * @param timestring
     * @returns {Number}
     */
    calculateDuration: function (timestring) {
        var i, j, max, pow, timeSegments;
        var seconds = 0;

        if (!timestring) {
            return seconds;
        }

        for (i = 0, max = arguments.length; i < max; i += 1) {

            if (arguments[i].toString()) {
                timeSegments = arguments[i].split(":");

                for (j = timeSegments.length - 1, pow = 0;
                        j >= 0 && j >= (timeSegments.length - 3);
                        j -= 1, pow += 1) {
                    seconds += parseFloat(timeSegments[j].replace("-", "")) *
                            Math.pow(60, pow);
                }
            }
        }

        return seconds * 1000;
    },
    sendMessage: function (name, message) {
        var popovers, i;

        if (typeof chrome != "undefined") {
            chrome.extension.sendMessage({
                name:    name,
                message: message
            });
        } else if (typeof safari != "undefined") {
            popovers = safari.extension.popovers;
            i = popovers.length;

            while (i--) {
                popovers[i].contentWindow.scroblrView.messageHandler({
                    name: name,
                    message: message
                });
            }
        }
    }
};
