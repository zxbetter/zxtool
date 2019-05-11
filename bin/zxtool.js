#!/usr/bin/env node

const program = require('commander')
const package = require('../package.json')
const type = require('../packages/libs/type')
const fileTree = require('../packages/commands/file-tree')

program
  .version(package.version)

program
  .command('tree <dir> [dirs...]')
  .description('列出目录树')
  .option('-e --exclude <dir>', '排除指定的目录', type.list)
  .action((dir, dirs, cmd) => {
    fileTree.exec(dirs.concat(dir), cmd)
  })

program.parse(process.argv)
