/*global require*/
'use strict';

require.config({
    paths: {
        jquery: 'libs/jquery-1.11.2',
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        mustache: 'libs/mustache',
        text: 'libs/text',
        TweenLite: 'libs/greensock/TweenLite',
        CSSPlugin: 'libs/greensock/plugins/CSSPlugin',
        EasePack: 'libs/greensock/easing/EasePack',
        Draggable: 'libs/greensock/utils/Draggable',
        ThrowProps: 'libs/greensock/plugins/ThrowPropsPlugin',

        shim: {
            TweenLite: {
                exports: 'TweenLite'
            }
        },

        // Initial View
        weatherApp: 'weatherApp', //  Initialises router

        // Routers
        appRouter: 'routes/appRouter', // Set pages (About | Home)

        // // Models
        modelCity: 'models/city', // Get weather information for default cities

        // Collections
        collectionCities: 'collections/cities', // Store all cities as collection 

        // Views
        viewHome: 'views/viewHome',
        viewAbout: 'views/viewAbout',
        viewCity: 'views/viewCity',

    }
});

require([
    'backbone',
    'weatherApp',
    'TweenLite',
    'CSSPlugin',
    'EasePack',
    'Draggable',
    'ThrowProps',
    'underscore',
    'mustache'
], function (Backbone, WeatherApp) {

    new WeatherApp({
        el: '#wheresHot',
    });

});
