package com.cinemabook.pages;

import com.cinemabook.base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

/**
 * ConfirmationPage class represents the booking confirmation page
 * Contains all elements and methods related to confirmation functionality
 */
public class ConfirmationPage extends BasePage {
    
    // Success message elements
    @FindBy(xpath = "//h1[contains(text(), 'Booking Confirmed')]")
    private WebElement confirmationTitle;
    
    @FindBy(xpath = "//p[contains(text(), 'Your movie tickets have been booked successfully')]")
    private WebElement confirmationMessage;
    
    @FindBy(xpath = "//*[name()='svg' and contains(@class, 'text-green-600')]")
    private WebElement successIcon;
    
    // Booking details elements
    @FindBy(xpath = "//h3[contains(@class, 'text-xl font-bold')]")
    private WebElement movieTitle;
    
    @FindBy(xpath = "//span[contains(text(), 'Booking ID')]/../span[2]")
    private WebElement bookingId;
    
    @FindBy(xpath = "//span[contains(text(), 'Booking Date')]/../span[2]")
    private WebElement bookingDate;
    
    @FindBy(xpath = "//span[contains(text(), 'Status')]/../*[contains(@class, 'bg-green-600')]")
    private WebElement bookingStatus;
    
    // Movie and theater information
    @FindBy(xpath = "//*[name()='svg' and contains(@class, 'h-4 w-4')]/following-sibling::span")
    private List<WebElement> bookingDetailsInfo;
    
    // Seat information
    @FindBy(xpath = "//h4[contains(text(), 'Selected Seats')]")
    private WebElement selectedSeatsTitle;
    
    @FindBy(xpath = "//div[contains(@class, 'grid grid-cols-6')]//span[contains(@class, 'justify-center')]")
    private List<WebElement> selectedSeatBadges;
    
    // Payment details
    @FindBy(xpath = "//h4[contains(text(), 'Payment Details')]")
    private WebElement paymentDetailsTitle;
    
    @FindBy(xpath = "//span[contains(text(), 'Total Paid')]/../span[2]")
    private WebElement totalPaidAmount;
    
    // QR Code section
    @FindBy(xpath = "//div[contains(@class, 'w-32 h-32')]")
    private WebElement qrCodePlaceholder;
    
    @FindBy(xpath = "//p[contains(text(), 'Show this QR code at the theater entrance')]")
    private WebElement qrCodeInstruction;
    
    // Action buttons
    @FindBy(xpath = "//button[contains(text(), 'Download Ticket')]")
    private WebElement downloadTicketButton;
    
    @FindBy(xpath = "//button[contains(text(), 'Share')]")
    private WebElement shareButton;
    
    @FindBy(xpath = "//button[contains(text(), 'View All Bookings')]")
    private WebElement viewAllBookingsButton;
    
    // Instructions section
    @FindBy(xpath = "//h3[contains(text(), 'Important Instructions')]")
    private WebElement instructionsTitle;
    
    @FindBy(xpath = "//p[contains(text(), 'Please arrive at least 30 minutes')]")
    private WebElement arrivalInstruction;
    
    @FindBy(xpath = "//p[contains(text(), 'Carry a valid ID proof')]")
    private WebElement idProofInstruction;
    
    @FindBy(xpath = "//p[contains(text(), 'Show the QR code for entry')]")
    private WebElement qrCodeEntryInstruction;
    
    /**
     * Constructor to initialize page elements
     * @param driver WebDriver instance
     */
    public ConfirmationPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }
    
    /**
     * Check if confirmation page is displayed
     * @return true if confirmation page is displayed
     */
    public boolean isConfirmationPageDisplayed() {
        try {
            waitUtils.waitForElementToBeVisible(By.xpath("//h1[contains(text(), 'Booking Confirmed')]"));
            return confirmationTitle.isDisplayed() && confirmationMessage.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if success icon is displayed
     * @return true if success icon is displayed
     */
    public boolean isSuccessIconDisplayed() {
        try {
            return successIcon.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Get confirmation title text
     * @return Confirmation title text
     */
    public String getConfirmationTitle() {
        try {
            waitUtils.waitForElementToBeVisible(By.xpath("//h1[contains(text(), 'Booking Confirmed')]"));
            return confirmationTitle.getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    /**
     * Get confirmation message text
     * @return Confirmation message text
     */
    public String getConfirmationMessage() {
        try {
            return confirmationMessage.getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    /**
     * Get movie title from confirmation page
     * @return Movie title
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
     * Get booking ID
     * @return Booking ID
     */
    public String getBookingId() {
        try {
            waitUtils.waitForElementToBeVisible(By.xpath("//span[contains(text(), 'Booking ID')]/../span[2]"));
            return bookingId.getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    /**
     * Get booking date
     * @return Booking date
     */
    public String getBookingDate() {
        try {
            return bookingDate.getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    /**
     * Get booking status
     * @return Booking status
     */
    public String getBookingStatus() {
        try {
            return bookingStatus.getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    /**
     * Get total paid amount
     * @return Total paid amount
     */
    public String getTotalPaidAmount() {
        try {
            waitUtils.waitForElementToBeVisible(By.xpath("//span[contains(text(), 'Total Paid')]/../span[2]"));
            return totalPaidAmount.getText();
        } catch (Exception e) {
            return "";
        }
    }
    
    /**
     * Get number of selected seats displayed
     * @return Number of selected seats
     */
    public int getSelectedSeatsCount() {
        try {
            waitUtils.waitForElementToBeVisible(By.xpath("//div[contains(@class, 'grid grid-cols-6')]"));
            return selectedSeatBadges.size();
        } catch (Exception e) {
            return 0;
        }
    }
    
    /**
     * Click download ticket button
     */
    public void clickDownloadTicketButton() {
        waitUtils.waitForElementToBeClickable(By.xpath("//button[contains(text(), 'Download Ticket')]"));
        downloadTicketButton.click();
    }
    
    /**
     * Click share button
     */
    public void clickShareButton() {
        waitUtils.waitForElementToBeClickable(By.xpath("//button[contains(text(), 'Share')]"));
        shareButton.click();
    }
    
    /**
     * Click view all bookings button
     */
    public void clickViewAllBookingsButton() {
        waitUtils.waitForElementToBeClickable(By.xpath("//button[contains(text(), 'View All Bookings')]"));
        viewAllBookingsButton.click();
    }
    
    /**
     * Check if QR code section is displayed
     * @return true if QR code section is displayed
     */
    public boolean isQRCodeSectionDisplayed() {
        try {
            return qrCodePlaceholder.isDisplayed() && qrCodeInstruction.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if payment details section is displayed
     * @return true if payment details section is displayed
     */
    public boolean isPaymentDetailsSectionDisplayed() {
        try {
            return paymentDetailsTitle.isDisplayed() && totalPaidAmount.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if selected seats section is displayed
     * @return true if selected seats section is displayed
     */
    public boolean isSelectedSeatsSectionDisplayed() {
        try {
            return selectedSeatsTitle.isDisplayed() && !selectedSeatBadges.isEmpty();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if instructions section is displayed
     * @return true if instructions section is displayed
     */
    public boolean isInstructionsSectionDisplayed() {
        try {
            return instructionsTitle.isDisplayed() && 
                   arrivalInstruction.isDisplayed() && 
                   idProofInstruction.isDisplayed() && 
                   qrCodeEntryInstruction.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if all action buttons are displayed
     * @return true if all action buttons are displayed
     */
    public boolean areActionButtonsDisplayed() {
        try {
            return downloadTicketButton.isDisplayed() && 
                   shareButton.isDisplayed() && 
                   viewAllBookingsButton.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Verify booking confirmation details
     * @param expectedMovieTitle Expected movie title
     * @param expectedSeatsCount Expected number of seats
     * @return true if all details match
     */
    public boolean verifyBookingDetails(String expectedMovieTitle, int expectedSeatsCount) {
        try {
            boolean titleMatches = getMovieTitle().contains(expectedMovieTitle);
            boolean seatsCountMatches = getSelectedSeatsCount() == expectedSeatsCount;
            boolean statusIsConfirmed = getBookingStatus().toLowerCase().contains("confirmed");
            
            return titleMatches && seatsCountMatches && statusIsConfirmed;
        } catch (Exception e) {
            return false;
        }
    }
}