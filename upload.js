const file = require('./readFile'); // 读取文件
const ProgressBar = require('./progress-bar');  // 进度条
const pb = new ProgressBar('正在上传至阿里云', 50); // 初始化进度条

let OSS = require('ali-oss'); // OSS SDK
let client;


// 构造上传函数
function uploadFile(key, localFile) {
  return client.put(key, localFile).then(function (r1) {
    // console.log('put success: %j', r1);
    return client.get(key);
  }).then(function (r2) {
    // console.log('get success: %j', r2);
    return r2;
  }).catch(function (err) {
    console.error('error: %j', err);
  });
}

let num = 1;
function uploading(files) {
  if (num <= files.length) {
    // 更新进度条
    pb.render({ completed: num, total: files.length });

    // 上传
    const key = files[num - 1].fileName;
    const filePath = files[num - 1].filePath;
    uploadFile(key, filePath).then(() => {
      num++;
      setTimeout(() => {
        uploading(files);
      }, 200)
    }).catch(() => {
      console.error('\nupload fail!')
    })
  } else {
    console.log('\nupload finish!')
  }
}

module.exports = function(path, obj) {
  const files = file.getFiles(path);
  client = new OSS(obj);
  uploading(files);
}