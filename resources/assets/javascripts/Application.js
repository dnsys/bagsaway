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
        this._removeCategoryInItemEdit();
        this._addCategoryForm();
        this._toggleRequestItems();
        this._requestItemsButton();
        this._headerStepsCancel();
        this._dateTimePicker();
        this._selectInit();
        this._mobileDropDown();
    }

    _requestItemsButton(){
        $('.storage-item__action-type').on('click', function(event){
            event.preventDefault();
            let $this = $(this);
            let $buttonTarget = $this.data('id');
            console.log($buttonTarget);
            let $editHeader = $('.header-storage__request-items-step[data-target="' + $buttonTarget + '"]');
            $('.js-cancel-button').addClass('header-storage__cancel-button--active');
            $editHeader.css({
                'transform': 'translateX(0)',
                'z-index': '1'
            });
            showModal($buttonTarget);
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
        let showModal = elementID => {
            this._showModal(elementID);
        }
    }

    _toggleRequestItems(){
        let $firstStep = $('.header-storage__request-items-step[data-step="1"]');
        let $secondStep = $('.header-storage__request-items-step[data-step="2"]');
        let $items = $('.item-single');
        let $boxesItems = $('.storage-item.item-boxes');
        $('#requestItems').on('click', function (event) {
            event.preventDefault();
            let $this = $(this);
            $('.js-cancel-button').addClass('header-storage__cancel-button--active');
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
        $('a[data-target="moveToNextStep"]').on('click', event => {
            event.preventDefault();
            $secondStep.css({
                'transform': 'translateX(0)',
                'z-index': '1'
            });
            this._showModal('requestItemsModal');
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    }

    _removeCategoryInItemEdit(){
        $(document).on('click', '.request-modal__single-category-delete', function (event) {
            //event.preventDefault();
            let $this = $(this);
            $this.parent().fadeOut();
            console.log('click remove');
        })
    }

    _addCategoryForm(){
        $('.request-modal__add-category-add-button').on('click', function (event) {
            event.preventDefault();
            console.log('click add');
            let $this = $(this);
            let $categoriesContainer = $('.request-modal__categories-wrap');
            let $input = $this.parent().find('input[name="addCategoryItem"]')
            let $content = $input.val();
            $('<span class="request-modal__single-category">' + $content + '<a href="#" class="request-modal__single-category-delete">' +
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

    _headerStepsCancel(){
        let $requestForm = $('.header-storage__request-items-step');
        let $items = $('.item-single');
        let $boxesItems = $('.storage-item.item-boxes');
        $('.js-cancel-button').on('click', function (event) {
            event.preventDefault();
            let $this = $(this);
            console.log($this);
            $this.removeClass('header-storage__cancel-button--active');
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

    _showModal(modalId){
        console.log(modalId);
        $.magnificPopup.open({
            items: {
                src: '#' + modalId,
            },
            type: 'inline',
            preloader: false,
            mainClass: 'base-modal-window mfp-fade',
            autoFocusLast: false,
            // fixedContentPos: false,
            // prependTo: '.wrapper__content',
            alignTop: true,
            showCloseBtn: false,
            closeOnBgClick: false,
            callbacks: {
                open: function () {
                    $('body').addClass('modal-opened');
                },
                close: function () {
                    $('body').removeClass('modal-opened');
                }
            }
        });
    }

    _mobileDropDown(){
        $('.js-mobile-menu').on('click', function () {
            let $this = $(this);
            $this.toggleClass('header-storage__menu-mobile--opened');
            let $list = $this.siblings('.header-storage__menu-mobile-list');
            $list.slideToggle();
            $('body').toggleClass('modal-opened');
        });
    }
}

new Application();
