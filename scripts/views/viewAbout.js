/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/viewAbout.html'
], function ($, _, Backbone, Mustache, aboutTplt) {
    'use strict';

    var aboutView = Backbone.View.extend({
        template: Mustache.to_html(aboutTplt),

        el: '#weather_app',

        initialize: function () {
            this.render;
        },

        render: function () {
            this.$el.find('#content').html(this.template);
            $('.nav li').removeClass('active');
            $('.nav .about').addClass('active');
        }

    });

    return aboutView;
});
