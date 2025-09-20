package com.cinemabook.pages;

import com.cinemabook.base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

/**
 * LoginPage class represents the login page of the application
 * Contains all elements and methods related to login functionality
 */
public class LoginPage extends BasePage {
    
    // Page elements using @FindBy annotations
    @FindBy(id = "email")
    private WebElement emailField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(xpath = "//button[@type='submit']")
    private WebElement loginButton;
    
    @FindBy(xpath = "//button[contains(@class, 'absolute right-3')]")
    private WebElement passwordToggleButton;
    
    @FindBy(xpath = "//a[contains(@href, '/register')]")
    private WebElement signUpLink;
    
    @FindBy(xpath = "//a[contains(@href, '/')]")
    private WebElement backToHomeLink;
    
    @FindBy(xpath = "//h1[contains(text(), 'Welcome Back')]")
    private WebElement welcomeTitle;
    
    // Error message locators
    private By errorMessageLocator = By.xpath("//*[contains(@class, 'text-red') or contains(@class, 'error')]");
    
    /**
     * Constructor to initialize page elements
     * @param driver WebDriver instance
     */
    public LoginPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }
    
    /**
     * Navigate to login page
     */
    public void navigateToLoginPage() {
        driver.get(baseUrl + "/login");
        waitUtils.waitForElementToBeVisible(By.id("email"));
    }
    
    /**
     * Enter email address
     * @param email Email to enter
     */
    public void enterEmail(String email) {
        waitUtils.waitForElementToBeVisible(By.id("email"));
        emailField.clear();
        emailField.sendKeys(email);
    }
    
    /**
     * Enter password
     * @param password Password to enter
     */
    public void enterPassword(String password) {
        waitUtils.waitForElementToBeVisible(By.id("password"));
        passwordField.clear();
        passwordField.sendKeys(password);
    }
    
    /**
     * Click login button
     */
    public void clickLoginButton() {
        waitUtils.waitForElementToBeClickable(By.xpath("//button[@type='submit']"));
        loginButton.click();
    }
    
    /**
     * Toggle password visibility
     */
    public void togglePasswordVisibility() {
        waitUtils.waitForElementToBeClickable(By.xpath("//button[contains(@class, 'absolute right-3')]"));
        passwordToggleButton.click();
    }
    
    /**
     * Click sign up link
     */
    public void clickSignUpLink() {
        waitUtils.waitForElementToBeClickable(By.xpath("//a[contains(@href, '/register')]"));
        signUpLink.click();
    }
    
    /**
     * Click back to home link
     */
    public void clickBackToHomeLink() {
        waitUtils.waitForElementToBeClickable(By.xpath("//a[contains(@href, '/')]"));
        backToHomeLink.click();
    }
    
    /**
     * Perform complete login action
     * @param email Email address
     * @param password Password
     */
    public void performLogin(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        clickLoginButton();
    }
    
    /**
     * Check if login page is displayed
     * @return true if login page is displayed
     */
    public boolean isLoginPageDisplayed() {
        try {
            return welcomeTitle.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if error message is displayed
     * @return true if error message is present
     */
    public boolean isErrorMessageDisplayed() {
        try {
            return driver.findElement(errorMessageLocator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Get error message text
     * @return Error message text
     */
    public String getErrorMessage() {
        try {
            return driver.findElement(errorMessageLocator).getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    /**
     * Check if password field type is 'password' (hidden)
     * @return true if password is hidden
     */
    public boolean isPasswordHidden() {
        return passwordField.getAttribute("type").equals("password");
    }
    
    /**
     * Check if email field is empty
     * @return true if email field is empty
     */
    public boolean isEmailFieldEmpty() {
        return emailField.getAttribute("value").isEmpty();
    }
    
    /**
     * Check if password field is empty
     * @return true if password field is empty
     */
    public boolean isPasswordFieldEmpty() {
        return passwordField.getAttribute("value").isEmpty();
    }
}