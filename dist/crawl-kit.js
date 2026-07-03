//#region src/index.ts
var CrawlKit = class {
	constructor() {
		console.log("[CrawlKit] 初始化完成。");
	}
	sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	getObjectKey(key, target = window) {
		const result = {};
		function scan(obj, path, visited) {
			if (!obj || typeof obj !== "object" || visited.has(obj)) return;
			visited.add(obj);
			if (key in obj) result[Array.isArray(obj) ? `${path}[${key}]` : `${path}.${key}`] = obj[key];
			for (const k of Object.keys(obj)) scan(obj[k], Array.isArray(obj) ? `${path}[${k}]` : `${path}.${k}`, visited);
		}
		scan(target, "window", /* @__PURE__ */ new Set());
		Object.keys(result).length ? console.table(result) : console.log(`Not found: ${key}`);
		return result;
	}
	waitForEl(selector) {
		return new Promise((resolve) => {
			const el = document.querySelector(selector);
			if (el) return resolve(el);
			const observer = new MutationObserver(() => {
				const target = document.querySelector(selector);
				if (target) {
					observer.disconnect();
					resolve(target);
				}
			});
			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		});
	}
};
var crawlKit = new CrawlKit();
//#endregion
export { crawlKit };

//# sourceMappingURL=crawl-kit.js.map