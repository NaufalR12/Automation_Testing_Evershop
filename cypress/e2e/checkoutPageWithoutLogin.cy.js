import CheckoutPageWithoutLogin from "../support/POM/checkoutPageWithoutLogin";

describe("TC05 - Checkout tanpa Login", () => {
  const checkoutPage = new CheckoutPageWithoutLogin();

  let checkoutData;

  before(() => {
    cy.fixture("checkout/checkoutDataWithoutLogin").then((data) => {
      checkoutData = data;
    });
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("TC05001 - Checkout berhasil dengan user yang belum login", () => {
    const { email, validShippingAddress, coupon, product } = checkoutData;

    // 1. Buka halaman home
    checkoutPage.visit();
    checkoutPage.verifyOnHomePage();

    // 2. Klik shop > accessories pada navbar
    checkoutPage.navigateToAccessories();

    // 3. Klik gambar/nama/harga produk
    const { name: productName, link: productLink } = product;
    checkoutPage.clickProduct(productName);
    checkoutPage.verifyOnProductDetailPage(productLink);

    // 4. Pilih warna produk
    const { color } = product;
    checkoutPage.selectColor(color);

    // 5. Masukkan jumlah produk
    const quantity = product.quantity.single;
    checkoutPage.setQuantity(quantity);
    checkoutPage.verifyQuantity(quantity);

    // 6. Klik Add to cart
    checkoutPage.clickAddToCart();

    // 7. Klik tombol checkout
    checkoutPage.clickCheckout();
    checkoutPage.verifyOnCheckoutPage();

    // 8. Isi email di contact information
    checkoutPage.fillEmail(email.valid);

    // 9. Isi semua data Shipping Address
    checkoutPage.fillShippingAddress(validShippingAddress);
    cy.wait(2000);

    // 10. Pilih Shipping Method
    checkoutPage.selectShippingMethod(checkoutData.shippingMethod.standard);
    cy.wait(1000);

    // 11. Pilih Billing Address: Same as shipping address
    checkoutPage.selectBillingAddressSameAsShipping();

    // 12. Pilih Payment Method: COD
    checkoutPage.selectPaymentMethodCOD();
    cy.wait(1000);

    // 13. Masukkan kode kupon
    checkoutPage.fillCoupon(coupon.valid);
    checkoutPage.clickApplyCoupon();
    cy.wait(1000);

    // 14. Klik tombol Place Order
    checkoutPage.clickPlaceOrder();

    // Verifikasi order success
    checkoutPage.verifyOnSuccessPage();
    checkoutPage.verifyOrderSuccess(validShippingAddress.fullName);
  });

  it("TC05002 - Checkout dengan different billing address yang valid", () => {
    const { email, validShippingAddress, validBillingAddress, product } =
      checkoutData;

    checkoutPage.addProductToCart(
      product.quantity.single,
      product.name,
      product.color,
    );
    checkoutPage.verifyOnCheckoutPage();

    // 1. Isi email
    checkoutPage.fillEmail(email.valid);

    // 2. Isi semua data dengan valid
    checkoutPage.fillShippingAddress(validShippingAddress);
    cy.wait(1000);

    checkoutPage.selectShippingMethod(checkoutData.shippingMethod.standard);
    cy.wait(1000);

    // 3. Pilih Billing Address: use a different billing address
    checkoutPage.selectDifferentBillingAddress();

    // 4. Isi semua data billing address yang valid
    checkoutPage.fillBillingAddress(validBillingAddress);
    cy.wait(1000);

    // 5. Pilih payment method
    checkoutPage.selectPaymentMethodCOD();
    cy.wait(1000);

    // 6. Klik place order
    checkoutPage.clickPlaceOrder();

    // Expected: Order berhasil
    checkoutPage.verifyOnSuccessPage();
    checkoutPage.verifyOrderSuccess(validShippingAddress.fullName);
    checkoutPage.verifyBillingAddressDisplayed(validBillingAddress);
  });

  it("TC05003 - Checkout dengan field kosong dan tidak valid", () => {
    const { email, product } = checkoutData;

    checkoutPage.addProductToCart(
      product.quantity.single,
      product.name,
      product.color,
    );
    checkoutPage.verifyOnCheckoutPage();

    // 2. Kosongkan field email
    checkoutPage.clearEmail();

    // 3. Masukkan email tanpa @
    checkoutPage.fillEmail(email.withoutAt);

    // 4. Masukkan email dengan kombinasi huruf, angka dan simbol selain @
    checkoutPage.fillEmail(email.withSpecialChars);

    // 5. Pilih billing address: use a different billing address
    checkoutPage.selectDifferentBillingAddress();

    // verikasi email
    checkoutPage.verifyInvalidEmailError();
    checkoutPage.clearShippingAddress();
    checkoutPage.clearBillingAddress

    // 6. Tombol place order tidak aktif dan menunjukkan select payment method
    checkoutPage.verifyPlaceOrderButtonShowsSelectPayment();

    // Pilih COD untuk memicu validasi field lainnya
    checkoutPage.selectPaymentMethodCOD();
    cy.wait(1000);

    // Expected: Muncul pesan di semua field mandatory
    
    checkoutPage.verifyRequiredFieldError("Full name");
    checkoutPage.verifyRequiredFieldError("Telephone");
    checkoutPage.verifyRequiredFieldError("Address");
    checkoutPage.verifyRequiredFieldError("City");
    checkoutPage.verifyRequiredFieldError("Postcode");
  });

  it("TC05004 - Checkout dengan invalid kupon", () => {
    const { email, validShippingAddress, coupon, product } = checkoutData;

    checkoutPage.addProductToCart(
      product.quantity.single,
      product.name,
      product.color,
    );
    checkoutPage.verifyOnCheckoutPage();

    // 1. Isi email
    checkoutPage.fillEmail(email.valid);

    // 2. Isi semua data dengan valid
    checkoutPage.fillShippingAddress(validShippingAddress);
    checkoutPage.selectShippingMethod(checkoutData.shippingMethod.standard);
    cy.wait(1000);
    checkoutPage.selectBillingAddressSameAsShipping();
    checkoutPage.selectPaymentMethodCOD();
    cy.wait(1000);

    // 3. Isi kode kupon yang invalid
    checkoutPage.fillCoupon(coupon.invalid);

    // 4. Klik apply
    checkoutPage.clickApplyCoupon();

    // Expected: Muncul pesan error
    checkoutPage.verifyCouponInvalid();
  });

  it("TC05005 - Checkout dengan mengisi semua field mandatory dengan teks panjang dan tidak valid (256 karakter)", () => {
    const {
      email,
      invalidLongTextShippingAddress,
      invalidLongTextBillingAddress,
      product,
      expectedMessages,
    } = checkoutData;

    // Precondition: Product sudah ditambahkan ke cart
    checkoutPage.addProductToCart(
      product.quantity.single,
      product.name,
      product.color,
    );
    checkoutPage.verifyOnCheckoutPage();

    // 1. Isi email
    checkoutPage.fillEmail(email.valid);

    // 2. Isi semua field mandatory dengan 256 karakter
    checkoutPage.fillShippingAddress(invalidLongTextShippingAddress);
    checkoutPage.selectShippingMethod(checkoutData.shippingMethod.standard);
    cy.wait(1000);

    // 3. Pilih billing address: use a different billing address
    checkoutPage.selectDifferentBillingAddress();

    // 4. Isi semua field mandatory dengan 256 karakter
    checkoutPage.fillBillingAddress(invalidLongTextBillingAddress);

    // 5. Pilih COD
    checkoutPage.selectPaymentMethodCOD();
    cy.wait(1000);

    // 6. Klik place order
    checkoutPage.clickPlaceOrder();

    // Expected: Muncul pesan error untuk telephone dan postcode
    checkoutPage.verifyInvalidFormatError(
      expectedMessages.telephoneInvalidFormat,
    );
    checkoutPage.verifyInvalidFormatError(
      expectedMessages.postcodeInvalidFormat,
    );

    // Expected: Checkout gagal
    checkoutPage.verifyCheckoutFailed();
  });
});
