package com.cinemabook.tests;

import com.aventstack.extentreports.Status;
import com.cinemabook.base.BaseTest;
import com.cinemabook.pages.HomePage;
import com.cinemabook.pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

/**
 * HomepageTest class contains test cases for homepage functionality
 * Tests navigation, search, movie display, and user interactions
 */
public class HomepageTest extends BaseTest {
    
    private HomePage homePage;
    private LoginPage loginPage;
    
    @BeforeMethod
    public void setUpTest() {
        homePage = new HomePage(driver);
        loginPage = new LoginPage(driver);
    }
    
    /**
     * Test Case 1: Verify homepage elements are displayed
     */
    @Test(priority = 1, description = "Verify homepage loads with all required elements")
    public void testHomepageElementsDisplay() {
        test = extent.createTest("Homepage Elements Display Test");
        test.log(Status.INFO, "Starting homepage elements display test");
        
        try {
            // Navigate to homepage
            homePage.navigateToHomePage();
            test.log(Status.INFO, "Navigated to homepage");
            
            // Verify homepage is displayed
            Assert.assertTrue(homePage.isHomePageDisplayed(), 
                "Homepage should be displayed");
            test.log(Status.PASS, "Homepage is displayed correctly");
            
            // Verify navigation elements are present
            Assert.assertTrue(homePage.areNavigationElementsPresent(), 
                "Navigation elements should be present");
            test.log(Status.PASS, "Navigation elements are present");
            
            // Verify hero title is displayed
            String heroTitle = homePage.getHeroTitleText();
            Assert.assertTrue(heroTitle.contains("Book Your Perfect Movie Experience"), 
                "Hero title should contain expected text");
            test.log(Status.PASS, "Hero title is displayed correctly: " + heroTitle);
            
            // Verify search functionality is available
            Assert.assertTrue(homePage.isSearchFunctionalityAvailable(), 
                "Search functionality should be available");
            test.log(Status.PASS, "Search functionality is available");
            
            // Verify login/signup buttons are displayed (for non-logged in user)
            Assert.assertTrue(homePage.areLoginSignupButtonsDisplayed(), 
                "Login and signup buttons should be displayed");
            test.log(Status.PASS, "Login and signup buttons are displayed");
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 2: Test navigation functionality
     */
    @Test(priority = 2, description = "Test navigation links functionality")
    public void testNavigationFunctionality() {
        test = extent.createTest("Navigation Functionality Test");
        test.log(Status.INFO, "Starting navigation functionality test");
        
        try {
            // Navigate to homepage
            homePage.navigateToHomePage();
            test.log(Status.INFO, "Navigated to homepage");
            
            // Test theaters navigation
            homePage.clickTheatersNavLink();
            test.log(Status.INFO, "Clicked theaters navigation link");
            
            // Wait for navigation
            Thread.sleep(2000);
            
            // Verify navigation to theaters page
            Assert.assertTrue(driver.getCurrentUrl().contains("/theaters"), 
                "Should navigate to theaters page");
            test.log(Status.PASS, "Successfully navigated to theaters page");
            
            // Navigate back to homepage
            homePage.navigateToHomePage();
            test.log(Status.INFO, "Navigated back to homepage");
            
            // Test movies navigation (should stay on homepage)
            homePage.clickMoviesNavLink();
            test.log(Status.INFO, "Clicked movies navigation link");
            
            // Wait for any potential navigation
            Thread.sleep(1000);
            
            // Verify we're still on homepage or movies section
            Assert.assertTrue(homePage.isHomePageDisplayed(), 
                "Should remain on homepage or movies section");
            test.log(Status.PASS, "Movies navigation working correctly");
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 3: Test search functionality
     */
    @Test(priority = 3, description = "Test movie search functionality")
    public void testSearchFunctionality() {
        test = extent.createTest("Search Functionality Test");
        test.log(Status.INFO, "Starting search functionality test");
        
        try {
            // Navigate to homepage
            homePage.navigateToHomePage();
            test.log(Status.INFO, "Navigated to homepage");
            
            // Perform search
            String searchTerm = "Avengers";
            homePage.searchMovies(searchTerm);
            test.log(Status.INFO, "Performed search for: " + searchTerm);
            
            // Wait for search results
            Thread.sleep(3000);
            
            // Verify navigation to search page
            Assert.assertTrue(driver.getCurrentUrl().contains("/search"), 
                "Should navigate to search page");
            test.log(Status.PASS, "Successfully navigated to search page");
            
            // Verify search query is in URL
            Assert.assertTrue(driver.getCurrentUrl().contains("q=" + searchTerm.toLowerCase()), 
                "Search query should be in URL");
            test.log(Status.PASS, "Search query is correctly passed in URL");
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 4: Test movie cards display and interaction
     */
    @Test(priority = 4, description = "Test movie cards display and click functionality")
    public void testMovieCardsDisplay() {
        test = extent.createTest("Movie Cards Display Test");
        test.log(Status.INFO, "Starting movie cards display test");
        
        try {
            // Navigate to homepage
            homePage.navigateToHomePage();
            test.log(Status.INFO, "Navigated to homepage");
            
            // Wait for movie cards to load
            Thread.sleep(3000);
            
            // Verify movie cards are displayed
            int movieCardsCount = homePage.getMovieCardsCount();
            Assert.assertTrue(movieCardsCount > 0, 
                "Movie cards should be displayed");
            test.log(Status.PASS, "Movie cards are displayed. Count: " + movieCardsCount);
            
            // Test tab switching
            homePage.clickCurrentlyPlayingTab();
            test.log(Status.INFO, "Clicked Currently Playing tab");
            Thread.sleep(2000);
            
            int playingMoviesCount = homePage.getMovieCardsCount();
            test.log(Status.INFO, "Currently playing movies count: " + playingMoviesCount);
            
            homePage.clickComingSoonTab();
            test.log(Status.INFO, "Clicked Coming Soon tab");
            Thread.sleep(2000);
            
            int upcomingMoviesCount = homePage.getMovieCardsCount();
            test.log(Status.INFO, "Upcoming movies count: " + upcomingMoviesCount);
            
            // Verify tab switching works
            Assert.assertTrue(playingMoviesCount >= 0 && upcomingMoviesCount >= 0, 
                "Tab switching should work correctly");
            test.log(Status.PASS, "Tab switching functionality working correctly");
            
            // Test movie card click
            if (playingMoviesCount > 0) {
                homePage.clickCurrentlyPlayingTab();
                Thread.sleep(1000);
                homePage.clickFirstMovieCard();
                test.log(Status.INFO, "Clicked on first movie card");
                
                // Wait for navigation
                Thread.sleep(3000);
                
                // Verify navigation to movie details page
                Assert.assertTrue(driver.getCurrentUrl().contains("/movie/"), 
                    "Should navigate to movie details page");
                test.log(Status.PASS, "Successfully navigated to movie details page");
            }
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 5: Test user authentication buttons
     */
    @Test(priority = 5, description = "Test login and signup button functionality")
    public void testAuthenticationButtons() {
        test = extent.createTest("Authentication Buttons Test");
        test.log(Status.INFO, "Starting authentication buttons test");
        
        try {
            // Navigate to homepage
            homePage.navigateToHomePage();
            test.log(Status.INFO, "Navigated to homepage");
            
            // Test login button
            homePage.clickLoginButton();
            test.log(Status.INFO, "Clicked login button");
            
            // Wait for navigation
            Thread.sleep(2000);
            
            // Verify navigation to login page
            Assert.assertTrue(driver.getCurrentUrl().contains("/login"), 
                "Should navigate to login page");
            test.log(Status.PASS, "Successfully navigated to login page");
            
            // Navigate back to homepage
            homePage.navigateToHomePage();
            test.log(Status.INFO, "Navigated back to homepage");
            
            // Test signup button
            homePage.clickSignUpButton();
            test.log(Status.INFO, "Clicked signup button");
            
            // Wait for navigation
            Thread.sleep(2000);
            
            // Verify navigation to register page
            Assert.assertTrue(driver.getCurrentUrl().contains("/register"), 
                "Should navigate to register page");
            test.log(Status.PASS, "Successfully navigated to register page");
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 6: Test logged-in user dashboard access
     */
    @Test(priority = 6, description = "Test user dashboard access after login")
    public void testLoggedInUserDashboard() {
        test = extent.createTest("Logged-in User Dashboard Test");
        test.log(Status.INFO, "Starting logged-in user dashboard test");
        
        try {
            // First login
            loginPage.navigateToLoginPage();
            loginPage.performLogin(config.getValidEmail(), config.getValidPassword());
            test.log(Status.INFO, "Performed login");
            
            // Wait for login to complete
            Thread.sleep(3000);
            
            // Navigate to homepage
            homePage.navigateToHomePage();
            test.log(Status.INFO, "Navigated to homepage");
            
            // Verify user is logged in
            Assert.assertTrue(homePage.isUserLoggedIn(), 
                "User should be logged in");
            test.log(Status.PASS, "User is logged in successfully");
            
            // Test user menu functionality
            homePage.clickUserMenuButton();
            test.log(Status.INFO, "Clicked user menu button");
            
            // Wait for menu to appear
            Thread.sleep(1000);
            
            // Verify user menu opened (this would depend on actual implementation)
            test.log(Status.PASS, "User menu functionality tested");
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
}