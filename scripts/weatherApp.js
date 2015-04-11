/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'appRouter',
    'mustache',
    'text!templates/layout.html'
], function ($, _, Backbone, AppRouter, Mustache, layout) {
    'use strict';

    var weatherApp = Backbone.View.extend({
        template: Mustache.to_html(layout),

        initialize: function () {
            this.render();
            
            console.log('Weather APP template');
            var appRouter = new AppRouter();
            Backbone.history.start();
        },

        render: function () {
            $(this.el).html(this.template);
        }
    });

    return weatherApp;
});
