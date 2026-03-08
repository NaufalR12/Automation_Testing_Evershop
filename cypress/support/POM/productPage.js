class ProductPage {
  // ═══════════════════════════════════════════════
  // ELEMENTS (Selectors)
  // ═══════════════════════════════════════════════

  // Home Page Elements
  get sliderPreviousButton() {
    return cy.get("div.slick-slider > button.absolute > svg").first();
  }

  get sliderNextButton() {
    return cy.get("div.slick-slider > button.absolute > svg").last();
  }

  get viewCollectionButton() {
    return cy.contains("View Collection");
  }

  get shopNowButton() {
    return cy.contains("Shop Now");
  }

  get shopKidsLink() {
    return cy.contains("Shop kids");
  }

  get shopWomenLink() {
    return cy.contains("Shop women");
  }

  get shopMenLink() {
    return cy.contains("Shop men");
  }

  get breadcrumbHome() {
    return cy.contains("Home").should("be.visible");
  }

  // Featured Products Elements

  get productImage() {
    return cy.get(".transition-transform");
  }

  get productName() {
    // Ambil semua h3 atau elemen yang mungkin jadi nama produk
    // Menggunakan selector yang lebih umum dan aman
    return cy.get("h3, h5").filter(":visible");
  }

  get productPrice() {
    return cy.get('[class*="price"], span').filter(":visible");
  }

  // Product Detail Page Elements
  get productDetailImage() {
    return cy.get(".product_page_middle img, .product-view img");
  }

  get productDetailTitle() {
    return cy.get("h1, .product-name h1");
  }

  get productSku() {
    return cy.get('.product-sku, [class*="sku"]');
  }

  get productDetailPrice() {
    return cy.get('.product-price, [class*="price"]');
  }

  get productDescription() {
    return cy.get('.product-description, [class*="description"]');
  }

  get colorOptions() {
    return cy.get("ul.variant-option-list");
  }

  getColorOption(color) {
    // Cari color option yang lebih spesifik - di dalam variant/color selector area
    return cy
      .get("ul.variant-option-list")
      .contains("span, button, div", color, { matchCase: false });
  }

  get quantityField() {
    return cy.get('input[name="qty"], input[type="number"]');
  }

  get addToCartButton() {
    return cy.contains("ADD TO CART");
  }

  get cartIcon() {
    return cy.get('a[href="/cart"]');
  }

  // Sort By Elements
  get sortByDropdown() {
    // Ini adalah button yang membuka dropdown, bukan select element
    return cy.get("#base-ui-25");
  }

  get sortByOptions() {
    // Options yang muncul setelah dropdown dibuka
    return cy.get(
      '[role="listbox"] [role="option"], [data-slot="select-value"]',
    );
  }

  get sortOrderButtonAsc() {
    return cy.get('svg.lucide-arrow-up-wide-narrow, svg[class*="arrow-up"]');
  }

  get sortOrderButtonDesc() {
    return cy.get(
      'svg.lucide-arrow-down-wide-narrow, svg[class*="arrow-down"]',
    );
  }

  get sortOrderButton() {
    // Ambil tombol sort order (up atau down)
    return cy.get(
      "svg.lucide-arrow-up-wide-narrow, svg.lucide-arrow-down-wide-narrow",
    );
  }

  // Filter Elements
  get priceRangeSliderLow() {
    // Pointer untuk rentang harga minimum - ambil input range pertama (left handle)
    return cy.get('input[type="range"]').first();
  }

  get priceRangeSliderHigh() {
    // Pointer untuk rentang harga maximum - ambil input range kedua (right handle)
    return cy.get('input[type="range"]').last();
  }

  get priceRangeSlider() {
    return cy.get('input[type="range"]');
  }

  get colorFilterCheckbox() {
    return cy.get('[class*="filter"] input[type="checkbox"]');
  }

  getColorFilterByName(colorName) {
    // Map color names to their specific checkbox IDs
    const colorIdMap = {
      White: "#base-ui-16",
      Yellow: "#base-ui-18",
      Black: "#base-ui-20",
      Green: "#base-ui-22",
    };

    const colorId = colorIdMap[colorName];
    if (!colorId) {
      throw new Error(`Color "${colorName}" not found in color ID mapping`);
    }

    return cy.get(colorId);
  }

  // Search Elements
  get searchIcon() {
    return cy.get("svg.lucide-search").first();
  }

  get searchInput() {
    return cy.get('[placeholder="Search"]');
  }

  get searchResults() {
    return cy.get(".product_list_item_inner").filter(":visible");
  }

  get searchDropdown() {
    return cy.contains("Stainless Steel Thermos - Yellow");
  }

  // ═══════════════════════════════════════════════
  // ACTIONS (Methods)
  // ═══════════════════════════════════════════════

  visitHome() {
    cy.visit("https://demo.evershop.io/");
  }

  visitAccessories() {
    cy.visit("https://demo.evershop.io/accessories");
  }

  visitProductDetail(productUrl) {
    cy.visit(productUrl);
  }

  clickSliderPrevious() {
    this.sliderPreviousButton.click();
    cy.wait(500);
  }

  clickSliderNext() {
    this.sliderNextButton.click();
    cy.wait(500);
  }

  clickViewCollection() {
    this.viewCollectionButton.first().click({ force: true });
  }

  clickShopNow() {
    this.shopNowButton.first().click({ force: true });
  }

  clickShopKids() {
    this.shopKidsLink.click();
  }

  clickShopWomen() {
    this.shopWomenLink.click();
  }

  clickShopMen() {
    this.shopMenLink.click();
  }

  clickBreadcrumbHome() {
    this.breadcrumbHome.click();
    cy.wait(500);
  }

  clickProductImage() {
    this.productImage.first().click();
  }

  clickProductName(index) {
    this.getFeaturedProductByIndex(index).find(".product-name a").click();
  }

  // Method untuk klik produk pertama dan return nama produknya
  clickFirstProductAndGetNameByImage() {
    // Ambil nama produk dari alt atau aria-label gambar pertama
    return this.productName
      .first()
      .invoke("attr", "alt")
      .then((productName) => {
        const cleanName = productName ? productName.trim() : "";

        // Klik produk pertama (gambar)
        this.productImage.first().click();
        cy.wait(1000);

        // Return nama produk untuk verifikasi
        return cy.wrap(cleanName);
      });
  }

  clickFirstProductAndGetNameByName() {
    // Ambil nama produk dari elemen - tunggu hingga muncul
    // Cari h3 yang ada di sekitar gambar produk
    return cy
      .get("img.transition-transform", { timeout: 10000 })
      .first()
      .parent()
      .parent()
      .find("h3, h5, a")
      .filter(":visible")
      .first()
      .invoke("text")
      .then((productName) => {
        const cleanName = productName ? productName.trim() : "";

        // Klik nama produk (cari lagi untuk di-click)
        cy.get("img.transition-transform")
          .first()
          .parent()
          .parent()
          .find("h3, h5, a")
          .filter(":visible")
          .first()
          .click();

        cy.wait(1000);

        // Return nama produk untuk verifikasi
        return cy.wrap(cleanName);
      });
  }

  clickFirstProductAndGetNameByPrice() {
    // Ambil nama produk dari konteks yang sama dengan harga
    // Navigasi dari produk pertama
    return cy
      .get("img.transition-transform", { timeout: 10000 })
      .first()
      .parent()
      .parent()
      .then(($productContainer) => {
        // Ambil nama produk dari container yang sama
        const productName = $productContainer
          .find("h3, h5, a")
          .filter(":visible")
          .first()
          .text()
          .trim();

        // Cari dan klik elemen harga di container yang sama
        cy.wrap($productContainer)
          .find('[class*="price"], span')
          .filter(":visible")
          .first()
          .click();

        cy.wait(1000);

        // Return nama produk untuk verifikasi
        return cy.wrap(productName);
      });
  }

  // Method alternatif: klik gambar dan simpan nama ke alias
  clickFirstProductImageAndSaveName(aliasName = "productName") {
    cy.get("img.transition-transform")
      .first()
      .invoke("attr", "alt")
      .then((text) => {
        cy.wrap(text ? text.trim() : "").as(aliasName);
      });
    this.productImage.first().click();
    cy.wait(1000);
  }

  // Method alternatif: klik nama dan simpan nama ke alias
  clickFirstProductNameAndSaveName(aliasName = "productName") {
    this.productName
      .first()
      .invoke("text")
      .then((text) => {
        cy.wrap(text ? text.trim() : "").as(aliasName);
      });
    this.productName.first().click();
    cy.wait(1000);
  }

  selectSortBy(sortValue) {
    // Klik button untuk membuka dropdown
    this.sortByDropdown.click();
    cy.wait(500);

    // Pilih option berdasarkan value
    // Map value ke text yang ditampilkan di dropdown
    const sortTextMap = {
      "": "Default",
      default: "Default",
      price: "Price",
      name: "Name",
    };

    const optionText = sortTextMap[sortValue.toLowerCase()] || sortValue;

    // Klik option yang sesuai
    cy.get('[role="option"]').contains(optionText).click({ force: true });

    cy.wait(1000);
  }

  selectSortOrder(orderValue) {
    if (orderValue.toUpperCase() === "ASC") {
      cy.get("body").then(($body) => {
        if ($body.find("svg.lucide-arrow-up-wide-narrow").length === 0) {
          this.sortOrderButton.first().click();
        }
      });
    } else if (orderValue.toUpperCase() === "DESC") {
      cy.get("body").then(($body) => {
        if ($body.find("svg.lucide-arrow-down-wide-narrow").length === 0) {
          this.sortOrderButton.first().click();
        }
      });
    }
    cy.wait(1000);
  }

  toggleSortOrder() {
    this.sortOrderButton.first().click();
    cy.wait(1000);
  }

  adjustPriceRange(min, max) {
    this.priceRangeSliderLow.scrollIntoView();
    cy.wait(1000);

    this.priceRangeSliderLow.then(($input) => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      ).set;
      nativeInputValueSetter.call($input[0], min);

      const inputEvent = new Event("input", { bubbles: true });
      const changeEvent = new Event("change", { bubbles: true });

      $input[0].dispatchEvent(inputEvent);
      $input[0].dispatchEvent(changeEvent);
    });

    cy.wait(1500);

    this.priceRangeSliderHigh.then(($input) => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      ).set;
      nativeInputValueSetter.call($input[0], max);

      const inputEvent = new Event("input", { bubbles: true });
      const changeEvent = new Event("change", { bubbles: true });

      $input[0].dispatchEvent(inputEvent);
      $input[0].dispatchEvent(changeEvent);
    });
    cy.wait(2000);
  }

  selectColorFilter(colorName) {
    this.getColorFilterByName(colorName).click({ force: true });
    cy.wait(1000);
  }

  selectColor(color) {
    this.getColorOption(color).click();
    cy.wait(1000);
  }

  setQuantity(quantity) {
    this.quantityField.clear().type(quantity);
    cy.wait(1000);
  }

  clickAddToCart() {
    this.addToCartButton.click();
    cy.wait(1000);
  }

  clearColorSelection() {
    this.colorOptions.first().click();
  }

  clickSearchIcon() {
    this.searchIcon.click();
    cy.wait(500);
  }

  searchProduct(keyword) {
    this.searchInput.type(keyword);
    cy.wait(1000);
  }

  submitSearch() {
    this.searchInput.type("{enter}");
    cy.wait(1000);
  }

  clickSearchDropdownProduct(index) {
    this.searchDropdown.click();
  }

  // ═══════════════════════════════════════════════
  // ASSERTIONS (Verify Methods)
  // ═══════════════════════════════════════════════

  verifyUrlAcc() {
    cy.url().should("eq", "https://demo.evershop.io/accessories");
  }

  verifyHomeUrl() {
    cy.url().should("eq", "https://demo.evershop.io/");
  }

  verifyPriceRangeUrl(min, max) {
    cy.url({ timeout: 10000 }).should("include", `min_price=${min}`);
    cy.url().should("include", `max_price=${max}`);
  }

  verifyPriceRangeUrlMax(max) {
    cy.url({ timeout: 5000 }).should("include", `max_price=${max}`);
  }

  verifyPriceRangeUrlMin(min) {
    cy.url({ timeout: 5000 }).should("include", `min_price=${min}`);
  }

  verifyPriceRangeActive(min, max) {
    cy.contains("Active Filters", { timeout: 10000 }).should("be.visible");
    cy.contains(`Price: $${min} - $${max}`).should("be.visible");
  }

  verifyColorFilterUrl(colorIds) {
    cy.url().should("include", "color%5Boperation%5D=in");
    const colorValue = colorIds.join("%2C");
    cy.url().should("include", `color%5Bvalue%5D=${colorValue}`);
  }

  verifyProductColorUrl(colorId) {
    cy.url().should("include", `color=${colorId}`);
  }

  verifyProductDetailUrl(productSlug) {
    cy.url().should("include", productSlug);
  }

  verifySliderChanged() {
    cy.get(
      '.slick-slide.slick-active, .slide.active, [class*="active"]',
    ).should("be.visible");

    cy.wait(500);
  }

  verifyProductDetailLoaded() {
    this.productDetailTitle.should("be.visible");
    this.productDetailPrice.should("be.visible");
  }

  verifyProductDetailsMatch(productName) {
    this.productDetailTitle.should("contain", productName);
  }

  verifyProductDetailMatchesName(expectedName) {
    this.productDetailTitle.invoke("text").then((detailName) => {
      const cleanDetailName = detailName.trim();
      expect(cleanDetailName.toLowerCase()).to.include(
        expectedName.toLowerCase(),
      );
    });
  }

  verifyProductDetailMatchesSavedName(aliasName = "productName") {
    cy.get(`@${aliasName}`).then((savedName) => {
      this.verifyProductDetailMatchesName(savedName);
    });
  }

  verifyErrorAddToCart() {
    cy.contains("Please select variant options");
    cy.contains("Value must be at least 1");
  }

  verifyOverAddToCart() {
    cy.contains("We do not have enough stock");
  }

  verifyProductAddedToCart() {
    cy.get("#mui-5").should("exist");
  }

  verifyImageChangedForColor() {
    this.productDetailImage.should("be.visible");
  }

  verifySearchResultsVisible() {
    cy.url().should("include", "search");
    cy.get('img.transition-transform, .product-card, [class*="product"]', {
      timeout: 10000,
    }).should("have.length.greaterThan", 0);
  }

  verifySearchDropdownVisible() {
    this.searchDropdown.should("be.visible");
  }

  verifySortedProducts(sortType, order) {
    const baseUrl = "https://demo.evershop.io/accessories";
    let expectedUrl = baseUrl;

    if (sortType === "default") {
      if (order.toLowerCase() === "desc") {
        expectedUrl = `${baseUrl}?od=desc`;
      } else {
        expectedUrl = baseUrl;
      }
    } else if (sortType === "price" || sortType === "name") {
      if (order.toLowerCase() === "desc") {
        expectedUrl = `${baseUrl}?ob=${sortType}&od=desc`;
      } else {
        expectedUrl = `${baseUrl}?ob=${sortType}`;
      }
    }

    cy.url().should("eq", expectedUrl);
    cy.wait(500);
  }
}

export default ProductPage;
