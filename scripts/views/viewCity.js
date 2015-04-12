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

        events: {
            'click': 'showForecast'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            var _this = this;

            this.template = Mustache.to_html(cityTplt, this.model.toJSON());

            this.$el.append(this.template, this.model.toJSON());
            $('#content .city').first().addClass('open');
            $('#content .city').first().height(window.innerHeight - 100);
        },

        showForecast: function(ev) {
            $('.city.open').height('100px');
            $('.city.open').removeClass('open');
            $(ev.target).parents('.city').addClass('open');
            $(ev.target).parents('.city').height(window.innerHeight - 100);
        }
    });

    return CityView;
});
