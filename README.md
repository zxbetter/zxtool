![![npm version](https://img.shields.io/npm/v/zxtool.svg?style=for-the-badge)](https://www.npmjs.com/package/zxtool)
![![npm download per month](https://img.shields.io/npm/dm/zxtool.svg?style=for-the-badge)](https://www.npmjs.com/package/zxtool)

## 简介

使用 `node.js` 构建的命令行工具。

## 安装

```bash
npm install -g zxtool
```

## 命令

- `zxtool -V` 查看工具的版本信息
- `zxtool -h` 查看工具的帮助文档。会列出所有的功能。

#### `zxtool tree`

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

| 参数 | 说明 | 示例 |
| :-- | :-- | :-- |
| 默认 | 指定目录的名称，多个目录之间用空格隔开 | `zxtool tree src bin` |
| `-e, --exclude` | 指定排除的选项，支持正则匹配，多个之间用逗号隔开 | `zxtool tree src -exclude ^index` |

## License

MIT
