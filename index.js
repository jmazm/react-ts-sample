const fs = require('fs');
const path = require('path');

const getAllDirectories = () => {
  const dirObj = {};

  const dirPath = path.resolve(process.cwd(), 'client/modules');

  // 当前路径是否存在
  if (fs.existsSync(dirPath)) {

    // 读取modules目录下的内容，包括文件夹名以及文件名
    const modules = fs.readdirSync(dirPath);

    for (const moduleName of modules) {

      const modulePath = path.resolve(dirPath, moduleName);
      // 判断当前module是不是文件夹，如果是才做操作
      if (fs.statSync(modulePath).isDirectory()) {
        // 读取module文件夹下的index.tsx，作为入口文件
        const entryPath = path.resolve(modulePath, 'index.tsx');

        if (fs.existsSync(entryPath)) {
          dirObj[moduleName] = {
            name: moduleName,
            path: entryPath
          }
        }
      }
    }
  }

  return dirObj;
}

const entry = getAllDirectories();