const { Builder, By, Browser, until } = require("selenium-webdriver");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Selenium WebDriver Test", function () {
  this.timeout(15000); // 设置测试超时时间为15秒

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  after(async function () {
    console.log("测试结束，2s后关闭chrome浏览器");
    await sleep(2000);
    await driver.quit();
  });

  it("should navigate to the page and perform actions", async function () {
    console.log("chrome正在访问网站...");
    await driver.get("https://panjiachen.github.io/vue-element-admin");

    let title1 = await driver.getTitle();
    console.log("chrome页面标题1：", title1);

    console.log("chrome点击登录按钮...");
    await driver.findElement(By.className("el-button--primary")).click();

    let title2 = await driver.getTitle();
    console.log("chrome页面标题2：", title2);

    console.log("chrome等待跳转页面...");
    await driver.wait(until.titleIs("Dashboard - Vue Element Admin"), 5000);

    let title3 = await driver.getTitle();
    console.log("chrome页面标题3：", title3);
  });
});
