// ReturnPolicyConfirmation START

// modules root START
var CustomJS = {}
CustomJS.ReturnPolicyConfirmation = (function () {
  function initialRender() {
    $('.step__footer').before(
      '<div class="ReturnPolicyConfirmation">' +
        '<input class="ReturnPolicyConfirmation__checkbox input-checkbox" type="checkbox">' +
        '<span class="ReturnPolicyConfirmation__link">Yes, I agree to the terms and conditions.</span>' +
        '<div class="ReturnPolicyConfirmation__popup ReturnPolicyConfirmation__popup_hidden">' +
          '<div class="ReturnPolicyConfirmation__popup-shadow"></div>' +
          '<div class="ReturnPolicyConfirmation__popup-window">' +
            '<div class="ReturnPolicyConfirmation__popup-close">&times;</div>'+
            '<div class="tble"><table class="checkboxtable" style=""><colgroup> <col width="142"> <col width="140"> <col width="212"> <col width="129"> </colgroup><tbody><tr><td><p dir="ltr"><span style="font-size: small;">DESTINATION</span></p></td><td><p dir="ltr"><span style="font-size: small;">PROCESSING TIME</span></p></td><td><p dir="ltr"><span style="font-size: small;">ESTIMATED SHIPPING TIME (Excluding processing)</span></p></td><td><p dir="ltr"><span style="font-size: small;">SHIPPING FEE</span></p></td></tr><tr><td rowspan="2"><p dir="ltr"><span style="font-size: small;">Domestic</span></p><p dir="ltr"><span style="font-size: small;">(below $100)</span></p></td><td rowspan="3"><p dir="ltr"><span style="font-size: small;">24-48 hours</span></p></td><td><p dir="ltr"><span style="font-size: small;">Ground: 2-4 business days</span></p></td><td><p dir="ltr"><span style="font-size: small;">$7.95</span></p></td></tr><tr><td><p dir="ltr"><span style="font-size: small;">Expedited - 3 day shipping</span></p></td><td><p dir="ltr"><span style="font-size: small;">$24.95</span></p></td></tr><tr><td><p dir="ltr"><span style="font-size: small;">Domestic</span></p><p dir="ltr"><span style="font-size: small;">(over $99)</span></p></td><td><p dir="ltr"><span style="font-size: small;">Ground: 2-4 business days</span></p></td><td><p dir="ltr"><span style="font-size: small;">Free shipping</span></p></td></tr><tr><td><p dir="ltr"><span style="font-size: small;">Hawaii (Flat Rate)</span></p></td><td><p dir="ltr"><span style="font-size: small;">24-48 hours</span></p></td><td><p dir="ltr"><span style="font-size: small;">2-4 business days</span></p></td><td><p dir="ltr"><span style="font-size: small;">$19.95</span></p></td></tr><tr><td><p dir="ltr"><span style="font-size: small;">Alaska (Flat Rate)</span></p></td><td><p dir="ltr"><span style="font-size: small;">24-48 hours</span></p></td><td><p dir="ltr"><span style="font-size: small;">2-4 business days</span></p></td><td><p dir="ltr"><span style="font-size: small;">$19.95</span></p></td></tr><tr><td><p dir="ltr"><span style="font-size: small;">Canada (Flat Rate)</span></p></td><td><p dir="ltr"><span style="font-size: small;">2-4 business days</span></p></td><td><p dir="ltr"><span style="font-size: small;">5-10 business days</span></p></td><td><p dir="ltr"><span style="font-size: small;">$24.95</span></p></td></tr><tr><td><p dir="ltr"><span style="font-size: small;">International</span></p></td><td><p dir="ltr"><span style="font-size: small;">2-4 business days</span></p></td><td><p dir="ltr"><span style="font-size: small;">7 - 10 business days (depending on your country)</span></p></td><td><p dir="ltr"><span style="font-size: small;">$49.95&nbsp;</span></p></td></tr></tbody></table></div>'+
            '<br><p><b>Processing Guidelines</b></p>' +
            '<p>Orders placed Monday through Friday at 9:00 am PST will begin processing on the same day. Orders placed on Friday after 9:00 am PST and through the weekend will begin processing on the following Monday. (Some brands processing times may vary so please refer to the brands product page for more specifics)</br>Please note that some brands have longer processing times. Refer to the product page descriptions for details.</p>' +
            '<p><b>General Return Policy</b></p>' +
            '<p>The general return policy applies to all products except sale items, dresses, and jewelry. You may return product(s) within 14 days for a full refund of the purchase price to the card used to make the purchase. To return an item (s) please email: <b>cs@couturecandy.com</b> to obtain your Return Merchandise Authorization (RMA).  Once you receive your RMA you will be emailed a Return Shipping Label (RSL) which you can use for returns. All item/s must be unworn and unaltered, and all original tags must be attached. Laundered, smoked in, used and worn items will not be accepted. Swimwear items must have all original tags and hygienic liners still attached.</p>' +
            '<p>Returns will not be accepted if you do not first obtain a Return Merchandise Authorization (RMA) from <b>cs@couturecandy.com</b>. If shipping was complimentary at checkout, original freight/handling cost will be deducted as will RSL cost if used. </p>' +
            '<p>Any returns which are received after 14 days will be accessed a 10% penalty fee.</p>' +
            '<p>Any returns without an RMA are subject to a penalty of 25% percent of the purchase amount.</p>' +
            '<p>We do not accept returns after 30 days.</p>' +
            '<p><b>Sale Products or Purchases with Coupon/Promotional Codes</b></p>' +
            '<p>Unlike many retailers we accept Sale product returns.  Sale Products returned are accepted within 5 days of receipt of an Return Authorization less a 20% penalty and issued a store credit less any original shipping/handling fees if shipping was complimentary at checkout.</p>' +
            '<p><b>Dress & Jewelry Return Policy</b></p>' +
            '<p>If you are not completely satisfied with your dress or jewelry purchase you may send your item(s) for return within 5 days of receipt. We provide full store credit as long as the product is received in new condition.  If you use our Return Shipping Label, the cost is deducted from your credit as are any freight/handling cost if shipping was complimentary at checkout.</p>' +
            '<p>To return an item(s) please email: <b>cs@couturecandy.com</b> to receive a Return Merchandise Authorization (RMA) number.<br>Our support team will issue you a Return Shipping Label for your convenience usually within one business day of receiving your request.</p>' +
            '<p>Any returns received after 5 days are subject to a 10% late fee.</p>' +
            '<p>Any returns without an RMA are subject to a penalty of 25% percent of the purchase amount.</p>' +
            '<p>Sale or Promo/Coupon code returns are subject to a 20% penalty of the purchase amount.</p>' +
            '<p>We do not accept returns after 30 days.<p>' + 
            '<p><b>Wedding Dresses</b></p>' +
            '<p>Unlike many bridal divisions of boutiques we do accept returns for wedding gowns.  We offer a 50% refund made in store credit which can be used site wide and valid for six months.  Returns without first requesting an RA # or received after 5 days of your return authorization will incur an additional 10% late fee.  All wedding dress returns received after 30 days will not be accepted. </p>' +
            '<p><b>Sizing Recommendations</b></p>' +
            '<p>Each designer tends to have a specific size guide, and not all designers follow size guides you normally refer to for sizing.  We highly recommend reviewing the size guide listed on the specific designer dress brand of choice before making your special occasion dress purchase.  As a general rule when in doubt of a size option, always chose the larger size if unsure. It is easy to take a dress in, but nearly impossible to add width.</b></p>' +
            '<p><b>Store Credit</b></p>' +
            '<p>Your store credit can be used on any product and are valid for six months from issuance. To use your store credit, simply sign into your account, and checkout as you normally would. At the payment step of checking out, your store credit will automatically be applied.</p>' +
            '<p><b>International Customers</b></p>' +
            '<p>Given the time for transit we extend the RA period to 10 business days.  Please note shipping, taxes, or duties are the responsibility of the customer and are non-creditable upon return. For international customers, we will not reimburse return shipping charges or any taxes/duties if any.  Returns received after 30 days of receipt will incur a 20% late fee.CoutureCandy accepts no risk of merchandise loss due to international shipment.</p>' +
            '<p><b>Exchanges</b></p>' +
            '<p>If you want to exchange your item for another size just email <b>cs@couturecandy.com</b>. One of our staff will be happy to place a new order for you and provide a RMA for your previous purchase following our standard return policy.  Please note re-stocking fees may apply, and the shipping cost of returning your original purchase will be deducted from your refunded amount.</p>' +
             '<p><b>Order Cancellation, Damaged Product & Refused Packages</b></p>' +
            '<p>If you wish to cancel your order after placing your order online or refuse delivery after placing an order online please note that all orders which have begun processing for shipment will incur a 25% penalty and issued a monetary refund. If your order has already shipped, it will be considered as an original purchase and processed as any other return following our store policies. Any order which is cancelled within two hours of placement will be charged a 10% cancellation fee and issued a monetary refund. Customer have 24 hours after delivery to inform us if and products they received are damaged or has a defect. Please pay attention to Special Order future delivery dates shown on the product page.  Once an order is placed these immediately begin processing to meet specific delivery deadlines. </p>' +
            '<p><b>Special Orders Delivery Dates & Returns:</b></p>' +
            '<p>Every special order dress is different when it comes to delivery dates and why we provided the estimated date of arrival on specific product pages. Sometime we can get a specific dress in 3-10 days, others can take from 6-12 weeks if the dress needs to be put into production. If the dress is already in production the dates specified on the product page are accurate. Less than 25% of special order dresses need to be put in production. Please note we do accept returns for Special Order Dresses but be aware that any Special Order Dress Returns carry a 20% restocking fee less original freight cost and are issued store credit.</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    )
  }

  function toggleButton() {
    var $button = document.getElementsByClassName('step__footer__continue-btn')[0]
    var $checkbox = document.querySelector('.ReturnPolicyConfirmation__checkbox')
    $button.disabled = $checkbox.checked ? false : true
    $($button).toggleClass('btn--disabled')
  }

  function addEvents() {
    $('.ReturnPolicyConfirmation__checkbox').on('click', function () {
      toggleButton()
    })
  }

  function run() {
    initialRender()
    toggleButton()
    addEvents()
  }

  function init() {
    var condition = ($('.main__content .step').data('step') === 'payment_method')
    if (!condition) return
    var interval = setInterval(function () {
      if ($('.step__footer__continue-btn').length) {
        clearInterval(interval)
        run()
      }
    }, 50)
  }

  return {
    init: init
  }
}());
CustomJS.ReturnPolicyConfirmation.init();

 $('#order-summary .order-summary__sections .order-summary__section--discount').before(
      '<div class="order-summary__section couponbuttonsection">' +
        '<div id="couponbutton">Promo/Gift Certificate</div>' +
      '</div>'
    );
  $("#order-summary .order-summary__sections .order-summary__section--discount").hide();
 $("#couponbutton").click(function(){
        $("#order-summary .order-summary__sections .order-summary__section--discount").toggle('slow');
    });
// ReturnPolicyConfirmation END