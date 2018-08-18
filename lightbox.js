function setupLightbox(targetElement,ignoreClasses,showMeta,showTitles){
	/* - vars - */
	let group=[];
	let gind=0;
	let rescaleTimer;
	/* - Local Functions - */
	let isIgnored = function(elem){
		let ret=false;
		//if lbox is set to none ignore it
		if(elem.dataset.lightbox=="none"){
			return true;
		} else {
			for(let c of ignoreClasses.split(",")){
				if(elem.classList.contains(c)){
					ret=true; break;
				}
			}
			return ret;
		}
	}
	/* - adjusts pano sizing on resize - */
	let rescalePano = function(){
		if(!rescaleTimer){
			rescaleTimer=window.setTimeout(function(){
				rescaleTimer=null;
				calcResize(document.getElementById("lightbox").children[1]);
			},17);
		}
	}
	/* - resize calc - */
	let calcResize = function(lb){
		let panbox=lb.children[1].children[1];
		let img=lb.children[0].children[0];
		panbox.style.left="0px";
		img.style.left="0px";
		panbox.fwid=img.getBoundingClientRect().width;
		panbox.cwid=lb.children[0].getBoundingClientRect().width;
		panbox.pwid=panbox.parentElement.getBoundingClientRect().width;
		panbox.bwid=(panbox.cwid/panbox.fwid)*panbox.pwid;
		panbox.style.width=String(panbox.bwid)+"px";
	}
	/* - scrolls panorama viewport - */
	let updatePanoView = function(e){
		let mainimg = document.getElementById("lightbox").children[1].children[0].children[0];
		let panbox = document.getElementById("lightbox").children[1].children[1].children[1];
		let bounds = panbox.getBoundingClientRect();
		let px = panbox.parentElement.getBoundingClientRect().x;
		let rx = Math.min(Math.max((e.clientX-px),bounds.width/2),panbox.pwid-(bounds.width/2));
		mainimg.style.left = String((rx-bounds.width/2)*-(panbox.fwid/panbox.pwid))+"px";
		panbox.style.left = String(rx-bounds.width/2)+"px";
	}
	/* - Lightbox Hider - */
	let hideLightBox = function(e){
		if(typeof e == "undefined"){
			document.getElementById("lightbox").dataset.closed="true";
		} else {
			if(e.target==document.getElementById("lightbox")){
				e.target.dataset.closed="true";
			}
		}
	}
	/* - metatext retrieval - */
	let getMeta = function(el){
		let par=el.parentElement;
		if(par.tagName=="FIGURE"){
			if(par.children[0].tagName=="FIGCAPTION"){
				return par.children[0].innerHTML;
			} else if(par.children[par.children.length-1].tagName=="FIGCAPTION"){
				return par.children[par.children.length-1].innerHTML;
			} else {
				return null;
			}
		} else {
			if(par.children.length-1>Array.prototype.indexOf.call( par.children, el)){
				if(par.children[Array.prototype.indexOf.call( par.children, el)+1].tagName == "FIGCAPTION"){
					return par.children[Array.prototype.indexOf.call( par.children, el)+1].innerHTML;
				} else {
					return null;
				}
			} else {
				return null;
			}
		}
	}
	/* - title retrieval - */
	let getTitle = function(el){
		if(el.hasAttribute("title")){
			return el.getAttribute("title");
		} else {
			if(("grouped" in el.dataset) && (el.igrouper)){
				return (el.igrouper.hasAttribute("title")) ? el.igrouper.getAttribute("title") : "";
			} else {
				return "";
			}
		}
	}
	/* - Lightbox jumping - */
	let boxJump = function(ind){
		if(group.length>0){
			//group nav wrapping
			gind = (gind+ind<0) ? group.length+(gind+ind) : (gind+ind>group.length-1) ? (gind+ind)-group.length : gind+ind;
			let el = group[gind];
			let lb = document.getElementById("lightbox").children[0];
			let imgurl = ("altsrc" in el.dataset) ? el.dataset.altsrc : el.getAttribute("src");
			let img = document.getElementById("lightbox").children[0].getElementsByTagName("img")[0];
			img.setAttribute("src",imgurl);
			let indcounter=document.getElementById("lightbox").children[0].children[3];
			indcounter.innerHTML=String(gind+1)+"/"+String(group.length);
			if(showMeta){
				let meta=getMeta(el);
				lb.children[1].children[1].innerHTML= (meta!=null) ? meta : "";
				if(meta==null){
					lb.children[1].children[1].style.display = "none";
				} else {
					lb.children[1].children[1].style.display = "";
				}
			}
			if(showTitles){
				var title=getTitle(el);
				if(title!=""){
					lb.children[4].innerHTML=title;
					lb.children[4].style.display = "";
				} else {
					lb.children[4].style.display="none";
				}
			}
		}
	}
	/* - keyboard nav - */
	document.addEventListener("keyup",function(e){
		if(!(e.altKey||e.ctrlKey||e.metaKey)){
			//safari compat
			let char = (typeof e.key === undefined) ? e.code : e.key;
			if(char=="Escape"){
				hideLightBox();
			} else if(document.getElementById("lightbox").dataset.closed=="false"){
				switch(char){
					case "a":
					case "ArrowLeft":
					case "KeyA":
					boxJump(-1);
					break;
					case "d":
					case "KeyD":
					case "ArrowRight":
					boxJump(1);
					break;
				}
			}
		}
	});
	/* - Lightbox Function - */
	let showLightBox = function(el){
		let type=el.dataset.lightbox;
		let box=document.getElementById("lightbox");
		let imgurl=("altsrc" in el.dataset) ? el.dataset.altsrc : el.getAttribute("src");
		let title=(showTitles) ? getTitle(el) : "";
		box.dataset.closed="false";
		switch(type){
		case "default":
		default: {
			//default lightbox
			box.children[1].style.display="none";
			box.children[0].style.display="";
			let lb = box.children[0];
			let img=lb.getElementsByTagName("img")[0];
			img.setAttribute("src",imgurl);
			if(showMeta){
				let meta = getMeta(el);
				lb.children[1].children[1].innerHTML= (meta!=null) ? meta : "";
				if(meta==null){
					lb.children[1].children[1].style.display = "none";
				} else {
					lb.children[1].children[1].style.display = "";
				}
			}
			if(showTitles){
				if(title!=""){
					lb.children[4].innerHTML=title;
					lb.children[4].style.display = "";
				} else {
					lb.children[4].style.display="none";
				}
			}
			if(el.dataset.grouped=="true"){
				lb.children[0].removeAttribute("hidden");
				lb.children[2].removeAttribute("hidden");
				lb.children[3].removeAttribute("hidden");
				group=el.igrouper.querySelectorAll("[data-grouped]");
				gind=Array.from(group).indexOf(el);
				lb.children[3].innerHTML=String(gind+1)+"/"+String(group.length);
			} else {
				lb.children[0].setAttribute("hidden","");
				lb.children[2].setAttribute("hidden","");
				lb.children[3].setAttribute("hidden","");
				group=[];
			}
		break; }
		case "panorama": {
			//panorama lightbox
			group=[];
			box.children[0].style.display="none";
			box.children[1].style.display="";
			let lb = box.children[1];
			let img=lb.getElementsByTagName("img");
			img[0].setAttribute("src",imgurl);
			img[1].setAttribute("src",imgurl);
			if(showMeta){
				let meta = getMeta(el);
				lb.children[0].children[1].innerHTML= (meta!=null) ? meta : "";
				if(meta==null){
					lb.children[0].children[1].style.display = "none";
				} else {
					lb.children[0].children[1].style.display = "";
				}
			}
			if(showTitles){
				if(title!=""){
					lb.children[2].innerHTML=title;
					lb.children[2].style.display = "";
				} else {
					lb.children[2].style.display="none";
				}
			}
			//needed because sometimes the calculated width doesn't update immediately
			window.setTimeout(function(){
				calcResize(lb);
			},60);
		break; }
		}
	}
	/* - simple element factory - */
	var makeElem = function(tag,html,classname,attrs){
		let elem=document.createElement(tag);
		elem.innerHTML=html;
		elem.className=classname;
		if(typeof attrs!="undefined"){
			for(let i=0;i<attrs.length-1;i+=2){
				elem.setAttribute(attrs[i],attrs[i+1]);
			}
		}
		return elem;
	}
	/* - add lightbox - */
	let el=makeElem("section","","",["id","lightbox","data-closed","true"]);
	document.body.appendChild(el);
	el.addEventListener("click",hideLightBox);
	/* - regular lbox - */
	//main container
	let ll=makeElem("div","","regular");
	el.appendChild(ll);
	//prev button
	let lll = makeElem("a","<","arrowbut",["hidden","true","href","javascript:void(0)"]);
	ll.appendChild(lll);
	lll.addEventListener("click",function(){boxJump(-1);});
	//img & container
	lll=makeElem("div","","imgflexcon");
	lll.appendChild(document.createElement("img"));
	if(showMeta){
		//meta info overlay
		lll.appendChild(makeElem("div","","metatext"));
	}
	ll.appendChild(lll);
	//next button
	lll = makeElem("a",">","arrowbut",["hidden","true","href","javascript:void(0)"]);
	ll.appendChild(lll);
	lll.addEventListener("click",function(){boxJump(1)});
	//image count label
	ll.appendChild(makeElem("span","","imgcount"));
	if(showTitles){
		//title
		ll.appendChild(document.createElement("h3"));
	}
	/* - panorama lbox - */
	//main container
	ll=makeElem("div","","pano");
	el.appendChild(ll);
	//panning container & big img
	lll = makeElem("div","","panimgcont");
	ll.appendChild(lll);
	lll.appendChild(document.createElement("img"));
	if(showMeta){
		//meta info overlay
		lll.appendChild(makeElem("div","","metatext"));
	}
	//pan controller & mini img
	lll = makeElem("div","<img"+"/><span"+"></span"+">","panmover");
	ll.appendChild(lll);
	lll.addEventListener("mousemove",updatePanoView);
	if(showTitles){
		//title
		ll.appendChild(document.createElement("h3"));
	}
	/* - style lightbox - */
	let sl=document.createElement("style");
	document.head.insertBefore(sl,document.head.children[0]);
	sl.innerHTML="#lightbox img{margin-bottom:-5px;}#lightbox[data-closed='true']{pointer-events:none;opacity:0;}#lightbox[data-closed='false']{pointer-events:initial; opacity:1;} #lightbox{position:fixed;top:0px;left:0px;right:0px;bottom:0px;transition:opacity .5s;background-color:rgba(0,0,0,.5);}#lightbox > div{display:inline-block;max-width:90%;max-height:90%;position:relative;left:50%;top:50%;transform:translate(-50%,-50%);}#lightbox .regular img{max-width:100%;}#lightbox .panimgcont{max-width:100%;overflow:hidden;max-height:90%;position:relative;} #lightbox .panimgcont img{position:relative;}#lightbox .panmover img{height:5em;} #lightbox .panmover{position:relative;left:50%;transform:translateX(-50%);display:inline-block;max-height:10%;} #lightbox .panmover span{display:block;position:absolute;top:0px;bottom:0px;outline:2px solid #fff;} #lightbox .regular{display:inline-flex;align-items:center;}#lightbox .arrowbut{color:#ffffff;font-size:3rem;text-decoration:none;} #lightbox .imgcount{pointer-events:none;position:absolute;left:0px;right:0px;top:100%;padding:.5rem;font-size:2rem;text-align:center;color:#ffffff;} #lightbox .imgflexcon{position:relative;padding-bottom:1px;} #lightbox .metatext{position:absolute;right:0px;bottom:0px;padding:.5rem;background:linear-gradient(to right,transparent 0px, rgba(0,0,0,.5) 2rem);padding-left:1.5rem;color:#ffffff;text-align:right;opacity:0;transition:opacity .5s;} #lightbox div div:hover .metatext, #lightbox div div:active .metatext{opacity:1;} #lightbox h3{pointer-events:none;position:absolute;bottom:100%;left:0px;right:0px;font-size:1.5rem;color:#ffffff;text-align:center;}";
	/* - add click events - */
	let imgs=document.querySelectorAll(targetElement+" img, "+targetElement+" *[data-lightbox]");
	for(let a of imgs){
		if(!isIgnored(a)){
			if(("lightbox" in a.dataset) && a.dataset.lightbox=="group"){
				if(a.tagName=="IMG"){
					a.addEventListener("click",function(event){ 
						showLightBox(this);event.stopPropagation();
					});
					console.warn("GROUP typing may NOT be used on images!");
				} else {
					for(let b of a.getElementsByTagName("img")){
						if("grouped" in b.dataset){
							console.warn("You have intersecting image groups! Problems may occur!");
						}
						if(!("lightbox" in b.dataset)||b.dataset.lightbox!="panorama"){
							b.dataset.grouped="true";
							b.igrouper=a;
						}
					}
				}
			} else {
				if(a.tagName=="IMG"){
					a.addEventListener("click",function(event){ 
						showLightBox(this);event.stopPropagation();
					});
				} else {
					console.warn("Could not add non-image to lightbox!");
				}
			}
	}
	window.addEventListener("resize",rescalePano);
}
