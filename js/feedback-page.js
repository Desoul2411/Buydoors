$( document ).ready(function() {
    /*** Choose rating mark ***/
    const ratingItemList = document.querySelectorAll('.rating__item');
    const ratingItemsArray = Array.prototype.slice.call(ratingItemList);

    ratingItemsArray.forEach(item =>
        item.addEventListener('click',() => {
            const {itemValue} = item.dataset;
            item.parentNode.dataset.totalValue = itemValue;
            console.log(itemValue);
            //itemValue - выставленная пользователем оценка
            //запрос на бэкэнд
        })
    );


    //Phone input mask
    jQuery(document).ready(function() {
        jQuery("#leave-feedback-client-phone").mask("+375 (99) 999-99-99");
    });

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

    //close popup and menu when click on overlay
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
            $(this).find("input").val("");
            $(this).trigger("reset");
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
    
    
    /***Custom serialize form data function starts***/
    const serializeProductCommentForm = ()=> {
		let data = {};
		data.name = $('#leave-feedback-client-name').val();
        data.phone = $('#leave-feedback-client-phone').val();
        data.email = $('#leave-feedback-client-email').val();
        data.mark = $(".leave-feedback-form__rating").attr('data-total-value');
		return data
	};
     /***Custom serialize form data function end***/


    //"ОСТАВЬТЕ СВОЙ ОТЗЫВ" form. on click "Отправить" button
    $('.leave-feedback-form').submit(function(e) {
        e.preventDefault();
        // удалить (перенести в success)
        showPopup('.popup_info-thanks-mark');
        $('.popup__button_info').click(closePopup);
        $.ajax({
            type: "POST",
            url: 'index.php',
            data: serializeProductCommentForm(),
            success: function () {
                closePopup();
                showPopup('.popup_info-thanks-mark');
                $('.popup__button_info').click(closePopup);
                $(this).find("input").val("");
                $(this).trigger("reset"); 
            },
            error: function () {
                /* closePopup();
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