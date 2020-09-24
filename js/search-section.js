//Show/hide search block
let resultContainerOffsetTop;
let visibleScreenHeight;
let heightToSet;

const setResultContainerHeight = () => {
    resultContainerOffsetTop = $('.search-results-block__results-container').offset().top;
    visibleScreenHeight = $(document).outerHeight(true);
    heightToSet = visibleScreenHeight - resultContainerOffsetTop;
    $('.search-results-block__results-container').css('height',heightToSet);
    $('.search-results-block__results-container').css('overflow-y','scroll');
    window.addEventListener('resize', function(event){ 
        visibleScreenHeight = $(document).outerHeight(true);
        heightToSet = visibleScreenHeight - resultContainerOffsetTop;
        $('.search-results-block__results-container').css('height',heightToSet);
    });
};


const showSearchBlock = () => {
    $('.page-main-content').css('display','none');
    $('body').css('overflow','hidden');
    $('.page-search-content').css('display','block');
    $( document ).ready(setResultContainerHeight); 
};


const hideSearchBlock = () => {
    $('.page-search-content').css('display','none');
    $('body').css('overflow','auto');
    $('.page-main-content').css('display','block');
};

$('.header-bottom__search').on('click', showSearchBlock);
$('.search-bar__close-button').on('click',hideSearchBlock);


//AJAX
$("#order-details-form").submit(function (e) {
    e.preventDefault();

    //$('.form-container__message p').html("");
    var form = $(this);
    $.ajax({
        type: "POST",
        url: '',
        data: form.serialize(),
        success: function () {
            /* $('.form-container__message p').html("Вы успешно подписаны на инвестиционный дайджест. Изменить настройки подписки можно в <a href='/account' class='form-container__message_red_text'>личном кабинете</a>.");

            $('.form-container__message').addClass('form-container__message_show'); */
        },
        error: function () {
            /* $('.form-container__message p').text("При отправке данных произошла ошибка");

            $('.form-container__message').addClass('form-container__message_show'); */
        }
    });
    return false;
});


//add margin bottom to last result item for iPhone/iPad
if (navigator.userAgent.toLowerCase().match(/(ipad|iphone)/)) {
    alert('Вы используете Safari браузер.');
    $('.result-item').each(function() {
        $(this).css('margin-bottom','30px');
    })  
}



