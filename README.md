# node-dir-tree

### 简单实现

- 获取指定文件夹内的所有文件、文件夹
- 输出包含文件目录树结构展示的 html 静态页
- 在该目录 output 文件夹下，生成该目录名 node-dir-tree.json

### 如何使用

1. 安装，额，就一个依赖，为了 log 好看点儿

```
npm install
```

2. 预览生成的 html

```
npm run pr
```

### 思路过程

首先，表示目录的对象结构应该是这样的（这里偷个懒用 ts 的类型定义表示一下）

```
type treeObj = {
  "dir": string, // 文件夹路径
  "childFiles": { //子文件
    "short": string; // 文件名
    "full": string;	// 完成路径
  }[],
  childDir: { //子文件夹
    [string]: treeObj
  }
}
```

1.  读取给定的目标文件夹（不是文件夹的另作处理），获取所有文件和文件夹组成的数组
2.  循环数组，判断是文件夹还是文件，文件的话直接 push 到 childFiles
3.  文件夹的话，先把当前文件夹作为 key，存到父级文件夹的 childDir 属性下，然后自调用传当前文件夹路径
4.  以上步骤重复，直到达到最底层空文件夹或该文件夹只有文件
5.  根据得到的树形对象，生成 html 文件并写入 dom 节点即可

### TODO 拓展

1.  可以配合 [commander](https://github.com/tj/commander.js) 接收和解析复杂的命令行参数，以支持更多的功能，比如，自定义过滤某 些文件（如 gitignore）或目录（如 node_modules），或者自定义筛选指定的文件或目录

2.  添加结构树输出，类似 [tree](https://github.com/derycktse/treer#readme) 那样

奥力给吧...
