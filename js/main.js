;(function () {

	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');

	    	}


	    }
		});

	};


	var scrollNavBar = function() {

		if ( $(window).scrollTop() > 50)  {
			$('body').addClass('scrolled');
			$('.js-fh5co-nav-toggle').removeClass('fh5co-nav-white');
		} else {
			$('body').removeClass('scrolled');
			$('.js-fh5co-nav-toggle').addClass('fh5co-nav-white');
		}

		$(window).scroll(function(){
			if ( $(window).scrollTop() > 50)  {
				$('body').addClass('scrolled');
				$('.js-fh5co-nav-toggle').removeClass('fh5co-nav-white');
			} else {
				$('body').removeClass('scrolled');
				$('.js-fh5co-nav-toggle').addClass('fh5co-nav-white');
			}
		});


	};

	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');

	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	var parallax = function() {
		if ( !isMobile.any()) {
			$(window).stellar();
		}
	};

	var contactForm = function() {
		if ($('#contactForm').length > 0 ) {
			$( "#contactForm" ).validate( {
				rules: {
					fname: "required",
					lname: "required",
					email: {
						required: true,
						email: true
					},
					mobile: {
						required: true
					},
					message: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					fname: "Please enter your firstname",
					lname: "Please enter your lastname",
					email: "Please enter a valid email address",
					mobile: "Please enter a valid Contact No.",
					message: "Please enter a message"
				},
				/* submit via ajax */
				submitHandler: function(form) {
					var $submit = $('.submitting'),
						waitText = 'Submitting...';

					$.ajax({
				      type: "POST",
				      url: "controller.php",
				      data: $(form).serialize(),

				      beforeSend: function() {
				      	$submit.css('display', 'block').text(waitText);
				      },
				      success: function(msg) {
		               if (msg == 'OK') {
		               	$('#form-message-warning').hide();
		               	setTimeout(function(){
		               		$('#contactForm').fadeOut();
		               	}, 1000);
				            setTimeout(function(){
				               $('#form-message-success').fadeIn();
		               	}, 1400);
		               	    $.ajax({
        				      type: "POST",
        				      url: "controller_thankyou.php",
        				      data: $(form).serialize(),
        				      success: function(msg) {
        				          
        				      }
    		               	})

			            } else {
			               $('#form-message-warning').html(msg);
				            $('#form-message-warning').fadeIn();
				            $submit.css('display', 'none');
			            }
				      },
				      error: function() {
				      	$('#form-message-warning').html("Something went wrong. Please try again.");
				         $('#form-message-warning').fadeIn();
				         $submit.css('display', 'none');
				      }
			      });
		  		}

			} );
		}
	};

	var sliderShow = function() {
		var currentslide = $('.slider-content')[0];
		$(currentslide).show();

		$('#next').click(function() {
			for (var i=0; i< $('.slider-content').length-1; i++) {
				var thisSlide = $('.slider-content')[i];
				var isVisible = $(thisSlide).is(':visible');
				if(isVisible) {
					$(thisSlide).hide();
					var nxtSlide = $('.slider-content')[i+1];
					$(nxtSlide).show();
					break;
				}
			}
		});

		$('#prev').click(function() {
			for (var i=1; i< $('.slider-content').length; i++) {
				var thisSlide = $('.slider-content')[i];
				var isVisible = $(thisSlide).is(':visible');
				if(isVisible) {
					$(thisSlide).hide();
					var nxtSlide = $('.slider-content')[i-1];
					$(nxtSlide).show();
					break;
				}
			}
		});
	};

	$('.fh5co-project').click(function(){
		var id = $(this).index() ;
		//alert(id);
		$('.slider-content').css( {'display': 'none'} );
		$('.slider-content').eq( id ).css( {'display': 'block'} );
		//alert('hit');
		//$('.slider-content').get(id).css({'display': 'none'});
	});
    $('.learnmore').click(function(){
		var id = $(this).index() ;
		//alert(id);
		$('.slider-content').css( {'display': 'none'} );
		$('.slider-content').eq( id ).css( {'display': 'block'} );
		//alert('hit');
		//$('.slider-content').get(id).css({'display': 'none'});
	});

	$(function(){
		mobileMenuOutsideClick();
		scrollNavBar();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
		counterWayPoint();
		parallax();
		contactForm();
		sliderShow();
	});


}());

$(document).ready(function(){

	$(".filter-button").click(function(){

			var value = $(this).attr('data-filter');

			$('.filter-button').find('button').removeClass('active-btn');
			if(value == "all")
			{
					//$('.filter').removeClass('hidden');
					$('.filter').show('1000');

								$('.image-popup').magnificPopup({
								type: 'image',
								removalDelay: 300,
								mainClass: 'mfp-with-zoom',
								titleSrc: 'title',
								gallery:{
									enabled:true
								},
								zoom: {
									enabled: true, // By default it's false, so don't forget to enable it

									duration: 300, // duration of the effect, in milliseconds
									easing: 'ease-in-out', // CSS transition easing function

									// The "opener" function should return the element from which popup will be zoomed in
									// and to which popup will be scaled down
									// By defailt it looks for an image tag:
									opener: function(openerElement) {
									// openerElement is the element on which popup was initialized, in this case its <a> tag
									// you don't need to add "opener" option if this code matches your needs, it's defailt one.
									return openerElement.is('img') ? openerElement : openerElement.find('img');
									}
									}
						});
			}
			else
			{
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');

					$(".filter").not('.'+value).hide('3000');

					$('.filter').filter('.'+value).show('3000');


					$('.image-popup','.'+value).magnificPopup({
							type: 'image',
							removalDelay: 300,
							mainClass: 'mfp-with-zoom',
							titleSrc: 'title',
							gallery:{
								enabled:true
							},
							zoom: {
								enabled: true, // By default it's false, so don't forget to enable it

								duration: 300, // duration of the effect, in milliseconds
								easing: 'ease-in-out', // CSS transition easing function

								// The "opener" function should return the element from which popup will be zoomed in
								// and to which popup will be scaled down
								// By defailt it looks for an image tag:
								opener: function(openerElement) {
								// openerElement is the element on which popup was initialized, in this case its <a> tag
								// you don't need to add "opener" option if this code matches your needs, it's defailt one.
								return openerElement.is('img') ? openerElement : openerElement.find('img');
								}
								}
					});


			}
	});

});

function isNumberKey(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

         return true;
      }

	function ischarKey(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 65 || charCode > 90) &&
          (charCode < 97 || charCode > 122 )&&(charCode != 32 && charCode!= 0)) {
          return false;
       }

       return true;
      }
	function alphanumeric(evt){
		 var charCode = (evt.which) ? evt.which : event.keyCode
		if ((charCode > 64 && charCode < 91) || (charCode> 96 && charCode< 123) || charCode== 8 || charCode== 32 || (charCode>= 48 && charCode<= 57)){
		return true;
		}
	   return false
	}
	
	<!-- GetButton.io widget -->
    // <script type="text/javascript">
    (function () {
    var options = {
    facebook: "231158896954270", // Facebook page ID
    email: "marketing@urja.com", // Email
    call_to_action: "Talk to us", // Call to action
    button_color: "#FF6550", // Color of button
    position: "left", // Position may be 'right' or 'left'
    order: "facebook,email", // Order of buttons
    mobile: true, // mobile version
    desktop: true, // desktop version
    };
    var proto = document.location.protocol, host = "getbutton.io", url = proto + "//static." + host;
    var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
    s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
    var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    })();
    // </script>
    <!-- /GetButton.io widget -->
