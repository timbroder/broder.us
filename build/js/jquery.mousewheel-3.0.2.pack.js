(function(a){function b(b){var c=[].slice.call(arguments,1),d=0;b=a.event.fix(b||window.event),b.type="mousewheel",b.wheelDelta&&(d=b.wheelDelta/120),b.detail&&(d=-b.detail/3),c.unshift(b,d);return a.event.handle.apply(this,c)}var c=["DOMMouseScroll","mousewheel"];a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=c.length;a;)this.addEventListener(c[--a],b,!1);else this.onmousewheel=b},teardown:function(){if(this.removeEventListener)for(var a=c.length;a;)this.removeEventListener(c[--a],b,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery)