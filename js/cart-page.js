
var productCardPrice;
var productCardAmount;
var totalSum;
var totalProductSumField;
var totalProductsCardSum = 0;
var totalCartSum;
var totalCartSumField = $('.make-order-block__total-price');

function setProductCardSum () {
    totalSum = (productCardPrice * productCardAmount).toFixed(2);
    totalProductSumField.attr('data-cart-product-sum', totalSum);
    totalProductSumField.text(totalSum);
};


function calculateTotalProductsCardSum() {
    totalProductsCardSum = 0;
    $('.in-cart__sum').each(function () {
        totalProductsCardSum += +$(this).attr('data-cart-product-sum');
    });
};


var serviceCheckedOptions;
var servicesTotalPrice = 0;

/*** Make order block ***/
function calculateTotalServicesPrice () {
    servicesTotalPrice = 0;
    serviceCheckedOptions =  $("input[type='checkbox'][name='select-service']:checked");
    $("input[type='checkbox'][name='select-service']:checked").each(function() {
        servicesTotalPrice += +$(this).attr('data-servive-price');
    });
};


function calculateTotalCartSum () {
    totalCartSum = (totalProductsCardSum + servicesTotalPrice).toFixed(2);
    totalCartSumField.attr('data-goods-total-price',totalCartSum);
    totalCartSumField.text(totalCartSum);
};


$("input[type='checkbox'][name='select-service']").on('change', function() {
    calculateTotalServicesPrice();
    calculateTotalCartSum();
});


$('.in-cart__list').each(function() {
    productCardPrice = $(this).find('.in-cart__price').attr('data-cart-product-price'); 
    productCardAmount = $(this).find('.in-cart__amount').val();
    totalProductSumField = $(this).find('.in-cart__sum');
    setProductCardSum();
});


// on '-' /'+' click
$('.in-cart__minus-button').on('click', function() {
    var curentCardAmountField = $(this).next();
    productCardAmount = $(this).next().val();
    productCardPrice = $(this).parent().parent().parent().find('.in-cart__price').attr('data-cart-product-price');
    totalProductSumField = $(this).parent().parent().parent().find('.in-cart__sum'); 

    if(productCardAmount == 1 ) {
        return productCardAmount;
    } else {
        productCardAmount--;
        curentCardAmountField.attr('value', productCardAmount);
        setProductCardSum();
        calculateTotalProductsCardSum();
        calculateTotalCartSum();
    };
}); 


$('.in-cart__plus-button').on('click', function() {
    var curentCardAmountField = $(this).prev();
    productCardAmount = $(this).prev().val();
    productCardPrice = $(this).parent().parent().parent().find('.in-cart__price').attr('data-cart-product-price');
    totalProductSumField = $(this).parent().parent().parent().find('.in-cart__sum');

    productCardAmount++;
    curentCardAmountField.attr('value', productCardAmount);
    setProductCardSum();
    calculateTotalProductsCardSum();
    calculateTotalCartSum();
});


//Check if there exist any products in cart
if ($('.in-cart__content').length === 0) {
    $('#in-cart__cart-form').html('<p class="in-cart__empty-cart-message">Корзина пуста!</p>');
};


//Calcute goods amount
var goodsInCartAmount = 0;
//Set goods amount
function setGoodsInCartAmount () {
    goodsInCartAmount = $('.in-cart__list_product-cart').length; 
    $('.order-block__ordered-amount').text(goodsInCartAmount);
    $('.make-order-block__goods-amount-number').text(goodsInCartAmount);
    $('.make-order-block__goods-amount-number').attr('data-total-goods-amount',goodsInCartAmount );
    $('.header-bottom__in-cart-amount').text(goodsInCartAmount);
};
setGoodsInCartAmount();


// Delete product from cart
$('.in-cart__del-button').on('click', function() {
    $(this).parent().parent().parent().remove();
    calculateTotalProductsCardSum();
    goodsInCartAmount--;
    setGoodsInCartAmount();
    calculateTotalCartSum();
    // if cart is empty
    if ($('.in-cart__content').html().trim() == '') { 
        $('#in-cart__cart-form').html('<p class="in-cart__empty-cart-message">Корзина пуста!</p>');
        $('.make-order-block__select-option-checkbox').removeAttr('checked');
        totalCartSum = 0;
        totalCartSumField.attr('data-goods-total-price',totalCartSum);
        totalCartSumField.text(totalCartSum)
        $('.make-order-block__select-option-checkbox').attr('disabled', 'disabled');
        $('.make-order-block__button').addClass('disabled');
    }
});

// Calculate total products сard Sum  
calculateTotalProductsCardSum();   // var totalProductsCardSum

// Calculate total services price sum
calculateTotalServicesPrice();  //  var servicesTotalPrice

// Calculate total cart sum
calculateTotalCartSum();   //  var totalCartSum


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