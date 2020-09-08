const { ipcRenderer } = require('electron');


function startApp(){
    montarMenus(ipcRenderer.sendSync('get-userMenus'));
    atualizarDataAtualPesquisa();
    buscarPedidiosDia();
};

document.querySelector('#link_sobre').addEventListener('click', function() {
    let dialog = document.querySelector('#dialog');
    dialog.showModal();
});

document.querySelector('#fecharModal').addEventListener('click', function() {
    let dialog = document.querySelector('#dialog');
    dialog.close();
});

String.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
};

montarMenus = (listaMenus) =>{

    let mnuHtml = listaMenus.map(menu => {
        return `<a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">${menu.icon}</i>${menu.name}</a>`;
    });

    // document.getElementById
    document.querySelector("#menuList").innerHTML += mnuHtml.toString();
    // document.querySelector("#menuList").appendChild(mnuHtml.toString());
    console.log(mnuHtml);

    // menuList.html();
};

atualizarDataAtualPesquisa = () => {
    let diaAtual = new Date();
    document.getElementById("dataPesqPedido").value = diaAtual.getFullYear() + "-" + diaAtual.getMonth().toString().pad(2) + "-" + diaAtual.getDate().toString().pad(2)
};

buscarPedidiosDia = () =>{
    var listaPedidos = [
        {
            pedido: 1234,
            filial: 5051,
            status: "Cadastrado",
            hora: "10:00",
            urgencia: "Normal",
            negociacao: 0
        },
        {
            pedido: 1234,
            filial: 5051,
            status: "Cadastrado",
            hora: "10:00",
            urgencia: "Normal",
            negociacao: 0
        }
    ];

    exibirPedidosDia(listaPedidos);
};

exibirPedidosDia = (listaPedidos) =>{

    var divConteudo = document.getElementById("gridPedidos");
    var conteudoHTML = '<table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">';
        conteudoHTML += '<thead><tr><th class="mdl-data-table__cell--non-numeric">Pedido</th>';
        conteudoHTML += '<th>Filial</th><th>Status</th><th>Urgência</th><th>Hora</th><th>Negociação</th></tr></thead><tbody>';

    listaPedidos.map(pedido => {
        conteudoHTML += `<tr><td class="mdl-data-table__cell--non-numeric">${pedido.pedido}</td><td>${pedido.filial}</td>
                         <td>${pedido.status}</td><td>${pedido.urgencia}</td><td>${pedido.hora}</td><td>${pedido.negociacao}</td></tr>`;
    });

    divConteudo.innerHTML = conteudoHTML + "</tbody></table>";
};

window.addEventListener("load", startApp);