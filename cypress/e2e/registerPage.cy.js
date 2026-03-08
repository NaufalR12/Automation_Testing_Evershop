import RegisterPage from "../support/POM/registerPage";
import { faker } from "@faker-js/faker";

describe("Page Object Model - Register Page", () => {
  const registerPage = new RegisterPage();

  let registerData;

  before(() => {
    cy.fixture("users/registerUser").then((data) => {
      registerData = data;
    });
  });

  beforeEach(() => {
    registerPage.visit();
    registerPage.navigateToCreateAccount();
  });

  describe("TC02 - Login", () => {
    it("TC01001 - User membuat akun dengan data valid", () => {
      // Generate random data setiap kali test berjalan
      cy.generateRandomUser().then((userData) => {
        const { full_name, email, password } = userData;

        registerPage.register(full_name, email, password);

        registerPage.verifyRegisterSuccess();
      });
    });

    it("TC01002 - User membuat akun dengan email yang sudah terdaftar", () => {
      // LANGKAH 1: Register user pertama kali dengan email random
      cy.generateRandomUser().then((firstUser) => {
        const { full_name, email, password } = firstUser;

        // Register user pertama kali (harus berhasil)
        registerPage.register(full_name, email, password);

        cy.wait(2000);
        registerPage.verifyRegisterSuccess();

        // LANGKAH 2: Logout dan kembali ke halaman register
        cy.clearCookies();
        cy.clearLocalStorage();
        registerPage.visit();
        registerPage.navigateToCreateAccount();

        // LANGKAH 3: Coba register dengan NAMA, PASSWORD SAMA, email lowercase
        const emailLowercase = email.toLowerCase();

        registerPage.register(full_name, emailLowercase, password);

        // Expected: Muncul pesan error
        cy.wait(1000);
        registerPage.verifyEmailAlreadyUsedError();

        // LANGKAH 4: Kembali ke halaman register lagi
        registerPage.visit();
        registerPage.navigateToCreateAccount();

        // LANGKAH 5: Coba register dengan NAMA, PASSWORD SAMA, email UPPERCASE
        const emailUppercase = email.toUpperCase();

        registerPage.register(full_name, emailUppercase, password);

        // Expected: Muncul pesan error
        cy.wait(1000); // Tunggu response
        registerPage.verifyEmailAlreadyUsedError();
      });
    });

    it("TC01003 - User membuat akun dengan data yang tidak valid", () => {
      // Generate random invalid data
      cy.generateInvalidUser().then((invalidData) => {
        const { full_name, email, password } = invalidData;

        registerPage.fillFullName(full_name);
        registerPage.fillEmail(email);
        registerPage.fillPassword(password);

        registerPage.register(full_name, email, password);

        cy.contains("Name must only contain alphabetic characters").should(
          "be.visible",
        );
        cy.contains("Please enter a valid email address").should("be.visible");
        cy.contains("Password must be at least 6 characters long").should(
          "be.visible",
        );
      });
      //register dengan email yang mengandung angka dan simbol selain @ serta tanpa @
      const { emailWithNumbersAndSymbols } = registerData.invalidData;
      registerPage.fillEmail(emailWithNumbersAndSymbols);
      registerPage.clickSignUp();
      cy.wait(500);
      cy.contains("Please enter a valid email address").should("be.visible");
      //register dengan password yang terlalu panjang
      const { longPassword } = registerData.invalidData;
      registerPage.fillPassword(longPassword);
      registerPage.clickSignUp();
      cy.wait(500);
      cy.contains("Password is too long (maximum 30 characters)").should(
        "be.visible",
      );
    });

    it("TC01004 - User tidak mengisi data, semua field create account kosong", () => {
      registerPage.clickSignUp();

      registerPage.verifyFullNameRequiredError();

      registerPage.verifyEmailRequiredError();

      registerPage.verifyPasswordRequiredError();
    });

    it("TC01005 - Fitur Show Password", () => {
      // Generate random data untuk test show password
      cy.generateRandomUser().then((userData) => {
        const { full_name, email, password } = userData;

        registerPage.fillFullName(full_name);
        registerPage.fillEmail(email);
        registerPage.fillPassword(password);

        registerPage.verifyPasswordIsHidden();

        registerPage.clickShowPassword();

        registerPage.verifyPasswordIsVisible();
      });
    });

    it("TC01006 - User klik tulisan login disamping already have an account", () => {
      registerPage.clickLoginLink();

      registerPage.verifyNavigateToLoginPage();
    });
  });
});
