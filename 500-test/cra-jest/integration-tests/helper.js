import webDriver from "selenium-webdriver";
import chrome from 'chromedriver'

export const getDriver = () => {
    let driver = new webDriver.Builder()
        .forBrowser('chrome')
        .build()
    return driver
}