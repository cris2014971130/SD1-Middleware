const express = require("express");
const app = express();
const port = 2000;

const hbs = require("hbs");

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

const readLastLines = require('read-last-lines');


let serverAStatus;
let serverBStatus;
var server1;
var server2;
let time='';

setInterval(()=>{
	readLastLines.read('info.txt', 20).then((lines) => {
		let data = lines.split('\n');
		for (var i = 0; i < data.length; i++) {
			if(data[i] == 'Server1'){
				if(data[i + 1] === '')
					serverAStatus = 'FAIL';
				else
					serverAStatus = 'OK';
				i++;
			}else if(data[i] == 'Server2'){
        serverBStatus = 'OK';
        if(data[i + 1] === '')
					serverBStatus = 'FAIL';
				else
					serverBStatus = 'OK';
				i++;
			}
		}
	});
},1000);


app.get("/", (req, res) => {
    if(serverAStatus =='OK'){
      server1="Servidor Funcionando";
    }
    if(serverAStatus =='FAIL'){
      server1="Servidor No Funcionando";
    }else if(serverBStatus=='FAIL'){
      server2="Servidor No Funcionando";
    }
    if(serverBStatus=='OK'){
      server2="Servidor Funcionando";
    }
  res.render("index", {
      server1: server1,
      server2: server2,
  });
});

app.listen(port, () => {
  console.log(`Middlewar -> ${port}`);
});
