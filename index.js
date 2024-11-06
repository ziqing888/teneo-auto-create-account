const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

// 自动安装依赖的函数
function checkAndInstall(packageName) {
  try {
    require.resolve(packageName);
  } catch (e) {
    console.log(`正在安装依赖: ${packageName}`);
    execSync(`npm install ${packageName}`, { stdio: 'inherit' });
  }
}

// 检查并安装 axios 和 chalk
checkAndInstall('axios');
checkAndInstall('chalk');

// 使用 import() 动态加载 chalk 以解决 ESM 问题
async function loadChalk() {
  return (await import('chalk')).default;
}

(async () => {
  const chalk = await loadChalk();

  // 引入依赖
  const axios = require('axios');
  const config = require('./config'); // 引入配置文件

  const AUTH = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlra25uZ3JneHV4Z2pocGxicGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0MzgxNTAsImV4cCI6MjA0MTAxNDE1MH0.DRAvf8nH1ojnJBc3rD_Nw6t1AV8X_g6gmY_HByG2Mag";
  const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlra25uZ3JneHV4Z2pocGxicGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0MzgxNTAsImV4cCI6MjA0MTAxNDE1MH0.DRAvf8nH1ojnJBc3rD_Nw6t1AV8X_g6gmY_HByG2Mag";
  const regurl = "https://ikknngrgxuxgjhplbpey.supabase.co/auth/v1/signup";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const displayWelcome = () => {
    console.log(`
    * Teneo 账户创建器 *
    * github.com/recitativonika *
    `);
  };

  async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function registerUser(email, reff) {
    try {
      await axios.post(regurl, {
        email: email.trim(),
        password: config.password,
        data: { invited_by: reff },
      }, {
        headers: {
          'Authorization': AUTH,
          'apikey': API_KEY
        }
      });

      console.log(chalk.green(`成功注册，请确认您的邮箱：${email}`));
    } catch (error) {
      console.error(chalk.red(`注册失败：${email}，错误信息：${error.response ? error.response.data : error.message}`));
    }
  }

  async function processBatch(emails, reff) {
    const requests = emails.map(email => registerUser(email, reff));
    await Promise.all(requests);
  }

  async function readEmailsAndRegister(reff) {
    try {
      const data = fs.readFileSync('email.txt', 'utf8');
      const emails = data.split('\n').filter(email => email.trim() !== '' && !email.startsWith('#'));

      if (emails.length === 0) {
        console.error(chalk.red('邮箱文件为空，请检查内容'));
        return;
      }

      displayWelcome();

      for (let i = 0; i < emails.length; i += config.maxConcurrentRequests) {
        const batch = emails.slice(i, i + config.maxConcurrentRequests);
        await processBatch(batch, reff);
        await delay(config.delay);
      }

      console.log(chalk.blue(`所有邮箱处理完成，共注册 ${emails.length} 个账户`));
    } catch (err) {
      console.error(chalk.red(`读取邮箱文件失败: ${err.message}`));
    } finally {
      rl.close();
    }
  }

  rl.question("请输入您的邀请码: ", (reff) => {
    readEmailsAndRegister(reff);
  });

})();
