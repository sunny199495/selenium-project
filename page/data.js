const { By } = require("selenium-webdriver");

let browserNumber, browsers;
browserNumber = 1;
if (browserNumber == 1) {
  browsers = ["chrome"];
} else {
  browsers = ["chrome", "MicrosoftEdge", "firefox"];
}

const data = {
  browsers: browsers,
  url: "https://panjiachen.github.io/vue-element-admin",
  users: [
    {
      username: "admin" + " ",
      password: "11111111",
    },
    {
      username: "editor" + " ",
      password: "11111111",
    },
  ],
  input: {
    username: By.name("username"),
    password: By.name("password"),
  },
  button: {
    login: By.className("el-button--primary"),
    logout: By.className("el-dropdown-menu__item--divided"),
    connect: By.className("thirdparty-button"),
    close: By.className("el-icon-close"),
    Wechat: By.className("wx-svg-container"),
    qq: By.className("qq-svg-container"),
  },
  select: {
    logout: By.className("user-avatar"),
  },
};

module.exports = data;
