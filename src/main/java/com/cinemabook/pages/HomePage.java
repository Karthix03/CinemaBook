package com.cinemabook.pages;

import com.cinemabook.base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

/**
 * HomePage class represents the main homepage of the application
 * Contains all elements and methods related to homepage functionality
 */
public class HomePage extends BasePage {
    
    // Navigation elements
    @FindBy(xpath = "//span[contains(text(), 'CinemaBook')]")
    private WebElement logoElement;
    
    @FindBy(xpath = "//a[contains(@href, '/') and text()='Movies']")
    private WebElement moviesNavLink;
    
    @FindBy(xpath = "//a[contains(@href, '/theaters')]")
    private WebElement theatersNavLink;
    
    @FindBy(xpath = "//input[@placeholder='Search movies...']")
    private WebElement searchInput;
    
    @FindBy(xpath = "//button[contains(text(), 'Login')]")
    private WebElement loginButton;
    
    @FindBy(xpath = "//button[contains(text(), 'Sign Up')]")
    private WebElement signUpButton;
    
    // User menu elements (when logged in)
    @FindBy(xpath = "//button[contains(@class, 'ghost') and contains(@class, 'size-icon')]")
    private WebElement userMenuButton;
    
    // Hero section elements
    @FindBy(xpath = "//h1[contains(text(), 'Book Your Perfect Movie Experience')]")
    private WebElement heroTitle;
    
    @FindBy(xpath = "//p[contains(text(), 'Discover the latest movies')]")
    private WebElement heroDescription;
    
    // Movie filter elements
    @FindBy(xpath = "//input[@placeholder='Search movies...']")
    private WebElement movieSearchInput;
    
    @FindBy(xpath = "//button[contains(@role, 'combobox')]")
    private WebElement genreDropdown;
    
    @FindBy(xpath = "//button[contains(@role, 'combobox')][2]")
    private WebElement languageDropdown;
    
    // Tab elements
    @FindBy(xpath = "//button[@value='playing']")
    private WebElement currentlyPlayingTab;
    
    @FindBy(xpath = "//button[@value='upcoming']")
    private WebElement comingSoonTab;
    
    // Movie cards
    @FindBy(xpath = "//div[contains(@class, 'grid')]//div[contains(@class, 'group')]")
    private List<WebElement> movieCards;
    
    /**
     * Constructor to initialize page elements
     * @param driver WebDriver instance
     */
    public HomePage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }
    
    /**
     * Navigate to homepage
     */
    public void navigateToHomePage() {
        driver.get(baseUrl);
        waitUtils.waitForElementToBeVisible(By.xpath("//span[contains(text(), 'CinemaBook')]"));
    }
    
    /**
     * Click on Movies navigation link
     */
    public void clickMoviesNavLink() {
        waitUtils.waitForElementToBeClickable(By.xpath("//a[contains(@href, '/') and text()='Movies']"));
        moviesNavLink.click();
    }
    
    /**
     * Click on Theaters navigation link
     */
    public void clickTheatersNavLink() {
        waitUtils.waitForElementToBeClickable(By.xpath("//a[contains(@href, '/theaters')]"));
        theatersNavLink.click();
    }
    
    /**
     * Perform search for movies
     * @param searchTerm Search term to enter
     */
    public void searchMovies(String searchTerm) {
        waitUtils.waitForElementToBeVisible(By.xpath("//input[@placeholder='Search movies...']"));
        searchInput.clear();
        searchInput.sendKeys(searchTerm);
        searchInput.submit();
    }
    
    /**
     * Click login button
     */
    public void clickLoginButton() {
        waitUtils.waitForElementToBeClickable(By.xpath("//button[contains(text(), 'Login')]"));
        loginButton.click();
    }
    
    /**
     * Click sign up button
     */
    public void clickSignUpButton() {
        waitUtils.waitForElementToBeClickable(By.xpath("//button[contains(text(), 'Sign Up')]"));
        signUpButton.click();
    }
    
    /**
     * Click user menu button (when logged in)
     */
    public void clickUserMenuButton() {
        waitUtils.waitForElementToBeClickable(By.xpath("//button[contains(@class, 'ghost') and contains(@class, 'size-icon')]"));
        userMenuButton.click();
    }
    
    /**
     * Click on Currently Playing tab
     */
    public void clickCurrentlyPlayingTab() {
        waitUtils.waitForElementToBeClickable(By.xpath("//button[@value='playing']"));
        currentlyPlayingTab.click();
    }
    
    /**
     * Click on Coming Soon tab
     */
    public void clickComingSoonTab() {
        waitUtils.waitForElementToBeClickable(By.xpath("//button[@value='upcoming']"));
        comingSoonTab.click();
    }
    
    /**
     * Click on first movie card
     */
    public void clickFirstMovieCard() {
        waitUtils.waitForElementToBeVisible(By.xpath("//div[contains(@class, 'grid')]//div[contains(@class, 'group')]"));
        if (!movieCards.isEmpty()) {
            movieCards.get(0).click();
        }
    }
    
    /**
     * Click on movie card by title
     * @param movieTitle Title of the movie to click
     */
    public void clickMovieCardByTitle(String movieTitle) {
        By movieCardLocator = By.xpath("//h3[contains(text(), '" + movieTitle + "')]/ancestor::div[contains(@class, 'group')]");
        waitUtils.waitForElementToBeClickable(movieCardLocator);
        driver.findElement(movieCardLocator).click();
    }
    
    /**
     * Check if homepage is displayed
     * @return true if homepage is displayed
     */
    public boolean isHomePageDisplayed() {
        try {
            return heroTitle.isDisplayed() && logoElement.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if user is logged in
     * @return true if user menu button is displayed
     */
    public boolean isUserLoggedIn() {
        try {
            return userMenuButton.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if login/signup buttons are displayed
     * @return true if login and signup buttons are displayed
     */
    public boolean areLoginSignupButtonsDisplayed() {
        try {
            return loginButton.isDisplayed() && signUpButton.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Get number of movie cards displayed
     * @return Number of movie cards
     */
    public int getMovieCardsCount() {
        waitUtils.waitForElementToBeVisible(By.xpath("//div[contains(@class, 'grid')]"));
        return movieCards.size();
    }
    
    /**
     * Check if search functionality is available
     * @return true if search input is displayed
     */
    public boolean isSearchFunctionalityAvailable() {
        try {
            return searchInput.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Get hero title text
     * @return Hero title text
     */
    public String getHeroTitleText() {
        waitUtils.waitForElementToBeVisible(By.xpath("//h1[contains(text(), 'Book Your Perfect Movie Experience')]"));
        return heroTitle.getText();
    }
    
    /**
     * Check if navigation elements are present
     * @return true if all navigation elements are present
     */
    public boolean areNavigationElementsPresent() {
        try {
            return logoElement.isDisplayed() && 
                   moviesNavLink.isDisplayed() && 
                   theatersNavLink.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}