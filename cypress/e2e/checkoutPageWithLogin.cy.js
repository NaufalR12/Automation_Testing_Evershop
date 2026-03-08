import CheckoutPageWithLogin from "../support/POM/checkoutPageWithLogin";

describe("TC04 - Checkout dengan Login", () => {
  const checkoutPageWithLogin = new CheckoutPageWithLogin();

  let checkoutData;

  before(() => {
    cy.fixture("checkout/checkoutDataWithLogin").then((data) => {
      checkoutData = data;
    });
  });

  beforeEach(() => {
    const { email, password } = checkoutData.loginUser;
    cy.loginWithSession(email, password);
    checkoutPageWithLogin.visit();
  });

  it("TC04001 - Checkout berhasil dengan user yang sudah login", () => {
    const { validShippingAddress, coupon } = checkoutData;

    checkoutPageWithLogin.verifyOnHomePage();
    checkoutPageWithLogin.navigateToAccessories();
    const { name: productName, link: productLink } = checkoutData.product;
    checkoutPageWithLogin.clickProduct(productName);
    checkoutPageWithLogin.verifyOnProductDetailPage(productLink);
    const { color } = checkoutData.product;
    checkoutPageWithLogin.selectColor(color);
    const quantity = checkoutData.product.quantity.single;
    checkoutPageWithLogin.setQuantity(quantity);
    checkoutPageWithLogin.verifyQuantity(quantity);
    checkoutPageWithLogin.clickAddToCart();
    checkoutPageWithLogin.clickCheckout();
    checkoutPageWithLogin.verifyOnCheckoutPage();
    checkoutPageWithLogin.fillShippingAddress(validShippingAddress);
    cy.wait(2000);
    checkoutPageWithLogin.selectShippingMethod(
      checkoutData.shippingMethod.standard,
    );
    cy.wait(1000);
    checkoutPageWithLogin.selectBillingAddressSameAsShipping();
    checkoutPageWithLogin.selectPaymentMethodCOD();
    cy.wait(1000);
    checkoutPageWithLogin.clickPlaceOrder();
    checkoutPageWithLogin.verifyOnSuccessPage();
    checkoutPageWithLogin.verifyOrderSuccess(validShippingAddress.fullName);
  });

  it("TC04002 - Checkout dengan different billing address yang valid", () => {
    const { validShippingAddress, validBillingAddress, product } = checkoutData;
    checkoutPageWithLogin.addProductToCart(
      product.quantity.single,
      product.name,
      product.color,
    );
    checkoutPageWithLogin.verifyOnCheckoutPage();
    checkoutPageWithLogin.fillShippingAddress(validShippingAddress);
    checkoutPageWithLogin.selectShippingMethod(
      checkoutData.shippingMethod.standard,
    );
    cy.wait(1000);
    checkoutPageWithLogin.selectDifferentBillingAddress();
    checkoutPageWithLogin.fillBillingAddress(validBillingAddress);
    checkoutPageWithLogin.selectPaymentMethodCOD();
    checkoutPageWithLogin.clickPlaceOrder();
    checkoutPageWithLogin.verifyOnSuccessPage();
    checkoutPageWithLogin.verifyOrderSuccess(validShippingAddress.fullName);
    checkoutPageWithLogin.verifyBillingAddressDisplayed(validBillingAddress);
  });

  it("TC04003 - Checkout dengan field mandatory kosong", () => {
    const { emptyShippingAddress, emptyBillingAddress, product } = checkoutData;

    checkoutPageWithLogin.addProductToCart(
      product.quantity.single,
      product.name,
      product.color,
    );
    checkoutPageWithLogin.verifyOnCheckoutPage();
    checkoutPageWithLogin.clearShippingAddress();
    checkoutPageWithLogin.selectDifferentBillingAddress();
    checkoutPageWithLogin.clearBillingAddress();
    checkoutPageWithLogin.verifyPlaceOrderButtonDisabled();
    checkoutPageWithLogin.selectPaymentMethodCOD();
    cy.wait(1000);
    checkoutPageWithLogin.verifyRequiredFieldError("Full name");
    checkoutPageWithLogin.verifyRequiredFieldError("Telephone");
    checkoutPageWithLogin.verifyRequiredFieldError("Address");
    checkoutPageWithLogin.verifyRequiredFieldError("City");
    checkoutPageWithLogin.verifyRequiredFieldError("Postcode");
  });

  it("TC04004 - Checkout dengan invalid kupon", () => {
    const { validShippingAddress, coupon, product } = checkoutData;

    checkoutPageWithLogin.addProductToCart(
      product.quantity.single,
      product.name,
      product.color,
    );
    checkoutPageWithLogin.verifyOnCheckoutPage();
    checkoutPageWithLogin.fillShippingAddress(validShippingAddress);
    checkoutPageWithLogin.selectShippingMethod(
      checkoutData.shippingMethod.standard,
    );
    cy.wait(1000);
    checkoutPageWithLogin.selectBillingAddressSameAsShipping();
    checkoutPageWithLogin.selectPaymentMethodCOD();
    checkoutPageWithLogin.fillCoupon(coupon.invalid);
    checkoutPageWithLogin.clickApplyCoupon();
    checkoutPageWithLogin.verifyCouponInvalid();
  });

  it.only("TC04005 - Checkout dengan mengisi semua field mandatory dengan teks panjang dan tidak valid (256 karakter)", () => {
    const {
      invalidLongTextShippingAddress,
      invalidLongTextBillingAddress,
      product,
      expectedMessages,
    } = checkoutData;

    // 1. Buka halaman checkout dengan produk di cart
    checkoutPageWithLogin.addProductToCart(
      product.quantity.single,
      product.name,
      product.color,
    );
    checkoutPageWithLogin.verifyOnCheckoutPage();

    // 2. Isi semua field mandatory dengan 256 karakter
    checkoutPageWithLogin.fillShippingAddress(invalidLongTextShippingAddress);

    checkoutPageWithLogin.selectShippingMethod(
      checkoutData.shippingMethod.standard,
    );
    cy.wait(1000);

    // 3. Pilih billing address: use a different billing address
    checkoutPageWithLogin.selectDifferentBillingAddress();

    // 4. Isi semua field mandatory dengan 256 karakter
    checkoutPageWithLogin.fillBillingAddress(invalidLongTextBillingAddress);

    // 5. Pilih COD
    checkoutPageWithLogin.selectPaymentMethodCOD();
    cy.wait(1000);

    // 6. Klik place order
    checkoutPageWithLogin.clickPlaceOrder();

    // Expected: Muncul pesan error untuk telephone dan postcode
    checkoutPageWithLogin.verifyInvalidFormatError(
      expectedMessages.telephoneInvalidFormat,
    );
    checkoutPageWithLogin.verifyInvalidFormatError(
      expectedMessages.postcodeInvalidFormat,
    );

    // Expected: Checkout gagal
    checkoutPageWithLogin.verifyCheckoutFailed();
  });
});
