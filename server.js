var http = require("http")
var url  = require("url")
function inicia(rota, handlers){
    function sobreRequisicao(requisicao, resposta){
      rota(url.parse(requisicao.url).pathname,handlers,requisicao,resposta)
    }
    http.createServer(sobreRequisicao).listen(process.env.PORT)
    console.log("Servidor iniciado em http://localhost:"+process.env.PORT);
}
exports.iniciaServidor = inicia
