/*
    Tagster
    Tagster is simple library which is helping you create html strings with ease.
    https://github.com/goschevski/tagster
*/
;(function () {

    'use strict';

    var Tagster = function (el, attrs, content) {
        this.el = el || 'div';
        this.attrs = attrs || {};
        this.content = content || '';
        this.initialize();
    };

    Tagster.prototype = {
        initialize: function () {
            this.element = '';
            this.attributes = '';
            this.render();
        },

        render: function () {
            this.elementType();
            this.createAttributes();
            this.createClosingElement();
        },

        elementType: function () {

            var withClass = this.el.match(/(.+)\.(.+)/);
            if ( withClass ) {
                this.el = withClass[1];
                this.attrs['class'] = withClass[2];
                return this;
            }

            var withId = this.el.match(/(.+)\#(.+)/);
            if ( withId ) {
                this.el = withId[1];
                this.attrs['id'] = withId[2];
                return this;
            }

            var onlyClass = this.el.match(/\.(.+)/);
            if ( onlyClass ) {
                this.el = 'div';
                this.attrs['class'] = onlyClass[1];
                return this;
            }

            var onlyId = this.el.match(/\#(.+)/);
            if ( onlyId ) {
                this.el = 'div';
                this.attrs['id'] = onlyId[1];
                return this;
            }
        },

        createAttributes: function () {
            var attrs = '';
            for ( var key in this.attrs ) {
                attrs += ' ' + key + '="' + this.attrs[key] + '"'
            }
            this.attributes = attrs;
            return this;
        },

        createClosingElement: function () {
            this.element = '<' + this.el + this.attributes + '>' + this.content + '</' + this.el + '>';
            return this;
        },

        createElement: function () {
            this.element = '<' + this.el + this.attributes + '>';
            return this;
        },

        populateWidth: function (content) {
            if ( typeof(content) == 'function') {
                this.content = content();
            } else if ( typeof(content) == 'string') {
                this.content = content;
            } else {
                throw new Error('populateWidth method argument can be function or string');
            }

            this.createClosingElement();
            return this;
        },

        script: function (url) {
            this.el = 'script';
            this.attrs.src = url;
            this.createAttributes();
            this.createClosingElement();
            return this;
        },

        style: function (href) {
            this.el = 'link';
            this.attrs.rel = 'stylesheet';
            this.attrs.href = href;
            this.createAttributes();
            this.createElement();
            return this;
        },
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Tagster;
    } else {
        window.Tagster = Tagster;
    }

})();