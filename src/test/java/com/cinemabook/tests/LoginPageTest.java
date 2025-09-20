package com.cinemabook.tests;

import com.aventstack.extentreports.Status;
import com.cinemabook.base.BaseTest;
import com.cinemabook.pages.LoginPage;
import com.cinemabook.pages.HomePage;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

/**
 * LoginPageTest class contains test cases for login functionality
 * Tests various scenarios including valid/invalid login attempts
 */
public class LoginPageTest extends BaseTest {
    
    private LoginPage loginPage;
    private HomePage homePage;
    
    @BeforeMethod
    public void setUpTest() {
        loginPage = new LoginPage(driver);
        homePage = new HomePage(driver);
    }
    
    /**
     * Test Case 1: Verify login page elements are displayed
     */
    @Test(priority = 1, description = "Verify login page loads with all required elements")
    public void testLoginPageElementsDisplay() {
        test = extent.createTest("Login Page Elements Display Test");
        test.log(Status.INFO, "Starting login page elements display test");
        
        try {
            // Navigate to login page
            loginPage.navigateToLoginPage();
            test.log(Status.INFO, "Navigated to login page");
            
            // Verify login page is displayed
            Assert.assertTrue(loginPage.isLoginPageDisplayed(), 
                "Login page should be displayed");
            test.log(Status.PASS, "Login page is displayed correctly");
            
            // Verify email field is empty
            Assert.assertTrue(loginPage.isEmailFieldEmpty(), 
                "Email field should be empty initially");
            test.log(Status.PASS, "Email field is empty as expected");
            
            // Verify password field is empty
            Assert.assertTrue(loginPage.isPasswordFieldEmpty(), 
                "Password field should be empty initially");
            test.log(Status.PASS, "Password field is empty as expected");
            
            // Verify password is hidden by default
            Assert.assertTrue(loginPage.isPasswordHidden(), 
                "Password should be hidden by default");
            test.log(Status.PASS, "Password field is hidden by default");
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 2: Test valid login credentials
     */
    @Test(priority = 2, description = "Test login with valid credentials")
    public void testValidLogin() {
        test = extent.createTest("Valid Login Test");
        test.log(Status.INFO, "Starting valid login test");
        
        try {
            // Navigate to login page
            loginPage.navigateToLoginPage();
            test.log(Status.INFO, "Navigated to login page");
            
            // Perform login with valid credentials
            String validEmail = config.getValidEmail();
            String validPassword = config.getValidPassword();
            
            loginPage.performLogin(validEmail, validPassword);
            test.log(Status.INFO, "Entered valid credentials and clicked login");
            
            // Wait for navigation to homepage
            Thread.sleep(3000);
            
            // Verify successful login by checking if user is on homepage
            Assert.assertTrue(homePage.isHomePageDisplayed(), 
                "Should be redirected to homepage after successful login");
            test.log(Status.PASS, "Successfully logged in and redirected to homepage");
            
            // Verify user is logged in (user menu should be visible)
            Assert.assertTrue(homePage.isUserLoggedIn(), 
                "User should be logged in");
            test.log(Status.PASS, "User login status verified");
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 3: Test invalid login credentials
     */
    @Test(priority = 3, description = "Test login with invalid credentials")
    public void testInvalidLogin() {
        test = extent.createTest("Invalid Login Test");
        test.log(Status.INFO, "Starting invalid login test");
        
        try {
            // Navigate to login page
            loginPage.navigateToLoginPage();
            test.log(Status.INFO, "Navigated to login page");
            
            // Attempt login with invalid credentials
            String invalidEmail = config.getInvalidEmail();
            String invalidPassword = config.getInvalidPassword();
            
            loginPage.performLogin(invalidEmail, invalidPassword);
            test.log(Status.INFO, "Entered invalid credentials and clicked login");
            
            // Wait for error message
            Thread.sleep(2000);
            
            // Verify user remains on login page
            Assert.assertTrue(loginPage.isLoginPageDisplayed(), 
                "Should remain on login page after invalid login");
            test.log(Status.PASS, "Remained on login page as expected");
            
            // Note: Error message verification depends on actual implementation
            // This is a placeholder for error message validation
            test.log(Status.INFO, "Invalid login attempt handled correctly");
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 4: Test empty fields validation
     */
    @Test(priority = 4, description = "Test login with empty fields")
    public void testEmptyFieldsValidation() {
        test = extent.createTest("Empty Fields Validation Test");
        test.log(Status.INFO, "Starting empty fields validation test");
        
        try {
            // Navigate to login page
            loginPage.navigateToLoginPage();
            test.log(Status.INFO, "Navigated to login page");
            
            // Try to login with empty fields
            loginPage.clickLoginButton();
            test.log(Status.INFO, "Clicked login button with empty fields");
            
            // Wait for validation
            Thread.sleep(1000);
            
            // Verify user remains on login page
            Assert.assertTrue(loginPage.isLoginPageDisplayed(), 
                "Should remain on login page when fields are empty");
            test.log(Status.PASS, "Remained on login page with empty fields");
            
            // Verify fields are still empty
            Assert.assertTrue(loginPage.isEmailFieldEmpty(), 
                "Email field should remain empty");
            Assert.assertTrue(loginPage.isPasswordFieldEmpty(), 
                "Password field should remain empty");
            test.log(Status.PASS, "Fields validation working correctly");
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 5: Test password visibility toggle
     */
    @Test(priority = 5, description = "Test password visibility toggle functionality")
    public void testPasswordVisibilityToggle() {
        test = extent.createTest("Password Visibility Toggle Test");
        test.log(Status.INFO, "Starting password visibility toggle test");
        
        try {
            // Navigate to login page
            loginPage.navigateToLoginPage();
            test.log(Status.INFO, "Navigated to login page");
            
            // Enter password
            loginPage.enterPassword("testpassword");
            test.log(Status.INFO, "Entered password in field");
            
            // Verify password is hidden initially
            Assert.assertTrue(loginPage.isPasswordHidden(), 
                "Password should be hidden initially");
            test.log(Status.PASS, "Password is hidden initially");
            
            // Toggle password visibility
            loginPage.togglePasswordVisibility();
            test.log(Status.INFO, "Clicked password visibility toggle");
            
            // Wait for toggle effect
            Thread.sleep(500);
            
            // Verify password is now visible
            Assert.assertFalse(loginPage.isPasswordHidden(), 
                "Password should be visible after toggle");
            test.log(Status.PASS, "Password visibility toggled successfully");
            
            // Toggle back to hidden
            loginPage.togglePasswordVisibility();
            Thread.sleep(500);
            
            // Verify password is hidden again
            Assert.assertTrue(loginPage.isPasswordHidden(), 
                "Password should be hidden after second toggle");
            test.log(Status.PASS, "Password visibility toggle working correctly");
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 6: Test navigation links on login page
     */
    @Test(priority = 6, description = "Test navigation links on login page")
    public void testLoginPageNavigation() {
        test = extent.createTest("Login Page Navigation Test");
        test.log(Status.INFO, "Starting login page navigation test");
        
        try {
            // Navigate to login page
            loginPage.navigateToLoginPage();
            test.log(Status.INFO, "Navigated to login page");
            
            // Test back to home link
            loginPage.clickBackToHomeLink();
            test.log(Status.INFO, "Clicked back to home link");
            
            // Wait for navigation
            Thread.sleep(2000);
            
            // Verify navigation to homepage
            Assert.assertTrue(homePage.isHomePageDisplayed(), 
                "Should navigate to homepage when back link is clicked");
            test.log(Status.PASS, "Successfully navigated back to homepage");
            
            // Navigate back to login page
            loginPage.navigateToLoginPage();
            test.log(Status.INFO, "Navigated back to login page");
            
            // Test sign up link
            loginPage.clickSignUpLink();
            test.log(Status.INFO, "Clicked sign up link");
            
            // Wait for navigation
            Thread.sleep(2000);
            
            // Verify navigation to register page
            Assert.assertTrue(driver.getCurrentUrl().contains("/register"), 
                "Should navigate to register page when sign up link is clicked");
            test.log(Status.PASS, "Successfully navigated to register page");
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
}