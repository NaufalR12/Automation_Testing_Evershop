import AccountPage from "../support/POM/accountPage";
import LoginPage from "../support/POM/loginPage";

describe("TC07 - Account Page Evershop", () => {
  const accountPage = new AccountPage();
  const loginPage = new LoginPage();

  let accountData;

  before(() => {
    cy.fixture("account/accountData").then((data) => {
      accountData = data;
    });
  });

  beforeEach(() => {
    const { email, password } = accountData.loginCredentials;
    cy.loginWithSession(email, password);
    accountPage.visit();
    cy.wait(2000);
    accountPage.clickAccountIcon();
  });

  it("TC07001 - User klik icon account di navbar", () => {
    // Expected 1: User diarahkan ke halaman account
    accountPage.verifyAccountPageUrl();
    accountPage.verifyAccountPageTitle();

    // Step 3: Klik home di breadcrumb pada halaman account
    accountPage.clickBreadcrumbHome();
    cy.wait(1000);

    // Expected 2: User diarahkan ke halaman home
    accountPage.verifyHomePageUrl();
  });

  it("TC07002 - Sistem menampilkan history order di halaman account", () => {
    // Expected 1: User diarahkan ke halaman account
    accountPage.verifyAccountPageUrl();

    // Expected 2: Sistem menampilkan semua order yang telah dibuat oleh user
    accountPage.orderHistorySection.should("be.visible");
    accountPage.verifyOrderHistoryDisplayed();
    accountPage.verifyOrderDetails();
  });

  it("TC07003 - User add new address", () => {
    // Step 1: Klik add new address
    accountPage.clickAddNewAddress();
    cy.wait(1000);

    // Step 2: Isi semua data dengan valid
    accountPage.fillAddressForm(accountData.validAddress);
    cy.wait(500);

    // Step 3: Klik save
    accountPage.clickSaveAddress();
    cy.wait(2000);

    // Expected: Muncul pesan Address has been saved successfully!
    accountPage.verifySuccessMessage("Address has been saved successfully!");
  });

  it("TC07004 - User mengedit address", () => {
    // Step 1: Klik edit address
    accountPage.clickEditAddress();
    cy.wait(1000);

    // Step 2: Ubah data yang ingin diupdate
    accountPage.fillAddressForm(accountData.updatedAddress);
    cy.wait(500);

    // Step 3: Klik save
    accountPage.clickSaveAddress();
    cy.wait(2000);

    // Expected : Muncul pesan Address has been updated successfully!
    accountPage.verifySuccessMessage("Address has been updated successfully!");
  });

  it("TC07005 - User menghapus address", () => {
    // Step 1: Klik delete pada address yang ingin di delete
    accountPage.clickDeleteAddress();
    cy.wait(2000);

    // Expected : Muncul pesan Address has been deleted successfully!
    accountPage.verifySuccessMessage("Address has been deleted successfully!");
  });

  it("TC07006 - User add new address dengan data yang tidak valid", () => {
    // Step 1: Klik add new address
    accountPage.clickAddNewAddress();
    cy.wait(1000);

    // Step 3: Kosongkan semua field mandatory (*)
    accountPage.clearAllMandatoryFields();
    cy.wait(500);

    // Step 3: Klik save
    accountPage.clickSaveAddress();
    cy.wait(1000);

    // Expected: Muncul pesan di semua field mandatory (*): the field is required
    accountPage.verifyRequiredFieldError("Full name");
    accountPage.verifyRequiredFieldError("Telephone");
    accountPage.verifyRequiredFieldError("Address");
    accountPage.verifyRequiredFieldError("City");
    accountPage.verifyRequiredFieldError("Country");
    accountPage.verifyRequiredFieldError("Province");
    accountPage.verifyRequiredFieldError("Postcode");
  });

  it("TC07007 - Add address dengan mengisi semua field mandatory dengan teks panjang dan tidak valid (256 karakter berisi angka, huruf dan simbol)", () => {
    const { expectedMessages } = accountData;
    // Step 1: Klik add new address
    accountPage.clickAddNewAddress();
    cy.wait(1000);

    // Step 2: Isi semua field mandatory dengan 256 karakter
    accountPage.fillAddressForm(accountData.invalidAddress);
    cy.wait(500);

    // Step 3: Klik Save
    accountPage.clickSaveAddress();
    cy.wait(2000);

    // Expected 1: Muncul pesan, telepon invalid format, hanya mengandung angka
    // Expected 2: Muncul pesan, post code invalid format, hanya mengandung angka
    // Expected 3: address gagal disimpan
    accountPage.verifyInvalidFormatError(
      expectedMessages.telephoneInvalidFormat,
    );
    accountPage.verifyInvalidFormatError(
      expectedMessages.postcodeInvalidFormat,
    );
    accountPage.verifyInvalidSavedAddress();
  });

  it.only("TC07008 - User logout account", () => {
    // Step 1: Klik logout
    accountPage.clickLogout();
    cy.wait(2000);

    // Expected: Account terlogout dan user diarahkan ke halaman home
    accountPage.verifyHomePageUrl();
  });
});
