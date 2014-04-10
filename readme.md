# Tagster

[![Build Status](https://travis-ci.org/goschevski/tagster.svg?branch=master)](https://travis-ci.org/goschevski/tagster)

Tagster is simple library which is helping you create html strings with ease.

It works in both node and client-side applications.

### Elements

```
var div = new Tagster().element;
// <div></div>

var header = new Tagster('header.header', { role: 'header' }).element;
// <header role="header" class="header"</header>

var header = new Tagster('#unique').element;
// <div id="header"></div>

var custom = new Tagster('polymer-ajax', { url: 'http://example.com/json', handleAs: 'json' }).element;
// <polymer-ajax url="http://example.com/json" handleAs="json"></polymer-ajax>
```

### Populate

You can populate element on two ways. First is passing by a string as third param when creating new element.

```
var header = new Tagster('header', { role: 'header' }, 'I am a header!').element;
// <header role="header">I am a header!</header>
```
Second way is to chain populateWidth method which accepts function or string.

```
var header = new Tagster('header', { role: 'header' }).populateWidth('I am a header!').element;
// <header role="header">I am a header!</header>

var header = new Tagster('header', { role: 'header' }).populateWidth(function () {
    return new Tagster('a.logo', { href: '/' }, 'NameOfCompany').element;
}).element;

// <header role="header"><a class="logo">NameOfCompany</a></header>
```

### Helpers

```
var jquery = new Tagster().script('js/vendor/jquery.js').element;
// <script src="js/vendor/jquery.js"></script>
```

```
var style = new Tagster().style('css/style.css').element;
// <link rel="stylesheet" href="css/style.css">
```

### Extensible

Tagster is extensible, so you can create your helpers and methods.

```
Tagster.prototype.form = function (attrs) {
    this.attrs = attrs;
    this.el = 'form';
    this.createAttributes();
    this.createClosingElement();
    return this;
};

var form = new Tagster().form({ name: 'form', method: 'POST' }).element;
// <form name="form" method="POST"></form>

Tagster.prototype.meta = function (attrs) {
    this.attrs = attrs;
    this.el = 'meta';
    this.createAttributes();
    this.createElement();
    return this;
};

var viewport = new Tagster().meta({ name: 'viewport', content: 'width=device-width' }).element;
// <meta name="viewport" content="width=device-width">
```

### Example

```
var menu = ['home', 'about', 'portfolio', 'contact'];

var nav = new Tagster('nav.nav', { role: 'navigation' }).populateWidth(function () {
    return new Tagster('ul').populateWidth(function () {
        var lis = [];

        menu.forEach(function (item) {
            lis.push(new Tagster('li.menu-item').populateWidth(function () {
                return new Tagster('a', { href: '/#' + item }, item).element;
            }).element);
        });

        return lis.join("");
    }).element;
}).element;

/*

<nav role="navigation" class="nav">
    <ul>
        <li class="menu-item"><a href="/#home">home</a></li>
        <li class="menu-item"><a href="/#about">about</a></li>
        <li class="menu-item"><a href="/#portfolio">portfolio</a></li>
        <li class="menu-item"><a href="/#contact">contact</a></li>
    </ul>
</nav>

*/
```