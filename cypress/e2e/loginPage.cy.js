import LoginPage from "../support/POM/loginPage";

describe("TC02 - Login Page Evershop", () => {
  const loginPage = new LoginPage();

  let loginData;

  before(() => {
    cy.fixture("users/loginUser").then((data) => {
      loginData = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
    loginPage.clickAccountIcon();
  });

  describe("TC02 - Login", () => {
    it("TC02001 - Login berhasil dengan email huruf kecil", () => {
      const { email, password } = loginData.validLogin;

      loginPage.login(email, password);
      cy.wait(2000);
      loginPage.verifyLoginSuccess();
    });

    it("TC02002 - Login berhasil dengan email huruf besar", () => {
      const { emailUppercase, password } = loginData.validLogin;

      loginPage.login(emailUppercase, password);
      cy.wait(2000);
      loginPage.verifyLoginSuccess();
    });

    it("TC02003 - Login gagal dengan email tidak terdaftar", () => {
      const { unregisteredEmail } = loginData.invalidLogin;
      const { password } = loginData.validLogin;

      loginPage.login(unregisteredEmail, password);

      cy.wait(1000);
      loginPage.verifyErrorMessage("Invalid email or password");
    });

    it("TC02004 - Login gagal dengan password salah", () => {
      const { email } = loginData.validLogin;
      const { wrongPassword } = loginData.invalidLogin;

      loginPage.fillEmail(email);
      loginPage.fillPassword(wrongPassword);
      loginPage.clickSignIn();

      cy.wait(1000);
      loginPage.verifyErrorMessage("Invalid email or password");
    });

    it("TC02005 - Login gagal dengan email mengandung angka dan simbol selain @ serta tanpa @", () => {
      const { emailWithNumbersAndSymbols } = loginData.invalidLogin;
      const { longPassword } = loginData.invalidLogin;
      const { emailWithoutAt } = loginData.invalidLogin;

      loginPage.login(emailWithNumbersAndSymbols, longPassword);
      cy.wait(1000);
      loginPage.verifyErrorMessage("Invalid email or password");

      loginPage.login(emailWithoutAt, longPassword);
      cy.wait(1000);
      loginPage.verifyErrorMessage("Invalid email or password");

    });

    it("TC02006 - Validasi muncul saat field kosong", () => {
      const { emptyEmail, emptyPassword } = loginData.invalidLogin;

      loginPage.login(emptyEmail, emptyPassword);

      cy.wait(500);
      cy.contains("Email is required").should("be.visible");
      cy.contains("Password is required").should("be.visible");
      cy.url().should("include", "/account/login");
    });

    it("TC02007 - Password toggle berfungsi", () => {
      const { email, password } = loginData.validLogin;

      loginPage.fillEmail(email);
      loginPage.fillPassword(password);

      loginPage.verifyPasswordHidden();

      loginPage.clickShowPassword();
      cy.wait(500);
      loginPage.verifyPasswordVisible();
    });

    it("TC02008 - Klik Create an account mengarah ke halaman register", () => {
      loginPage.clickCreateAccount();
      cy.wait(1000);

      loginPage.verifyOnRegisterPage();
    });

    it("TC02009 - Klik Forgot Password mengarah ke halaman reset", () => {
      loginPage.clickForgotPassword();
      cy.wait(1000);
      loginPage.verifyOnForgotPasswordPage();
    });

    it("TC02010 - Reset password berhasil dengan email terdaftar", () => {
      const { validEmail } = loginData.resetPassword;

      loginPage.clickForgotPassword();
      cy.wait(1000);

      loginPage.fillResetPasswordEmail(validEmail);
      loginPage.clickResetPassword();
      cy.wait(2000);

      loginPage.verifyErrorMessage("Password reset link sent to your email");
    });

    it("TC02011 - Reset password dengan field email kosong", () => {
      loginPage.clickForgotPassword();
      loginPage.fillResetPasswordEmail("");
      loginPage.clickResetPassword();
      cy.wait(500);
      cy.contains("Email is required").should("be.visible");
    });

    it("TC02012 - Reset password dengan email tanpa @", () => {
      const { invalidEmail } = loginData.resetPassword;
      loginPage.clickForgotPassword();
      loginPage.fillResetPasswordEmail(invalidEmail);
      loginPage.clickResetPassword();
      cy.wait(500);
      cy.contains("Please enter a valid email address").should("be.visible");
    });

    it("TC02013 - Reset password dengan email tidak terdaftar", () => {
      const { unregisteredEmail } = loginData.resetPassword;
      loginPage.clickForgotPassword();
      loginPage.fillResetPasswordEmail(unregisteredEmail);
      loginPage.clickResetPassword();
      cy.wait(2000);
      loginPage.verifyErrorMessage(
        "Something went wrong. Please try again later.",
      );
    });

    it("TC02014 - Tombol reset password disabled dan ada countdown", () => {
      const { validEmail } = loginData.resetPassword;

      loginPage.clickForgotPassword();
      cy.wait(1000);

      loginPage.fillResetPasswordEmail(validEmail);
      loginPage.clickResetPassword();
      cy.wait(1000);

      loginPage.fillResetPasswordEmail(validEmail);
      loginPage.clickResetPassword();
      cy.wait(1000);
      cy.contains("Please wait 1 minute before trying again").should(
        "be.visible",
      );

      // Expected: Tombol reset password dinonaktifkan
      loginPage.verifyResetPasswordButtonDisabled();

      // Expected: Ada penghitung mundur yang muncul
      loginPage.verifyCountdownExists();
      loginPage.verifyCountdownHasNumber();
    });
  });
});
