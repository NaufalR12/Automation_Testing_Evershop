import ProductPage from "../support/POM/productPage";

describe("TC03 - Product Page Evershop", () => {
  const productPage = new ProductPage();
  let productData;

  before(() => {
    cy.fixture("products/productData").then((data) => {
      productData = data;
    });
  });

  it("TC03001 - Navigasi melalui slider, collections, dan kategori", () => {
    // 1. Buka halaman home
    productPage.visitHome();
    productPage.verifyHomeUrl();

    // 2. Klik tombol previous dan next pada slider
    productPage.clickSliderNext();
    productPage.verifySliderChanged();

    productPage.clickSliderPrevious();
    productPage.verifySliderChanged();

    productPage.clickSliderNext();
    productPage.verifySliderChanged();

    // 3. Klik tombol view collection pada slide aktif
    productPage.clickViewCollection();
    cy.wait(1000);
    productPage.verifyUrlAcc();

    // 4. Kembali ke home dan klik shop now
    productPage.clickBreadcrumbHome();
    productPage.verifyHomeUrl();

    productPage.clickShopNow();
    cy.wait(1000);
    productPage.verifyUrlAcc();

    // 5. Kembali ke home dan klik shop kids
    productPage.clickBreadcrumbHome();
    productPage.verifyHomeUrl();

    productPage.clickShopKids();
    productPage.verifyUrlAcc();

    // 6. Kembali ke home dan klik shop women
    productPage.clickBreadcrumbHome();
    productPage.verifyHomeUrl();

    productPage.clickShopWomen();
    productPage.verifyUrlAcc();

    // 7. Klik shop men dan kembali ke home
    productPage.clickBreadcrumbHome();
    productPage.verifyHomeUrl();

    productPage.clickShopMen();
    productPage.verifyUrlAcc();

    // Kembali ke home
    productPage.clickBreadcrumbHome();
    productPage.verifyHomeUrl();
  });

  it("TC03002 - Klik gambar produk dan verifikasi detail", () => {
    // 1. Berada di halaman home
    productPage.visitHome();
    productPage.verifyHomeUrl();

    // 2. Klik gambar/produk pertama dan ambil namanya
    productPage.clickFirstProductAndGetNameByImage().then((productName) => {
      // Verifikasi halaman detail produk
      productPage.verifyProductDetailLoaded();

      // Verifikasi nama produk di detail sesuai dengan yang diklik
      productPage.verifyProductDetailMatchesName(productName);
    });

    // 3. Kembali ke home
    productPage.clickBreadcrumbHome();
    productPage.verifyHomeUrl();

    // 4. Klik nama produk dan ambil namanya
    productPage.clickFirstProductAndGetNameByName().then((productName) => {
      // Verifikasi halaman detail produk
      productPage.verifyProductDetailLoaded();

      // Verifikasi nama sesuai dengan yang diklik
      productPage.verifyProductDetailMatchesName(productName);
    });

    // 5. Kembali ke home
    productPage.clickBreadcrumbHome();
    productPage.verifyHomeUrl();

    // 6. Klik harga produk dan ambil namanya
    productPage.clickFirstProductAndGetNameByPrice().then((productName) => {
      // Verifikasi halaman detail produk
      productPage.verifyProductDetailLoaded();

      // Verifikasi nama sesuai dengan yang diklik
      productPage.verifyProductDetailMatchesName(productName);
    });
  });

  it("TC03003 - User menggunakan fitur sort produk berdasarkan default, price, dan name", () => {
    const { sortBy, sortOrder } = productData.sortOptions;

    // 1. Berada di halaman accessories
    productPage.visitAccessories();
    cy.wait(1000);
    productPage.verifyUrlAcc();

    // 2. Sort by default - ASC
    productPage.selectSortBy(sortBy.default);
    productPage.selectSortOrder(sortOrder.asc);
    productPage.verifySortedProducts("default", "asc");

    // 3. Sort by default - DESC (toggle sort order)
    productPage.selectSortOrder(sortOrder.desc);
    productPage.verifySortedProducts("default", "desc");

    // 4. Sort by price
    productPage.selectSortBy(sortBy.price);

    // 5. Sort price - ASC
    productPage.selectSortOrder(sortOrder.asc);
    productPage.verifySortedProducts("price", "asc");

    // 6. Sort price - DESC (toggle sort order)
    productPage.selectSortOrder(sortOrder.desc);
    productPage.verifySortedProducts("price", "desc");

    // 7. Sort by name
    productPage.selectSortBy(sortBy.name);

    // 8. Sort name - ASC
    productPage.selectSortOrder(sortOrder.asc);
    productPage.verifySortedProducts("name", "asc");

    // 9. Sort name - DESC (toggle sort order)
    productPage.selectSortOrder(sortOrder.desc);
    productPage.verifySortedProducts("name", "desc");
  });

  it("TC03004 - Filter produk berdasarkan price range dan warna", () => {
    productPage.visitAccessories();
    cy.wait(1000);
    productPage.verifyUrlAcc();

    // 2. Menggeser rentang nilai price menggunakan slider dengan ID spesifik
    const { min, max } = productData.filter.priceRange;
    productPage.adjustPriceRange(min, max);

    // Verifikasi Active Filters muncul
    productPage.verifyPriceRangeActive(min, max);

    // Verifikasi URL berisi parameter price range
    productPage.verifyPriceRangeUrl(min, max);

    // 3. Mencentang warna produk
    productData.filter.colors.forEach((color) => {
      productPage.selectColorFilter(color);
    });
    cy.wait(5000);
    const selectedColorIds = productData.filter.colors.map(
      (color) => productData.filter.colorIds[color],
    );
    productPage.verifyColorFilterUrl(selectedColorIds);
  });

  it("TC03005 - User memilih warna produk pada halaman detail dan tambahkan ke cart", () => {
    // 1. Buka halaman detail produk
    productPage.visitProductDetail(
      productData.navigation.modernCeramicVaseGreen,
    );

    // 2. Klik pilihan warna produk
    const selectedColor = productData.filter.colors[0]; // Black
    productPage.selectColor(selectedColor);

    // Verifikasi URL berisi parameter color dengan ID yang sesuai
    const selectedColorId = productData.filter.colorIds[selectedColor];
    productPage.verifyProductColorUrl(selectedColorId);

    // 3. Klik add to cart
    productPage.clickAddToCart();

    // Verifikasi produk ditambahkan ke cart
    cy.wait(1000);
    productPage.verifyProductAddedToCart();
  });

  it("TC03006 - User menambahkan produk dengan jumlah yang valid", () => {
    // 1. Buka halaman detail produk
    productPage.visitProductDetail(
      productData.navigation.modernCeramicVaseGreen,
    );

    // 2. Pilih warna
    const selectedColor = productData.filter.colors[3];
    productPage.selectColor(selectedColor);

    // Masukkan jumlah produk yang valid
    productPage.setQuantity(productData.productDetail.validQuantity);

    // 3. Klik add to cart
    productPage.clickAddToCart();

    // Verifikasi produk berhasil ditambahkan
    cy.wait(1000);
    productPage.verifyProductAddedToCart();
  });

  it("TC03007 - User menambahkan produk dengan jumlah dan warna tidak valid", () => {
    // 1. Buka halaman detail produk
    productPage.visitProductDetail(
      productData.navigation.modernCeramicVaseGreen,
    );

    // 2. Kosongkan pilihan warna (jangan pilih warna)
    // 3. Isi jumlah produk <= 0
    productPage.setQuantity(productData.productDetail.invalidQuantity);
    productPage.clickAddToCart();
    productPage.verifyErrorAddToCart();
    // 4. Pilih warna yang valid tapi jumlah produk melebihi stok
    const selectedColor = productData.filter.colors[3];
    productPage.selectColor(selectedColor);
    productPage.setQuantity(productData.productDetail.overstockQuantity);
    productPage.clickAddToCart();
    productPage.verifyOverAddToCart();
  });

  it("TC03008 - User menggunakan fitur pencarian dan menemukan produk", () => {
    // 1. Buka halaman home
    productPage.visitHome();
    productPage.verifyHomeUrl();

    // 2. Klik icon search
    productPage.clickSearchIcon();

    // 3. Ketik kata kunci produk dengan huruf kecil semua
    productPage.searchProduct(productData.search.validKeywordLowercase);

    // 4. Tekan enter
    productPage.submitSearch();

    // Verifikasi hasil pencarian dengan huruf kecil
    cy.wait(1000);
    productPage.verifySearchResultsVisible();

    // 5. Kembali ke home untuk search kedua
    productPage.clickBreadcrumbHome();
    productPage.verifyHomeUrl();

    // 6. Klik icon search lagi
    productPage.clickSearchIcon();

    // 7. Ketik kata kunci produk dengan huruf besar semua
    productPage.searchProduct(productData.search.validKeywordUppercase);

    // 8. Tekan enter
    productPage.submitSearch();

    // Verifikasi hasil pencarian dengan huruf besar
    cy.wait(1000);
    productPage.verifySearchResultsVisible();
  });

  it("TC03009 - User menggunakan fitur pencarian dengan dropdown", () => {
    // 1. Buka halaman home
    productPage.visitHome();
    productPage.verifyHomeUrl();

    // 2. Klik icon search
    productPage.clickSearchIcon();

    // 3. Ketik kata kunci produk
    productPage.searchProduct(productData.search.validKeyword);

    // 4. Verifikasi dropdown muncul
    productPage.verifySearchDropdownVisible();

    // 5. Klik produk dari dropdown
    productPage.clickSearchDropdownProduct(0);

    // Verifikasi halaman detail produk
    cy.wait(1000);
    productPage.verifyProductDetailLoaded();
  });

  it("TC03010 - User menggunakan filter price dengan menggeser nilai max", () => {
    // 1. Buka halaman accessories
    productPage.visitAccessories();
    cy.wait(1000);
    productPage.verifyUrlAcc();

    // 2. Menggeser rentang nilai max price
    const { min, max } = productData.filter.priceRangeMaxOnly;
    productPage.adjustPriceRange(min, max);

    // Verifikasi Active Filters muncul
    productPage.verifyPriceRangeActive(min, max);

    // Verifikasi URL berisi parameter price range
    productPage.verifyPriceRangeUrlMax(max);
  });

  it("TC03011 - User menggunakan filter price dengan menggeser nilai min", () => {
    // 1. Buka halaman accessories
    productPage.visitAccessories();
    cy.wait(1000);
    productPage.verifyUrlAcc();

    // 2. Menggeser rentang nilai min price
    const { min, max } = productData.filter.priceRangeMinOnly;
    productPage.adjustPriceRange(min, max);

    // Verifikasi Active Filters muncul
    productPage.verifyPriceRangeActive(min, max);

    // Verifikasi URL berisi parameter price range
    productPage.verifyPriceRangeUrlMin(min);
  });

  it("TC03012 - User menggeser min price = max price", () => {
    // 1. Buka halaman accessories
    productPage.visitAccessories();
    cy.wait(1000);
    productPage.verifyUrlAcc();

    // 2. Menggeser rentang nilai min price sesuai max price
    const { min, max } = productData.filter.priceRangeMinEqualsMax;
    productPage.adjustPriceRange(min, max);

    // Verifikasi Active Filters muncul
    productPage.verifyPriceRangeActive(min, max);

    // Verifikasi URL berisi parameter price range
    productPage.verifyPriceRangeUrlMin(min);
  });

  it("TC03013 - User menggeser max price = min price", () => {
    // 1. Buka halaman accessories
    productPage.visitAccessories();
    cy.wait(1000);
    productPage.verifyUrlAcc();

    // 2. Menggeser rentang nilai max price sesuai min price
    const { min, max } = productData.filter.priceRangeMaxEqualsMin;
    productPage.adjustPriceRange(min, max);

    // Verifikasi Active Filters muncul
    productPage.verifyPriceRangeActive(min, max);

    // Verifikasi URL berisi parameter price range
    productPage.verifyPriceRangeUrlMax(max);
  });

  it.only("TC03014 - User menggunakan fitur pencarian dengan field kosong", () => {
    // 1. Buka halaman home
    productPage.visitHome();
    productPage.verifyHomeUrl();

    // 2. Klik icon kaca pembesar di navbar
    productPage.clickSearchIcon();

    // 3. Tekan enter tanpa mengetik kata kunci apa pun
    productPage.submitSearch();

    // Expected: 
    cy.wait(1000);
    productPage.verifyHomeUrl();
  });
});
