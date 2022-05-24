$( document ).ready(function() {

  $('#bc-sf-filter-tree-h .bc-sf-filter-option-block .bc-sf-filter-block-content .bc-sf-filter-option-box li > a[data-title ="SCALA"]').hide();

   if ($(window).width() < 768) {

$("#callBackVariant .product-tabs-wrapper .container .row .col-sm-12 .shopify-tabs #shopify-section-gl-product-page-description .basel-tab-wrapper #tab-description").appendTo('#callBackVariant .product-tabs-wrapper .container .row .col-sm-12 .shopify-tabs #shopify-section-gl-product-page-description .tabs li.description_tab ').show().end().fadeOut();

      $("#callBackVariant .product-tabs-wrapper .container .row .col-sm-12 .shopify-tabs #shopify-section-gl-product-page-description .basel-tab-wrapper #1497870204981").appendTo('#callBackVariant .product-tabs-wrapper .container .row .col-sm-12 .shopify-tabs #shopify-section-gl-product-page-description .tabs li.additional_information_tab ').end().fadeOut();

$("#callBackVariant .product-tabs-wrapper .container .row .col-sm-12 .shopify-tabs #shopify-section-gl-product-page-description .tabs li.description_tab DIV#tab-description").show();

         $("#callBackVariant .product-tabs-wrapper .container .row .col-sm-12 .shopify-tabs #shopify-section-gl-product-page-description .tabs li").on("click",function(){
            $(this).find('div').slideToggle();
             setTimeout(function(){
                $('#callBackVariant .product-tabs-wrapper .container .row .col-sm-12 .shopify-tabs #shopify-section-gl-product-page-description .tabs li .gl_active , #callBackVariant .product-tabs-wrapper .container .row .col-sm-12 .shopify-tabs #shopify-section-gl-product-page-description .tabs li.gl_active').removeClass();

             }, 100);
               
         });

   $(function(){
          var curDown = false,
              curYPos = 0,
              curXPos = 0;
          $(window).mousemove(function(m){
            if(curDown === true){
             $(window).scrollTop($(window).scrollTop() + (curYPos - m.pageY)); 
             $(window).scrollLeft($(window).scrollLeft() + (curXPos - m.pageX));
            }
          });
          
          $(window).mousedown(function(m){
            curDown = true;
            curYPos = m.pageY;
            curXPos = m.pageX;
          });
          
          $(window).mouseup(function(){
            curDown = false;
          });
        }) 
      }     
});
