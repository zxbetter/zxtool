[![npm version](https://img.shields.io/npm/v/zxtool.svg?style=for-the-badge)](https://www.npmjs.com/package/zxtool)
[![npm download per month](https://img.shields.io/npm/dm/zxtool.svg?style=for-the-badge)](https://www.npmjs.com/package/zxtool)

## 简介

使用 `node.js` 构建的命令行工具。主要是方便个人平时使用。

## 安装

```bash
npm install -g zxtool
```

## 命令

- `zxtool -V` 查看工具的版本信息
- `zxtool -h` 查看工具的帮助文档。会列出所有的功能。

### `zxtool tree`

列出指定目录的目录树。

```bash
# 示例：列出 src 的目录树，排除以 index 为前缀的文件。
$ zxtool tree src -e ^index
```

效果如下:

```
├─file
│  └─file-tree.js
├─string
└─util
   └─type.js
```

### `zxtool git`

简单的 git 命令封装，用于同步本地仓库和远程仓库。

```shell
# 同步本地仓库和远程仓库
zxtool git -s "提交信息"
```

执行效果：

```
√ Adding changes to the index
√ Checking the working tree status
√ Record changes to the repository
√ Pulling from remote master
√ Pushing to remote master

=========================================
= modified:   package.json              =
= modified:   packages/commands/note.js =
=========================================

Complete!
```

## License

MIT
