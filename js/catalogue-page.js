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
    })


    $('.catalogue-goods-block__filter-button').click(function() {
        $('body').css('overflow','hidden');
    })

    //Close filter block
    $('.filter-block__close-filter-block').click(function() {
        $('.catalogue-goods-block__filter-button').trigger('click');
        $('body').css('overflow','auto');
    });

    // close main-menu mobile block when click on overlay
    $('.catalogue-section__background-main-menu-mobile').click(function() {
        $('.header-bottom__burger-menu-open-button').trigger('click');
        $('body').css('overflow','auto');
    });

    // close filter mobile block when click on overlay
    $('.catalogue-section__background-mobile').click(function() {
        $('.catalogue-goods-block__filter-button').trigger('click');
        $('body').css('overflow','auto');
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

     // close popup when click on overlay
     $(document).mouseup(function (e) { 
        var popup = $('.popup__block');
        var filterBlock = $('.filter-block');
        var menuBlock = $('.menu-block');
        if (e.target!=menuBlock[0]&&menuBlock.has(e.target).length === 0 && e.target!=filterBlock[0]&&filterBlock.has(e.target).length === 0 && e.target!=popup[0]&&popup.has(e.target).length === 0){
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
        $('.popup__button_link').text('Закрыть');
        $('.popup__button_link').attr('href','#');
        showPopup('.popup_thanks');
        $('.popup__button_link').click(function(e) {
            e.preventDefault();
            closePopup();
        });

         //Ajax
         $.ajax({
            type: "POST",
            url: 'mail.php',
            data: $(this).serialize(),
            success: function () {
                closePopup();
                $('.popup__headline_thanks').text('Спасибо за заказ звонка!');
                $('.popup__text_thanks').text('Наши специалисты свяжутся с вами в ближайшее время');
                $('.popup__button_link').text('Закрыть');
                $('.popup__button_link').attr('href','#');
                showPopup('.popup_thanks');
                $('.popup__button_link').click(function(e) {
                    e.preventDefault();
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