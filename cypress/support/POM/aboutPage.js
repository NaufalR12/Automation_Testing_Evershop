class AboutPage {
  // ═══════════════════════════════════════════════
  // ELEMENTS (Selectors)
  // ═══════════════════════════════════════════════

  // Navigation Bar
  get aboutUsLink() {
    return cy.contains('About us');
  }

  get evershopLogo() {
    return cy.get('div.logo > a.logo-icon > svg')
  }

  // Breadcrumb
  get breadcrumbHome() {
    return cy.contains("Home");
  }

  get breadcrumbAboutUs() {
    return cy.contains("About Us - Learn More About Our Store");
  }

  // Page Content
  get aboutUsHeading() {
    return cy.contains('Welcome to Our Store');
  }

  // ═══════════════════════════════════════════════
  // ACTIONS (Methods)
  // ═══════════════════════════════════════════════

  visit() {
    cy.visit("https://demo.evershop.io/");
  }

  clickAboutUs() {
    this.aboutUsLink.click();
  }

  clickBreadcrumbHome() {
    this.breadcrumbHome.click();
  }

  clickEvershopLogo() {
    this.evershopLogo.click();
  }

  // ═══════════════════════════════════════════════
  // ASSERTIONS (Validasi)
  // ═══════════════════════════════════════════════

  verifyOnHomePage() {
    cy.url().should("eq", "https://demo.evershop.io/");
  }

  verifyOnAboutUsPage() {
    cy.url().should("eq", "https://demo.evershop.io/page/about-us");
  }

  verifyAboutUsPageLoaded() {
    this.aboutUsHeading.should("be.visible");
  }

  verifyBreadcrumbVisible() {
    this.breadcrumbHome.should("be.visible");
    this.breadcrumbAboutUs.should("be.visible");
  }
}

export default AboutPage;
