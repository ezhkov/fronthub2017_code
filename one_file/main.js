var pageApp = {
  'init':function(){
    var curApp = $('body').attr('data-page');
    if (pageApp[curApp]) { pageApp[curApp](); }
  },
  'index':function(){
  },
  'basic-programs':function(){
  },
  'help-certs-details':function(){

    var $formReceiver = $('[data-target="form-receiver-name"]');
    var $formSender = $('[data-target="form-sender-name"]');
    var $certReceiver = $('[data-target="cert-receiver-name"]');
    var $certSender = $('[data-target="cert-sender-name"]');

    $formReceiver.on('keyup change',function(){
      if (this.value.length > 0) {
        $certReceiver.html(this.value);
      } else {
        $certReceiver.html($certReceiver.attr('data-default'));
      }
    });


    $formSender.on('keyup change',function(){
      if (this.value.length > 0) {
        $certSender.html(this.value);
      } else {
        $certSender.html($certSender.attr('data-default'));
      }
    });


    $certReceiver.on('click',function(){
      var offset = $formReceiver.offset().top - 100;
      $('body,html').animate({'scrollTop':offset}, 300, function(){ $formReceiver.focus(); })
    });

    $certSender.on('click',function(){
      var offset = $formSender.offset().top - 100;
      $('body,html').animate({'scrollTop':offset}, 300, function(){ $formSender.focus(); })
    });
  },
  'banners':function(){


    var copyToClipboard = function(e){
      e.preventDefault();

      var $area = $('.js-banner-cb-area');
      $area.select();
      try {
        var success = document.execCommand('copy');

        $('.js-banner-cb-copy').html('Код скопирован').addClass('state-copy-success');
        setTimeout(function(){
          $('.js-banner-cb-copy').removeClass('state-copy-success').html('Скопировать код');
        }, 1500)


      } catch (err) {
        console.log('ERR: Unable to execute "copy".');
      }
    };

    $global.document.on('click','.js-banner-cb-copy',copyToClipboard);

    $global.document.on('click','.js-banner-cb-area',copyToClipboard);
  }
};

var moduleApp = {
  'init':function(){
    var modules = $('[data-module]');
    modules.each(function (idx, elem) {
      var module = $(elem).attr('data-module');
      if (moduleApp[module]) {
        moduleApp[module]();
      }
    });
  },
  'navigation':function(){

    if (appConfig.mobileVersion) { return false; }


    var params = {
      'desks':[
        $('.unav-desk-a'),
        $('.unav-desk-b'),
        $('.unav-desk-c'),
        $('.unav-desk-d')
      ],
      'targets':[
        $('.unav-target-a'),
        $('.unav-target-b'),
        $('.unav-target-c')
      ],
      'leaveLevel':-1,
      'leaveTimer':null,
      'leaveTimeout':50
    };

    var events = {
      'enterCell':function(){
        var $this = $(this);
        if ($this.data().cell.hasChild) {

          var thisContent = $this.find('.unav-hidden').html();
          methods.showContent($this.data().cell.childLevel,thisContent);
        } else {
          methods.hideContent($this.data().cell.childLevel);
        }
      },
      'toggleAccordion':function(e){
        e.preventDefault();
        var $this = $(this);
        var $thisParent = $this.closest('.nano-content');
        var $thisAcc = $this.closest('.unav-acc');

        if ($this.hasClass('state-opened')) {
          $thisParent.find('.unav-acc-header').removeClass('state-opened');
          $thisParent.find('.unav-acc-body').slideUp(200, function(){
            methods.updateNano();
          });
        } else {
          $thisParent.find('.unav-acc-header').removeClass('state-opened');
          $thisParent.find('.unav-acc-body').slideUp(200);
          $this.addClass('state-opened');
          $thisAcc.find('> .unav-acc-body').slideDown(200, function(){
            methods.updateNano();
          });
        }
      },
      'enterDeskArea':function(){
        clearTimeout(params.leaveTimer);

        var thisLevel = $(this).data().level;

        if (params.leaveLevel == 2 && thisLevel == 1) { clearTimeout(params.leaveTimer); methods.hideContent(2); }
        if (params.leaveLevel == 2 && thisLevel == 0) { clearTimeout(params.leaveTimer); methods.hideContent(1); }
        if (params.leaveLevel == 1 && thisLevel == 0) { clearTimeout(params.leaveTimer); methods.hideContent(1); }

      },
      'leaveDeskArea':function(){
        params.leaveLevel = $(this).data().level;
        params.leaveTimer = setTimeout(function(){
          methods.hideContent(1);
        }, params.leaveTimeout);
      },
      'globalMove':function(e){
        if (e.pageX < 61) { $global.states.addClass('unav-collapse-hover'); }
        if (e.pageX > 540) { $global.states.removeClass('unav-collapse-hover'); }
      },
      'scrollShift':function(){
        var shift = $global.window.scrollLeft() * -1;
        params.desks[1].attr('style','transform:translateX('+shift+'px)');
        params.desks[2].attr('style','transform:translateX('+shift+'px)');
        params.desks[3].attr('style','transform:translateX('+shift+'px)');

      }
    };

    var methods = {
      'init':function(){
        $(".nano").nanoScroller({ alwaysVisible: true, preventPageScrolling: true });
        $global.document.on('mouseenter','.unav-area',events.enterDeskArea);
        $global.document.on('mouseleave','.unav-area',events.leaveDeskArea);
        $global.document.on('mouseenter','.unav-cell',events.enterCell);
        $global.document.on('mousemove',events.globalMove);
        $global.document.on('click','.unav-acc-header',events.toggleAccordion);
        $global.window.on('scroll',events.scrollShift).trigger('scroll');
      },
      'showContent':function(level,content){
        params.targets[level].html(content);
        methods.updateNano();
        params.desks[level].addClass('unav-show-dock');
      },
      'hideContent':function(level){
        if(level==1) {
          params.targets[1].html('');
          params.desks[1].removeClass('unav-show-dock');

          params.targets[2].html('');
          params.desks[2].removeClass('unav-show-dock');
        }
        if(level==2) {
          params.targets[2].html('');
          params.desks[2].removeClass('unav-show-dock');
        }
      },
      'updateNano':function(){
        $global.window.trigger('resize');
      }
    };

    methods.init();

  },
  'pagination':function(){
    var $pagers = $('.is-pagination');
    $pagers.each(function(i,thisPager){
      var $thisPager = $(thisPager);

      var $thisParent = $thisPager.find('.pg-parent');
      var $thisSwiper = $thisPager.find('.swiper-container');
      var $thisGoBack = $thisPager.find('.pg-arrow-back');
      var $thisGoNext = $thisPager.find('.pg-arrow-next');

      var $lastSlide = $thisSwiper.find('.swiper-slide:last');
      var activeIndex = $thisSwiper.find('.active').index();

      var swiperChangeRules = function(sw){
        if (sw.activeIndex>0) {
          $thisGoBack.addClass('control-show');
        } else {
          $thisGoBack.removeClass('control-show');
        }

        if ($lastSlide.hasClass('swiper-slide-visible')) {
          $thisGoNext.removeClass('control-show');
        } else {
          $thisGoNext.addClass('control-show');
        }
      };

      var thisSwiper = $thisSwiper.swiper({
        roundLengths:true,
        slidesPerView: 'auto',
        cssWidthAndHeight: false,
        visibilityFullFit: true,
        initialSlide: activeIndex > 0 ? activeIndex - 1 : activeIndex,
        onSlideChangeStart: swiperChangeRules,
        onTouchEnd: swiperChangeRules,
        onSwiperCreated: swiperChangeRules
      });

      $thisGoBack.on('click',function(e){
        e.preventDefault();
        thisSwiper.swipePrev();
      });

      $thisGoNext.on('click',function(e){
        e.preventDefault();
        thisSwiper.swipeNext();
      });

      setTimeout(function(){
        $thisParent.addClass('state-active');
      }, 500);

    });
  },
  'tabs':function(inputConfig){

    var defaultConfig = {
      'speed':'300',
      'initAttr':'data-is-tabs',
      'initAttrType':'.',
      'onBeforeChange':false,
      'onAfterChange':false,

      // private config

      'opacityDuration':'150',
      'opacityDelay':'150',
      'wrapperClass':'.is-tabs-wrapper',
      'contentClass':'.is-tabs-tab',
      'navLinkClass':'.is-tabs-link'
    };
    var tabsConfig = $.extend({}, defaultConfig, inputConfig);
    var tabsInit = function($thisTabs){

      var debouncer = false;
      var playStringRaw = 'transition:height '+tabsConfig.speed+'ms 0s, opacity '+(parseInt(tabsConfig.speed)+parseInt(tabsConfig.opacityDuration))+'ms '+tabsConfig.opacityDuration+'ms;';
      var playStringCSS = '-webkit-'+playStringRaw+'-moz-'+playStringRaw+'-ms-'+playStringRaw+'-o-'+playStringRaw+playStringRaw;
      var containerBox = $thisTabs.attr(tabsConfig.initAttr) || false;

      var $navLinks = $thisTabs.find(tabsConfig.navLinkClass);
      var $containerBox = $(tabsConfig.initAttrType + containerBox);
      var $wrapperBox = $containerBox.find(tabsConfig.wrapperClass);
      var $contentBox = $containerBox.find(tabsConfig.contentClass);

      var cH = $wrapperBox.outerHeight();
      var lastIndex = -1;

      var tabsCore = {
        'addEvent':function(){
          $navLinks.on('click', function(e){
            e.preventDefault();
            var $this = $(this);
            if (debouncer || $this.hasClass('active')) { return false; }
            debouncer = true;
            var thisIndex = $this.index();
            $navLinks.removeClass('active');
            $this.addClass('active');
            if (tabsConfig.onBeforeChange) {
              var cbReturn = tabsConfig.onBeforeChange({
                'oldIndex':lastIndex,
                'newIndex':thisIndex,
                'thisLink':$this,
                'thisContent':$contentBox.eq(thisIndex)
              });
              if (cbReturn===false) {
                debouncer = false;
                return false;
              }
            }
            $containerBox.attr('style','opacity:0;height:'+cH+'px;');
            tabsCore.changeTab(thisIndex);
          });
        },
        'changeTab':function(thisIndex){
          $contentBox.hide().eq(thisIndex).show();
          cH = $wrapperBox.outerHeight();
          $containerBox.attr('style','opacity:1;height:'+cH+'px;'+playStringCSS);
          setTimeout(function(){
            $containerBox.attr('style','height:auto;');
            if (tabsConfig.onAfterChange) {
              var cbReturn = tabsConfig.onAfterChange({
                'oldIndex':lastIndex,
                'newIndex':thisIndex,
                'thisLink':$navLinks.eq(thisIndex),
                'thisContent':$contentBox.eq(thisIndex)
              });
              if (cbReturn===false) {
                debouncer = false;
                return false;
              }
            }
            lastIndex = thisIndex;
            debouncer = false;
          }, parseInt(tabsConfig.speed)+25);
        }
      };

      // init
      tabsCore.addEvent();
      $navLinks.eq(0).addClass('active');
    };

    $('['+tabsConfig.initAttr+']').each(function(i,thisTabs){ tabsInit($(thisTabs)); });
  },
};

$(document).ready(function(){
  moduleApp.init();
  pageApp.init();
});
