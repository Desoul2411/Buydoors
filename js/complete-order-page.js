//Phone enter mask 
jQuery(document).ready(function() {
    jQuery("#phone-input").mask("+375 (99) 999-99-99");
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
    $(popupName).addClass('opened');
    $('body').css('padding-right','17px');
};

//close popup
function closePopup() {
    $('body').css('overflow','auto');
    $('body').css('padding-right','0px');
    $('.popup').removeClass('opened');
};

// on click "Заказать звонок" button
$(".header-bottom__order-call-button").click(function(e) {
    showPopup('.popup_order-call');
});

//on click "Заказать звонок" inside popup button 
$('#order-call').submit(function(e){
    e.preventDefault();
    $('.popup_order-call').removeClass('opened');
    $('.popup__headline_thanks').text('Спасибо за заказ звонка!');
    showPopup('.popup_thanks');
});

//on click "Завершить оформление заказа"
$('#order-details-form').submit(function(e){
    e.preventDefault();
    //Ajax
    /* success: */
    $('.popup__headline_thanks').text('Спасибо за заказ!');
    showPopup('.popup_thanks');
});

// Подписка и соц.сети. on click "Подписаться"
$('.footer-block__email-form').submit(function(e){
    e.preventDefault();
    //Ajax
    /* success: */ 
    $('.popup__headline_info').text('Спасибо за подписку!');
    $('.popup__button_info').text('Вернуться назад');
    showPopup('.popup_info');
    $('.popup__button_info').click(function(e) {
        e.preventDefault();
        $(this).attr('href','#');
        closePopup();
        $(this).find("input").val("");
        $(this).trigger("reset");
    })
}); 

$('.popup__close-button').click(closePopup);

// close popup and menu when click on overlay
$(document).mouseup(function (e) { 
    var popup = $('.popup__block');
    var menuBlock = $('.menu-block');
    if (e.target!=menuBlock[0]&&menuBlock.has(e.target).length === 0 && e.target!=popup[0]&&popup.has(e.target).length === 0){
        closePopup();
    }
});