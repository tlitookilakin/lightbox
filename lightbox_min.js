/* Documentation & source code available @ https://github.com/tlitookilakin/lightbox */
function setupLightbox(d,f,g,h){document.addEventListener("DOMContentLoaded",function(){let j=[],k=0,l,m=function(B){let C=!1;if("none"==B.dataset.lightbox)return!0;for(let D of f.split(","))if(B.classList.contains(D)){C=!0;break}return C},o=function(B){let C=B.children[1].children[1],D=B.children[0].children[0];C.style.left="0px",D.style.left="0px",C.fwid=D.getBoundingClientRect().width,C.cwid=B.children[0].getBoundingClientRect().width,C.pwid=C.parentElement.getBoundingClientRect().width,C.bwid=C.cwid/C.fwid*C.pwid,C.style.width=C.bwid+""+"px"},q=function(B){"undefined"==typeof B?document.getElementById("lightbox").dataset.closed="true":B.target==document.getElementById("lightbox")&&(B.target.dataset.closed="true")},r=function(B){let C=B.parentElement;return"FIGURE"==C.tagName?"FIGCAPTION"==C.children[0].tagName?C.children[0].innerHTML:"FIGCAPTION"==C.children[C.children.length-1].tagName?C.children[C.children.length-1].innerHTML:null:C.children.length-1>Array.prototype.indexOf.call(C.children,B)?"FIGCAPTION"==C.children[Array.prototype.indexOf.call(C.children,B)+1].tagName?C.children[Array.prototype.indexOf.call(C.children,B)+1].innerHTML:null:null},s=function(B){return B.hasAttribute("title")?B.getAttribute("title"):"grouped"in B.dataset&&B.igrouper?B.igrouper.hasAttribute("title")?B.igrouper.getAttribute("title"):"":""},t=function(B){if(0<j.length){k=0>k+B?j.length+(k+B):k+B>j.length-1?k+B-j.length:k+B;let D=j[k],E=document.getElementById("lightbox").children[0],F="altsrc"in D.dataset?D.dataset.altsrc:D.getAttribute("src"),G=document.getElementById("lightbox").children[0].getElementsByTagName("img")[0];G.setAttribute("src",F);let H=document.getElementById("lightbox").children[0].children[3];if(H.innerHTML=k+1+"/"+(j.length+""),g){let I=r(D);E.children[1].children[1].innerHTML=null==I?"":I,E.children[1].children[1].style.display=null==I?"none":""}if(h){var C=s(D);""==C?E.children[4].style.display="none":(E.children[4].innerHTML=C,E.children[4].style.display="")}}};document.addEventListener("keyup",function(B){if(!(B.altKey||B.ctrlKey||B.metaKey)){let C=typeof B.key===void 0?B.code:B.key;"Escape"==C?q():"false"==document.getElementById("lightbox").dataset.closed&&("a"===C||"ArrowLeft"===C||"KeyA"===C?t(-1):"d"===C||"KeyD"===C||"ArrowRight"===C?t(1):void 0)}});let u=function(B){let C=B.dataset.lightbox,D=document.getElementById("lightbox"),E="altsrc"in B.dataset?B.dataset.altsrc:B.getAttribute("src"),F=h?s(B):"";switch(D.dataset.closed="false",C){case"default":default:{D.children[1].style.display="none",D.children[0].style.display="";let G=D.children[0],H=G.getElementsByTagName("img")[0];if(H.setAttribute("src",E),g){let I=r(B);G.children[1].children[1].innerHTML=null==I?"":I,G.children[1].children[1].style.display=null==I?"none":""}h&&(""==F?G.children[4].style.display="none":(G.children[4].innerHTML=F,G.children[4].style.display="")),"true"==B.dataset.grouped?(G.children[0].removeAttribute("hidden"),G.children[2].removeAttribute("hidden"),G.children[3].removeAttribute("hidden"),j=B.igrouper.querySelectorAll("[data-grouped]"),k=Array.from(j).indexOf(B),G.children[3].innerHTML=k+1+"/"+(j.length+"")):(G.children[0].setAttribute("hidden",""),G.children[2].setAttribute("hidden",""),G.children[3].setAttribute("hidden",""),j=[]);break}case"panorama":{j=[],D.children[0].style.display="none",D.children[1].style.display="";let G=D.children[1],H=G.getElementsByTagName("img");if(H[0].setAttribute("src",E),H[1].setAttribute("src",E),g){let I=r(B);G.children[0].children[1].innerHTML=null==I?"":I,G.children[0].children[1].style.display=null==I?"none":""}h&&(""==F?G.children[2].style.display="none":(G.children[2].innerHTML=F,G.children[2].style.display="")),window.setTimeout(function(){o(G)},60);break}}};var v=function(B,C,D,E){let F=document.createElement(B);if(F.innerHTML=C,F.className=D,"undefined"!=typeof E)for(let G=0;G<E.length-1;G+=2)F.setAttribute(E[G],E[G+1]);return F};let w=v("section","","",["id","lightbox","data-closed","true"]);document.body.appendChild(w),w.addEventListener("click",q);let x=v("div","","regular");w.appendChild(x);let y=v("a","<","arrowbut",["hidden","true","href","javascript:void(0)"]);x.appendChild(y),y.addEventListener("click",function(){t(-1)}),y=v("div","","imgflexcon"),y.appendChild(document.createElement("img")),g&&y.appendChild(v("div","","metatext")),x.appendChild(y),y=v("a",">","arrowbut",["hidden","true","href","javascript:void(0)"]),x.appendChild(y),y.addEventListener("click",function(){t(1)}),x.appendChild(v("span","","imgcount")),h&&x.appendChild(document.createElement("h3")),x=v("div","","pano"),w.appendChild(x),y=v("div","","panimgcont"),x.appendChild(y),y.appendChild(document.createElement("img")),g&&y.appendChild(v("div","","metatext")),y=v("div","<img/><span></span>","panmover"),x.appendChild(y),y.addEventListener("mousemove",function(B){let C=document.getElementById("lightbox").children[1].children[0].children[0],D=document.getElementById("lightbox").children[1].children[1].children[1],E=D.getBoundingClientRect(),F=D.parentElement.getBoundingClientRect().x,G=Math.min(Math.max(B.clientX-F,E.width/2),D.pwid-E.width/2);C.style.left=(G-E.width/2)*-(D.fwid/D.pwid)+""+"px",D.style.left=G-E.width/2+""+"px"}),h&&x.appendChild(document.createElement("h3"));let z=document.createElement("style");document.head.insertBefore(z,document.head.children[0]),z.innerHTML="#lightbox img{margin-bottom:-5px;}#lightbox[data-closed='true']{pointer-events:none;opacity:0;}#lightbox[data-closed='false']{pointer-events:initial; opacity:1;} #lightbox{position:fixed;top:0px;left:0px;right:0px;bottom:0px;transition:opacity .5s;background-color:rgba(0,0,0,.5);}#lightbox > div{display:inline-block;max-width:90%;max-height:90%;position:relative;left:50%;top:50%;transform:translate(-50%,-50%);}#lightbox .regular img{max-width:100%;}#lightbox .panimgcont{max-width:100%;overflow:hidden;max-height:90%;position:relative;} #lightbox .panimgcont img{position:relative;}#lightbox .panmover img{height:5em;} #lightbox .panmover{position:relative;left:50%;transform:translateX(-50%);display:inline-block;max-height:10%;} #lightbox .panmover span{display:block;position:absolute;top:0px;bottom:0px;outline:2px solid #fff;} #lightbox .regular{display:inline-flex;align-items:center;}#lightbox .arrowbut{color:#ffffff;font-size:3rem;text-decoration:none;} #lightbox .imgcount{pointer-events:none;position:absolute;left:0px;right:0px;top:100%;padding:.5rem;font-size:2rem;text-align:center;color:#ffffff;} #lightbox .imgflexcon{position:relative;padding-bottom:1px;} #lightbox .metatext{position:absolute;right:0px;bottom:0px;padding:.5rem;background:linear-gradient(to right,transparent 0px, rgba(0,0,0,.5) 2rem);padding-left:1.5rem;color:#ffffff;text-align:right;opacity:0;transition:opacity .5s;} #lightbox div div:hover .metatext, #lightbox div div:active .metatext{opacity:1;} #lightbox h3{pointer-events:none;position:absolute;bottom:100%;left:0px;right:0px;font-size:1.5rem;color:#ffffff;text-align:center;}";let A=document.querySelectorAll(d+" img, "+d+" *[data-lightbox]");for(let B of A)if(!m(B))if(!("lightbox"in B.dataset&&"group"==B.dataset.lightbox))"IMG"==B.tagName?B.addEventListener("click",function(C){u(this),C.stopPropagation()}):console.warn("Could not add non-image to lightbox!");else if("IMG"==B.tagName)B.addEventListener("click",function(C){u(this),C.stopPropagation()}),console.warn("GROUP typing may NOT be used on images!");else for(let C of B.getElementsByTagName("img"))"grouped"in C.dataset&&console.warn("You have intersecting image groups! Problems may occur!"),"lightbox"in C.dataset&&"panorama"==C.dataset.lightbox||(C.dataset.grouped="true",C.igrouper=B);window.addEventListener("resize",function(){l||(l=window.setTimeout(function(){l=null,o(document.getElementById("lightbox").children[1])},17))})})}