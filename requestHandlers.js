const querystring = require('querystring')
var fs = require('fs')
function hello(requisicao,resposta){
  resposta.writeHead(200,{'Content-Type': 'text/html'})
  resposta.write("<h1> Olá </h1>")
  resposta.end()
}

function listaEnderecos(requisicao,resposta){
  resposta.writeHead(200,{'Content-Type': 'text/html'})
  resposta.write("<h1> Listando os Enderecos </h1>")
  resposta.write("<a href=\"\">\\</a><br>")
  resposta.write("<a href=\"index.html\">Index</a><br>")
  resposta.write("<a href=\"sobre.html\">Sobre Autor</a><br>")
  resposta.write("<a href=\"aleatorios.html\">Numeros Aleatorios</a><br>")
  resposta.write("<a href=\"primos.html?n1=0&n2=100\">Numeros Primos entre [0,100]</a><br>")
  resposta.write("<a href=\"equacao.html\">Equacao</a><br>")
  resposta.write("<a href=\"xadrez.html\">Xadrez</a><br>")
//  resposta.write("<a href=\"xadrez.json\">Aplicacao de xadres</a><br>")

  resposta.end();

}
function numRandomico(max){
  return Math.floor(Math.random() * max);
}
function sobre(requisicao,resposta){
  resposta.writeHead(200,{'Content-Type': 'text/html'})
  resposta.write("<h1>Sobre Autor </h1>")
  resposta.write("<h3>Nome: Luis Felipe de Almeida Nascimento<br>")
  resposta.write("Matricula: 201465577C<br>")
  resposta.write("Email: luis.felipe.almeida.nascimento@gmail.com<br>")
  resposta.write("Curso: Ciencia da Computacao<br></h3>")
  resposta.end();

}
function numerosAleatorios(requisicao,resposta){
  resposta.writeHead(200,{'Content-Type': 'text/html'})
  var num = {}
  for(var i =0; i<100; i++){
    num[i]= numRandomico(100);
  }
  resposta.write("<h1>Numeros  Aleatorios</h1>")
  //Lista os numeros pares
  resposta.write("<h2>Pares</h2><ol>")
  for(var i =0; i<100; i++){
    if(num[i]%2==0)
      resposta.write("<li>"+num[i]+"</li>")
  }
  resposta.write("</ol>")
  //Lista os numeros impares
  resposta.write("<h2>Impares</h2><ol>")
  for(var i =0; i<100; i++){
    if(num[i]%2!=0)
      resposta.write("<li>"+num[i]+"</li>")
  }
  resposta.write("</ol>")
  resposta.end()
}

function numerosPrimos(requisicao,resposta){
  resposta.writeHead(200,{'Content-Type': 'text/html'})
  resposta.write("<h1>Numeros Primos </h1>")
  var parametros = querystring.parse(requisicao.url.split("?")[1])
  if((parametros.n1 < parametros.n2) & (parametros.n2 <= 100)){
    resposta.write("<h2>Lista Primos Entre: ["+parametros.n1+", "+parametros.n2+"]</h2><ol>")
    for (var i = parametros.n1; i <= parametros.n2; i++){
      var primo = true;
      var j = Math.floor(i/2);
      while(primo && j > 2){
        if(i%j == 0){
          primo = false
        }
        j=j-1;
      }
      if(j>=1 && primo){
          resposta.write("<li>"+i+"</li>")
      }
    }
    resposta.write("</ol>")
  }else{resposta.write("Parametros  n1 e n2 incorretos Tente novamente")}
  resposta.end()
}

function equacao(requisicao,resposta){
  if(requisicao.method=='POST') {
            resposta.writeHead(200, { 'Content-Type': 'text/html'});
            var body='';
            requisicao.on('data', function (data) {
                body +=data;
            });
            requisicao.on('end',function(){
                var POST=  querystring.parse(body)
                var a = parseFloat(POST.a)
                var b = parseFloat(POST.b)
                var c = parseFloat(POST.c)
                if(a&&b&&c){
                  var delta = b*b-4*a*c;
                  if(delta >= 0){
                    var x = {}
                    x[1] =(-1*b+Math.sqrt(delta))/(2*a);
                    x[2] =(-1*b-Math.sqrt(delta))/(2*a);
                    resposta.write("<h1> Raizes da Equacao: "+a+"x*x +"+b+"x +"+c+ " = 0 </h1> <h3> <br> X1 = "+x[1]+"<br> X2 = "+x[2]+" </h3>")
                  }else {
                    resposta.write("<h1> Equacao nao possui raizes reais</h1>")
                  }
                }else {
                    console.log(POST);
                    resposta.write("<h1> Parametros da equacao invalidos </h1>")
                }
                resposta.end();
            });
    }
    else if(requisicao.method=='GET') {
        fs.readFile('formEquacao.html', function (err, data) {
              resposta.writeHead(200, { 'Content-Type': 'text/html','Content-Length': data.length });
              resposta.write(data);
              resposta.end();
          });
    }
}
function xadrez(requisicao,resposta){
  resposta.writeHead(200,{'Content-Type': 'text/html'})
  resposta.write("<h1>Xadrez</h1><br>")
  resposta.end()
}
function xadrezAplicacao(requisicao,resposta){
  resposta.writeHead(200,{'Content-Type': 'text/html'})
  resposta.write("<h1>Aplicacao de Xadrez</h1><br>")

  resposta.end()
}

exports.hello = hello
exports.sobre = sobre
exports.listaEnderecos = listaEnderecos
exports.aleatorios = numerosAleatorios
exports.primos = numerosPrimos
exports.equacao = equacao
exports.xadrez = xadrez
exports.xadrezApp = xadrezAplicacao
