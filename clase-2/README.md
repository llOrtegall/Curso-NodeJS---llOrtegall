* * PROTOCOLO HTTP * *

-> Request son las peticiones que realiza un cliente 
esta request nos traera cosas como: url, headers, 
method(GET), body(Cuerpo), tokens entro otras.

-> Estas request por lo general deben llegar a un 
servidor, procesa toda la información, una vez hace
esto el devolverá una Response (Respuesta), por lo 
general está Response traera: statusCode, headers, body

* * Staus Code * *

100-199 = Respuestas informativas
200-299 = Respuestas Satisfactorias
300-399 = Redirecciones
400-499 = Error Del Cliente
500-500 = Errores Del Servidor