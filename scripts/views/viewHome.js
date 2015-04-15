/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'utils',
    'mustache',
    'text!templates/layout.html',
    'modelCity',
    'collectionCities',
    'viewCity'
], function ($, _, Backbone, utils, Mustache, layout, ModelCity, CollectionCities, ViewCity) {
    'use strict';

    var layoutView = Backbone.View.extend({

        el: '#wheresHot',
        cityQueries: [
            {'query' : 'New York US'},
            {'query' : 'Paris FR'},
            {'query' : 'London UK'},
            {'query' : 'Los Angeles US'},
            {'query' : 'Barcelona ES'},
            {'query' : 'Rome IT'},
            {'query' : 'Tokyo JP'},
            {'query' : 'Milan IT'},
            {'query' : 'Berlin DE'},
            {'query' : 'Sydney AU'},
            {'query' : 'Sao Paulo BR'},
            {'query' : 'Shanghai CH'},
        ],
        cityCollection: null,
        slider: null,
        highTemp: 40,
        lowTemp: -10,

        events: {
            'mousedown .handle': 'growHandle',
            'mouseup .handle': 'shrinkHandle',
            'touchstart .handle': 'growHandle',
            'touchend .handle': 'shrinkHandle'
        },

        initialize: function () {
            // this.render;
        },

        growHandle: function(e) {
           TweenLite.to(e.currentTarget, 0.1, {width: '80px', height: '80px', 'font-size': 24, lineHeight: '80px', left: '-40px', top: '-40px'} );
        },

        shrinkHandle: function(e) {
           TweenLite.to(e.currentTarget, 0.35, {width: '50px', height: '50px', 'font-size': 16, lineHeight: '50px', left: '-25px'} );
        },

        render: function () {
            var _this = this;

            _this.template = Mustache.to_html(layout);
            _this.$el.html(_this.template);

            // create a collection for the cities
            _this.cityCollection = new CollectionCities();
            
            _this.initSlider();

            var counter = 1;

            // loop through the default list of cities
            for (var i = _this.cityQueries.length - 1; i >= 0; i--) {
                var city = new ModelCity({name: _this.cityQueries[i].query});
                
                // set a placeId so that the item can be selected later
                city.set({placeID: 'place_' + i});

                // collect weather data for each city
                city.fetch({
                    success: function() {
                        if (counter === _this.cityQueries.length) {
                            _this.cityCollection.each(function(city) {
                                var storedTemp = null;

                                city.currentTemp = city.attributes.item.condition.temp;

                                var tempRange = _this.highTemp + _this.lowTemp,
                                    inversePct = tempRange-city.currentTemp,
                                    cityPosition = (inversePct/tempRange) * 100;

                                if (storedTemp === city.currentTemp) {
                                    cityPosition = cityPosition + 5;
                                }

                                $('#' + city.get('placeID')).css('top', cityPosition + '%');

                                storedTemp = city.currentTemp;
                            });
                        }
                        counter++;
                    }
                });

                // // add them to the collection
                _this.cityCollection.add(city);
            }

            _this.cityCollection.each(function(place, index) {
                var cityView = new ViewCity({model: place});
            });
        },

        initSlider: function() {

            var _this =  this;
            _this.slider = $('.slider');
            
            var sliderHeight = _this.slider.height(),
                highTemp = _this.highTemp,
                lowTemp = _this.lowTemp,
                tempRange =  lowTemp - highTemp, 
                $value = _this.slider.find('.value'),
                draggable;

            // make the slider dragable with a bit of GSAP
            Draggable.create('.handle', {
                type:'y', 
                edgeResistance:0.85, 
                bounds:'.slider', 
                throwProps:true,
                onDragStart: function() {
                    // use GSAPs tick event to listen on RAF 
                    TweenLite.ticker.addEventListener('tick', setTemp);
                },
                onThrowComplete: function() {
                    TweenLite.ticker.removeEventListener('tick', setTemp);
                }
            });

            draggable = Draggable.get('.handle');

            function setTemp() {
                // calculate the temperature within the range specified
                var position = sliderHeight - draggable.y,
                    percentage = position/sliderHeight,
                    temp = -((percentage * tempRange) - lowTemp);

                var lightColour = utils.getColorForPercentage(percentage, true);
                var darkColour = utils.getColorForPercentage(percentage, false);


                $('body').css('background', '-webkit-radial-gradient(80% 70%, farthest-side, ' + lightColour + ',' + darkColour + ')');

                // update the number
                $value.text(Math.round(temp));

                // should we show the city or not?
                _this.checkTemp(percentage);
            }
        },

        checkTemp: function(percentage) {
            var _this = this,
                temp = parseInt(_this.slider.find('.value').text()),
                inversePercentage = Math.round((1-percentage) *100);

            // check if the city's temperature sits within the range
            var citiesAtTemp = _this.cityCollection.select(function(city) {
                var cityTemp = city.attributes.item.condition.temp;
                return cityTemp < (temp + 1) && cityTemp > (temp - 1);
            });

            _this.$el.find('.city').removeClass('show');

            var logTemp = 0;

            // show the views that fit within the range
            for (var i = citiesAtTemp.length - 1; i >= 0; i--) {
                var placeID = '#' + citiesAtTemp[i].attributes.placeID;
                _this.$el.find(placeID).addClass('show');
            }
        },


    });

    return layoutView;
});
