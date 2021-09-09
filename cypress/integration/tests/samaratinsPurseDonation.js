Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

import 'cypress-iframe'

describe(
    "Visitor is able to make a donation",
    () => {
        it(
            "Visits the website to make a donation",
            () => {
                cy.visit("https://www.samaritanspurse.org/")
                cy.url().should("eq", "https://www.samaritanspurse.org/")
                cy.get("#menu-item-58118").invoke("show").click()
                cy.get("input[class='menu-donate-amt']").last().type("1000")
                cy.get("div[class='directCheckout md-checkout']").click()
                //cy.wait(1000)
                
            }   
        )
        it(
            "Fills out and submits the donation form",
            () => {
                cy.get('#mat-radio-3 > .mat-radio-label > .mat-radio-container > .mat-radio-outer-circle').click({force: true})
                cy.wait(1000)
                cy.frameLoaded("#payment_iframe")
                cy.iframe().find('input#card_number').type("4444333322221111")
                cy.iframe().find('select#card_expiration_month').select("12")
                cy.iframe().find('select#card_expiration_year').select("24")
                cy.iframe().find('input#card_verification').type("986")
                cy.get('input[formcontrolname="firstName"]').type("John")
                cy.get('input[formcontrolname="lastName"]').type("Bomburger")
                cy.get('input[formcontrolname="address"]').type("1000 Christian Dr.")
                cy.get('input[formcontrolname="city"]').type("Sacramento")
                cy.get('select[formcontrolname="state"]').select("CA")
                cy.get("input[formcontrolname='postalCode'").type("95838")
                cy.get('input[formcontrolname="phone"]').type("9165578743")
                cy.get('input[formcontrolname="email"]').type("andreythetester@gmail.com")
                cy.get('input[formcontrolname="emailConfirm"]').type("andreythetester@gmail.com")
                cy.wait(1000)
                cy.get('.billing-shipping-address-container > .custom-select').select("YS4G-000L")
                cy.get('.button').click().wait(1000)
                cy.get('.button').click()
            }
        )
    }
)