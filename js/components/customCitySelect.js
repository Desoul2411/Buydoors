$('.header-bottom__city-select').each(function() {
    const _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 300; // длительность анимации 

    _this.hide();
    _this.wrap('<div class="select-city"></div>');
    $('<div>', {
        class: 'new-city-select',
        text: _this.children('option:disabled').text(),
        /* data_city_value: _this.children('option:disabled').text() */
    })
    .attr('data-value', _this.children('option:disabled').attr('data-value'))
    .insertAfter(_this)

    const selectHead = _this.next('.new-city-select');
    $('<div>', {
        class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item',
            html: $('<span>', {
                text: selectOption.eq(i).text()
            })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function() {
        if ( !$(this).hasClass('on') ) {
            $(this).addClass('on');
            selectList.slideDown(duration);

            selectItem.on('click', function() {
                let chooseItem = $(this).data('value');
                $('.city-select').val(chooseItem).attr('selected', 'selected');
                selectHead.text( $(this).find('span').text() );
                selectHead.attr( 'data-value' ,$(this).attr('data-value'));
                selectList.slideUp(duration);
                selectHead.removeClass('on');

                //Set appropriate phone number when choose city
                $('.header-bottom__numbers').css('display','none');
                $('.header-bottom__numbers').each(function() {
                    if(chooseItem === $(this).attr('data-value')) {
                        $(this).css('display','flex');
                    };
                });
            });

        } else {
            $(this).removeClass('on');
            selectList.slideUp(duration);
        }
    });
});


//Set appropriate phone number on page loaded
$('.header-bottom__numbers').each(function() {
    if( $(".new-city-select").attr('data-value') === $(this).attr('data-value')) {
        $(this).css('display','flex');
    };
});