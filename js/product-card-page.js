$( document ).ready(function() {
    //Phone enter mask 
    jQuery(document).ready(function() {
        jQuery("#order-call-client-phone").mask("+375 (99) 999-99-99");
    });

    jQuery(document).ready(function() {
        jQuery(".good-description-block__order-call-form-input").mask("+375 (99) 999-99-99");
    });

    jQuery(document).ready(function() {
        jQuery("#product-comment-client-phone").mask("+375 (99) 999-99-99");
    });


    /*** Choose rating mark ***/
    const ratingItemList = document.querySelectorAll('.rating__item');
    const ratingItemsArray = Array.prototype.slice.call(ratingItemList);

    ratingItemsArray.forEach(item =>
        item.addEventListener('click',() => {
            const {itemValue} = item.dataset;
            item.parentNode.dataset.totalValue = itemValue;
        })
    );


    //Select product color  //
    var selectedProductColor = $('.good-description-block__color-link.active').attr('data-product-color');
    $('.good-description-block__color-selected').attr('data-selected-product-color',selectedProductColor);
    $('.good-description-block__color-selected').text(selectedProductColor);

    $('.good-description-block__color-link').on('click', function(e) {
        e.preventDefault();
        $('.good-description-block__color-link').each(function() {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        selectedProductColor = $(this).attr('data-product-color');
        $('.good-description-block__color-selected').attr('data-selected-product-color',selectedProductColor);
        $('.good-description-block__color-selected').text(selectedProductColor);
    });

    //Selected color value to send via AJAX - selectedProductColor
    

    //Get item set name and price values
    var productNameValue;
    var productSetPrice;
    var productAmount;
    var totalSum;

    function getValuePriceAmount() {
        productNameValue = $("input[type='radio'][name='item-set']:checked").val();
        productSetPrice = $("input[type='radio'][name='item-set']:checked").parent().parent().next().attr('data-set-price');
        productAmount = $('.good-description-block__amount').val();
    }
    getValuePriceAmount();

    function setTotalSum() {
        totalSum = (productSetPrice * productAmount).toFixed(2);
        $('.good-description-block__total-price').attr('data-total-price', totalSum);
        $('.good-description-block__total-price').text(totalSum);
    };
    setTotalSum();


    // on '+' /'-' click
    $('.good-description-block__plus-button').on('click', function() {
        productAmount++;
        $('.good-description-block__amount').attr('value', productAmount);
        setTotalSum();
    });

    $('.good-description-block__minus-button').on('click', function() {
        if(productAmount == 1 ) {
            return productAmount;
        } else {
            productAmount--;
            $('.good-description-block__amount').attr('value', productAmount);
            setTotalSum();
        };
    });

    // onChange
    $("input[type='radio'][name='item-set']").on('change',function() {
        getValuePriceAmount();
        setTotalSum();
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


    /***Custom serialize form data function starts***/
    const serializeProductCommentForm = ()=> {
		let data = {};
		data.name = $('#product-comment-client-name').val();
        data.phone = $('#product-comment-client-phone').val();
        data.email = $('#product-comment-client-email').val();
        data.mark = $(".popup__rating").attr('data-total-value');
		return data
	};
     /***Custom serialize form data function end***/

    //on click "Оставить оценку" button 
    $('.good-description-block__leave-mark-button').click(function() {
        showPopup('.popup_product-comment');
    });


    //on click "Оставить оценку" popup inner button
    $('#product-comment-form').submit(function(e) {
        e.preventDefault();
        // удалить (перенести в success)
        closePopup();
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
        

    // on click "Купить в один клик" button  
    $(".good-description-block__order-call-form").submit(function(e) {
        e.preventDefault();
        $('.popup__headline_thanks').text('Спасибо за заказ!');
        $('.popup__text_thanks').text('Наши специалисты свяжутся с вами в ближайшее время для уточнения деталей заказа');
        showPopup('.popup_thanks');
    });

    
    // on click "Добавить в корзину" button   '.popup_add-to-cart'
    $(".good-description-block__add-to-cart-button").click(function (e) {
        $('.popup__headline_add-to-cart').text('Товар добавлен в корзину');
        showPopup('.popup_add-to-cart-info');

    // e.preventDefault();

        //$('.form-container__message p').html("");

    // var form = $(this);
        /* $.ajax({
            type: "POST",
            url: 'index.php',
            data: [],
            success: function () {
                $('.form-container__message p').html("Товар успешно добавлен в корзину");

            $('.form-container__message').addClass('form-container__message_show');
            ShowModal()
            },
            error: function () {
                $('.form-container__message p').text("При отправке данных произошла ошибка");

            $('.form-container__message').addClass('form-container__message_show');
            ShowModal()
            }
        });
        return false; */
    });

    // Подписка и соц.сети. on click "Подписаться"
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
               /*  $('.popup__headline_thanks').text('При отправке данных произошла ошибка!');
                showPopup('.popup_data-send-error');
                $('.popup__button_info').click(closePopup);
                $(this).find("input").val("");
                $(this).trigger("reset");   */
            }
        });
        return false; 
    });


    //zoom lens for good main image
    var $easyzoom = $('.easyzoom').easyZoom();

    //Change display mode on mobile devices
    if ($(window).width() <= 1024) {
        $('.easyzoom').removeClass('easyzoom--adjacent');
        $('.easyzoom').addClass('easyzoom--overlay');
    }


    // Adjust good main image size depending on image aspect ratio 
    var imgAcpectRatio = $('.good-card-section__good-image-block').width() / $('.good-card-section__good-image-block').height();
    if(imgAcpectRatio > 0.65) {
       $('.good-card-section__good-image-block').addClass('wide-image');
    }

});


/* seen-goods-section slider */
$('.seen-goods-section__goods-block').owlCarousel({
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
        
        1023 : {
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





