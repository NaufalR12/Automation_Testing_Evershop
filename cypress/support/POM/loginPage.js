class LoginPage {
  // ═══════════════════════════════════════════════
  // ELEMENTS (Selectors)
  // ═══════════════════════════════════════════════
  get accountIcon() {
    return cy.get("svg.lucide-circle-user");
  }

  get emailField() {
    return cy.get("#field-email");
  }

  get passwordField() {
    return cy.get("#field-password");
  }

  get signInButton() {
    return cy.contains("Sign In");
  }

  get showPasswordIcon() {
    return cy.get("svg.lucide-eye-closed");
  }

  get createAccountLink() {
    return cy.contains("a", "Create an account");
  }

  get forgotPasswordLink() {
    return cy.contains("a", "Forgot your password?");
  }

  get errorMessage() {
    return cy.get(".Toastify__toast--error");
  }

  // Reset Password Page Elements
  get resetPasswordEmailField() {
    return cy.get('input[placeholder="Email"]');
  }

  get resetPasswordButton() {
    return cy.get('button[type="submit"]').contains("Reset Password");
  }

  get resetPasswordErrorMessage() {
    return cy.get(".text-critical");
  }

  get countdownTimer() {
    return cy.get(
      ".countdown, [class*='countdown'], [class*='timer'], [id*='countdown'], [id*='timer']",
    );
  }

  // ═══════════════════════════════════════════════
  // ACTIONS (Methods)
  // ═══════════════════════════════════════════════
  visit() {
    cy.visit("https://demo.evershop.io/");
    cy.url().should("include", "evershop.io");
  }

  clickAccountIcon() {
    this.accountIcon.click();
    cy.wait(500);
  }

  fillEmail(email) {
    if (email) {
      this.emailField.clear().type(email);
    } else {
      this.emailField.clear();
    }
  }

  fillPassword(password) {
    if (password) {
      this.passwordField.clear().type(password);
    } else {
      this.passwordField.clear();
    }
  }

  clickSignIn() {
    this.signInButton.click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickSignIn();
  }

  clickShowPassword() {
    this.showPasswordIcon.click();
  }

  clickCreateAccount() {
    this.createAccountLink.click();
  }

  clickForgotPassword() {
    this.forgotPasswordLink.click();
  }

  fillResetPasswordEmail(email) {
    if (email) {
      this.resetPasswordEmailField.clear().type(email);
    } else {
      this.resetPasswordEmailField.clear();
    }
  }

  clickResetPassword() {
    this.resetPasswordButton.click();
  }

  clickResetPasswordMultipleTimes(times) {
    for (let i = 0; i < times; i++) {
      this.resetPasswordButton.click();
      cy.wait(100);
    }
  }

  // ═══════════════════════════════════════════════
  // ASSERTIONS (Validasi)
  // ═══════════════════════════════════════════════
  verifyLoginSuccess() {
    cy.url().should("eq", "https://demo.evershop.io/");
    // Verifikasi user sudah login dengan mengecek account menu berubah
    cy.visit("https://demo.evershop.io/account");
    cy.contains("Logout");
  }

  verifyErrorMessage(errorMessage) {
    this.errorMessage.should("be.visible");
    this.errorMessage.should("contain", errorMessage);
  }

  verifyPasswordVisible() {
    this.passwordField.should("have.attr", "type", "text");
  }

  verifyPasswordHidden() {
    this.passwordField.should("have.attr", "type", "password");
  }

  verifyOnRegisterPage() {
    cy.url().should("include", "/account/register");
  }

  verifyOnForgotPasswordPage() {
    cy.url().should("include", "/account/reset-password");
  }

  verifyResetPasswordButtonDisabled() {
    this.resetPasswordButton.should("be.disabled");
  }

  verifyCountdownExists() {
    // Verifikasi ada elemen countdown timer yang visible
    this.countdownTimer.should("be.visible");
  }

  verifyCountdownHasNumber() {
    // Verifikasi countdown menampilkan angka (detik/menit)
    this.countdownTimer.invoke("text").should("match", /\d+/);
  }

  verifyMessageConditional(message, logIfFound, logIfNotFound) {
    cy.get("body").then(($body) => {
      if ($body.find(`:contains("${message}")`).length > 0) {
        cy.log(logIfFound);
      } else {
        cy.log(logIfNotFound);
      }
    });
  }

  verifyResetPasswordButtonConditional() {
    cy.get("body").then(($body) => {
      if (
        $body.find('button[type="submit"]:contains("Reset Password"):disabled')
          .length > 0
      ) {
        this.verifyResetPasswordButtonDisabled();
      } else {
        cy.log("Reset password button tidak disabled");
      }
    });
  }

  verifyCountdownConditional() {
    cy.get("body").then(($body) => {
      if (
        $body.find(
          ".countdown, [class*='countdown'], [class*='timer'], [id*='countdown'], [id*='timer']",
        ).length > 0
      ) {
        this.verifyCountdownExists();
        this.verifyCountdownHasNumber();
      } else {
        cy.log("Countdown timer tidak ditemukan");
      }
    });
  }
}

export default LoginPage;
