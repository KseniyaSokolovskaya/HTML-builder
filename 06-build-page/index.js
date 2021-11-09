const path = require('path');
const { readdir, mkdir, rm, readFile, writeFile } = require('fs').promises;
const { buildFiles } = require('../05-merge-styles/index.js');
const { copyDir } = require('../04-copy-directory');

const destDir = path.resolve(__dirname, 'project-dist');
const destDirAssetsPath = path.resolve(__dirname, 'project-dist/assets');
const destDirComponentsPath = path.resolve(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const destFileStylePath = path.join(__dirname, 'project-dist', 'style.css');
const initialDirPath = path.resolve(__dirname, 'assets');
const initialDirStylesPath = path.resolve(__dirname, 'styles');

async function readTemplate(path, coding) {
  return await readFile(path, coding)
    .then((value) => value)
    .catch(err => console.log('err', err));
}

async function getComponentsName(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  let components = {};
  entries.forEach(entry => components[path.basename(entry.name, path.extname(entry.name))] = path.join(__dirname, 'components', entry.name));
  return components;
}

async function readComponent(path, coding) {
  return await readFile(path, coding)
    .then((value) => value)
    .catch(err => console.log(err));

}

async function getReplacedTemplate(template, pathsObj) {
  let componentsPromises = Object.entries(pathsObj).map(([key, path]) => {
    return readComponent(path, 'utf-8').then(template => ({ key, template }));
  });
  let components = await Promise.all(componentsPromises);
  const replacedTemplate = template.replace(/{{(?<label>.*)}}/g, function (_matched, label) {
    const component = components.find(({ key }) => key === label);
    return component.template;
  });
  return replacedTemplate;
}

(async () => {
  await rm(destDir, { recursive: true, force: true });
  await rm(destDir, { recursive: true, force: true });
  await copyDir(initialDirPath, destDirAssetsPath);
  await buildFiles(initialDirStylesPath, destFileStylePath, '.css');

  let template = await readTemplate(templatePath, 'utf-8');
  let componentsPathObj = await getComponentsName(destDirComponentsPath);
  const content = await getReplacedTemplate(template, componentsPathObj);

  await writeFile(path.join(destDir, 'index.html'), content, 'utf-8');
})();
