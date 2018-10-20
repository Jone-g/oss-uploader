# uploadForOSS
### 基于node.js开发
### 本地文件批量上传到阿里云OSS

``` bash
# npm 安装
npm i oss-uploader -S

# 使用与配置
const uploadForOSS = require('oss-uploader')
const uploadPath = '此处为要上传的文件路径，文件夹或单个文件'

uploadForOSS(uploadPath, {
    region: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: ''
})