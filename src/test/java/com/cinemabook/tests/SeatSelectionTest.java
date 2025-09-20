package com.cinemabook.tests;

import com.aventstack.extentreports.Status;
import com.cinemabook.base.BaseTest;
import com.cinemabook.pages.HomePage;
import com.cinemabook.pages.LoginPage;
import com.cinemabook.pages.SeatSelectionPage;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

/**
 * SeatSelectionTest class contains test cases for seat selection functionality
 * Tests seat display, selection, deselection, and booking flow
 */
public class SeatSelectionTest extends BaseTest {
    
    private SeatSelectionPage seatSelectionPage;
    private HomePage homePage;
    private LoginPage loginPage;
    
    @BeforeMethod
    public void setUpTest() {
        seatSelectionPage = new SeatSelectionPage(driver);
        homePage = new HomePage(driver);
        loginPage = new LoginPage(driver);
    }
    
    /**
     * Helper method to navigate to seat selection page
     */
    private void navigateToSeatSelectionPage() throws InterruptedException {
        // Login first
        loginPage.navigateToLoginPage();
        loginPage.performLogin(config.getValidEmail(), config.getValidPassword());
        Thread.sleep(3000);
        
        // Navigate to homepage and select a movie
        homePage.navigateToHomePage();
        Thread.sleep(2000);
        
        // Click on first movie card
        homePage.clickFirstMovieCard();
        Thread.sleep(3000);
        
        // Navigate through the booking flow to reach seat selection
        // This assumes the movie details page has a "Book Tickets" button
        try {
            driver.findElement(org.openqa.selenium.By.xpath("//button[contains(text(), 'Book Tickets')]")).click();
            Thread.sleep(2000);
            
            // Select theater and showtime (click first available showtime)
            driver.findElement(org.openqa.selenium.By.xpath("//button[contains(@class, 'flex items-center justify-center space-x-2')]")).click();
            Thread.sleep(3000);
        } catch (Exception e) {
            // If direct navigation fails, try alternative approach
            driver.get(config.getBaseUrl() + "/movie/1/seats");
            Thread.sleep(3000);
        }
    }
    
    /**
     * Test Case 1: Verify seat selection page elements are displayed
     */
    @Test(priority = 1, description = "Verify seat selection page loads with all required elements")
    public void testSeatSelectionPageElementsDisplay() {
        test = extent.createTest("Seat Selection Page Elements Display Test");
        test.log(Status.INFO, "Starting seat selection page elements display test");
        
        try {
            // Navigate to seat selection page
            navigateToSeatSelectionPage();
            test.log(Status.INFO, "Navigated to seat selection page");
            
            // Verify seat selection page is displayed
            Assert.assertTrue(seatSelectionPage.isSeatSelectionPageDisplayed(), 
                "Seat selection page should be displayed");
            test.log(Status.PASS, "Seat selection page is displayed correctly");
            
            // Verify screen indicator is displayed
            Assert.assertTrue(seatSelectionPage.isScreenIndicatorDisplayed(), 
                "Screen indicator should be displayed");
            test.log(Status.PASS, "Screen indicator is displayed");
            
            // Verify legend is displayed
            Assert.assertTrue(seatSelectionPage.isLegendDisplayed(), 
                "Seat legend should be displayed");
            test.log(Status.PASS, "Seat legend is displayed correctly");
            
            // Verify booking summary is displayed
            Assert.assertTrue(seatSelectionPage.isBookingSummaryDisplayed(), 
                "Booking summary should be displayed");
            test.log(Status.PASS, "Booking summary is displayed");
            
            // Verify movie title is displayed
            String movieTitle = seatSelectionPage.getMovieTitle();
            Assert.assertFalse(movieTitle.isEmpty(), 
                "Movie title should be displayed");
            test.log(Status.PASS, "Movie title is displayed: " + movieTitle);
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 2: Test seat selection functionality
     */
    @Test(priority = 2, description = "Test seat selection and deselection functionality")
    public void testSeatSelectionFunctionality() {
        test = extent.createTest("Seat Selection Functionality Test");
        test.log(Status.INFO, "Starting seat selection functionality test");
        
        try {
            // Navigate to seat selection page
            navigateToSeatSelectionPage();
            test.log(Status.INFO, "Navigated to seat selection page");
            
            // Get initial counts
            int initialSelectedCount = seatSelectionPage.getSelectedSeatsCount();
            int availableSeatsCount = seatSelectionPage.getAvailableSeatsCount();
            
            test.log(Status.INFO, "Initial selected seats: " + initialSelectedCount);
            test.log(Status.INFO, "Available seats: " + availableSeatsCount);
            
            // Select first available seat
            if (availableSeatsCount > 0) {
                seatSelectionPage.selectFirstAvailableSeat();
                test.log(Status.INFO, "Selected first available seat");
                
                // Wait for selection to register
                Thread.sleep(1000);
                
                // Verify seat selection
                int newSelectedCount = seatSelectionPage.getSelectedSeatsCount();
                Assert.assertEquals(newSelectedCount, initialSelectedCount + 1, 
                    "Selected seats count should increase by 1");
                test.log(Status.PASS, "Seat selection working correctly. New count: " + newSelectedCount);
                
                // Test deselection
                seatSelectionPage.deselectFirstSelectedSeat();
                test.log(Status.INFO, "Deselected first selected seat");
                
                // Wait for deselection to register
                Thread.sleep(1000);
                
                // Verify deselection
                int finalSelectedCount = seatSelectionPage.getSelectedSeatsCount();
                Assert.assertEquals(finalSelectedCount, initialSelectedCount, 
                    "Selected seats count should return to initial value");
                test.log(Status.PASS, "Seat deselection working correctly. Final count: " + finalSelectedCount);
            }
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 3: Test multiple seat selection
     */
    @Test(priority = 3, description = "Test multiple seat selection functionality")
    public void testMultipleSeatSelection() {
        test = extent.createTest("Multiple Seat Selection Test");
        test.log(Status.INFO, "Starting multiple seat selection test");
        
        try {
            // Navigate to seat selection page
            navigateToSeatSelectionPage();
            test.log(Status.INFO, "Navigated to seat selection page");
            
            // Get initial counts
            int initialSelectedCount = seatSelectionPage.getSelectedSeatsCount();
            int availableSeatsCount = seatSelectionPage.getAvailableSeatsCount();
            
            test.log(Status.INFO, "Available seats for selection: " + availableSeatsCount);
            
            // Select multiple seats (up to 3)
            int seatsToSelect = Math.min(3, availableSeatsCount);
            if (seatsToSelect > 0) {
                seatSelectionPage.selectMultipleAvailableSeats(seatsToSelect);
                test.log(Status.INFO, "Selected " + seatsToSelect + " seats");
                
                // Wait for selections to register
                Thread.sleep(2000);
                
                // Verify multiple seat selection
                int newSelectedCount = seatSelectionPage.getSelectedSeatsCount();
                Assert.assertEquals(newSelectedCount, initialSelectedCount + seatsToSelect, 
                    "Selected seats count should increase by " + seatsToSelect);
                test.log(Status.PASS, "Multiple seat selection working correctly. Selected: " + newSelectedCount);
                
                // Verify proceed to payment button is enabled
                Assert.assertTrue(seatSelectionPage.isProceedToPaymentButtonEnabled(), 
                    "Proceed to payment button should be enabled when seats are selected");
                test.log(Status.PASS, "Proceed to payment button is enabled");
            }
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 4: Test booked seat interaction
     */
    @Test(priority = 4, description = "Test interaction with booked seats")
    public void testBookedSeatInteraction() {
        test = extent.createTest("Booked Seat Interaction Test");
        test.log(Status.INFO, "Starting booked seat interaction test");
        
        try {
            // Navigate to seat selection page
            navigateToSeatSelectionPage();
            test.log(Status.INFO, "Navigated to seat selection page");
            
            // Get initial counts
            int initialSelectedCount = seatSelectionPage.getSelectedSeatsCount();
            int bookedSeatsCount = seatSelectionPage.getBookedSeatsCount();
            
            test.log(Status.INFO, "Initial selected seats: " + initialSelectedCount);
            test.log(Status.INFO, "Booked seats count: " + bookedSeatsCount);
            
            // Try to select a booked seat
            if (bookedSeatsCount > 0) {
                seatSelectionPage.tryToSelectBookedSeat();
                test.log(Status.INFO, "Attempted to select a booked seat");
                
                // Wait for any potential interaction
                Thread.sleep(1000);
                
                // Verify that selected count hasn't changed
                int newSelectedCount = seatSelectionPage.getSelectedSeatsCount();
                Assert.assertEquals(newSelectedCount, initialSelectedCount, 
                    "Selected seats count should not change when clicking booked seats");
                test.log(Status.PASS, "Booked seats are not selectable as expected");
            } else {
                test.log(Status.INFO, "No booked seats available for testing");
            }
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 5: Test premium seat selection
     */
    @Test(priority = 5, description = "Test premium seat selection functionality")
    public void testPremiumSeatSelection() {
        test = extent.createTest("Premium Seat Selection Test");
        test.log(Status.INFO, "Starting premium seat selection test");
        
        try {
            // Navigate to seat selection page
            navigateToSeatSelectionPage();
            test.log(Status.INFO, "Navigated to seat selection page");
            
            // Get initial selected count
            int initialSelectedCount = seatSelectionPage.getSelectedSeatsCount();
            
            // Try to select a premium seat
            seatSelectionPage.selectFirstPremiumSeat();
            test.log(Status.INFO, "Attempted to select a premium seat");
            
            // Wait for selection to register
            Thread.sleep(1000);
            
            // Verify premium seat selection
            int newSelectedCount = seatSelectionPage.getSelectedSeatsCount();
            if (newSelectedCount > initialSelectedCount) {
                Assert.assertEquals(newSelectedCount, initialSelectedCount + 1, 
                    "Premium seat should be selectable");
                test.log(Status.PASS, "Premium seat selection working correctly");
            } else {
                test.log(Status.INFO, "No premium seats available or already selected");
            }
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Test Case 6: Test proceed to payment functionality
     */
    @Test(priority = 6, description = "Test proceed to payment button functionality")
    public void testProceedToPaymentFunctionality() {
        test = extent.createTest("Proceed to Payment Functionality Test");
        test.log(Status.INFO, "Starting proceed to payment functionality test");
        
        try {
            // Navigate to seat selection page
            navigateToSeatSelectionPage();
            test.log(Status.INFO, "Navigated to seat selection page");
            
            // Select at least one seat
            int availableSeatsCount = seatSelectionPage.getAvailableSeatsCount();
            if (availableSeatsCount > 0) {
                seatSelectionPage.selectFirstAvailableSeat();
                test.log(Status.INFO, "Selected a seat for payment test");
                
                // Wait for selection
                Thread.sleep(1000);
                
                // Verify button is enabled
                Assert.assertTrue(seatSelectionPage.isProceedToPaymentButtonEnabled(), 
                    "Proceed to payment button should be enabled");
                test.log(Status.PASS, "Proceed to payment button is enabled");
                
                // Click proceed to payment
                seatSelectionPage.clickProceedToPayment();
                test.log(Status.INFO, "Clicked proceed to payment button");
                
                // Wait for navigation
                Thread.sleep(3000);
                
                // Verify navigation to payment page
                Assert.assertTrue(driver.getCurrentUrl().contains("/payment"), 
                    "Should navigate to payment page");
                test.log(Status.PASS, "Successfully navigated to payment page");
            } else {
                test.log(Status.SKIP, "No available seats for payment test");
            }
            
        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
}