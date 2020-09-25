$( document ).ready(function() {

    //Phone enter mask 
    jQuery(document).ready(function() {
        jQuery("#order-call-client-phone").mask("+375 (99) 999-99-99");
    });


    //Burger button change
    $('.header-bottom__burger-menu-open-button').click(function() {
        $('.header-bottom__open-button-bar').toggleClass('active');
        if($('.header-bottom__open-button-bar').hasClass('active')){
            $('body').css('overflow','hidden');
        }
    });

    $('.menu-section__background-mobile').click(function() {
        $('.header-bottom__burger-menu-open-button').trigger('click');
    });


    $(".fancybox").jqPhotoSwipe({
        galleryOpen: function (gallery) {
        //with `gallery` object you can access all methods and properties described here http://photoswipe.com/documentation/api.html
        // gallery.zoomTo(1, {x:gallery.viewportSize.x/2,y:gallery.viewportSize.y/2}, 500);
        var pswp = new PhotoSwipe( /* ... */ );
        pswp.getZoomLevel(5);
        }
    });
    

    //show popup
    function showPopup(popupName) {
        $('body').css('overflow','hidden');
        $(popupName).fadeIn(300)
        $('body').css('padding-right','17px');
    };

    //close popup
    function closePopup() {
        $('body').css('overflow','auto');
        $('body').css('padding-right','0px');
        $('.popup').fadeOut(0)
    };

    $('.popup__close-button').click(closePopup);

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
        // удалить (перенести в success)
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