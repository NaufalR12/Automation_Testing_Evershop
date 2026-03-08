import AboutPage from "../support/POM/aboutPage";

describe("TC06 - About Page", () => {
  const aboutPage = new AboutPage();

  it("TC06001 - User klik about us di navbar", () => {
    // 1. Buka halaman home
    aboutPage.visit();
    aboutPage.verifyOnHomePage();

    // 2. Klik about us di navbar
    aboutPage.clickAboutUs();

    // Expected: User diarahkan ke halaman about us
    cy.wait(1000);
    aboutPage.verifyOnAboutUsPage();
    aboutPage.verifyAboutUsPageLoaded();
    aboutPage.verifyBreadcrumbVisible();

    // 3. Klik home di breadcrumb pada halaman about us
    aboutPage.clickBreadcrumbHome();

    // Expected: User diarahkan ke halaman home
    cy.wait(1000);
    aboutPage.verifyOnHomePage();
  });

  it("TC06002 - User klik icon evershop", () => {
    // 1. Buka halaman home
    aboutPage.visit();
    aboutPage.verifyOnHomePage();

    // 2. Klik about us di navbar
    aboutPage.clickAboutUs();

    // Expected: User diarahkan ke halaman about us
    aboutPage.verifyOnAboutUsPage();
    aboutPage.verifyAboutUsPageLoaded();

    // 3. Klik ikon evershop di tengah navbar
    aboutPage.clickEvershopLogo();

    // Expected: User diarahkan ke halaman home
    aboutPage.verifyOnHomePage();
  });
});
