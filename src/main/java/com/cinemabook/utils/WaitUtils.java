package com.cinemabook.utils;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * WaitUtils utility class for handling explicit waits
 * Provides common wait methods for different conditions
 */
public class WaitUtils {
    
    private WebDriverWait wait;
    
    /**
     * Constructor to initialize WebDriverWait
     * @param driver WebDriver instance
     * @param timeoutInSeconds Timeout duration in seconds
     */
    public WaitUtils(WebDriver driver, int timeoutInSeconds) {
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutInSeconds));
    }
    
    /**
     * Wait for element to be visible
     * @param locator Element locator
     * @return WebElement when visible
     */
    public WebElement waitForElementToBeVisible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }
    
    /**
     * Wait for element to be clickable
     * @param locator Element locator
     * @return WebElement when clickable
     */
    public WebElement waitForElementToBeClickable(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }
    
    /**
     * Wait for element to be present in DOM
     * @param locator Element locator
     * @return WebElement when present
     */
    public WebElement waitForElementToBePresent(By locator) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }
    
    /**
     * Wait for text to be present in element
     * @param locator Element locator
     * @param text Expected text
     * @return true when text is present
     */
    public boolean waitForTextToBePresentInElement(By locator, String text) {
        return wait.until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
    }
    
    /**
     * Wait for element to disappear
     * @param locator Element locator
     * @return true when element is not visible
     */
    public boolean waitForElementToDisappear(By locator) {
        return wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }
    
    /**
     * Wait for page title to contain specific text
     * @param title Expected title text
     * @return true when title contains text
     */
    public boolean waitForTitleToContain(String title) {
        return wait.until(ExpectedConditions.titleContains(title));
    }
}