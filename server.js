var express=require('express');
var app=express();
var PORT=process.env.PORT||8080;
var bodyParser=require('body-parser');
var multer=require('multer');
var upload = multer({ dest: 'uploads/' });
app.use(express.static('./public'));




app.post('/api/fileupload', upload.single('file'), (req, res) => {
  res.send(req.file);
});
app.post('/api/fileuploads', upload.array('files'), (req, res) => {
  res.send(req.files);
});


app.use((req,res)=>{
	res.sendFile(__dirname+'/public/index.html');
})
app.listen(PORT,err=>{
	console.log(err||('Running on Port '+PORT));
});