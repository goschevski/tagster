var Tagster = require('../tagster.js');
var chai = require('chai');
var should = chai.should();

describe('Tagster', function () {
    it('should create empty div', function () {
        var div = new Tagster().element;
        div.should.equal('<div></div>');
    });

    it('should create tag', function () {
        var span = new Tagster('span').element;
        span.should.equal('<span></span>');
    });

    it('should create element without closing tag', function () {
        var span = new Tagster('span/').element;
        span.should.equal('<span>');
    });

    it('should create element without closing tag', function () {
        var image = new Tagster('img/', { src: 'img/partizan.png', alt: 'Volim Partizan!' }).element;
        image.should.equal('<img src="img/partizan.png" alt="Volim Partizan!">');
    });

    it('should create header element', function () {
        var header = new Tagster('header', { role: 'header' }, 'Some content').element;
        header.should.equal('<header role="header">Some content</header>');
    });

    it('should create element with a class', function () {
        var header = new Tagster('header.header', { role: 'header' }, 'Some content').element;
        header.should.equal('<header role="header" class="header">Some content</header>');
    });

    it('should create element with a id', function () {
        var header = new Tagster('header#header', { role: 'header' }, 'Some content').element;
        header.should.equal('<header role="header" id="header">Some content</header>');
    });

    it('should create div with a class', function () {
        var div = new Tagster('.header', { role: 'header' }, 'Some content').element;
        div.should.equal('<div role="header" class="header">Some content</div>');
    });

    it('should create div with a id', function () {
        var div = new Tagster('#header', { role: 'header' }, 'Some content').element;
        div.should.equal('<div role="header" id="header">Some content</div>');
    });

    it('should create polymer element', function () {
        var custom = new Tagster('polymer-ajax', { url: 'http://example.com/json', handleAs: 'json' }).element;
        custom.should.equal('<polymer-ajax url="http://example.com/json" handleAs="json"></polymer-ajax>');
    });

    it('should populate ul with li', function () {
        var div = new Tagster('ul').populateWith(function () {
            return new Tagster('li', {}, 'About me').element;
        }).element;
        div.should.equal('<ul><li>About me</li></ul>');
    });

    it('should throw error if populateWith arugment is not function or string', function () {
        try {
            new Tagster('p').populateWith([1, 2, 3]).element;
        } catch (err) {
            err.message.should.equal('populateWith method argument can be function or string');
        }
    });

    it('should populate anchor with string', function () {
        var anchor = new Tagster('a', { href: '#' }).populateWith('Click on me!').element;
        anchor.should.equal('<a href="#">Click on me!</a>');
    });

    it('should create navigation', function () {
        var menu = ['home', 'about', 'portfolio', 'contact'];

        var nav = new Tagster('nav.nav', { role: 'navigation' }).populateWith(function () {
            return new Tagster('ul').populateWith(function () {
                var lis = [];

                menu.forEach(function (item) {
                    lis.push(new Tagster('li.menu-item').populateWith(function () {
                        return new Tagster('a', { href: '/#' + item }, item).element;
                    }).element);
                });

                return lis.join('');
            }).element;
        }).element;

        nav.should.equal('<nav role="navigation" class="nav"><ul><li class="menu-item"><a href="/#home">home</a></li><li class="menu-item"><a href="/#about">about</a></li><li class="menu-item"><a href="/#portfolio">portfolio</a></li><li class="menu-item"><a href="/#contact">contact</a></li></ul></nav>');
    });

    it('should create script tag', function () {
        var jquery = new Tagster().script('js/vendor/jquery.js').element;
        jquery.should.equal('<script src="js/vendor/jquery.js"></script>');
    });

    it('should create link tag', function () {
        var style = new Tagster().style('css/style.css').element;
        style.should.equal('<link rel="stylesheet" href="css/style.css">');
    });

    it('should create img tag', function () {
        var img = new Tagster().img('img/srbija.png', { alt: 'Bog cuva Srbe!' }).element;
        img.should.equal('<img alt="Bog cuva Srbe!" src="img/srbija.png">');
    });

    it('should be extensible', function () {
        Tagster.prototype.form = function (attrs) {
            this.attrs = attrs;
            this.el = 'form';
            this.createAttributes();
            this.createClosingElement();
            return this;
        };

        var form = new Tagster().form({ name: 'form', method: 'POST' }).element;
        form.should.equal('<form name="form" method="POST"></form>');

        Tagster.prototype.meta = function (attrs) {
            this.attrs = attrs;
            this.el = 'meta';
            this.createAttributes();
            this.createElement();
            return this;
        };

        var viewport = new Tagster().meta({ name: 'viewport', content: 'width=device-width' }).element;
        viewport.should.equal('<meta name="viewport" content="width=device-width">');
    });
});
