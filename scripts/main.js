/*global require*/
'use strict';

require.config({
    paths: {
        jquery: 'libs/jquery-1.11.2',
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        mustache: 'libs/mustache',
        text: 'libs/text',

        weatherApp: 'weatherApp',

        // Routers
        appRouter: 'routes/appRouter',

        // Collections
        cities: 'collections/cities',

        // // Models
        city: 'models/city',
        flickR: 'models/flickr',

        // // Views
        viewHome: 'views/viewHome',
        viewAbout: 'views/viewAbout',
        cityView: 'views/viewCity',
        flickrView: 'views/flickrView',

    }
});

require([
    'backbone',
    'weatherApp',
    'underscore',
    'mustache'
], function (Backbone, WeatherApp) {

    new WeatherApp({
        el: '#weather_app',
    });

});
