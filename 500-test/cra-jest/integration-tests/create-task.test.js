import { getDriver } from "./helper";
import { until, By, Key } from 'selenium-webdriver'

let driver

beforeAll(() => {
    console.log("BEFORE");
    driver = getDriver()
})

afterAll(async() => {
    console.log("AFTER");
    await driver.quit()
})

test('should create a task', async () => {
    await driver.get('http://localhost:3000')
    // await driver.wait(until.titleIs('React App'), 1000)
    await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Enter new task']")), 1000)
    await driver.findElement(By.xpath("//input[@placeholder='Enter new task']")).sendKeys('new todo!' + Key.ENTER)
    await driver.wait(until.elementLocated(By.xpath("//*[text()='new todo!']")), 1000)
})