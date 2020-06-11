const fs = require("fs");
const path = require("path");

const componentDir = path.resolve(__dirname, "../");
const targetDir = process.argv.slice(2)[0];

// 获取目录树初始化
function getDirTreeInit() {
  const { getDirTree } = require("./file.js");
  // targetDir 不存在时默认使用当前目录
  let treeObj = getDirTree(targetDir || componentDir);

  const outputDir = `${componentDir}/output/`;
  mkdir(outputDir);

  if (treeObj) {
    // 写入表示目录结构的json文件
    fs.writeFile(
      `${outputDir}node-dir-tree.json`,
      JSON.stringify(treeObj, "", "\t"),
      "utf8",
      (err) => {
        if (err) {
          throw err;
        }

        log(`目录结构已输出json文件: ${outputDir}`.yellowBG);
      }
    );

    // 生成html
    let header = "";
    let body = createBodyDom(treeObj);

    let html =
      "<!DOCTYPE html>" +
      "<html><head>" +
      header +
      "</head><body>" +
      body +
      "</body></html>";

    // 写入生成的html文件
    fs.writeFile(`${outputDir}index.html`, html, "utf8", (err) => {
      if (err) {
        throw err;
      }

      log(`目录结构已输出html静态页: ${outputDir}`.yellowBG);
    });
  }
}

/**
 * 创建目录
 * @param {指定的目录} path
 * @returns promise
 */
function mkdir(path) {
  return new Promise((resolve) => {
    if (fs.existsSync(path)) {
      log(`\n${path}: 文件夹已存在`);
    } else {
      fs.mkdirSync(path);
      log("\n文件夹创建成功！");
      resolve(path);
    }
  });
}

/**
 * 生成 body节点字符串
 * @param {树形对象} treeObj
 * @returns string
 */
function createBodyDom(treeObj) {
  if (!treeObj || !treeObj.childFiles) {
    return;
  }

  const files = treeObj.childFiles.map((file) => `<li>${file.short}</li>`);

  const dirs = Object.keys(treeObj.childDir).map(
    (key) => `<li>${key}<ul>${createBodyDom(treeObj.childDir[key])}</ul></li>`
  );

  return dirs.join("") + files.join("");
}

module.exports = { getDirTreeInit };
