package com.cinemabook.base;

import com.cinemabook.utils.ConfigReader;
import com.cinemabook.utils.WaitUtils;
import org.openqa.selenium.WebDriver;

/**
 * BasePage class provides common functionality for all page classes
 * Contains shared elements and methods used across different pages
 */
public class BasePage {
    
    protected WebDriver driver;
    protected WaitUtils waitUtils;
    protected ConfigReader config;
    protected String baseUrl;
    
    /**
     * Constructor to initialize common page elements
     * @param driver WebDriver instance
     */
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.config = new ConfigReader();
        this.baseUrl = config.getBaseUrl();
        this.waitUtils = new WaitUtils(driver, config.getExplicitWait());
    }
    
    /**
     * Get current page title
     * @return Page title
     */
    public String getPageTitle() {
        return driver.getTitle();
    }
    
    /**
     * Get current page URL
     * @return Current URL
     */
    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
    
    /**
     * Navigate back in browser
     */
    public void navigateBack() {
        driver.navigate().back();
    }
    
    /**
     * Navigate forward in browser
     */
    public void navigateForward() {
        driver.navigate().forward();
    }
    
    /**
     * Refresh current page
     */
    public void refreshPage() {
        driver.navigate().refresh();
    }
    
    /**
     * Check if current URL contains expected text
     * @param expectedUrlPart Expected URL part
     * @return true if URL contains expected text
     */
    public boolean isCurrentUrlContains(String expectedUrlPart) {
        return getCurrentUrl().contains(expectedUrlPart);
    }
    
    /**
     * Wait for page to load completely
     */
    public void waitForPageToLoad() {
        waitUtils.waitForTitleToContain("CinemaBook");
    }
}