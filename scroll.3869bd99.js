!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequired7c6=o);var i=o("bpxeT"),a=o("2TvXO"),s=o("gQS4W"),c=o("6JpON"),l=o("gsNEY"),d=o("5IjG7"),u=o("i0xjD"),p=document.querySelector("#search-form"),f=document.querySelector(".gallery"),h=document.querySelector(".load"),m=document.querySelector(".clear-all");function y(){return(y=e(i)(e(a).mark((function t(n){var r;return e(a).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,window.addEventListener("scroll",L),n.preventDefault(),u.options.params.q=n.target.elements.searchQuery.value.trim(),u.options.params.page=1,f.innerHTML="",m.classList.add("is-hidden"),h.classList.add("is-hidden"),t.next=10,(0,l.fetchGallery)(u.options);case 10:if(0!==(r=t.sent.data).totalHits&&0!==u.options.params.q.length){t.next=15;break}return console.log(r.totalHits),e(c).Notify.info("Sorry, there are no images matching your search query. Please try again."),t.abrupt("return");case 15:e(c).Notify.info("Hooray! We found ".concat(r.totalHits," images.")),g(r),w(r,u.options),t.next=24;break;case 20:t.prev=20,t.t0=t.catch(0),h.classList.add("is-hidden"),e(c).Notify.info("Sorry, there are no images matching your search query. Please try again.");case 24:return t.prev=24,p.reset(),t.finish(24);case 27:case"end":return t.stop()}}),t,null,[[0,20,24,27]])})))).apply(this,arguments)}function g(t){var n=t.hits.map((function(e){return(0,s.default)(e)})).join("");f.insertAdjacentHTML("beforeend",n),new(e(d))(".gallery a",{captionDelay:250}).on("show.simplelightbox")}function v(){var e=document.querySelector(".gallery").firstElementChild.getBoundingClientRect().height;window.scrollBy({top:2*e,behavior:"smooth"})}function w(e,t){e.totalHits>t.params.per_page?h.classList.remove("is-hidden"):m.classList.remove("is-hidden")}function L(){document.documentElement.getBoundingClientRect().bottom<document.documentElement.clientHeight+150&&function(){b.apply(this,arguments)}()}function b(){return(b=e(i)(e(a).mark((function t(){var n;return e(a).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,u.options.params.page+=1,t.next=4,(0,l.fetchGallery)(u.options);case 4:if((n=t.sent.data).hits.length){t.next=7;break}throw new Error;case 7:g(n),v(),t.next=19;break;case 11:t.prev=11,t.t0=t.catch(0),window.removeEventListener("scroll",L),h.classList.add("is-hidden"),m.classList.remove("is-hidden"),e(c).Notify.info("We're sorry, but you've reached the end of search results."),u.options.params.page=1,m.classList.remove("is-hidden");case 19:case"end":return t.stop()}}),t,null,[[0,11]])})))).apply(this,arguments)}p.addEventListener("submit",(function(e){return y.apply(this,arguments)})),m.addEventListener("click",(function(){f.innerHTML="",m.classList.add("is-hidden")})),window.addEventListener("scroll",L)}();
//# sourceMappingURL=scroll.3869bd99.js.map
