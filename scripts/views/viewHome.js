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
        tempRange: 0,

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

            var counter = 1;

            // loop through the default list of cities
            for (var i = _this.cityQueries.length - 1; i >= 0; i--) {
                var city = new ModelCity({name: _this.cityQueries[i].query});
                
                // set a placeId so that the item can be selected later
                city.set({placeID: 'place_' + i});

                // collect weather data for each city
                city.fetch({
                    success: function() {

                        // When we have the last city
                        if (counter === _this.cityQueries.length) {

                            // Sort the cities into temp order
                            _this.cityCollection.comparator = function(sortedCity) {
                                return -sortedCity.attributes.item.condition.temp;
                            };
                            _this.cityCollection.sort();

                            // render each city view to the page
                            _this.cityCollection.each(function(city) {

                                var viewCity = new ViewCity({model: city});

                                viewCity.render();

                                $('#' + city.get('placeID')).css('height', '40px');

                            });

                            _this.initSlider();
                        }
                        counter++;
                    }
                });

                // // add them to the collection
                _this.cityCollection.add(city);
            }

        },

        initSlider: function() {
            var _this =  this;

            _this.slider = $('.slider'),
            _this.slider.handle = _this.slider.find('.handle'),
            _this.sliderHeight = _this.slider.height();

            // show the slider
            _this.slider.handle.fadeIn('fast');
            
            var $value = _this.slider.find('.value'),
                handle;

            _this.tempRange = _this.highTemp + (-_this.lowTemp),

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

            handle = Draggable.get('.handle');

            // get the temp and y position for the hottest city
            var hottestTemp = parseInt(_this.cityCollection.first().get('item').condition.temp) - _this.lowTemp;
            var hottestTempPosition = _this.tempAsPosition(hottestTemp);

            // Animate the slider when we load the page
            TweenLite.to(_this.slider.handle, 2, {y: hottestTempPosition, onUpdate: function () {
                setTemp(_this.slider.handle);
            }});

            function setTemp($handle) {

                // get the handle position - depending if we are animating or dragging
                var handlePosition = $handle ? $handle[0]._gsTransform.y : handle.y;

                // 
                var temp = ((1-(handlePosition/_this.sliderHeight)) * _this.tempRange) + _this.lowTemp;

                // calculate the temperature within the range specified
                var percentage = 1 - (handlePosition/_this.sliderHeight);

                // calculate colour values
                var lightColour = utils.getColorForPercentage(percentage, true);
                var darkColour = utils.getColorForPercentage(percentage, false);

                // set the background colour with fallbacks
                $('body').css('background-color', darkColour);
                $('body').css('background', 'linear-gradient(to bottom right,' + lightColour + ' 100%, ' + darkColour + ' 10%)');
                $('body').css('background', '-webkit-radial-gradient(80% 70%, farthest-side, ' + lightColour + ',' + darkColour + ')');

                // update the number in the roundel
                $value.text(Math.round(temp));

                // should we show the city or not?
                _this.checkTemp(percentage);
            }
        },

        tempAsPosition: function(temp) {
            var percentage = 1 - (temp/this.tempRange);
            var tempAsPosition = Math.round(percentage * this.slider.height())
            console.log('tempAsPosition', tempAsPosition);
            return tempAsPosition;
        },

        checkTemp: function(percentage) {
            var _this = this,
                temp = parseInt(_this.slider.find('.value').text()),
                inversePercentage = Math.round((1-percentage) *100);

            // check if the city's temperature sits within the range
            var citiesAtTemp = _this.cityCollection.select(function(city) {
                var cityTemp = city.attributes.item.condition.temp;
                return cityTemp < (temp + 3) && cityTemp > (temp - 3);
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
