import $ from 'jquery';
window.jQuery = $;
window.$ = $;
require('bootstrap');

class Application{
    constructor(){
        console.log('application start')
        this._init();
    }

    _init(){
        this._toggleRequestItems();
        this._removeCategoryInItemEdit();
        this._addCategoryForm();
    }

    _toggleRequestItems(){
        let $requestForm = $('.header-storage__request-items-form');
        let $items = $('.item-single');
        $('#requestItems').on('click', function (event) {
            event.preventDefault();
            $requestForm.css({
                'transform': 'translateX(0)'
            });
            $items.each(function () {
                let $this = $(this);
                $this.find('.storage-item__action .storage-item__edit').hide();
                $this.find('.storage-item__action .storage-item__check').show();
            })
        })
    }

    _removeCategoryInItemEdit(){
        $(document).on('click', '.edit-items-block__single-category-delete', function (event) {
            let $this = $(this);
            event.preventDefault();
            $this.parent().fadeOut();
        })
    }

    _addCategoryForm(){
        // $('form').on('submit', function (event) {
        //     event.preventDefault();
        //     let $thisForm = $(this);
        //     let url = $thisForm.attr('action');
        //     let type = $thisForm.attr('method');
        //     let formData = $thisForm.serialize();
        //     $.ajax({
        //         url: url,
        //         type: type,
        //         data: formData
        //     }).done(data=>{
        //         console.log('done');
        //     }).fail(data=>{
        //         console.log('fail');
        //     });
        // });
        $('.edit-items-block__add-category-add-button').on('click', function (event) {
            event.preventDefault();
            let $this = $(this);
            let $categoriesContainer = $('.edit-items-block__categories-wrap');
            let $input = $this.parent().find('input[name="addCategoryItem"]')
            let $content = $input.val();
            $('<span class="edit-items-block__single-category">' + $content + '<a href="#" class="edit-items-block__single-category-delete">' +
                '<svg width="6px" height="6px" viewBox="0 0 6 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '<g id="Desc-Edit-Category" transform="translate(-627.000000, -444.000000)" fill="#0B7BFB">' +
                '<g id="Form" transform="translate(437.000000, 210.000000)">' +
                '<g id="Current-categories" transform="translate(38.000000, 200.000000)">' +
                '<polygon id="close-[#1511]" points="155.4338 37 158 39.5662 157.5659 40 155 37.4338 152.4338 40 152 39.5662 154.5659 37 152 34.4338 152.4338 34 155 36.5662 157.5659 34 158 34.4338"></polygon>' +
                '</g></g></g></g></svg></a></span>').appendTo($categoriesContainer).hide().fadeIn();
            $input.val('');
        });
    }
}

new Application();
