/**!
 * downCount: Simple Countdown clock with offset
 * License: MIT
 * Author: Owen Kieffer-Jones <okj@imos.net> based on work by
 *         Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {
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

        // basic constants
        var units = [               // Milliseconds per...
            1000 * 60 * 60 * 24,    //     ...day
            1000 * 60 * 60,         //     ...hour
            1000 * 60,              //     ...minute
            1000                    //     ...second
        ];

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

            // if difference is negative than it's past the target date
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
                    );
                numberFields.eq(unitIndex).text(numUnits > 9 ? numUnits : '0' + numUnits);
                labelFields.eq(unitIndex).text(lang[ unitIndex*2 + (numUnits !== 1)]);
            });
        }

        // start
        var interval = setInterval(countdown, 1000);
        countdown();
    };
    $.fn.downCount.defaults = {
        lang: 'en'
    };
    $.fn.downCount.lang = {
        en: 'day0days0hour0hours0minute0minutes0second0seconds',
        de: 'Tag0Tage0Stunde0Stunden0Minute0Minuten0Sekunde0Sekunden'
    };
})(jQuery);
