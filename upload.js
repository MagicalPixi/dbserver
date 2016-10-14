var FormData = require('form-data'),
axios = require('axios'),
fs = require('fs'),
data = new FormData();

data.append('file', fs.createReadStream('README.md'))

axios.post('http://localhost:6770/upload', data, {headers: data.getHeaders()}).then(value => {
  console.log(value.data)
}).catch(reason => {
  console.log(reason.response.data)
})
