#!/usr/bin/env bash

# 添加所有的修改
git add -A

# 提交代码
git commit -m "$1"

# 推送到仓库
git push 