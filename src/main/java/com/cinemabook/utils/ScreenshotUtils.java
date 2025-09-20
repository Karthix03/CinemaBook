package com.cinemabook.utils;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * ScreenshotUtils utility class for capturing and managing screenshots
 * Provides methods to capture screenshots during test execution
 */
public class ScreenshotUtils {
    
    private static final String SCREENSHOT_DIR = "test-output/screenshots/";
    
    /**
     * Capture screenshot and save to file
     * @param driver WebDriver instance
     * @param testName Name of the test for file naming
     * @return Path to the saved screenshot file
     */
    public static String captureScreenshot(WebDriver driver, String testName) {
        try {
            // Create screenshots directory if it doesn't exist
            File screenshotDir = new File(SCREENSHOT_DIR);
            if (!screenshotDir.exists()) {
                screenshotDir.mkdirs();
            }
            
            // Generate timestamp for unique filename
            String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
            String fileName = testName + "_" + timestamp + ".png";
            String filePath = SCREENSHOT_DIR + fileName;
            
            // Capture screenshot
            TakesScreenshot takesScreenshot = (TakesScreenshot) driver;
            File sourceFile = takesScreenshot.getScreenshotAs(OutputType.FILE);
            File destFile = new File(filePath);
            
            // Copy screenshot to destination
            FileUtils.copyFile(sourceFile, destFile);
            
            System.out.println("Screenshot captured: " + filePath);
            return filePath;
            
        } catch (IOException e) {
            System.err.println("Failed to capture screenshot: " + e.getMessage());
            return null;
        }
    }
    
    /**
     * Capture screenshot with custom filename
     * @param driver WebDriver instance
     * @param fileName Custom filename for screenshot
     * @return Path to the saved screenshot file
     */
    public static String captureScreenshotWithCustomName(WebDriver driver, String fileName) {
        try {
            File screenshotDir = new File(SCREENSHOT_DIR);
            if (!screenshotDir.exists()) {
                screenshotDir.mkdirs();
            }
            
            String filePath = SCREENSHOT_DIR + fileName + ".png";
            
            TakesScreenshot takesScreenshot = (TakesScreenshot) driver;
            File sourceFile = takesScreenshot.getScreenshotAs(OutputType.FILE);
            File destFile = new File(filePath);
            
            FileUtils.copyFile(sourceFile, destFile);
            
            return filePath;
            
        } catch (IOException e) {
            System.err.println("Failed to capture screenshot: " + e.getMessage());
            return null;
        }
    }
}