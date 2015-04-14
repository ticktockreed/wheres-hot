define([
    'jquery'
], function ($) {
    'use strict';

    var utils = {
        // create a colour map of percentages to colour
        lightPercentColors: [
            { pct: 0.0, color: { r: 47, g: 100, b: 117 } }, 
            { pct: 0.2, color: { r: 123, g: 180, b: 200 } }, 
            { pct: 0.5, color: { r: 116, g: 184, b: 90 } },
            { pct: 0.7, color: { r: 204, g: 201, b: 116 } },
            { pct: 1.0, color: { r: 197, g: 89, b: 53 } }
        ],
        darkPercentColors: [
            { pct: 0.0, color: { r: 27, g: 56, b: 99 } }, 
            { pct: 0.2, color: { r: 56, g: 91, b: 102 } }, 
            { pct: 0.5, color: { r: 40, g: 82, b: 24 } },
            { pct: 0.7, color: { r: 143, g: 129, b: 79 } },
            { pct: 1.0, color: { r: 94, g: 44, b: 27 } }
        ],

        /*
        * getColorForPercentage
        * @params {number} pct - percentage as decimal 0.0 - 1.0
        * @params {boolean} lightColours - use light colours 
        */ 
        getColorForPercentage: function(pct, lightColours) {
            var percentColors = this.darkPercentColors;

            if (lightColours) {
                percentColors = this.lightPercentColors;
            }

            for (var i = 1; i < percentColors.length - 1; i++) {
                if (pct < percentColors[i].pct) {
                    break;
                }
            }
            var lower = percentColors[i - 1];
            var upper = percentColors[i];
            var range = upper.pct - lower.pct;
            var rangePct = (pct - lower.pct) / range;
            var pctLower = 1 - rangePct;
            var pctUpper = rangePct;
            var color = {
                r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
                g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
                b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
            };

            return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
            // or output as hex if preferred
        }  
    };

    return utils;
});


