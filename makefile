# 获取当前时间并格式化版本号
VERSION := $(shell TZ="Asia/Shanghai" date +"%y.%m%d.%H%M")

# 定义变量并增加默认值
ZIP_FILE ?= dist.tar.gz
TARGET_PATH ?= /app/qt-e-portfolio
SSH_NAME_STAGE ?=dw-test
SSH_NAME_PROD ?=dw-test
WEB_URL_STAGE ?= http://epf.openalpha.cn
WEB_URL_PROD ?= http://prod.cn/irtemplate

# 检查 npm 是否安装
NPM := $(shell command -v npm 2> /dev/null)
ifeq ($(strip $(NPM)),)
$(error npm is not installed. Please install Node.js and npm)
endif

# 更新版本号，增加错误处理
update-version:
	@if [ -f "package.json" ]; then \
		echo "Updating package.json version to $(VERSION)"; \
		node -e "const fs = require('fs'); \
			const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); \
			pkg.version = '$(VERSION)'; \
			fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));" || \
		(echo "Failed to update package.json"; exit 1); \
	else \
		echo "package.json not found"; \
		exit 1; \
	fi

# 提交版本变更到Git
push-version: update-version
	@echo "Committing version change"
	@git diff --quiet package.json || \
		(git add . && \
		git commit -m "bump version to v$(VERSION)" && \
		git push) || \
		(echo "Git commit failed"; exit 1)

# 创建并推送标签
push-tag: push-version
	@echo "Creating and pushing tag v$(VERSION)"
	@git tag v$(VERSION) && \
		git push origin v$(VERSION) || \
		(echo "Failed to create and push tag"; exit 1)

# 开发环境
dev:
	@$(NPM) run dev

# 构建通用函数，带有模式参数
define deploy
	@read -p "Are you sure you want to deploy to $(1) environment? [y/N] " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		$(MAKE) build MODE=--mode\ $(2); \
		tar -czf $(ZIP_FILE) dist; \
		scp $(ZIP_FILE) $(3):$(TARGET_PATH); \
		ssh $(3) "cd $(TARGET_PATH) && \
			tar -xzf $(ZIP_FILE) && \
			rm $(ZIP_FILE)"; \
		rm $(ZIP_FILE); \
		echo "$(1) deployment complete. Visit: $(4)"; \
	else \
		echo "Deployment cancelled."; \
		rm -f $(ZIP_FILE); \
	fi
endef

# 部署到测试环境
deploy-stage:
	@echo "Deploying to staging environment..."
	$(call deploy,staging,staging,$(SSH_NAME_STAGE),$(WEB_URL_STAGE))

# 部署到生产环境
deploy:
	@echo "Deploying to production environment..."
	$(call deploy,production,production,$(SSH_NAME_PROD),$(WEB_URL_PROD))

# 构建
build:
	@$(NPM) run build -- $(MODE)

.PHONY: update-version commit-version push-tag dev deploy-stage deploy build