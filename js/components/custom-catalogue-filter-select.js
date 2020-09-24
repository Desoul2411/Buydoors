$('.catalogue-goods-block__goods-filter-select').each(function() {
    const _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 300; // длительность анимации 

    _this.hide();
    _this.wrap('<div class="select-filter"></div>');
    $('<div>', {
        class: 'new-filter-select',
        text: _this.children('option:disabled').text(),
    }).attr('data-value', _this.children('option:disabled').attr('data-value'))
    .insertAfter(_this)

    const selectHead = _this.next('.new-filter-select');
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

                $('.select-filter').val(chooseItem).attr('selected', 'selected');
                selectHead.text( $(this).find('span').text());
                selectHead.attr( 'data-value' ,$(this).attr('data-value'));
                selectList.slideUp(duration);
                selectHead.removeClass('on');
            });

        } else {
            $(this).removeClass('on');
            selectList.slideUp(duration);
        }
    });
});

