import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { getComponentCode, getDemoCode, getDocCode } from './templates/index.mjs';

const CWD = process.cwd();

inquirer.prompt([{
  type: 'input',
  message: '请填写组件英文名称（需要使用大驼峰命名，例如MultiMarker）',
  name: 'name',
}, {
  type: 'input',
  message: '请填写组件中文名称（例如点标记）',
  name: 'zhName',
}]).then((answers) => {
  let { name, zhName } = answers;
  name = getFirstLetterUpper(name);
  const dirPath = path.join(CWD, `./src/${name}`);
  if (fs.existsSync(dirPath)) {
    console.log(`${dirPath}已存在，请重新创建`);
    return;
  }
  fs.mkdirSync(dirPath);
  generateFile(`${dirPath}/index.tsx`, getComponentCode(name));
  insertComponentToIndex(name, `${path.join(CWD, `./src/index.ts`)}`);
  generateFile(`${dirPath}/demo.tsx`, getDemoCode(name));
  generateFile(`${dirPath}/index.md`, getDocCode(name, zhName));
});


const generateFile = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    console.log(`${filePath}已存在，请重新创建`);
    return;
  }
  try {
    fs.writeFileSync(filePath, content);
  } catch (err) {
    console.error('创建文件时出错:', err);
  }
};

function insertComponentToIndex(name, indexPath) {
  let data = fs.readFileSync(indexPath).toString();
  data += `${getExportStr(name)}`;
  fs.writeFile(indexPath, data, (err) => {
    if (err) {
      console.log(err, 'error');
    }
  });
}

function getExportStr(name) {
  const firstLetterUpperName = getFirstLetterUpper(name);
  return `\nexport { default as ${firstLetterUpperName} } from './${firstLetterUpperName}';`;
}

function getFirstLetterUpper(a) {
  return a[0].toUpperCase() + a.slice(1);
}
