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
        slider: null,

        initialize: function () {
            // this.render;
        },

        render: function () {
            var _this = this;

            _this.template = Mustache.to_html(layout);
            _this.$el.html(_this.template);

            // create a collection four the cities
            _this.cityCollection = new CollectionCities();

            _this.initSlider();

            // loop through the default list of cities
            for (var i = _this.cityQueries.length - 1; i >= 0; i--) {
                var city = new ModelCity({name: _this.cityQueries[i].query});

                // collect weather data for each city
                city.fetch();

                // add them to the collection
                _this.cityCollection.add(city);
            };
        },

        initSlider: function() {

            var _this =  this;
            _this.slider = $('.slider');
            
            var sliderHeight = _this.slider.height(),
                highTemp = 55,
                lowTemp = -40,
                tempRange = lowTemp - highTemp, 
                $value = _this.slider.find('.value'),
                draggable;

            // make the slider dragable with a bit of GSAP
            Draggable.create('.handle', {
                type:'y', 
                edgeResistance:0.85, 
                bounds:'.slider', 
                throwProps:true,
                onDragStart: function() {
                    TweenLite.ticker.addEventListener('tick', setTemp);
                },
                //onThrowComplete is used by the ThrowProps tween. We'll stop updating the velocity when the tween is done.
                onThrowComplete: function() {
                    TweenLite.ticker.removeEventListener('tick', setTemp);
                    _this.checkTemp();
                }
            });

            draggable = Draggable.get('.handle');

            function setTemp() {
                // calculate the temperature within the range specified
                var position = sliderHeight - draggable.y;
                var temp = -((position/sliderHeight * tempRange) - lowTemp);

                // update the number
                $value.text(Math.round(temp));
            }
        },

        checkTemp: function() {
            var _this = this,
                temp = parseInt(_this.slider.find('.value').text());


            var hotterThanThat = _this.cityCollection.select(function(city) {
                return city.attributes.item.condition.temp > temp;
            });

            console.log(hotterThanThat);
        }
    });

    return layoutView;
});
