/*global define*/

define([
    'underscore',
    'backbone',
    'modelCity'
], function (_, Backbone, ModelCity) {
    'use strict';

    var CitiesCollection = Backbone.Collection.extend({

        comparator: function() {
            // return this.get('item').condition.temp;
        },
        initialize: function() {
        }
    });

    return CitiesCollection;
});
