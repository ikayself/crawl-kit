
// =========================================================================================================

// const script = document.createElement('script');
// script.textContent = `
// const old = localStorage.setItem;

//   localStorage.setItem = function(key, value) {
//     if (key === 'security-sdk/s_sdk_crypt_sdk') {
//       // 使用 console.group 聚合信息，保持控制台整洁
//       console.group('%c[Security-SDK 拦截成功]', 'color: #white; background: #222; padding: 2px 4px; border-radius: 3px;');
//       console.log('%cKey:', 'color: #bada55; font-weight: bold;', key);
//       console.log('%cValue (证书数据):', 'color: #33b5e5;', value);

//       // 核心：打印完整的调用堆栈
//       console.trace('触发写入的调用栈追踪');
//       console.groupEnd();
//     }

//     // 关键修复：确保 this 正常透传，防止 Illegal invocation 报错
//     return old.apply(this, arguments);
//   };
// `;

// // 页面加载完成后，注入脚本
// window.addEventListener('load', () => {
//   document.head.appendChild(script);
// });


export interface CrawlKit {
  /** 示例方法：获取页面所有链接 */
  aa: () => string[];
  /** 智能等待 DOM 元素加载，写爬虫必备 */
  waitForEl: (selector: string, timeout?: number) => Promise<Element>;
}

const crawlKit: CrawlKit = {
  aa() {
    const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
    console.log(`[CrawlKit] 成功提取 ${links.length} 个链接。`);
    return links;
  },

  waitForEl(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const el = document.querySelector(selector);
      if (el) return resolve(el);

      const observer = new MutationObserver(() => {
        const target = document.querySelector(selector);
        if (target) {
          resolve(target);
          observer.disconnect();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`等待元素 ${selector} 超时`));
      }, timeout);
    });
  }
};

// 扩展全局类型，让 IDE 在本地编写测试脚本时拥有代码补全
declare global {
  var crawlKit: CrawlKit;
  interface Window {
    crawlKit: CrawlKit;
  }
}

// 挂载到全局变量上
globalThis.crawlKit = crawlKit;

export default crawlKit;