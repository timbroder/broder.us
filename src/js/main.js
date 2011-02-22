require(["jquery", "jquery-ui", "jquery.address", "jquery.mousewheel-3.0.2.pack", "jquery.fancybox-1.3.1.pack", "jquery.easing-1.3.pack"], function($) {
    $(function() {
		var tabs;

		$.address.init(function(event) {
			tabs = $('#tabs').tabs({		
				fx: { opacity: 'toggle' }
			})		
		}).change(function(event) {		
			$.address.title($.address.title().split(' | ')[0] + ' | ' + $('a').filter('[rel=address:' + event.value + ']').text());
		}).externalChange(function(event) {
			tabs.tabs('select', $('a').filter('[rel=address:' + event.value + ']').attr('href'));
		});	
		
		$("a.ringgroup").fancybox();	
		$("a.engage").fancybox();
		$("a.ltgroup").fancybox();
		$("#rsvp_control").fancybox({
			'autoScale': true,
			'type': 'iframe',
			'width': '65%',
			'height': '75%',
		});
    });
});
