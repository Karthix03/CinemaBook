package com.cinemabook.pages;

import com.cinemabook.base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

/**
 * SeatSelectionPage class represents the seat selection page
 * Contains all elements and methods related to seat selection functionality
 */
public class SeatSelectionPage extends BasePage {
    
    // Page header elements
    @FindBy(xpath = "//h1[contains(text(), 'Select Seats')]")
    private WebElement pageTitle;
    
    @FindBy(xpath = "//button[contains(@class, 'flex items-center space-x-2')]//span[text()='Back']")
    private WebElement backButton;
    
    // Screen and theater info
    @FindBy(xpath = "//div[contains(text(), 'SCREEN')]")
    private WebElement screenIndicator;
    
    @FindBy(xpath = "//h3[contains(@class, 'text-xl font-bold')]")
    private WebElement movieTitle;
    
    @FindBy(xpath = "//span[contains(@class, 'text-sm text-gray-500')]")
    private WebElement seatCountInfo;
    
    // Seat map elements
    @FindBy(xpath = "//button[contains(@class, 'w-8 h-8')]")
    private List<WebElement> allSeats;
    
    @FindBy(xpath = "//button[contains(@class, 'bg-gray-100')]")
    private List<WebElement> availableSeats;
    
    @FindBy(xpath = "//button[contains(@class, 'bg-green-500')]")
    private List<WebElement> selectedSeats;
    
    @FindBy(xpath = "//button[contains(@class, 'bg-red-400')]")
    private List<WebElement> bookedSeats;
    
    @FindBy(xpath = "//button[contains(@class, 'bg-yellow')]")
    private List<WebElement> premiumSeats;
    
    // Legend elements
    @FindBy(xpath = "//span[text()='Available (₹200)']")
    private WebElement availableLegend;
    
    @FindBy(xpath = "//span[text()='Premium (₹300)']")
    private WebElement premiumLegend;
    
    @FindBy(xpath = "//span[text()='Selected']")
    private WebElement selectedLegend;
    
    @FindBy(xpath = "//span[text()='Booked']")
    private WebElement bookedLegend;
    
    // Booking summary elements
    @FindBy(xpath = "//h3[contains(text(), 'Booking Summary')]")
    private WebElement bookingSummaryTitle;
    
    @FindBy(xpath = "//h4[contains(text(), 'Selected Seats')]")
    private WebElement selectedSeatsSection;
    
    @FindBy(xpath = "//h4[contains(text(), 'Price Breakdown')]")
    private WebElement priceBreakdownSection;
    
    @FindBy(xpath = "//button[contains(text(), 'Proceed to Payment')]")
    private WebElement proceedToPaymentButton;
    
    // Row labels
    @FindBy(xpath = "//div[contains(@class, 'w-6 text-center font-medium text-gray-600')]")
    private List<WebElement> rowLabels;
    
    /**
     * Constructor to initialize page elements
     * @param driver WebDriver instance
     */
    public SeatSelectionPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }
    
    /**
     * Check if seat selection page is displayed
     * @return true if page is displayed
     */
    public boolean isSeatSelectionPageDisplayed() {
        try {
            waitUtils.waitForElementToBeVisible(By.xpath("//h1[contains(text(), 'Select Seats')]"));
            return pageTitle.isDisplayed() && screenIndicator.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Click back button
     */
    public void clickBackButton() {
        waitUtils.waitForElementToBeClickable(By.xpath("//button[contains(@class, 'flex items-center space-x-2')]//span[text()='Back']"));
        backButton.click();
    }
    
    /**
     * Select a seat by row and number
     * @param row Row letter (A, B, C, etc.)
     * @param seatNumber Seat number
     */
    public void selectSeat(String row, int seatNumber) {
        By seatLocator = By.xpath("//button[contains(@class, 'w-8 h-8') and text()='" + seatNumber + "']" +
                                 "/ancestor::div[contains(@class, 'flex space-x-1')]" +
                                 "/preceding-sibling::div[contains(@class, 'w-6 text-center') and text()='" + row + "']" +
                                 "/following-sibling::div//button[text()='" + seatNumber + "']");
        
        waitUtils.waitForElementToBeClickable(seatLocator);
        driver.findElement(seatLocator).click();
    }
    
    /**
     * Select first available seat
     */
    public void selectFirstAvailableSeat() {
        waitUtils.waitForElementToBeVisible(By.xpath("//button[contains(@class, 'bg-gray-100')]"));
        if (!availableSeats.isEmpty()) {
            availableSeats.get(0).click();
        }
    }
    
    /**
     * Select multiple available seats
     * @param numberOfSeats Number of seats to select
     */
    public void selectMultipleAvailableSeats(int numberOfSeats) {
        waitUtils.waitForElementToBeVisible(By.xpath("//button[contains(@class, 'bg-gray-100')]"));
        int seatsToSelect = Math.min(numberOfSeats, availableSeats.size());
        
        for (int i = 0; i < seatsToSelect; i++) {
            if (i < availableSeats.size()) {
                availableSeats.get(i).click();
                // Small wait between selections
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }
    
    /**
     * Deselect a selected seat
     */
    public void deselectFirstSelectedSeat() {
        waitUtils.waitForElementToBeVisible(By.xpath("//button[contains(@class, 'bg-green-500')]"));
        if (!selectedSeats.isEmpty()) {
            selectedSeats.get(0).click();
        }
    }
    
    /**
     * Try to select a booked seat (should not be possible)
     */
    public void tryToSelectBookedSeat() {
        waitUtils.waitForElementToBeVisible(By.xpath("//button[contains(@class, 'bg-red-400')]"));
        if (!bookedSeats.isEmpty()) {
            bookedSeats.get(0).click();
        }
    }
    
    /**
     * Select a premium seat
     */
    public void selectFirstPremiumSeat() {
        waitUtils.waitForElementToBeVisible(By.xpath("//button[contains(@class, 'bg-yellow')]"));
        if (!premiumSeats.isEmpty()) {
            premiumSeats.get(0).click();
        }
    }
    
    /**
     * Click proceed to payment button
     */
    public void clickProceedToPayment() {
        waitUtils.waitForElementToBeClickable(By.xpath("//button[contains(text(), 'Proceed to Payment')]"));
        proceedToPaymentButton.click();
    }
    
    /**
     * Get number of selected seats
     * @return Number of selected seats
     */
    public int getSelectedSeatsCount() {
        try {
            waitUtils.waitForElementToBeVisible(By.xpath("//button[contains(@class, 'bg-green-500')]"));
            return selectedSeats.size();
        } catch (Exception e) {
            return 0;
        }
    }
    
    /**
     * Get number of available seats
     * @return Number of available seats
     */
    public int getAvailableSeatsCount() {
        try {
            waitUtils.waitForElementToBeVisible(By.xpath("//button[contains(@class, 'bg-gray-100')]"));
            return availableSeats.size();
        } catch (Exception e) {
            return 0;
        }
    }
    
    /**
     * Get number of booked seats
     * @return Number of booked seats
     */
    public int getBookedSeatsCount() {
        try {
            return bookedSeats.size();
        } catch (Exception e) {
            return 0;
        }
    }
    
    /**
     * Check if legend is displayed
     * @return true if all legend items are displayed
     */
    public boolean isLegendDisplayed() {
        try {
            return availableLegend.isDisplayed() && 
                   premiumLegend.isDisplayed() && 
                   selectedLegend.isDisplayed() && 
                   bookedLegend.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if booking summary is displayed
     * @return true if booking summary is displayed
     */
    public boolean isBookingSummaryDisplayed() {
        try {
            return bookingSummaryTitle.isDisplayed() && 
                   selectedSeatsSection.isDisplayed() && 
                   priceBreakdownSection.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if proceed to payment button is enabled
     * @return true if button is enabled
     */
    public boolean isProceedToPaymentButtonEnabled() {
        try {
            return proceedToPaymentButton.isEnabled() && 
                   !proceedToPaymentButton.getAttribute("class").contains("disabled");
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Get movie title from the page
     * @return Movie title text
     */
    public String getMovieTitle() {
        try {
            waitUtils.waitForElementToBeVisible(By.xpath("//h3[contains(@class, 'text-xl font-bold')]"));
            return movieTitle.getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    /**
     * Get seat count information
     * @return Seat count information text
     */
    public String getSeatCountInfo() {
        try {
            return seatCountInfo.getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    /**
     * Check if screen indicator is displayed
     * @return true if screen indicator is displayed
     */
    public boolean isScreenIndicatorDisplayed() {
        try {
            return screenIndicator.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}