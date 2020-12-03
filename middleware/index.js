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
var horaAux='';

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
          horaAux= data[0];
				i++;
			}
		}
	});
},1000);

function setBash(){
  var c;   // a character of the shell's stdout stream 
  var retval = "";   // the return value is the stdout of the shell 

  var rt = Runtime.getRuntime();  // get current runTime object 
  var shell = rt.exec("bash -c '" + "bash info.sh" + "'"); // start the shell 
  var shellIn = shell.getInputStream();  // this captures the output from the command 

  while ((c = shellIn.read()) != -1)  // loop to capture shell's stdout 
  { 
   retval += String.fromCharCode(c);  // one character at a time 
  } 

  bash_exit_code = shell.waitFor();  // wait for the shell to finish and get the return code 

  shellIn.close();   // close the shell's output stream 

  return retval; 
}


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
      hora:horaAux,
  });
});

app.listen(port, () => {
  console.log(`Middlewar -> ${port}`);
});
