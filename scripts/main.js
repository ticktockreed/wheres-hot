/*global require*/
'use strict';

require.config({
    paths: {
        utils: 'utils',
        jquery: 'libs/jquery-1.11.2',
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        mustache: 'libs/mustache',
        text: 'libs/text',
        TweenLite: 'libs/greensock/TweenLite',
        CSSPlugin: 'libs/greensock/plugins/CSSPlugin',
        ColorPropsPlugin: 'libs/greensock/plugins/ColorPropsPlugin',
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
        modelCity: 'models/modelCity', // Get weather information for default cities

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
    'utils',
    'TweenLite',
    'CSSPlugin',
    'ColorPropsPlugin',
    'EasePack',
    'Draggable',
    'ThrowProps',
    'underscore',
    'mustache'
], function (Backbone, WeatherApp, utils) {

    new WeatherApp({
        el: '#wheresHot',
    });

});
