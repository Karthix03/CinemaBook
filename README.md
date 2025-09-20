# CinemaBook Selenium Test Suite

A comprehensive Java Selenium test automation suite for the CinemaBook movie booking web application.

## Project Overview

This test suite provides automated testing for the CinemaBook application covering:
- Login page functionality
- Homepage navigation and features
- Seat selection module
- Booking confirmation process

## Technology Stack

- **Java 11+**
- **Selenium WebDriver 4.15.0**
- **TestNG 7.8.0** - Test framework
- **Maven** - Build and dependency management
- **ExtentReports 5.1.1** - Test reporting
- **WebDriverManager 5.6.2** - Automatic driver management
- **Apache POI 5.2.4** - Excel data handling

## Project Structure

```
src/
├── main/java/com/cinemabook/
│   ├── base/
│   │   ├── BaseTest.java          # Base test class with setup/teardown
│   │   └── BasePage.java          # Base page class with common methods
│   ├── pages/                     # Page Object Model classes
│   │   ├── LoginPage.java         # Login page elements and methods
│   │   ├── HomePage.java          # Homepage elements and methods
│   │   ├── SeatSelectionPage.java # Seat selection page elements and methods
│   │   └── ConfirmationPage.java  # Confirmation page elements and methods
│   └── utils/                     # Utility classes
│       ├── ConfigReader.java      # Configuration file reader
│       ├── ScreenshotUtils.java   # Screenshot capture utilities
│       └── WaitUtils.java         # WebDriver wait utilities
├── test/java/com/cinemabook/tests/
│   ├── LoginPageTest.java         # Login functionality tests
│   ├── HomepageTest.java          # Homepage functionality tests
│   ├── SeatSelectionTest.java     # Seat selection tests
│   └── ConfirmationTest.java      # Confirmation page tests
└── test/resources/
    ├── config.properties          # Test configuration
    └── testng.xml                 # TestNG suite configuration
```

## Test Coverage

### Login Page Tests (6 test cases)
1. **Login Page Elements Display** - Verify all page elements are present
2. **Valid Login** - Test successful login with valid credentials
3. **Invalid Login** - Test login failure with invalid credentials
4. **Empty Fields Validation** - Test form validation with empty fields
5. **Password Visibility Toggle** - Test password show/hide functionality
6. **Navigation Links** - Test sign up and back to home links

### Homepage Tests (6 test cases)
1. **Homepage Elements Display** - Verify all homepage elements are present
2. **Navigation Functionality** - Test navigation menu links
3. **Search Functionality** - Test movie search feature
4. **Movie Cards Display** - Test movie cards and tab switching
5. **Authentication Buttons** - Test login/signup button functionality
6. **Logged-in User Dashboard** - Test user menu after login

### Seat Selection Tests (6 test cases)
1. **Page Elements Display** - Verify seat map and booking summary
2. **Seat Selection Functionality** - Test seat selection/deselection
3. **Multiple Seat Selection** - Test selecting multiple seats
4. **Booked Seat Interaction** - Test interaction with unavailable seats
5. **Premium Seat Selection** - Test premium seat functionality
6. **Proceed to Payment** - Test navigation to payment page

### Confirmation Tests (7 test cases)
1. **Page Elements Display** - Verify confirmation page elements
2. **Booking Details Display** - Test booking information display
3. **QR Code Section** - Test QR code display and functionality
4. **Action Buttons** - Test download, share, and navigation buttons
5. **Instructions Section** - Test important instructions display
6. **Dashboard Navigation** - Test navigation to user dashboard
7. **Booking Details Verification** - Test booking data accuracy

## Setup Instructions

### Prerequisites
- Java 11 or higher
- Maven 3.6+
- Chrome browser (latest version)

### Installation Steps

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd cinemabook-selenium-tests
   ```

2. **Install dependencies**
   ```bash
   mvn clean install
   ```

3. **Configure test settings**
   Edit `src/test/resources/config.properties`:
   ```properties
   base.url=http://localhost:3000
   browser=chrome
   valid.email=test@example.com
   valid.password=password123
   ```

### Running Tests

#### Run all tests
```bash
mvn test
```

#### Run specific test class
```bash
mvn test -Dtest=LoginPageTest
```

#### Run with specific browser
```bash
mvn test -Dbrowser=chrome
```

#### Run with custom URL
```bash
mvn test -DbaseUrl=https://your-app-url.com
```

## Test Reports

After test execution, reports are generated in:
- **ExtentReports**: `test-output/reports/ExtentReport.html`
- **Screenshots**: `test-output/screenshots/`
- **TestNG Reports**: `test-output/`

## Configuration

### config.properties
```properties
# Application Configuration
base.url=http://localhost:3000
browser=chrome
implicit.wait=10
explicit.wait=20
page.load.timeout=30

# Test Data
valid.email=test@example.com
valid.password=password123
invalid.email=invalid@test.com
invalid.password=wrongpassword

# Paths
screenshot.path=test-output/screenshots/
report.path=test-output/reports/
```

### testng.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">
<suite name="CinemaBook Test Suite" verbose="1">
    <parameter name="browser" value="chrome"/>
    <parameter name="baseUrl" value="http://localhost:3000"/>
    
    <test name="Login Module Tests">
        <classes>
            <class name="com.cinemabook.tests.LoginPageTest"/>
        </classes>
    </test>
    <!-- Additional test configurations -->
</suite>
```

## Key Features

### Page Object Model (POM)
- Separate page classes for each application page
- Encapsulated element locators and methods
- Reusable and maintainable code structure

### Robust Wait Strategies
- Explicit waits for element visibility and clickability
- Custom wait utilities for different conditions
- Proper handling of dynamic content loading

### Comprehensive Reporting
- ExtentReports with detailed test execution logs
- Screenshot capture for failed tests
- Test execution statistics and trends

### Data-Driven Testing
- Configuration-based test data management
- Support for external data sources
- Parameterized test execution

### Cross-Browser Support
- WebDriverManager for automatic driver management
- Configurable browser selection
- Support for Chrome and Firefox

## Best Practices Implemented

1. **Page Object Model** - Clean separation of page elements and test logic
2. **Explicit Waits** - Reliable element interaction handling
3. **Exception Handling** - Proper error handling and reporting
4. **Screenshot Capture** - Visual evidence for test failures
5. **Modular Design** - Reusable components and utilities
6. **Configuration Management** - Externalized test configuration
7. **Detailed Logging** - Comprehensive test execution logs

## Troubleshooting

### Common Issues

1. **WebDriver not found**
   - Ensure WebDriverManager is properly configured
   - Check internet connection for driver downloads

2. **Element not found**
   - Verify application is running on configured URL
   - Check if page elements have changed
   - Increase wait timeouts if needed

3. **Test failures**
   - Check screenshot in `test-output/screenshots/`
   - Review ExtentReport for detailed error information
   - Verify application state and test data

### Debug Mode
Run tests with debug logging:
```bash
mvn test -Dlog.level=DEBUG
```

## Contributing

1. Follow existing code structure and naming conventions
2. Add appropriate comments and documentation
3. Include test cases for new functionality
4. Update configuration files as needed
5. Ensure all tests pass before submitting changes

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review test reports and logs
3. Verify application compatibility
4. Check configuration settings

---

**Note**: This test suite is designed to work with the CinemaBook application. Ensure the application is running and accessible at the configured URL before executing tests.