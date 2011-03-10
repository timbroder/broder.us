LightboxOptions=Object.extend({fileLoadingImage:"images/loading.gif",fileBottomNavCloseImage:"images/closelabel.gif",overlayOpacity:.8,animate:!0,resizeSpeed:7,borderSize:10,labelImage:"Image",labelOf:"of"},window.LightboxOptions||{});var Lightbox=Class.create();Lightbox.prototype={imageArray:[],activeImage:undefined,initialize:function(){this.updateImageList(),this.keyboardAction=this.keyboardAction.bindAsEventListener(this),LightboxOptions.resizeSpeed>10&&(LightboxOptions.resizeSpeed=10),LightboxOptions.resizeSpeed<1&&(LightboxOptions.resizeSpeed=1),this.resizeDuration=LightboxOptions.animate?(11-LightboxOptions.resizeSpeed)*.15:0,this.overlayDuration=LightboxOptions.animate?.2:0;var a=(LightboxOptions.animate?250:1)+"px",b=$$("body")[0];b.appendChild(Builder.node("div",{id:"overlay"})),b.appendChild(Builder.node("div",{id:"lightbox"},[Builder.node("div",{id:"outerImageContainer"},Builder.node("div",{id:"imageContainer"},[Builder.node("img",{id:"lightboxImage"}),Builder.node("div",{id:"hoverNav"},[Builder.node("a",{id:"prevLink",href:"#"}),Builder.node("a",{id:"nextLink",href:"#"})]),Builder.node("div",{id:"loading"},Builder.node("a",{id:"loadingLink",href:"#"},Builder.node("img",{src:LightboxOptions.fileLoadingImage})))])),Builder.node("div",{id:"imageDataContainer"},Builder.node("div",{id:"imageData"},[Builder.node("div",{id:"imageDetails"},[Builder.node("span",{id:"caption"}),Builder.node("span",{id:"numberDisplay"})]),Builder.node("div",{id:"bottomNav"},Builder.node("a",{id:"bottomNavClose",href:"#"},Builder.node("img",{src:LightboxOptions.fileBottomNavCloseImage})))]))])),$("overlay").hide().observe("click",function(){this.end()}.bind(this)),$("lightbox").hide().observe("click",function(a){a.element().id=="lightbox"&&this.end()}.bind(this)),$("outerImageContainer").setStyle({width:a,height:a}),$("prevLink").observe("click",function(a){a.stop(),this.changeImage(this.activeImage-1)}.bindAsEventListener(this)),$("nextLink").observe("click",function(a){a.stop(),this.changeImage(this.activeImage+1)}.bindAsEventListener(this)),$("loadingLink").observe("click",function(a){a.stop(),this.end()}.bind(this)),$("bottomNavClose").observe("click",function(a){a.stop(),this.end()}.bind(this));var c=this;(function(){var a="overlay lightbox outerImageContainer imageContainer lightboxImage hoverNav prevLink nextLink loading loadingLink imageDataContainer imageData imageDetails caption numberDisplay bottomNav bottomNavClose";$w(a).each(function(a){c[a]=$(a)})}).defer()},updateImageList:function(){this.updateImageList=Prototype.emptyFunction,document.observe("click",function(a){var b=a.findElement("a[rel^=lightbox]")||a.findElement("area[rel^=lightbox]");b&&(a.stop(),this.start(b))}.bind(this))},start:function(a){$$("select","object","embed").each(function(a){a.style.visibility="hidden"});var b=this.getPageSize();$("overlay").setStyle({width:b[0]+"px",height:b[1]+"px"}),new Effect.Appear(this.overlay,{duration:this.overlayDuration,from:0,to:LightboxOptions.overlayOpacity}),this.imageArray=[];var c=0;if(a.rel=="lightbox")this.imageArray.push([a.href,a.title]);else{this.imageArray=$$(a.tagName+'[href][rel="'+a.rel+'"]').collect(function(a){return[a.href,a.title]}).uniq();while(this.imageArray[c][0]!=a.href)c++}var d=document.viewport.getScrollOffsets(),e=d[1]+document.viewport.getHeight()/10,f=d[0];this.lightbox.setStyle({top:e+"px",left:f+"px"}).show(),this.changeImage(c)},changeImage:function(a){this.activeImage=a,LightboxOptions.animate&&this.loading.show(),this.lightboxImage.hide(),this.hoverNav.hide(),this.prevLink.hide(),this.nextLink.hide(),this.imageDataContainer.setStyle({opacity:1e-4}),this.numberDisplay.hide();var b=new Image;b.onload=function(){this.lightboxImage.src=this.imageArray[this.activeImage][0],this.resizeImageContainer(b.width,b.height)}.bind(this),b.src=this.imageArray[this.activeImage][0]},resizeImageContainer:function(a,b){var c=this.outerImageContainer.getWidth(),d=this.outerImageContainer.getHeight(),e=a+LightboxOptions.borderSize*2,f=b+LightboxOptions.borderSize*2,g=e/c*100,h=f/d*100,i=c-e,j=d-f;j!=0&&new Effect.Scale(this.outerImageContainer,h,{scaleX:!1,duration:this.resizeDuration,queue:"front"}),i!=0&&new Effect.Scale(this.outerImageContainer,g,{scaleY:!1,duration:this.resizeDuration,delay:this.resizeDuration});var k=0;j==0&&i==0&&(k=100,Prototype.Browser.IE&&(k=250)),function(){this.prevLink.setStyle({height:b+"px"}),this.nextLink.setStyle({height:b+"px"}),this.imageDataContainer.setStyle({width:e+"px"}),this.showImage()}.bind(this).delay(k/1e3)},showImage:function(){this.loading.hide(),new Effect.Appear(this.lightboxImage,{duration:this.resizeDuration,queue:"end",afterFinish:function(){this.updateDetails()}.bind(this)}),this.preloadNeighborImages()},updateDetails:function(){this.imageArray[this.activeImage][1]!=""&&this.caption.update(this.imageArray[this.activeImage][1]).show(),this.imageArray.length>1&&this.numberDisplay.update(LightboxOptions.labelImage+" "+(this.activeImage+1)+" "+LightboxOptions.labelOf+"  "+this.imageArray.length).show(),new Effect.Parallel([new Effect.SlideDown(this.imageDataContainer,{sync:!0,duration:this.resizeDuration,from:0,to:1}),new Effect.Appear(this.imageDataContainer,{sync:!0,duration:this.resizeDuration})],{duration:this.resizeDuration,afterFinish:function(){var a=this.getPageSize();this.overlay.setStyle({height:a[1]+"px"}),this.updateNav()}.bind(this)})},updateNav:function(){this.hoverNav.show(),this.activeImage>0&&this.prevLink.show(),this.activeImage<this.imageArray.length-1&&this.nextLink.show(),this.enableKeyboardNav()},enableKeyboardNav:function(){document.observe("keydown",this.keyboardAction)},disableKeyboardNav:function(){document.stopObserving("keydown",this.keyboardAction)},keyboardAction:function(a){var b=a.keyCode,c;a.DOM_VK_ESCAPE?c=a.DOM_VK_ESCAPE:c=27;var d=String.fromCharCode(b).toLowerCase();if(d.match(/x|o|c/)||b==c)this.end();else if(d=="p"||b==37)this.activeImage!=0&&(this.disableKeyboardNav(),this.changeImage(this.activeImage-1));else if(d=="n"||b==39)this.activeImage!=this.imageArray.length-1&&(this.disableKeyboardNav(),this.changeImage(this.activeImage+1))},preloadNeighborImages:function(){var a,b;this.imageArray.length>this.activeImage+1&&(a=new Image,a.src=this.imageArray[this.activeImage+1][0]),this.activeImage>0&&(b=new Image,b.src=this.imageArray[this.activeImage-1][0])},end:function(){this.disableKeyboardNav(),this.lightbox.hide(),new Effect.Fade(this.overlay,{duration:this.overlayDuration}),$$("select","object","embed").each(function(a){a.style.visibility="visible"})},getPageSize:function(){var a,b;window.innerHeight&&window.scrollMaxY?(a=window.innerWidth+window.scrollMaxX,b=window.innerHeight+window.scrollMaxY):document.body.scrollHeight>document.body.offsetHeight?(a=document.body.scrollWidth,b=document.body.scrollHeight):(a=document.body.offsetWidth,b=document.body.offsetHeight);var c,d;self.innerHeight?(document.documentElement.clientWidth?c=document.documentElement.clientWidth:c=self.innerWidth,d=self.innerHeight):document.documentElement&&document.documentElement.clientHeight?(c=document.documentElement.clientWidth,d=document.documentElement.clientHeight):document.body&&(c=document.body.clientWidth,d=document.body.clientHeight),b<d?pageHeight=d:pageHeight=b,a<c?pageWidth=a:pageWidth=c;return[pageWidth,pageHeight]}},document.observe("dom:loaded",function(){new Lightbox})