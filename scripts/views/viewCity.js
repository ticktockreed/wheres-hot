/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/viewCity.html'
], function ($, _, Backbone, Mustache, cityTplt) {
    'use strict';

    var CityView = Backbone.View.extend({

        el: '#content',
        tagName: 'li',

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            var _this = this;

            this.template = Mustache.to_html(cityTplt, this.model.toJSON());

            this.$el.append(this.template, this.model.toJSON());
        }
    });

    return CityView;
});
