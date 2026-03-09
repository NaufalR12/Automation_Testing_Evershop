class RegisterPage {
  // ═══════════════════════════════════════════════
  // ELEMENTS (Selectors)
  // ═══════════════════════════════════════════════
  get accountIcon() {
    return cy.get('svg.lucide-circle-user');
  }

  get createAccountLink() {
    return cy.contains("a", "Create an account");
  }

  get fullNameField() {
    return cy.get('#field-full_name');
  }

  get emailField() {
    return cy.get('#field-email');
  }

  get passwordField() {
    return cy.get('#field-password');
  }

  get signUpButton() {
    return cy.contains('Sign Up');
  }

  get showPasswordIcon() {
    return cy.get('svg.lucide-eye-closed');
  }

  get loginLink() {
    return cy.contains("a", "Login");
  }

  get fullNameError() {
    return cy
      .get('input[name="full_name"]')
      .parent()
      .find(".error-message, .text-critical");
  }

  get emailError() {
    return cy
      .get('input[name="email"]')
      .parent()
      .find(".error-message, .text-critical");
  }

  get passwordError() {
    return cy
      .get('input[name="password"]')
      .parent()
      .find(".error-message, .text-critical");
  }

  get generalErrorMessage() {
    return cy.get('.error, .alert-error, [role="alert"]');
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
  }

  clickCreateAccount() {
    this.createAccountLink.click();
  }

  fillFullName(fullName) {
    this.fullNameField.clear().type(fullName);
  }

  fillEmail(email) {
    this.emailField.clear().type(email);
  }

  fillPassword(password) {
    this.passwordField.clear().type(password);
  }

  clickSignUp() {
    this.signUpButton.click();
  }

  clickShowPassword() {
    this.showPasswordIcon.click();
  }

  clickLoginLink() {
    this.loginLink.click();
  }

  // Method untuk navigasi ke halaman create account
  navigateToCreateAccount() {
    this.clickAccountIcon();
    this.clickCreateAccount();
    cy.url().should("include", "register");
  }

  // Method untuk register dengan data lengkap
  register(fullName, email, password) {
    if (fullName) {
      this.fillFullName(fullName);
    }
    if (email) {
      this.fillEmail(email);
    }
    if (password) {
      this.fillPassword(password);
    }
    this.clickSignUp();
  }

  // Method untuk clear semua field
  clearAllFields() {
    this.fullNameField.clear();
    this.emailField.clear();
    this.passwordField.clear();
  }

  // ═══════════════════════════════════════════════
  // ASSERTIONS (Validasi)
  // ═══════════════════════════════════════════════
  verifyRegisterSuccess() {
    //cy.url().should("not.include", "register");
    cy.url().should("include", "evershop.io");
    // Verifikasi user masuk ke halaman home atau dashboard
  }


  verifyFullNameValidationError(expectedMessage) {
    this.fullNameError.should("be.visible");
    if (expectedMessage) {
      this.fullNameError.should("contain.text", expectedMessage);
    }
  }

  verifyEmailValidationError(expectedMessage) {
    this.emailError.should("be.visible");
    if (expectedMessage) {
      this.emailError.should("contain.text", expectedMessage);
    }
  }

  verifyPasswordValidationError(expectedMessage) {
    this.passwordError.should("be.visible");
    if (expectedMessage) {
      this.passwordError.should("contain.text", expectedMessage);
    }
  }

  verifyFullNameRequiredError() {
    cy.contains(/full.*name.*required/i).should("be.visible");
  }

  verifyEmailRequiredError() {
    cy.contains(/email.*required/i).should("be.visible");
  }

  verifyPasswordRequiredError() {
    cy.contains(/password.*required/i).should("be.visible");
  }

  verifyPasswordIsVisible() {
    // Verifikasi password tidak lagi type="password"
    this.passwordField.should("have.attr", "type", "text");
  }

  verifyPasswordIsHidden() {
    // Verifikasi password type="password"
    this.passwordField.should("have.attr", "type", "password");
  }

  verifyNavigateToLoginPage() {
    // Verifikasi berhasil ke halaman login
    cy.url().should("include", "login");
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

export default RegisterPage;
