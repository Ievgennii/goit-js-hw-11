function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequired7c6=a);var i=a("5MHIa"),r=a("7Y9D8"),s=a("8hzAI"),d=a("fZKcF"),l=a("N0Xej");const c=document.querySelector("#search-form"),u=document.querySelector(".gallery"),f=document.querySelector(".load"),h=document.querySelector(".clear-all");function m(t){const n=t.hits.map((e=>(0,i.default)(e))).join("");u.insertAdjacentHTML("beforeend",n),new(e(d))(".gallery a",{captionDelay:250}).on("show.simplelightbox")}function y(){document.documentElement.getBoundingClientRect().bottom<document.documentElement.clientHeight+150&&async function(){try{l.default.params.page+=1;const{data:e}=await(0,s.fetchGallery)(l.default);if(console.log(e.hits.length),!e.hits.length)throw new Error;m(e),function(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:1.5*e,behavior:"smooth"})}()}catch(t){window.removeEventListener("scroll",y),f.classList.add("is-hidden"),h.classList.remove("is-hidden"),e(r).Notify.info("We're sorry, but you've reached the end of search results."),l.default.params.page=1,h.classList.remove("is-hidden")}}()}c.addEventListener("submit",(async function(t){try{if(window.addEventListener("scroll",y),t.preventDefault(),l.default.params.q=t.target.elements.searchQuery.value.trim(),l.default.params.page=1,u.innerHTML="",0===l.default.params.q.length)return void e(r).Notify.info("you need to enter a word to search for a photo");h.classList.add("is-hidden"),f.classList.add("is-hidden");const{data:n}=await(0,s.fetchGallery)(l.default);e(r).Notify.info(`Hooray! We found ${n.totalHits} images.`),m(n),function(e,t){e.totalHits>t.params.per_page?f.classList.remove("is-hidden"):h.classList.remove("is-hidden")}(n,l.default)}catch(t){f.classList.add("is-hidden"),e(r).Notify.info("Sorry, there are no images matching your search query. Please try again.")}finally{c.reset()}})),h.addEventListener("click",(function(){u.innerHTML="",h.classList.add("is-hidden")})),window.addEventListener("scroll",y);
//# sourceMappingURL=scroll.7fd7c872.js.map
