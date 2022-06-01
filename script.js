const elementoLista = document.querySelector("ul");         //seleciona a ul e guarda numa const ou var 
const elementoInput = document.querySelector("input");      //seleciona o elemento input e guarda
const elementoBotao = document.querySelector("button");     //selecionar o elemento button e guarda


const tarefas = JSON.parse(localStorage.getItem("list_tarefas")) || [] //faz um get dos itens armazenados

function mostraTarefas(){ //function q mostra as tarefas na tela

    elementoLista.innerHTML = '' //serve para zerar a lista no html, se nao tivesse feito isso os itens da lista ficariam repetindo

    for(tarefa of tarefas){                                     //for para ir colocando o conteudo um embaixo do outro
        
        var elementoTarefa = document.createElement("li");    //criando o elemento li 
        const textoTarefa = document.createTextNode(tarefa)     //criando o texto tarefa

        const elementoLink = document.createElement("a")      //criando o codigo para deletar a tarefa
        const pos = tarefas.indexOf(tarefa)         //pega a posiçao do array aqui do for

        const linkText = document.createTextNode("X")  //cria o texto do link
        elementoLink.appendChild(linkText)   //add o texto a o elementoLink

        elementoLink.setAttribute("href", "#")  //com esse atributo ele ficara com aparencia de link
        elementoLink.setAttribute("onclick" , `deletaTarefa(${pos})`)   //add o atributo para chamar a funçao deletaTarefa
        
        elementoTarefa.appendChild(textoTarefa)      //add o textoTarefa ao pai dele elementoTarefa que é o li
        elementoLista.appendChild(elementoTarefa)    //add o li a o pai dele ul
        elementoTarefa.appendChild(elementoLink)     //add o elementoLink ao elemento tarefa
    }
    
}
mostraTarefas()

function addTarefas(){                              //add as tarefas
    const textoTarefa = elementoInput.value;        //pega o valor do input e guarda
    if (textoTarefa.length <= 1){
        alert("Por favor, digite uma tarefa...")    //se o campo input estiver vazio vai aparecer esse alert na tela do usuario
        elementoInput.value = ""
      } else if (textoTarefa.length > 50){
        alert("O limite máximo é de 50 caracteres")
        elementoInput.value = ""
      } else{
    tarefas.push(textoTarefa)       //colocar o valor do input dentro do array que esta vazio la na linha 6
    elementoInput.value =''        //esse serve para zerar o input, na hora q o usuario digitar e clicar em adicionar ele vai ter o input zerado para poder digitar dnv
      }
      mostraTarefas()
      conteudolocal() //aqui a mesma coisa 
    }
  function deletaTarefa(pos){   //function para deletar a tarefa
        tarefas.splice(pos, 1)  //metodo splice deleta elementos existentes em um array com o argumento pos (posiçao) e o numero que diz a posiçao
        mostraTarefas()
        conteudolocal() //coloco a funcçao aki para que na hora que excluir uma tarefa ela tbm ja é excluida do localstorage
  }
  function conteudolocal(){
    localStorage.setItem("list_tarefas" , JSON.stringify(tarefas)) //pega os itens do array e armazena
  }