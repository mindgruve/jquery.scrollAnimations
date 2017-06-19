# Scroll Animations

A jQuery plugin for scroll based transitions.

Animations will trigger when an element is scrolled into the viewport.

Built by [Westley Mon](http://westleymon.com/) at [Mindgruve](http://mindgruve.com/).

## Getting Started

### Dependencies
This plugin depends on jQuery.

An optional dependency is [Animate.css](https://github.com/daneden/animate.css).  Custom CSS animations can be used, but they will need to be applied to a class.  See Animate.css code for example.

### How to use

##### 1. Include Javascript
```html
<script src="jquery.js"></script>
<script src="dist/jquery.scrollAnimations.js"></script>
```

##### 2. Required CSS
```css
[data-animation] {
    opacity: 0;
}

[data-animation].animated {
    opacity: 1;
}
```

##### 3. Markup your elements

Animating a single element is simple!
```html
<h1 data-animation="fadeInUp">Heading 1</h1>
```
 - A single element uses a required `[data-animation]` attribute and an optional `[data-animation-delay]` attribute.
 
 **Animating a set of elements (staggered animations)**
 
 We also have the ability to build an timeline of animations based on the a single containing element scrolling into view!
 
 ```html
 <section data-animation-container>
     <div class="container">
         <div class="row">
 
             <div class="col-sm-6"
                  data-animation-child data-animation="fadeInUp"
                  data-animation-delay="0ms">
                 [Something to animate in]
             </div>
 
             <div class="col-sm-6"
                  data-animation-child data-animation="fadeInUp"
                  data-animation-delay="500ms">
                 [Something else to animate in]
             </div>
 
         </div>
     </div>
 </section>
 ```
  - A set of elements requires the `[data-animation-container]` attribute on a container element like the `<section>` above.  When this element travels into the viewport, the animations for all "child" elements will kick off.
  - The "child" elements, or the elements that will actually be animating, require the `[data-animation-child]` and `[data-animation]` attributes.  The `[data-animation-delay]` attribute is optional, but as shown in the example above, the second column has a `500ms` delay, giving it a staggered effect.

##### 4. Initialize the plugin.
```javascript
var $containers = $('[data-animation]:not([data-animation-child]), [data-animation-container]');
$containers.scrollAnimations();
```

That's it!

## Examples

For now, see `demos/index.html`.
