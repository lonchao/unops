$(function() {
  $('.dropdown .value').click(function (){
    $(this).closest('.dropdown').toggleClass('opened');
  });

  //fix border
  var most_counter = 0;
  $('.most_viewed ul li').each(function (){
    if ((most_counter%3) == 0) {
      $(this).addClass('first');
    }
    most_counter++;
  });

  $('.breadcrumb').find('.has_sub>a').click(function(e){
    e.preventDefault();
  });

  // expand in project
  $("#btExpant").on("click", function(e){
    e.preventDefault();
    var $this = $(this);
    var $wrapper = $(".text_wrapper");

    if($this.hasClass("open")){
      $wrapper.find(".ellipsis").show();
      $wrapper.find(".hidden_text").hide();

      $this.removeClass("open");
      $this.html("Expand +");
    } else {
      $wrapper.find(".ellipsis").hide();
      $wrapper.find(".hidden_text").show();

      $this.addClass("open");
      $this.html("Collapse -");
    }
  });

  // projects icons
  var $icons = $("#banner").find(".icons");
  $icons.find("a").on("click", function(e){
    e.preventDefault();
    var $this = $(this);
    $icons.find("li").removeClass("current");
    $this.parent("li").addClass("current");
    //console.log();

    var $info = $("#banner").find(".info");
    $info.find("h1").html($this.data("title"));
    $info.find("div").html($this.data("text"));

    $("#banner").backstretch($this.data("image"));
  });


  //slide partners
  if($('.list_partners').length > 0){
    $('.slider .arrow').click(function (){

      //next
      if ($(this).hasClass('right')) {
        $atual = $('.slider .items .current');
        if($atual.next().length >0){
          $prox = $atual.next();
          $prox.addClass('current');
          $atual.removeClass('current');
        }


      }else{
        //prev
        $atual = $('.slider .items .current');
        if($atual.prev().length >0){
          $atual.prev().addClass('current');
          $atual.removeClass('current');
        }
      }
    });
  }
  if ($('#voices').length >0) {
    $( "#voices article:nth-child(2n)" ).addClass('last');
  }
  if ($('#procurament').length >0) {
    $( ".methodology li:nth-child(3)" ).addClass('last');
  }
  if ($('#project').length >0) {
    $( ".four_columns .column:nth-child(3)" ).addClass('last');
  }
  if ($('.cases').length >0) {
    $( ".cases .item:nth-child(3n)" ).addClass('last');


    $('.loadmore').click(function(e){
      e.preventDefault();
      var $this = $(this);

      $this.hide();
      $('#dvLoad').show();

      var divisor = $('.cases');
      // carrega o conteudo
      var content = $('<div class="new_content"></div>');
      var newContent = $('.new_content').html();
      content.load('procurament_more.html', {}, function()
      {
        // oculta o loader e slideDown as noticias carregadas
        $('#dvLoad').hide();
        $('.new_content').slideDown();
      });
      // coloca o conteudo no DOM
      divisor.append(content);

      $this.show();
    });
  }

  var andandomenu=false;

  function addBack(classe){
    $('.responsive_menu .levels').find('.'+classe).prepend('<li><a class="back" href="javascript:;">Back</a></li>')
  }
  //Menu REsponsive
  if($('.responsive_menu').length>0){
    $('.responsive_menu .tgl').click(function (){
      $('.responsive_menu .levels').toggle();
      $(this).toggleClass('opened');
      $('.responsive_menu .levels').css('left','0px');
      $('.responsive_menu li.has_sub>a').click(function (e){
        e.preventDefault();
        $(this).closest('ul').find('.current').removeClass('current');
        $(this).parent().addClass('current');

        var max_height = 442;
        secondeHeight = $('.responsive_menu  li.current .second').outerHeight();
        max_height = secondeHeight > max_height ? secondeHeight : max_height;

        thirdHeight = $('.responsive_menu li.current .second li.current .third').outerHeight();
        max_height = thirdHeight > max_height ? thirdHeight : max_height;

        $('.responsive_menu .levels').css('min-height',max_height+"px");
        $('.responsive_menu  li.current .second').css('min-height',max_height+"px");
        $('.responsive_menu li.current .second li.current .third').css('min-height',max_height+"px");
        if($(window).width()<768 && !andandomenu){
          andandomenu=true;
          $('.responsive_menu .levels').animate({left:'-='+$(window).width()+'px'},'fast',function(){
            andandomenu=false;
          });
        }

      });

});
addBack('second');
addBack('third');
$('.responsive_menu .levels').find('.back').click(function(e){
  e.preventDefault();
  if($(window).width()<768 && !andandomenu){
    andandomenu=true;
    $('.responsive_menu .levels').animate({left:'+='+$(window).width()+'px'},'fast',function(){
      andandomenu=false;
    });
  }
})
}
  //END Menu REsponsive

  //language_links_mobile
  var $ul = $("#header").find(".language_links");
  $("#header").find(".wrapper:eq(0)").prepend($ul.clone().removeClass('language_links').addClass('language_links_mobile').remove('.separator'));
  if ($('.language_links_mobile').length>0) {
    $('.language_links_mobile .current').click(function (){
      $(this).parent().toggleClass('opened');
    });
  }
  //END language_links_mobile


  resize();
  scroller();
});

function ready_joiuns () {
  //ajuste altura
  $('.joinus_page .page .content').css('min-height',($('body').height()-100)+'px');

  //vacancies slider
  if($('.vacancies').length >0){
    var qtde_itens = $('.vancancies_list .items li').length;
    var largura = qtde_itens *(304+24);
    $('.vancancies_list .items').css('width',largura+'px');

    var qtde_bullets = 0;
    if ((qtde_itens%3) == 0) {
      qtde_bullets = qtde_itens/3;
    }else{
      qtde_bullets = Math.round( qtde_itens/3 ) + 1;
    }
    if($(window).width()<768){
      qtde_bullets = qtde_itens;
    }
    for (var i = qtde_bullets - 1; i >= 0; i--) {
      if (i==0) {
        $('.bullets').prepend($('<li class="current"><a href="#">o</a></li>'));
      }else{
        $('.bullets').prepend($('<li class=""><a href="#">o</a></li>'));
      }
    }
    $('.bullets').css('width',(qtde_bullets*22)+'px');
    $('.bullets li a').click(function (e){
      e.preventDefault();
      var doingSlide = false;
      if (!doingSlide) {
        doingSlide = true;
        $(this).closest('ul').find('.current').removeClass('current');
        $(this).parent().addClass('current');

        var left = 0;
        var indice = $(this).parent().index();
        left = indice * ($('.vancancies_list').width()+24);

        $('.vancancies_list .items').animate({left:'-'+left+'px'},'fast',function (){
          doingSlide = false;
        });

      }
    });


  }
}

var fazendoJoin = false;
function joinusPage(){
  console.log('call' ,fazendoJoin);
  if (!fazendoJoin) {
    fazendoJoin = true;

    $('.joinus').fadeOut(function (){

      //close and remove
      if ($('.joinus').hasClass('close')) {
        console.log('fecha');
        $('.joinus_page').fadeOut(function (){
          $('.joinus_page').remove();
        });
        $('.joinus').removeClass('close');
        scroller();
        $('.joinus').fadeIn(function () {
          fazendoJoin = false;
        });
      }else{
        //open
        console.log('abre');
        $blankdiv = $('<div class="joinus_page"></div>');
        $.get('joinus.html',function(data){
          $blankdiv.html(data);
          $('body').append($blankdiv);

          $('.joinus').addClass('close');
          ready_joiuns();
          scroller();
          $('.joinus').fadeIn(function () {
            fazendoJoin = false;
          });
        });
      }

    });
  }
}

$(window).resize(function(){
  resize();  
})
$(window).scroll(function (oEvent) {
  scroller();
});

function resize(){
  // console.log($(window).width());



  if($(window).width()<768){
    if($('#header .search').find('.tglsearch').length<1){
      $tglsearch = $('<a href="javascript:;" class="tglsearch">Search</a>');
      $('#header .search').prepend($tglsearch)
      $tglsearch.click(function (){
        $('#header .search input, #header .search button').toggle();
        $('#header .search').toggleClass('opened');
        $('#header .right').toggleClass('opened');
      });

    }    
  }else{
    if($('#header .search').find('.tglsearch').length>0){
      $('#header .search').find('.tglsearch').remove();
    }

  }

  //tablet and cell
  if($(window).width()<960){



    if ($('.news .blocks.left').length>0) {

      if ($('.column:not(.news) .was_left').length <1) {
        $('.news .blocks.left>div').addClass('was_left');
        $htmlleft = $('.news .blocks.left').html();
        $('.news').next().find('.blocks').append($($htmlleft));

        $where = $('.column:not(.news) div.where_work').clone();
        // console.log($where);
        $('.column:not(.news) div.where_work').remove();
        $('.column:not(.news) .clearfix.was_left').remove();
        $where.insertBefore('.column:not(.news) div.green');
        //$('#div1').insertAfter('#div3');
        //$('#div3').insertBefore('#div2');
        $('.twitter_timeline .twitter-timeline').attr('width','200');
        if($(window).width()<768){
          $('.twitter_timeline .twitter-timeline').attr('width','242');

          $laranja = $('.column:not(.news) div.projects').clone();        
          $('.column:not(.news) div.projects').remove();        
          $laranja.insertBefore('.column:not(.news) div.newsletter');

          $roxo = $('.column:not(.news) div.where_work').clone();        
          $('.column:not(.news) div.where_work').remove();        
          $roxo.insertBefore('.column:not(.news) div.twitter_timeline');

          $verde = $('.column:not(.news) div.green').clone();        
          $('.column:not(.news) div.green').remove();        
          $verde.insertBefore('.column:not(.news) div.twitter_timeline');
        }
      }      
    }
  }else{
    if ($('.column:not(.news) .was_left').length>0) {
      $('.column:not(.news) .was_left').remove();
    }

  }

  //gallery
  if($(window).width()<960){
    if ($('.link_to_gallery').length>0) {
     $('.link_to_gallery').attr('width','708');
     $('.link_to_gallery').attr('height','532');
     if($(window).width()<768){
      $('.link_to_gallery').attr('width','284');
      $('.link_to_gallery').attr('height','190');
    }
  }
}else{
  if ($('.link_to_gallery').length>0) {
   $('.link_to_gallery').attr('width','796');
   $('.link_to_gallery').attr('height','532');
 }
}
}

function scroller(){
    // alert('adsasd');
    if ($(window).scrollTop() > 320) {
        // alert('adsasd');
        if($('.joinus').length > 0){
          // $('.joinus').addClass('fixed');
          
          $('.joinus').css('position','fixed');
          $('.joinus').css('top','259px');
          if($('.joinus').hasClass('close')){
          
            var right = $('.featured .wrapper').position().left +$('.featured .wrapper').width()+32;          
            //$('.joinus').css('left',left+'px');
            // console.log(right);
            $('.joinus').css('left','auto');
            $('.joinus').css('left',right+'px');
          }else{
            
            
            var left = $('.featured .wrapper').offset().left - 166;          
            $('.joinus').css('left',left+'px');
            
          }
        }
        
      }else{
        if($('.joinus').length > 0){
          
          if($('.joinus').hasClass('close')){
            
            var right = $('.featured .wrapper').position().left - 166;          
            
            // $('.joinus').removeClass('fixed');
            $('.joinus').css('position','absolute');
            $('.joinus').css('top','auto');
          $('.joinus').css('left','auto');
          }else{
            
            $('.joinus').css('position','absolute');
            $('.joinus').css('top','auto');
          // $('.joinus').removeClass('fixed');
          $('.joinus').css('left','-166px');
          }
        }                

      }

    }







