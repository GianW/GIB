DEF TEMP-TABLE ttPedido NO-UNDO SERIALIZE-NAME "pedido"
   FIELD solicitacao AS CHAR 
   FIELD sts  AS CHAR 
   index tt01 is primary solicitacao.

DEF TEMP-TABLE ttItem NO-UNDO SERIALIZE-NAME "item"
    FIELD solicitacao AS CHAR
    FIELD codigo AS CHAR.


DEF dataset dsPedido SERIALIZE-NAME "json"
   for ttPedido, ttItem
   data-relation dr1 for ttPedido, ttItem relation-fields(solicitacao, solicitacao) nested.

DEF VAR dadosJson AS LONGCHAR NO-UNDO.

dadosJson = '~{ "json": ~{ "pedido":[ ~{"solicitacao":"01","sts":"Pendente" ~}, ~{"solicitacao":"02","sts":"Concluido" ~}],' +
                '"item":[ ~{"solicitacao":"01","codigo":"1234" ~}, ~{"solicitacao":"01","codigo":"4567" ~}, ~{"solicitacao":"02","codigo":"abc" ~}, ~{"solicitacao":"02","codigo":"dee" ~}] ~} ~}'.

/*
OUTPUT TO "P:\SVNUsers\giancarlo.winckler\bacas\MOB\teste.txt".
 EXPORT dadosJson .
OUTPUT CLOSE.
*/
     
     
dataset dsPedido:read-json("longchar", dadosJson, "empty").



FOR EACH ttPedido:
    DISP ttPedido.
END.
