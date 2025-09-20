package com.cinemabook.base;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.cinemabook.utils.ConfigReader;
import com.cinemabook.utils.ScreenshotUtils;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.ITestResult;
import org.testng.annotations.*;

import java.io.File;
import java.io.IOException;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

/**
 * BaseTest class provides common setup and teardown methods for all test classes
 * Implements WebDriver initialization, configuration management, and reporting setup
 */
public class BaseTest {
    
    protected static WebDriver driver;
    protected static WebDriverWait wait;
    protected static ExtentReports extent;
    protected static ExtentTest test;
    protected ConfigReader config;
    
    /**
     * Suite level setup - initializes ExtentReports
     */
    @BeforeSuite
    public void suiteSetup() {
        // Initialize ExtentReports
        ExtentSparkReporter sparkReporter = new ExtentSparkReporter("test-output/reports/ExtentReport.html");
        sparkReporter.config().setDocumentTitle("CinemaBook Test Report");
        sparkReporter.config().setReportName("Automation Test Results");
        
        extent = new ExtentReports();
        extent.attachReporter(sparkReporter);
        extent.setSystemInfo("OS", System.getProperty("os.name"));
        extent.setSystemInfo("Java Version", System.getProperty("java.version"));
        extent.setSystemInfo("Browser", "Chrome");
        
        // Create directories for screenshots and reports
        createDirectories();
    }
    
    /**
     * Test level setup - initializes WebDriver and configuration
     */
    @BeforeMethod
    @Parameters({"browser"})
    public void setUp(@Optional("chrome") String browser) {
        // Initialize configuration
        config = new ConfigReader();
        
        // Setup WebDriver based on browser parameter
        setupWebDriver(browser);
        
        // Configure WebDriver settings
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(
            Duration.ofSeconds(config.getImplicitWait())
        );
        driver.manage().timeouts().pageLoadTimeout(
            Duration.ofSeconds(config.getPageLoadTimeout())
        );
        
        // Initialize WebDriverWait
        wait = new WebDriverWait(driver, Duration.ofSeconds(config.getExplicitWait()));
        
        // Navigate to base URL
        driver.get(config.getBaseUrl());
    }
    
    /**
     * Test level teardown - handles test results and cleanup
     */
    @AfterMethod
    public void tearDown(ITestResult result) {
        if (result.getStatus() == ITestResult.FAILURE) {
            // Capture screenshot for failed tests
            String screenshotPath = ScreenshotUtils.captureScreenshot(driver, result.getName());
            test.addScreenCaptureFromPath(screenshotPath);
            test.fail("Test Failed: " + result.getThrowable().getMessage());
        } else if (result.getStatus() == ITestResult.SUCCESS) {
            test.pass("Test Passed Successfully");
        } else if (result.getStatus() == ITestResult.SKIP) {
            test.skip("Test Skipped: " + result.getThrowable().getMessage());
        }
        
        // Close browser
        if (driver != null) {
            driver.quit();
        }
    }
    
    /**
     * Suite level teardown - generates final report
     */
    @AfterSuite
    public void suiteTearDown() {
        if (extent != null) {
            extent.flush();
        }
    }
    
    /**
     * Setup WebDriver based on browser type
     * @param browser Browser name (chrome, firefox)
     */
    private void setupWebDriver(String browser) {
        switch (browser.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.addArguments("--disable-notifications");
                chromeOptions.addArguments("--disable-popup-blocking");
                chromeOptions.addArguments("--disable-extensions");
                driver = new ChromeDriver(chromeOptions);
                break;
                
            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                driver = new FirefoxDriver();
                break;
                
            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }
    }
    
    /**
     * Create necessary directories for test output
     */
    private void createDirectories() {
        try {
            FileUtils.forceMkdir(new File("test-output/screenshots"));
            FileUtils.forceMkdir(new File("test-output/reports"));
        } catch (IOException e) {
            System.err.println("Failed to create directories: " + e.getMessage());
        }
    }
    
    /**
     * Get WebDriver instance
     * @return WebDriver instance
     */
    public static WebDriver getDriver() {
        return driver;
    }
    
    /**
     * Get WebDriverWait instance
     * @return WebDriverWait instance
     */
    public static WebDriverWait getWait() {
        return wait;
    }
}