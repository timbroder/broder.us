var Scriptaculous={Version:"1.8.1",require:function(a){document.write('<script type="text/javascript" src="'+a+'"></script>')},REQUIRED_PROTOTYPE:"1.6.0",load:function(){function a(a){var b=a.split(".");return parseInt(b[0])*1e5+parseInt(b[1])*1e3+parseInt(b[2])}if(typeof Prototype=="undefined"||typeof Element=="undefined"||typeof Element.Methods=="undefined"||a(Prototype.Version)<a(Scriptaculous.REQUIRED_PROTOTYPE))throw"script.aculo.us requires the Prototype JavaScript framework >= "+Scriptaculous.REQUIRED_PROTOTYPE;$A(document.getElementsByTagName("script")).findAll(function(a){return a.src&&a.src.match(/scriptaculous\.js(\?.*)?$/)}).each(function(a){var b=a.src.replace(/scriptaculous\.js(\?.*)?$/,""),c=a.src.match(/\?.*load=([a-z,]*)/);(c?c[1]:"builder,effects,dragdrop,controls,slider,sound").split(",").each(function(a){Scriptaculous.require(b+a+".js")})})}};Scriptaculous.load()