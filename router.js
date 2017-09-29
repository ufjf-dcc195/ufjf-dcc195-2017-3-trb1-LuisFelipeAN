function calculaRota(pathname,handlers, requisicao, resposta,parametros){
  if(typeof handlers[pathname] == 'function'){
    handlers[pathname](requisicao,resposta,parametros)
  } else{
      resposta.writeHead(404, {'Content-Type': 'text/html'})
      resposta.write("<h1>Endereço não encontrado</h1>")
      resposta.end()
    }
}
exports.calculaRota = calculaRota;
