/**!
 * downCount: Simple Countdown clock with offset
 * License: MIT
 * Author: Owen Kieffer-Jones <okj@imos.net> based on work by
 *         Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {
    // basic constants
    var units = [           // Milliseconds per...
        24 * 60 * 60 * 60,  //     ...day
        1000 * 60 * 60,     //     ...hour
        1000 * 60,          //     ...minute
        1000                //     ...second
    ];
    $.fn.downCount = function (settings, callback) {
        settings = $.extend({},$.fn.downCount.defaults, settings);

        // Throw error if date is not set
        if (!settings.date) {
            $.error('Date is not defined.');
        } else if (!settings.date.getDate) {
            try {
                settings.date = new Date(settings.date);
            } catch (e) {
                $.error('Invalid date');
            }
        }
        if (!(settings.lang in $.fn.downCount.lang)) {
            $.error('Unsupported language')
        }

        var lang = $.fn.downCount.lang[settings.lang].split(0);

        // Save container
        var container = this;

        if (container.is(':empty')) {
            $.each(units, function(){
                container.append('<li><span></span><p></p></li>');
            });
        }

        var numberFields = container.find('span'),
            labelFields = container.find('p');

        /**
         * Main downCount function that calculates everything
         */
        function countdown () {
            var difference = settings.date - new Date; // difference of dates

            // if difference is negative than it's pass the target date
            if (difference < 0) {
                // stop timer
                clearInterval(interval);

                if (callback && typeof callback === 'function') {
                    callback.call(container);
                }

                return;
            }

            $.each(units, function(unitIndex){
                var numUnits = Math.floor(
                    difference
                        % (units[unitIndex-1] || Infinity)
                        / units[unitIndex]
                    ),
                    numText = numUnits > 9 ? numUnits : '0' + numUnits,
                    labelText = lang[ unitIndex*2 + (numUnits !== 1)];
                numberFields.eq(unitIndex).text(numText);
                labelFields.eq(unitIndex).text(labelText);
            });
        }

        // start
        var interval = setInterval(countdown, 1000);
        countdown();
    };
    $.fn.downCount.defaults = {
        date: null,
        lang: 'en'
    };
    $.fn.downCount.lang = {
        en: 'day0days0hour0hours0minute0minutes0second0seconds',
        de: 'Tag0Tage0Stunde0Stunden0Minute0Minuten0Sekunde0Sekunden'
    };
})(jQuery);
