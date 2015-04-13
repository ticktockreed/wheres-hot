define([
    'jquery'
], function ($) {
    'use strict';

// A2DBF2
// FFABA8
// FF413B


    var utils = {
        percentColors: [
            { pct: 0.0, color: { r: 0, g: 0x00, b: 0xff } }, 
            { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
            { pct: 1.0, color: { r: 0xff, g: 0x00, b: 0 } }
        ],

        getColorForPercentage: function(pct) {
            for (var i = 1; i < this.percentColors.length - 1; i++) {
                if (pct < this.percentColors[i].pct) {
                    break;
                }
            }
            var lower = this.percentColors[i - 1];
            var upper = this.percentColors[i];
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


