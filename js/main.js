$( document ).ready(function() {
    /*** owl carousel  ***/
    /* menu section slider */
    $('.slider-block__slider').owlCarousel({
        loop: true,
        items: 1,
        nav:true,
        navText: true,
        dots: true,
        autoplay:true,
        autoplayTimeout:3500,
        autoplayHoverPause:true,
        smartSpeed: 700,
        responsive:{
            
        }
    });

    /* news section slider */
    $('.news-slider-block').owlCarousel({
        loop: true,
        items:4,
        margin: 11,
        nav:true,
        navText: true,
        responsive: true,
        dots: false,
        responsive:{
            1025 : {
                items:4,
            },
            
            768 : {
                items:3,
            }, 
            551 : {
                items:2,
            }, 
            320 : {
                items:1,
            }, 
        }
   
    });

    /* new-goods-section slider */
    $('.new-goods-section__goods-block').owlCarousel({
        loop: true,
        items: 5,
        margin: 12,
        nav:true,
        navText: true,
        dots: false,
        responsive:{
            1271 : {
                items:5,
            },
            
            1023     : {
                items:4,
            }, 
            768 : {
                items:3,
            }, 
            551 : {
                items:2,
            }, 
            320 : {
                items:1,
            }, 
        }
    });

    /* discount-section slider */
    $('.discount-section__goods-block').owlCarousel({
        loop: true,
        items: 5,
        margin: 12,
        nav:true,
        navText: true,
        dots: false,
        responsive:{
            1271 : {
                items:5,
            },
            
            1023     : {
                items:4,
            }, 
            768 : {
                items:3,
            }, 
            551 : {
                items:2,
            }, 
            320 : {
                items:1,
            }, 
        }
    });

    /* comments-section slider */
    $('.comments-section__comments-block').owlCarousel({
        loop: true,
        items: 3,
        margin: 15,
        nav:true,
        navText: true,
        dots: false,
        responsive:{
            800 : {
                items:3,
            }, 
            551 : {
                items:2,
            }, 
            320 : {
                items:1,
            }, 
        }
    });


    //Burger button change
    $('.header-bottom__burger-menu-open-button').click(function() {
        $('.header-bottom__open-button-bar').toggleClass('active');

        if($('.header-bottom__open-button-bar').hasClass('active')) {
            $('body').css('overflow','hidden');
        }
    });

    $('.menu-section__background-mobile').click(function() {
        $('.header-bottom__burger-menu-open-button').trigger('click');
    });


    


    //Responsive burger menu. Open submenu
    $('.menu-block__nested-arrow-button').click(function() {
        //$(this).next('ul').css({'opacity' : '1', 'visibility':'visible','height': 'auto'});
        $(this).next('ul').toggleClass('menu-list-opened');
        $(this).parent().toggleClass('menu-item-opened');
        $(this).toggleClass('active');

        if($(this).closest(".menu-block__menu-item_nested-nested").hasClass('menu-item-opened')) {
            $(this).closest(".menu-block__menu-item_nested-nested").siblings().fadeOut(200);
        } else {
            $(this).closest(".menu-block__menu-item_nested-nested").siblings().fadeIn(200);
        }


/*  console.log($(this).closest(".menu-block__menu-item_nested-nested").siblings().fadeOut()) */
       /*  console.log($(this).closest(".menu-block__menu-item_nested-nested").closest(".menu-list-opened").find('.menu-block__menu-item')); */
        /* let itemsCollection = $(this).closest(".menu-block__menu-item_nested-nested").closest(".menu-list-opened").find('.menu-block__menu-item');
        /* console.log(itemsCollection) */
       /*  for (i = 0; i <= itemsCollection.length; i++) {
            console.log(itemsCollection[i]);
        } */ 
       /*  if() */
       
        /* if ($(this).next('ul').height() === 0) {
            $(this).next('ul').height(listOpenedHeight)
        } else {
            listOpenedHeight = $(this).next('ul').height();
        } */



       /*  console.log(listOpenedHeight);
        if(
            $(this).next('ul').hasClass('menu-list-opened')
            ) {
                $(this).next('ul').height(listOpenedHeight)
            alert('has')
        } else {
            alert('not')
            $(this).next('ul').height('0')
        } */
    })




    //Phone enter mask 
    jQuery(document).ready(function() {
        jQuery("#order-call-client-phone").mask("+375 (99) 999-99-99");
    });


    //show popup
    function showPopup(popupName) {
        $('body').css('overflow','hidden');
        $(popupName).addClass('opened');
        $('body').css('padding-right','17px');
    };

    //close popup
    function closePopup() {
        $('body').css('overflow','auto');
        $('body').css('padding-right','0px');
        $('.popup').removeClass('opened');
    };

    $('.popup__close-button').click(closePopup);


    // close popup and menu when click on overlay
    $(document).mouseup(function (e) { 
        var popup = $('.popup__block');
        var menuBlock = $('.menu-block');
        if (e.target!=menuBlock[0]&&menuBlock.has(e.target).length === 0 && e.target!=popup[0]&&popup.has(e.target).length === 0){
            closePopup();
        }
    });


    // on click "Заказать звонок" button
    $(".header-bottom__order-call-button").click(function(e) {
        showPopup('.popup_order-call');
    });

    //on click "Заказать звонок" inside popup button 
    $('#order-call').submit(function(e){
        e.preventDefault();
        closePopup();
        $('.popup__headline_thanks').text('Спасибо за заказ звонка!');
        $('.popup__text_thanks').text('Наши специалисты свяжутся с вами в ближайшее время');
        showPopup('.popup_thanks');

         //Ajax
         $.ajax({
            type: "POST",
            url: 'mail.php',
            data: $(this).serialize(),
            success: function () {
                closePopup();
                $('.popup__headline_thanks').text('Спасибо за заказ звонка!');
                $('.popup__text_thanks').text('Наши специалисты свяжутся с вами в ближайшее время');
                showPopup('.popup_thanks');
                $(this).find("input").val("");
                $(this).trigger("reset"); 
            },
            error: function () {
                /* 
                $('.popup__headline_thanks').text('При отправке данных произошла ошибка!');
                showPopup('.popup_data-send-error');
                $('.popup__button_info').click(closePopup);
                $(this).find("input").val("");
                $(this).trigger("reset");  */
            }
        });
        return false; 
    });

    // Подписка и соц.сети. on click "Подписаться" button
    $('.footer-block__email-form').submit(function(e){
        e.preventDefault();
        // удалить (перенести в success)
        $('.popup__headline_info').text('Спасибо за подписку!');
        $('.popup__button_info').text('Закрыть');
        showPopup('.popup_info');
        $('.popup__button_info').click(function(e) {
            e.preventDefault();
            $(this).attr('href','#');
            closePopup();
        }); 
        
        //Ajax
        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: $(this).serialize(),
            success: function () {
                $('.popup__headline_info').text('Спасибо за подписку!');
                $('.popup__button_info').text('Закрыть');
                showPopup('.popup_info');
                $('.popup__button_info').click(function(e) {
                    e.preventDefault();
                    $(this).attr('href','#');
                    closePopup();
                    $(this).find("input").val("");
                    $(this).trigger("reset"); 
                }); 
            },
            error: function () {
                /* 
                $('.popup__headline_thanks').text('При отправке данных произошла ошибка!');
                showPopup('.popup_data-send-error');
                $('.popup__button_info').click(closePopup);
                $(this).find("input").val("");
                $(this).trigger("reset");  */
            }
        });
        return false; 
    }); 
});










