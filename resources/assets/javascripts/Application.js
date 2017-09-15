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
    }

    _toggleRequestItems(){
        let $requestForm = $('.header-storage__request-items-form');
        let $items = $('.item-single');
        $('#requestItems').on('click', function (event) {
            event.preventDefault();
            if($requestForm.length){
                $requestForm.css({
                    'transform': 'translateX(0)'
                });
            }
            if($items.length){
                $items.each(function () {
                    let $this = $(this);
                    $this.find('.storage-item__action .storage-item__edit').hide();
                    $this.find('.storage-item__action .storage-item__check').show();
                })
            }
        })
    }

    _removeCategoryInItemEdit(){
        let $catDelete = $('.edit-items-block__single-category-delete');
        if($catDelete.length){
            $catDelete.on('click', function (event) {
                let $this = $(this);
                event.preventDefault();
                console.log($this);
                $this.parent().fadeOut();
            });
        }
    }
}

new Application();
