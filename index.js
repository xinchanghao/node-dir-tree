require("./lib/log");
const init = function () {
  log("______ init ______".blueBG, "\n");

  const { getDirTreeInit } = require("./lib");
  getDirTreeInit();

  return init;
};

init();
