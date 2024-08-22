const { Builder, until } = require("selenium-webdriver");

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const data = require("./data");

data.browsers.forEach((browser, index) => {
  describe("login and logout", function () {
    this.timeout(100000);

    let driver;

    before(async function () {
      // 打开浏览器
      driver = await new Builder().forBrowser(browser).build();
    });

    after(async function () {
      // 关闭浏览器
      await driver.quit();
    });

    async function goto() {
      // 打开网站
      await driver.get(data.url);
      await sleep();
    }

    async function login(user) {
      // 找到用户名和密码输入框
      let username = await driver.findElement(data.input.username);
      let password = await driver.findElement(data.input.password);
      // 清空输入框
      await username.clear();
      await password.clear();
      // 输入用户名和密码
      await username.sendKeys(user.username);
      await password.sendKeys(user.password);
      // 点击登录
      await driver.findElement(data.button.login).click();
      await driver.wait(until.titleIs("Dashboard - Vue Element Admin"), 5000);
      await sleep();
    }

    async function logout() {
      // 点击个人中心
      await driver.findElement(data.select.logout).click();
      await sleep();
      // 点击退出
      await driver.findElement(data.button.logout).click();
      await sleep();
    }

    async function connect() {
      // 点击第三方链接
      await driver.findElement(data.button.connect).click();
      await sleep();
      // 随机选择
      const number = Math.floor(Math.random() * 2);
      if (index % 2) {
        await Wechat();
      } else {
        await qq();
      }
      await close();
    }

    async function Wechat() {
      // 点击微信
      await driver.findElement(data.button.Wechat).click();
      await sleep();
      await alertConfirm();
    }

    async function qq() {
      // 点击qq
      await driver.findElement(data.button.qq).click();
      await sleep();
      await alertConfirm();
    }

    async function alertConfirm() {
      // 弹框确认
      let confirm = await driver.switchTo().alert();
      await confirm.accept();
      await sleep();
    }

    async function close() {
      // 点击关闭
      await driver.findElement(data.button.close).click();
      await sleep();
    }

    it(browser, async function () {
      await goto();
      await connect();

      for (const user of data.users) {
        await login(user);
        await logout();
      }
    });
  });
});
