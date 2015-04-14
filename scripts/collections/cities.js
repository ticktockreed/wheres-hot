/*global define*/

define([
    'underscore',
    'backbone',
    'modelCity'
], function (_, Backbone, ModelCity) {
    'use strict';

    var CitiesCollection = Backbone.Collection.extend({

        comparator: function(collection) {
            // console.log(collection);
        },

        initialize: function(models, options) {
            var _this = this;
        }
    });

    return CitiesCollection;
});
