"use strict";var classCallCheck=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")},createClass=function(){function i(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,n,e){return n&&i(t.prototype,n),e&&i(t,e),t}}(),defineProperty=function(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t},Animator=function(){function h(t){var n=t.direction,e=t.sections,i=t.from,s=t.to,a=t.transition,o=t.easing,r=t.onExit,c=t.onEnter,u=t.fadeIn,l=t.fadeInDuration;classCallCheck(this,h),this.direction=n,this.sections=e,this.from=i,this.to=s,this.current=e[i],this.next=e[s],this.container=this.sections[0].parentNode,this.translate=0,this.transition=a,this.easing=o,this.onExit=r,this.onEnter=c,this.fadeIn=u,this.fadeInDuration=l}return createClass(h,[{key:"animate",value:function(){this._onExit().then(this._changeSection.bind(this)).then(this._onEnter.bind(this))}},{key:"getSectionTop",value:function(t){return t.getBoundingClientRect().top}},{key:"fadeToggle",value:function(){var t=this;this.current.style.transition="opacity "+this.fadeInDuration+"ms",this.current.style.opacity=0,setTimeout(function(){t.current.style.display="none",t.current.style.transition="",t.current.classList.remove(h.classNames.IS_ACTIVE)},this.fadeInDuration),this.next.classList.add(h.classNames.IS_ACTIVE),this.next.style.display="",this.next.style.transition="opacity "+this.fadeInDuration+"ms",setTimeout(function(){t.next.style.opacity=1},66)}},{key:"_onExit",value:function(){var n=this;return new Promise(function(t){n.onExit&&n.onExit(n.current,t)})}},{key:"_onEnter",value:function(){this.onEnter&&this.onEnter(this.next)}},{key:"_changeSection",value:function(){var t=this;if(this.fadeIn)this.fadeToggle();else{var n=this.getSectionTop(this.container),e=this.getSectionTop(this.next)-n;this.getSectionTop(this.current);this.translate=e,this.container.style.transform="translate(0px, -"+this.translate+"px)",this.container.style.transition="transform "+this.transition+"ms "+this.easing,setTimeout(function(){t.container.style.transition="",t.current.classList.remove(h.classNames.IS_ACTIVE),t.next.classList.add(h.classNames.IS_ACTIVE)},this.transition)}}}]),h}();Animator.classNames={IS_ACTIVE:"is-active"},function(t){function a(t,n){var e=document.createEvent("CustomEvent");return e.initCustomEvent(n,!0,!0,t.target),t.target.dispatchEvent(e),e=null,!1}var o=!0,r={x:0,y:0},c={x:0,y:0},n={touchstart:function(t){r={x:t.touches[0].pageX,y:t.touches[0].pageY}},touchmove:function(t){o=!1,c={x:t.touches[0].pageX,y:t.touches[0].pageY}},touchend:function(t){if(o)a(t,"fc");else{var n=c.x-r.x,e=Math.abs(n),i=c.y-r.y,s=Math.abs(i);20<Math.max(e,s)&&a(t,s<e?n<0?"swl":"swr":i<0?"swu":"swd")}o=!0},touchcancel:function(t){o=!1}};for(var e in n)t.addEventListener(e,n[e],!1)}(document);var Fullpage=function(){function o(t,n){var e;classCallCheck(this,o),this.container=t,this.defaultParams={delay:1400,transition:500,easing:"ease",navigation:!1,renderNavButton:!1,prevButton:!1,nextButton:!1,fadeIn:!1,fadeInDuration:500},n=Object.assign({},this.defaultParams,n),this.options=(e={delay:n.delay,transition:n.transition,easing:n.easing,navigation:n.navigation,renderNavButton:n.renderNavButton,prevButton:n.prevButton},defineProperty(e,"prevButton",n.prevButton),defineProperty(e,"nextButton",n.nextButton),defineProperty(e,"fadeIn",n.fadeIn),defineProperty(e,"fadeInDuration",n.fadeInDuration),e),this.allowPagination=!0,this.current=0}return createClass(o,[{key:"init",value:function(){this._addElementsAttributes(),this._crateNavigation(),this.paginateBinded=this.paginate.bind(this),this._paginate()}},{key:"paginateToNext",value:function(t){this.direction=t?1:-1,this.next=this.current+this.direction}},{key:"paginateOnNavButtonClick",value:function(t,n){t.preventDefault();var e=+n.getAttribute(o.constants.index);"number"==typeof e&&(this.next=e,this.direction=this.next>this.current?1:-1)}},{key:"paginateOnAnchorClick",value:function(t,n){var e=n.getAttribute(o.constants.anchor),i=document.querySelector(e);this.next=+i.getAttribute(o.constants.index),this.direction=this.next>this.current?1:-1}},{key:"paginateOnPrevNextClick",value:function(t,n,e){t.preventDefault(),this.paginateToNext(e)}},{key:"paginate",value:function(t){var n=this;if(this.allowPagination){if("wheel"===t.type&&this.paginateToNext(0<t.deltaY),"click"===t.type){var e=t.target.closest("."+o.constants.navButton),i=t.target.closest("["+o.constants.anchor+"]"),s=t.target.closest("."+o.constants.prev),a=t.target.closest("."+o.constants.next);if(e&&this.paginateOnNavButtonClick(t,e),i&&this.paginateOnAnchorClick(t,i),(s||a)&&this.paginateOnPrevNextClick(t,s,a),null===e&&null===i&&null===s&&null===a)return}"swu"===t.type&&this.paginateToNext(!0),"swd"===t.type&&this.paginateToNext(!1),this.next>=this.sections.length||this.next<0||this.next===this.current||(this.allowPagination=!1,this.navigation.forEach(function(t){t.classList.remove(o.constants.IS_ACTIVE)}),this.navigation[this.next].classList.add(o.constants.IS_ACTIVE),this.animator=new Animator({direction:this.direction,sections:this.sections,from:this.current,to:this.next,transition:this.options.transition,easing:this.options.easing,onExit:this.onExit,onEnter:this.onEnter,fadeIn:this.options.fadeIn,fadeInDuration:this.options.fadeInDuration}),this.animator.animate(),this.current=this.next,setTimeout(function(){n.allowPagination=!0},this.options.delay))}}},{key:"_addElementsAttributes",value:function(){this.options.fadeIn&&(this.sections.forEach(function(t){t.classList.add(o.constants.IS_ABSOLUTE),t.style.opacity=0}),this.sections[0].style.opacity=1),this.sections[0].classList.add(o.constants.IS_ACTIVE),this.sections.forEach(function(t,n){t.setAttribute(o.constants.index,n)}),this.options.prevButton&&this.options.prevButton.classList.add(o.constants.prev),this.options.nextButton&&this.options.nextButton.classList.add(o.constants.next)}},{key:"_paginate",value:function(){var n=this;["wheel","click","swu","swd"].forEach(function(t){document.addEventListener(t,n.paginateBinded)})}},{key:"_crateNavigation",value:function(){if(this.options.navigation){var t=this.options.navigation;t.innerHTML='<ul class="'+o.constants.navList+'"></ul>';for(var n=0;n<this.sections.length;n++){var e=t.querySelector("ul"),i=document.createElement("li");i.className=o.constants.navItem,this.options.renderNavButton?i.innerHTML=0===n?'<button class="'+o.constants.navButton+" "+o.constants.IS_ACTIVE+'" '+o.constants.index+'="'+n+'">'+this.options.renderNavButton(n)+"</button>":'<button class="'+o.constants.navButton+'" '+o.constants.index+'="'+n+'">'+this.options.renderNavButton(n)+"</button>":i.innerHTML=0===n?'<button class="'+o.constants.navButton+" "+o.constants.IS_ACTIVE+'" '+o.constants.index+'="'+n+'">'+(n+1)+"</button>":'<button class="'+o.constants.navButton+'" '+o.constants.index+'="'+n+'">'+(n+1)+"</button>",e.appendChild(i)}this.navigation=[].slice.call(t.querySelectorAll("."+o.constants.navButton))}}},{key:"wrap",get:function(){return this.container.parentNode}},{key:"sections",get:function(){return[].slice.call(this.container.children)}}]),o}();Fullpage.constants={IS_ACTIVE:"is-active",IS_ABSOLUTE:"is-absolute",navList:"fullpage-nav",navItem:"fullpage-nav__item",navButton:"fullpage-nav__button",prev:"fullpage__prev",next:"fullpage__next",anchor:"data-anchor",index:"data-fullpage-index"},module.exports=Fullpage;
