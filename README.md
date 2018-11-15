![![npm version](https://img.shields.io/npm/v/zxtool.svg?style=for-the-badge)](https://www.npmjs.com/package/zxtool)
![![npm download per month](https://img.shields.io/npm/dm/zxtool.svg?style=for-the-badge)](https://www.npmjs.com/package/zxtool)

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

### string 类命令

string 类命令主要是一些字符串相关的操作。

#### `zxstring prefixsuffix` 命令

给字符串添加前缀和后缀。

```bash
# 示例：给指定文件的每一行添加 A 前缀和 Z 后缀，结构输出到当前目录的 tmp 文件中。
zxstring prefixsuffix test.txt -p A -s Z -t tmp
```

| 参数 | 说明 | 示例 |
| :-- | :-- | :-- |
| 默认 | 文件名，多个之间用空格隔开 | `zxstring prefixsuffix test.txt test1.txt` |
| `-p --prefix` | 前缀 | `zxstring prefixsuffix test.txt -p A` |
| `-s --suffix` | 后缀 | `zxstring prefixsuffix test.txt -s Z` |
| `-t --target` | 目标输出文件 | `zxstring prefixsuffix test.txt -s Z -t tmp` |

## License

MIT
