package com.cinemabook.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * ConfigReader utility class for reading configuration properties
 * Provides centralized access to application configuration values
 */
public class ConfigReader {
    
    private Properties properties;
    private static final String CONFIG_FILE_PATH = "src/test/resources/config.properties";
    
    /**
     * Constructor - loads properties from config file
     */
    public ConfigReader() {
        loadProperties();
    }
    
    /**
     * Load properties from configuration file
     */
    private void loadProperties() {
        properties = new Properties();
        try (FileInputStream fis = new FileInputStream(CONFIG_FILE_PATH)) {
            properties.load(fis);
        } catch (IOException e) {
            System.err.println("Failed to load configuration file: " + e.getMessage());
            throw new RuntimeException("Configuration file not found: " + CONFIG_FILE_PATH);
        }
    }
    
    /**
     * Get base URL from configuration
     * @return Base URL string
     */
    public String getBaseUrl() {
        return properties.getProperty("base.url");
    }
    
    /**
     * Get browser name from configuration
     * @return Browser name
     */
    public String getBrowser() {
        return properties.getProperty("browser");
    }
    
    /**
     * Get implicit wait timeout
     * @return Implicit wait timeout in seconds
     */
    public int getImplicitWait() {
        return Integer.parseInt(properties.getProperty("implicit.wait"));
    }
    
    /**
     * Get explicit wait timeout
     * @return Explicit wait timeout in seconds
     */
    public int getExplicitWait() {
        return Integer.parseInt(properties.getProperty("explicit.wait"));
    }
    
    /**
     * Get page load timeout
     * @return Page load timeout in seconds
     */
    public int getPageLoadTimeout() {
        return Integer.parseInt(properties.getProperty("page.load.timeout"));
    }
    
    /**
     * Get valid email for testing
     * @return Valid email address
     */
    public String getValidEmail() {
        return properties.getProperty("valid.email");
    }
    
    /**
     * Get valid password for testing
     * @return Valid password
     */
    public String getValidPassword() {
        return properties.getProperty("valid.password");
    }
    
    /**
     * Get invalid email for testing
     * @return Invalid email address
     */
    public String getInvalidEmail() {
        return properties.getProperty("invalid.email");
    }
    
    /**
     * Get invalid password for testing
     * @return Invalid password
     */
    public String getInvalidPassword() {
        return properties.getProperty("invalid.password");
    }
    
    /**
     * Get screenshot path
     * @return Screenshot directory path
     */
    public String getScreenshotPath() {
        return properties.getProperty("screenshot.path");
    }
    
    /**
     * Get report path
     * @return Report directory path
     */
    public String getReportPath() {
        return properties.getProperty("report.path");
    }
    
    /**
     * Get any property value by key
     * @param key Property key
     * @return Property value
     */
    public String getProperty(String key) {
        return properties.getProperty(key);
    }
}