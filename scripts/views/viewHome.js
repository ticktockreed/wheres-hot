/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/layout.html',
    'modelCity',
    'collectionCities'
], function ($, _, Backbone, Mustache, layout, ModelCity, CollectionCities) {
    'use strict';

    var layoutView = Backbone.View.extend({

        el: '#wheresHot',
        cityQueries: [
            {'query' : 'Guildford GB'},
            {'query' : 'Barcelona ES'},
            {'query' : 'Berlin DE'},
            {'query' : 'Budapest HU'},
            {'query' : 'Madrid ES'},
            {'query' : 'Paris FR'},
            {'query' : 'Rome IT'},
            {'query' : 'London UK'},
            {'query' : 'Vienna AT'}
        ],
        cityCollection: null,
        tempQuery: 18,

        events: {
            'click .slider' : 'checkTemp'
        },


        initialize: function () {
            // this.render;
        },

        render: function () {
            var _this = this;

            _this.template = Mustache.to_html(layout);
            _this.$el.html(_this.template);

            _this.cityCollection = new CollectionCities();

            // loop through our default list of cities
            for (var i = _this.cityQueries.length - 1; i >= 0; i--) {
                var city = new ModelCity({name: _this.cityQueries[i].query});
                city.fetch();
                _this.cityCollection.add(city);
            };
        },

        checkTemp: function() {
            var _this = this;

            var hotterThanThat = _this.cityCollection.select(function(city) {
                return city.attributes.item.condition.temp > 18;
            });

            var logo = $('.slider');
            TweenLite.to(logo, 1, {left:"632px"});

            console.log(hotterThanThat);
        }
    });

    return layoutView;
});
