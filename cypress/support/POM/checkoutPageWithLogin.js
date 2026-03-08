class CheckoutPage {
  // ═══════════════════════════════════════════════
  // ELEMENTS (Selectors)
  // ═══════════════════════════════════════════════

  // Account & Navigation
  get accountIcon() {
    return cy.get("svg.lucide-circle-user");
  }

  get shopMenu() {
    return cy.contains("button", /Shop/i);
  }

  get accessoriesLink() {
    return cy.get("a").contains(/Accessories/i);
  }

  // Product Page
  productCard(productAlt = null) {
    if (productAlt) {
      return cy.get(`[alt="${productAlt}"]`);
    }
    return cy.get(".product-card").first();
  }

  get productImage() {
    return cy.get(".product-card img").first();
  }

  get productName() {
    return cy.get(".product-card .product-name").first();
  }

  get productPrice() {
    return cy.get(".product-card .product-price").first();
  }

  getColorOption(color) {
    return cy
      .get("ul.variant-option-list")
      .contains("span, button, div", color, { matchCase: false });
  }

  get colorOption() {
    return cy.get('ul[class*="variant-option"] li').first();
  }

  get quantityField() {
    return cy.get('input[name="qty"]');
  }

  get addToCartButton() {
    return cy.contains("button", "ADD TO CART");
  }

  get cartIcon() {
    return cy.get("svg.lucide-shopping-cart");
  }

  // Cart Page
  get checkoutButton() {
    return cy.contains("Checkout");
  }

  // Checkout Page - Shipping Address
  get fullNameField() {
    return cy.get('[id="field-shippingAddress.full_name"]');
  }

  get telephoneField() {
    return cy.get('[id="field-shippingAddress.telephone"]');
  }

  get addressLine1Field() {
    return cy.get('[id="field-shippingAddress.address_1"]');
  }

  get cityField() {
    return cy.get('[id="field-shippingAddress.city"]');
  }

  get provinceField() {
    return cy.get('[id="field-shippingAddress.province"]');
  }

  get provinceDropdownButton() {
    return cy.get('button[id="field-shippingAddress.province"]');
  }

  getProvinceOption(province) {
    return cy.get('[role="option"]').contains(province);
  }

  get postcodeField() {
    return cy.get('[id="field-shippingAddress.postcode"]');
  }

  get countrySelect() {
    return cy.get('[id="field-shippingAddress.country"]');
  }

  get countryDropdownButton() {
    return cy.get('button[id="field-shippingAddress.country"]');
  }

  getCountryOption(countryCode) {
    return cy.get('[role="option"]').contains(countryCode);
  }

  // Shipping Method
  get shippingMethodStandard() {
    return cy.contains("Basic");
  }

  get shippingMethodExpress() {
    return cy.contains("Express");
  }

  // Billing Address
  get sameAsBillingCheckbox() {
    return cy.contains("Same as shipping address");
  }

  get differentBillingCheckbox() {
    return cy.contains("Use a different billing address");
  }

  // Billing Address Fields (Different)
  get billingFullNameField() {
    return cy.get('[id="field-billingAddress.full_name"]');
  }

  get billingTelephoneField() {
    return cy.get('[id="field-billingAddress.telephone"]');
  }

  get billingAddressLine1Field() {
    return cy.get('[id="field-billingAddress.address_1"]');
  }

  get billingCityField() {
    return cy.get('[id="field-billingAddress.city"]');
  }

  get billingProvinceField() {
    return cy.get('[id="field-billingAddress.province"]');
  }

  get billingProvinceDropdownButton() {
    return cy.get('button[id="field-billingAddress.province"]');
  }

  get billingPostcodeField() {
    return cy.get('[id="field-billingAddress.postcode"]');
  }

  get billingCountrySelect() {
    return cy.get('[id="field-billingAddress.country"]');
  }

  get billingCountryDropdownButton() {
    return cy.get('button[id="field-billingAddress.country"]');
  }

  getBillingCountryOption(countryCode) {
    return cy.get('[role="option"]').filter(":visible").contains(countryCode);
  }

  getBillingProvinceOption(province) {
    return cy.get('[role="option"]').filter(":visible").contains(province);
  }

  // Payment Method
  get paymentMethodCOD() {
    return cy.contains("Cash On Delivery");
  }

  // Coupon
  get couponField() {
    return cy.get('input[name="coupon"]');
  }

  get applyButton() {
    return cy.contains("button", "Apply");
  }

  get couponErrorMessage() {
    return cy.get(".Toastify__toast--error");
  }

  get couponSuccessMessage() {
    return cy.get(".discount-info, .coupon-success");
  }

  // Place Order
  get placeOrderButton() {
    return cy.contains("Place Order");
  }

  get placeOrderButtonInActive() {
    return cy.get(".checkout-button-section.mt-6");
  }

  // Success Page
  get orderNumber() {
    return cy.contains("Order #");
  }

  get thankYouMessage() {
    return cy.contains("Thank you");
  }

  get contactInformation() {
    return cy.contains("Contact information");
  }

  get shippingAddress() {
    return cy.contains("Shipping Address");
  }

  get paymentMethod() {
    return cy.contains("Payment Method");
  }

  get billingAddress() {
    return cy.contains("Billing Address");
  }

  // Error Messages
  get requiredFieldError() {
    return cy.get(".text-critical");
  }

  get paymentFailedError() {
    return cy.contains("payment failed");
  }

  // ═══════════════════════════════════════════════
  // ACTIONS (Methods)
  // ═══════════════════════════════════════════════

  visit() {
    cy.visit("https://demo.evershop.io/");
    cy.url().should("include", "evershop.io");
  }

  navigateToAccessories() {
    this.shopMenu.click();
    this.accessoriesLink.should("be.visible").click();
    cy.wait(1000);
    //cy.url().should("include", "/accessories");
  }

  clickProduct(productAlt = null) {
    this.productCard(productAlt).click();
    cy.wait(1000);
  }

  selectColor(color = null) {
    if (color) {
      this.getColorOption(color).click();
      cy.wait(500);
    } else {
      this.colorOption.click();
    }
    cy.wait(1000);
  }

  setQuantity(quantity) {
    this.quantityField.clear().type(quantity);
    cy.wait(1000);
  }

  clickAddToCart() {
    this.addToCartButton.click();
    cy.wait(500);
  }

  clickCheckout() {
    this.checkoutButton.click();
    cy.url().should("include", "/checkout");
  }

  fillShippingAddress(address) {
    if (address.fullName)
      this.fullNameField
        .clear()
        .type(address.fullName, { parseSpecialCharSequences: false });
    if (address.telephone)
      this.telephoneField
        .clear()
        .type(address.telephone, { parseSpecialCharSequences: false });
    if (address.address1)
      this.addressLine1Field
        .clear()
        .type(address.address1, { parseSpecialCharSequences: false });
    if (address.city)
      this.cityField
        .clear()
        .type(address.city, { parseSpecialCharSequences: false });
    if (address.country) {
      this.countryDropdownButton.click();
      cy.wait(300);
      this.getCountryOption(address.country).click();
    }
    if (address.province) {
      this.provinceDropdownButton.click();
      cy.wait(300);
      this.getProvinceOption(address.province).click();
    }
    if (address.postcode)
      this.postcodeField
        .clear()
        .type(address.postcode, { parseSpecialCharSequences: false });
  }

  clearShippingAddress() {
    this.fullNameField.clear();
    this.telephoneField.clear();
    this.addressLine1Field.clear();
    this.cityField.clear();
    this.postcodeField.clear();
  }

  selectShippingMethod(method) {
    if (method === "Basic") {
      this.shippingMethodStandard.click();
    } else if (method === "Express") {
      this.shippingMethodExpress.click();
    }
  }

  selectBillingAddressSameAsShipping() {
    this.sameAsBillingCheckbox.click();
  }

  selectDifferentBillingAddress() {
    this.differentBillingCheckbox.click();
    cy.wait(500);
  }

  fillBillingAddress(address) {
    if (address.fullName)
      this.billingFullNameField
        .clear()
        .type(address.fullName, { parseSpecialCharSequences: false });
    if (address.telephone)
      this.billingTelephoneField
        .clear()
        .type(address.telephone, { parseSpecialCharSequences: false });
    if (address.address1)
      this.billingAddressLine1Field
        .clear()
        .type(address.address1, { parseSpecialCharSequences: false });
    if (address.city)
      this.billingCityField
        .clear()
        .type(address.city, { parseSpecialCharSequences: false });
    if (address.country) {
      this.billingCountryDropdownButton.click();
      cy.wait(500);
      cy.get('[role="option"]')
        .filter(":visible")
        .contains(address.country)
        .should("be.visible")
        .click({ force: true });
      cy.wait(300);
    }
    if (address.province) {
      this.billingProvinceDropdownButton.click();
      cy.wait(500);
      cy.get('[role="option"]')
        .filter(":visible")
        .contains(address.province)
        .should("be.visible")
        .click({ force: true });
      cy.wait(300);
    }
    if (address.postcode)
      this.billingPostcodeField
        .clear()
        .type(address.postcode, { parseSpecialCharSequences: false });
  }

  clearBillingAddress() {
    this.billingFullNameField.clear();
    this.billingTelephoneField.clear();
    this.billingAddressLine1Field.clear();
    this.billingCityField.clear();
    this.billingPostcodeField.clear();
  }

  selectPaymentMethodCOD() {
    this.paymentMethodCOD.click();
  }

  fillCoupon(couponCode) {
    this.couponField.clear().type(couponCode);
  }

  clickApplyCoupon() {
    this.applyButton.click();
    cy.wait(1000);
  }

  applyCoupon(couponCode) {
    this.fillCoupon(couponCode);
    this.clickApplyCoupon();
  }

  clickPlaceOrder() {
    this.placeOrderButton.click();
    cy.wait(3000);
  }

  // Add Product to Cart Flow
  addProductToCart(quantity = 1, productAlt = null, color = null) {
    this.navigateToAccessories();
    this.clickProduct(productAlt);
    this.selectColor(color);
    cy.wait(1000);
    this.setQuantity(quantity);
    cy.wait(1000);
    this.clickAddToCart();
    cy.wait(1000);
    this.clickCheckout();
  }

  // ═══════════════════════════════════════════════
  // ASSERTIONS (Validasi)
  // ═══════════════════════════════════════════════

  verifyOnHomePage() {
    cy.url().should("eq", "https://demo.evershop.io/");
  }

  verifyOnProductDetailPage(productLink = null) {
    cy.url().should("include", productLink);
  }

  verifyOnCheckoutPage() {
    cy.url().should("eq", "https://demo.evershop.io/checkout");
  }

  verifyOnSuccessPage() {
    cy.url().should("include", "/checkout/success/");
    this.thankYouMessage.should("be.visible");
    this.orderNumber.should("be.visible");
  }

  verifyOrderSuccess(customerName) {
    this.verifyOnSuccessPage();
    this.contactInformation.should("be.visible");
    this.shippingAddress.should("be.visible");
    this.paymentMethod.should("be.visible");
    this.billingAddress.should("be.visible");
  }

  verifyQuantity(expectedQuantity) {
    this.quantityField.should("have.value", expectedQuantity);
  }

  verifyCouponApplied() {
    this.couponSuccessMessage.should("be.visible");
  }

  verifyCouponInvalid() {
    this.couponErrorMessage.contains("Invalid coupon");
  }

  verifyRequiredFieldError(fieldName) {
    cy.contains(`${fieldName} is required`).should("be.visible");
  }

  verifyPlaceOrderButtonDisabled() {
    this.placeOrderButtonInActive.should("be.visible");
  }

  verifyPaymentFailed() {
    this.paymentFailedError.should("be.visible");
    cy.url().should("include", "/cart");
  }

  verifyBillingAddressDisplayed(billingData) {
    cy.contains(billingData.fullName).should("be.visible");
    cy.contains(billingData.city).should("be.visible");
  }

  verifyInvalidFormatError(message) {
    cy.contains(message).should("be.visible");
  }

  verifyCheckoutFailed() {
    cy.url().should("eq", "https://demo.evershop.io/checkout");
  }
}

export default CheckoutPage;
