/**
 * 简写console.log，注入到node全局
 * console样式自定义，用于调试和日志打印
 */

require("console-color-mr");

if (global.log) return;

global.log = function (...param) {
  console.log("==log==".red, "\n", ...param);
};
