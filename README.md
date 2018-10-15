![npm version](https://img.shields.io/npm/v/zxtool.svg?style=for-the-badge)
![npm download per month](https://img.shields.io/npm/dm/zxtool.svg?style=for-the-badge)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/zxtool.svg?style=for-the-badge)

## 简介

使用 `node.js` 构建的命令行工具。

## 安装

```bash
npm install -g zxtool
```

## 命令

- 命令的格式都是 `zx+命令类别 子命令 [参数]`，如 `zxfile tree .`。
- `zx+命令类别` 是父命令。
- 命令的功能都是分发到子命令中，父命令通常不具有实际功能。
- 通过 `父命令 -h` 可以查看父命令提供的全部子命令。

### file 类命令

file 类的命令主要是一些文件相关的操作。

#### `zxfile tree` 命令

列出指定目录的目录树。

```bash
# 示例：列出 src 的目录树，排除以 index 为前缀的文件。
$ zxfile tree src -e ^index
```

效果如下:

```
├─file
│  └─file-tree.js
├─string
└─util
   └─type.js
```

| 参数 | 说明 | 示例 |
| :-- | :-- | :-- |
| 默认 | 指定目录的名称，多个目录之间用空格隔开 | `zxfile tree src bin` |
| `-e, --exclude` | 指定排除的选项，支持正则匹配，多个之间用逗号隔开 | `zxfile tree src -exclude ^index` |

## License

MIT
