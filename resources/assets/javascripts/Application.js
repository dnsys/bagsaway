import $ from 'jquery';
window.jQuery = $;
window.$ = $;
require('jquery-nice-select');
import magnificPopup from 'magnific-popup';
import datetimepicker from 'eonasdan-bootstrap-datetimepicker';

class Application{
    constructor(){
        console.log('application start')
        this._init();
    }

    _init(){
        this._toggleRequestItems();
        this._removeCategoryInItemEdit();
        this._addCategoryForm();
        this._requestModalOptions();
        this._headerStepsCancel();
        this._dateTimePicker();
        this._selectInit();
    }

    _toggleRequestItems(){
        let $firstStep = $('.header-storage__request-items-step[data-step="1"]');
        let $secondStep = $('.header-storage__request-items-step[data-step="2"]');
        let $items = $('.item-single');
        let $boxesItems = $('.storage-item.item-boxes');
        $('#requestItems').on('click', function (event) {
            event.preventDefault();
            let $this = $(this);
            $this.hide();
            $('#newStorageOrder').hide();
            $('#requestItemsCancel').show();
            $firstStep.css({
                'transform': 'translateX(0)',
                'z-index': '1'
            });
            $items.each(function () {
                let $this = $(this);
                $this.find('.storage-item__action .storage-item__edit').hide();
                $this.find('.storage-item__action .storage-item__check').show();
            });
            if($boxesItems.length){
                $boxesItems.each(function () {
                    let $this = $(this);
                    $this.addClass('storage-item--inactive');
                });
            }
        });
        $('a[data-target="moveToNextStep"]').on('click', function (event) {
            event.preventDefault();
            $secondStep.css({
                'transform': 'translateX(0)',
                'z-index': '1'
            });
            $.magnificPopup.open({
                items: {
                    src: '#requestItemsModal',
                },
                type: 'inline',
                preloader: false,
                mainClass: 'base-modal-window mfp-fade',
                fixedContentPos: false,
                //fixedBgPos: false,
                prependTo: '.wrapper__content',
                autoFocusLast: false,
                alignTop: true,
                showCloseBtn: false,
                closeOnBgClick: false
            });
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    }

    _removeCategoryInItemEdit(){
        $(document).on('click', '.edit-items-block__single-category-delete', function (event) {
            let $this = $(this);
            event.preventDefault();
            $this.parent().fadeOut();
        })
    }

    _addCategoryForm(){
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

    _requestModalOptions(){
        $('.storage-item__action-type').on('click', function () {
            let $this = $(this);
            let $buttonTarget = $this.data('id');
            let $editHeader = $('.header-storage__request-items-step[data-target="' + $buttonTarget + '"]');
            $('#newStorageOrder').hide();
            $('#requestItems').hide();
            $('#requestItemsCancel').show();
            $editHeader.css({
                'transform': 'translateX(0)',
                'z-index': '1'
            });
            $.magnificPopup.open({
                items: {
                    src: '#'+$buttonTarget,
                },
                type: 'inline',
                preloader: false,
                mainClass: 'base-modal-window mfp-fade',
                fixedContentPos: false,
                //fixedBgPos: false,
                prependTo: '.wrapper__content',
                autoFocusLast: false,
                alignTop: true,
                showCloseBtn: false,
                closeOnBgClick: false
            });
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    }

    _headerStepsCancel(){
        let $requestForm = $('.header-storage__request-items-step');
        let $items = $('.item-single');
        let $boxesItems = $('.storage-item.item-boxes');
        $('#requestItemsCancel').on('click', function (event) {
            event.preventDefault();
            let $this = $(this);
            console.log($this);
            $this.hide();
            $('#newStorageOrder').show();
            $('#requestItems').show();
            $requestForm.css({
                'transform': 'translateX(-100%)'
            });
            $items.each(function () {
                let $this = $(this);
                $this.find('.storage-item__action .storage-item__edit').show();
                $this.find('.storage-item__action .storage-item__check').hide();
            });
            if($boxesItems.length){
                $boxesItems.each(function () {
                    let $this = $(this);
                    $this.removeClass('storage-item--inactive');
                });
            }
            $.magnificPopup.close();
        });
    }

    _dateTimePicker(){
        $('#datetimepicker1').datetimepicker();
    }

    _selectInit(){
        $('select').niceSelect();
    }
}

new Application();
