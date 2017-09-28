var servidor = require("./server")
var roteador = require("./router")
var requestHandlers = require("./requestHandlers")

var handlers = {}
handlers["/"] = requestHandlers.listaEnderecos
handlers["/index.html"] = requestHandlers.listaEnderecos
handlers["/hello.html"] = requestHandlers.hello
handlers["/sobre.html"] = requestHandlers.sobre
handlers["/aleatorios.html"] = requestHandlers.aleatorios
handlers["/primos.html"] = requestHandlers.primos
handlers["/equacao.html"] = requestHandlers.equacao
handlers["/xadrez.html"] = requestHandlers.xadrez


servidor.iniciaServidor(roteador.calculaRota,handlers)
