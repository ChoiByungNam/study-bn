var $doc = $(document),
    $window = $(window);

var gallery = {
    def : {
        initData : 'data-init',
        WrapClass : '.js_item_wrap',
        itemClass : '.js_item',
        btnPrevClass : '.js_btn_prev',
        btnNextClass : '.js_btn_next',
        viewClass : 'js_view_item'
    }
};

gallery.init = function(obj){
    var _def = this.def,
        target = obj,
        objNext, objPrev, objItem;

    if( target.attr(_def.initData) !== undefined ) return false;
    target.attr(_def.initData, true);
    gallery.sett(target);
};

gallery.sett = function(obj){
    var _def = this.def,
        target = obj,
        objNext = target.find( _def.btnNextClass ),
        objPrev = target.find( _def.btnPrevClass ),
        objItem = target.find( _def.itemClass );

    if( !target.find('.'+_def.viewClass).length ){
        objItem.eq(0).addClass(_def.viewClass);
    }
    objItem.css('left','-100%');
    objItem.eq(0).css('left',0);

    objNext.on('click', function(){
        gallery.motion('next', gallery.wrapObjFind(this));
    });

    objPrev.on('click', function(){
        gallery.motion('prev', gallery.wrapObjFind(this));
    });

};

gallery.wrapObjFind = function(obj){
    var _def = this.def;
    return $(obj.closest(_def.WrapClass));
};

gallery.motion = function(action, obj){
    var _def = this.def,
        target = obj,
        objItem = target.find( _def.itemClass ),
        totalNum = objItem.length-1,
        nowIdx = target.find('.'+_def.viewClass).index(),
        targetIdx,
        hideLeft,
        defLeft,
        targetObj;
    if( obj.hasClass('js_anim') ) return false;
    if(action === 'next'){
        targetIdx = ( nowIdx+1 > totalNum ) ? 0 : nowIdx+1;
        hideLeft = '-100%';
        defLeft = '100%';
        targetObj = objItem.eq(targetIdx);
    }else{
        targetIdx = ( nowIdx-1 < 0 ) ? totalNum :  nowIdx-1;
        hideLeft = '100%';
        defLeft = '-100%';
        targetObj = objItem.eq(targetIdx);
    }

    gallery.move( hideLeft, objItem.eq(nowIdx) );
    objItem.eq(targetIdx).css('left',defLeft);
    gallery.move( 0, targetObj );

    objItem.eq(nowIdx).removeClass(_def.viewClass);
    objItem.eq(targetIdx).addClass(_def.viewClass);
};

gallery.move = function(leftValue, obj){
    var _def = this.def;

    obj.closest(_def.WrapClass).addClass('js_anim');
    obj.stop().animate({
        left:leftValue
    },{
        duration:300,
        complete:function(){
            obj.closest(_def.WrapClass).removeClass('js_anim');
        }
    });
};


function intervalStart( func, sec ){
    setInterval(function(){
        func();
    },sec);
}



$doc.ready(function(){
	gallery.init($('#gallery01'));
    gallery.init($('#gallery02'));
});
