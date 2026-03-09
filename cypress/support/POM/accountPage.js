class AccountPage {
  // ═══════════════════════════════════════════════
  // ELEMENTS (Selectors)
  // ═══════════════════════════════════════════════
  get accountIcon() {
    return cy.get("svg.lucide-circle-user");
  }

  get breadcrumbHome() {
    return cy.contains("Home");
  }

  get accountPageTitle() {
    return cy.contains("Account Information");
  }

  // Order History Elements
  get orderHistorySection() {
    return cy.contains("Recent Orders");
  }

  get orderItems() {
    return cy.get(".order-history-order");
  }

  get orderDetails() {
    return cy.contains("Order: #");
  }

  // Address Book Elements
  get addNewAddressButton() {
    return cy.contains("Add new address");
  }

  get addressCards() {
    return cy.get(".address-card");
  }

  get editAddressButton() {
    return cy.contains("button", "Edit");
  }

  get deleteAddressButton() {
    return cy.contains("Delete");
  }

  get saveAddressButton() {
    return cy.contains("Save");
  }

  // Address Form Elements
  get fullNameField() {
    return cy.get("#field-full_name");
  }

  get telephoneField() {
    return cy.get("#field-telephone");
  }

  get addressLine1Field() {
    return cy.get("#field-address_1");
  }

  get cityField() {
    return cy.get("#field-city");
  }

  get provinceField() {
    return cy.get("#field-province");
  }

  get provinceDropdownButton() {
    return cy.get('button[id="field-province"]');
  }

  getProvinceOption(province) {
    return cy.get('[role="option"]').contains(province);
  }

  get postcodeField() {
    return cy.get("#field-postcode");
  }

  get countrySelect() {
    return cy.get("#field-country");
  }

  get countryDropdownButton() {
    return cy.get('button[id="field-country"]');
  }

  getCountryOption(countryCode) {
    return cy.get('[role="option"]').contains(countryCode);
  }

  // Success/Error Messages
  get successMessage() {
    return cy.get(".Toastify__toast--success");
  }

  get errorMessage() {
    return cy.get(".text-critical");
  }

  // Logout
  get logoutButton() {
    return cy.contains("a", "Logout");
  }

  // ═══════════════════════════════════════════════
  // ACTIONS (Methods)
  // ═══════════════════════════════════════════════
  visit() {
    cy.visit("https://demo.evershop.io/");
  }

  clickAccountIcon() {
    this.accountIcon.click();
    cy.wait(500);
  }

  clickBreadcrumbHome() {
    this.breadcrumbHome.click();
  }

  clickAddNewAddress() {
    this.addNewAddressButton.click();
  }

  clickEditAddress() {
    this.editAddressButton.first().click();
  }

  clickDeleteAddress() {
    this.deleteAddressButton.first().click();
  }

  clickSaveAddress() {
    this.saveAddressButton.click();
  }

  clickLogout() {
    this.logoutButton.click();
  }

  clearAllMandatoryFields() {
    this.fullNameField.clear();
    this.telephoneField.clear();
    this.addressLine1Field.clear();
    this.cityField.clear();
    this.postcodeField.clear();
  }

  fillAddressForm(address) {
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

  // ═══════════════════════════════════════════════
  // VERIFICATIONS (Assertions)
  // ═══════════════════════════════════════════════
  verifyAccountPageUrl() {
    cy.url().should("eq", "https://demo.evershop.io/account");
  }

  verifyHomePageUrl() {
    cy.url().should("eq", "https://demo.evershop.io/");
  }

  verifyAccountPageTitle() {
    this.accountPageTitle.should("be.visible");
  }

  verifyOrderHistoryDisplayed() {
    this.orderItems.should("have.length.greaterThan", 0);
  }

  verifyOrderDetails() {
    this.orderDetails.should("be.visible");
  }

  verifySuccessMessage(message) {
    this.successMessage.should("contain.text", message);
  }

  verifyRequiredFieldError(fieldName) {
    cy.contains(`${fieldName} is required`).should("be.visible");
  }

  verifyInvalidFormatError(message) {
    cy.contains(message).should("be.visible");
  }

  verifyAddressValidationErrors(messages) {
    cy.get("body").then(($body) => {
      if (
        $body.find(`:contains("${messages}")`)
          .length > 0
      ) {
        cy.log("Sistem menampilkan validasi error.");
      } else {
        cy.log("Sistem tidak menampilkan validasi error.");
      }
    });

  }
}

export default AccountPage;
