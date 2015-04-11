/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'city',
    'cityView',
    'mustache',
    'text!templates/layout.html'
], function ($, _, Backbone, City, CityView, Mustache, layout) {
    'use strict';

    var layoutView = Backbone.View.extend({
        template: Mustache.to_html(layout),

        el: '#weather_app',
        cities: [
            'Guildford GB',
            'Barcelona ES',
            'Berlin DE',
            'Budapest HU',
            'Madrid ES',
            'Paris FR',
            'Rome IT',
            'London UK',
            'Vienna AT'
        ],

        initialize: function () {
            // this.render;
        },

        getStartingCities: function() {
            for (var i = this.cities.length - 1; i >= 0; i--) {
                var city = new City({name: this.cities[i]});
                var cityView = new CityView({model: city});

                city.fetch({
                    success : function(data, response) {
                        // console.log("Success", data);
                    },
                    error: function(response) {
                        console.log("Error", response);
                    }
                });

            };
        },

        render: function () {
            this.$el.html(this.template);
            this.getStartingCities();
        }
    });

    return layoutView;
});
