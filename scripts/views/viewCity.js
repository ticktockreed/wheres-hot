/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/viewCity.html'
], function ($, _, Backbone, Mustache, cityTplt) {
    'use strict';

    var CityView = Backbone.View.extend({

        el: '#content',
        tagName: 'li',

        events: {
            'click': 'showForecast'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            var _this = this;
            console.log(this.model.toJSON());

            this.template = Mustache.to_html(cityTplt, this.model.toJSON());

            console.log(this.model.toJSON().name);

            this.$el.append(this.template, this.model.toJSON());
        },

        showForecast: function(ev) {
            $('.city.open').height('100px');
            $('.city.open').removeClass('open');
            $(ev.target).parents('.city').addClass('open');
            $(ev.target).parents('.city').height(window.innerHeight - 100);
        },
        
        destroy_view: function() {

            // COMPLETELY UNBIND THE VIEW
            this.undelegateEvents();

            this.$el.removeData().unbind(); 

            // Remove view from DOM
            this.remove();  
            Backbone.View.prototype.remove.call(this);

        }
    });

    return CityView;
});
