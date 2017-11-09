$(function(){

  initApp();

  function initApp() {
    initUI();
    initEvents();
    initCalculations()
  }

  function initUI() {
    accordeonInit();
    slidersInit();
    fancyboxInit();
    tooltipsInit();
    datepickerInit();
  }

  function initEvents() {
    $(document).on('pane.switch', function(e, paneId, type){
      if (type == 'gallery') {
        var $cnt = $(paneId);
        var wall = new freewall(paneId);
        wall.reset({
          selector: '.brick',
          animate: false,
          cellW: 168,
          cellH: 144,
          gutterX: 5,
          gutterY:5,
          onResize: function() {
            wall.refresh($cnt.width(), $cnt.height());
          }
        });
        // caculator width and height for IE7;
        wall.fitZone($cnt.width(), $cnt.height());
      }

      if (type == 'contacts') {
        var contactsWall = new freewall('#offices-list');
        contactsWall.reset({
          selector: '.office-item',
          animate: true,
          cellW: 380,
          cellH: 'auto',
          gutterX: 20,
          gutterY:20
        });
        contactsWall.fitWidth();
      }

    });
    $(document).on('contacts.switch', function(e, paneId, type){
      if (type == 'contacts') {
        var $cnt = $(paneId).find('.map-cnt');
        if ($cnt.length){
          var initialZoom = 17;
          var lat = $cnt.attr('data-lat');
          var long = $cnt.attr('data-long');
          var mapOptions = {
            center: new google.maps.LatLng(lat, long),
            zoom: initialZoom,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel:false
          };
          cityMap = new google.maps.Map($cnt[0],
            mapOptions);
          var latLng = new google.maps.LatLng(lat, long);
          var marker = new google.maps.Marker({
            position: latLng,
            map: cityMap,
            icon: image
          });
        }
      }
    });
    $('.search-btn').click(function(e){
      e.preventDefault();
      $(this).parents('form').submit();
    });
    $('input, textarea').focus(function(){
      var $cnt = $(this).parents('fieldset').addClass('focused');
    }).blur(function(){
      var $cnt = $(this).parents('fieldset').removeClass('focused');
    });
    $('.js-print-link').click(function(e){
      e.preventDefault();
      window.print();
    });
  }

  function initCalculations() {
    S('.accordeon-item').each(function (idx, elem) {
      $(elem).css('height', $(elem))
    })
  }

  var accordeonInit = function(){
    var $menuItem = $('.submenu-holder');
    $menuItem.each(function(idx, elt){
      if ($(elt).hasClass('expanded')) {
        $(elt).find('.side-submenu').slideToggle();
      }
    });
  };
  var datepickerInit = function(){
    $('.js-datetime').datetimepicker({
      lang:'ru',
      dayOfWeekStart: 1,
      timepicker:false,
      format:'d.m.Y',
      validateOnBlur:true,
      todayButton: false,
      scrollInput: false
    });
  };
  var tooltipsInit = function() {
    $('.js-color-hover').tooltipster({
      animation: 'fade',
      delay: 50,
      theme: 'docke-theme',
      touchDevices: false,
      trigger: 'hover',
      position: 'bottom'
    });

    $('.award-tooltip').tooltipster({
      animation: 'fade',
      delay: 50,
      theme: 'tooltipster-docke',
      touchDevices: false,
      trigger: 'hover',
      position: 'bottom'
    });
  };
  var slidersInit = function(){
    var slidePeriod = 7000;
    $('.side-faq-list').bxSlider({
      pager: false,
      nextSelector: '.slider-right',
      prevSelector: '.slider-left',
      nextText: "",
      prevText: "",
      adaptiveHeight: true
    });

    $('.slider-horizontal').bxSlider({
      pager: false,
      nextSelector: '.slide-next',
      prevSelector: '.slide-prev',
      nextText: "",
      prevText: "",
      minSlides: 5,
      maxSlides: 5,
      moveSlides: 1,
      slideWidth:140,
      slideMargin:19

    });

    $('.assort-img-list').bxSlider({
      pagerCustom: '.assort-pager-cnt',
      auto: false,
      mode: 'fade',
      preloadImages: 'visible',
      controls: false,
      slideWidth: 280
    });

    $('.js-tiles-slider-video').bxSlider({
      pager: false,
      slideSelector:'.video-link-cnt',
      controls: false,
      auto: true,
      autoHover: false,
      pause: slidePeriod
    });
    $('.js-tiles-slider-tr').bxSlider({
      pager: false,
      slideSelector:'.js-div-link',
      controls: false,
      auto: true,
      autoHover: false,
      pause: slidePeriod,
      slideMargin:0

    });
    $('.js-tiles-slider-mc').bxSlider({
      pager: false,
      slideSelector:'.js-div-link',
      controls: false,
      auto: true,
      autoHover: false,
      pause: slidePeriod,
      slideMargin:0

    });
    $('.js-tiles-slider-bl').bxSlider({
      pager: false,
      slideSelector:'.js-div-link',
      controls: false,
      auto: true,
      autoHover: false,
      pause: slidePeriod,
      slideMargin:0

    });

    $('.js-tiles-slider-blc').bxSlider({
      pager: false,
      slideSelector:'.js-div-link',
      controls: false,
      auto: true,
      autoHover: false,
      pause: slidePeriod,
      slideMargin:0

    });
    $('.js-tiles-slider-brc').bxSlider({
      pager: false,
      slideSelector:'.brc-slide-item',
      controls: false,
      auto: true,
      autoHover: false,
      pause: slidePeriod,
      slideMargin:0

    });
    $('.js-tiles-slider-br').bxSlider({
      pager: false,
      slideSelector:'.brc-slide-item',
      controls: false,
      auto: true,
      autoHover: false,
      pause: slidePeriod,
      slideMargin:0

    });


  };
  var fancyboxInit = function(){
    $('.fancybox-img').fancybox({
      wrapCSS:'docke',
      tpl: {
        closeBtn: '<div class="fancybox__close"><a class="fbx__close" href="#">&nbsp;</a></div>'
      },

      helpers: {
        overlay: {
          locked:false
        }
      },
      loop: false
    });
    $('.fancybox-info').fancybox({
      wrapCSS:'docke',
      padding:[25, 30, 25, 30],
      maxWidth: 600,
      tpl: {
        closeBtn: '<div class="fancybox__close"><a class="fbx__close" href="#">&nbsp;</a></div>'
      },

      helpers: {
        overlay: {
          locked:false
        }
      }
    });

    $('.fbx-video').fancybox({
      maxWidth	: 800,
      maxHeight	: 600,
      fitToView	: false,
      width		: '70%',
      height		: '70%',
      autoSize	: false,
      closeClick	: false,
      openEffect	: 'none',
      closeEffect	: 'none',
      helpers: {
        overlay: {
          locked:false
        }
      },
      tpl: {
        closeBtn: '<div class="fancybox__close"><a class="fbx__close" href="#">&nbsp;</a></div>'
      }
    });
    $('body').on('click', '.js-popup-close',function(e){
      e.preventDefault();
      $.fancybox.close();
    })
  };
});

