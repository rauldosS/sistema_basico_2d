# 📈 Implementação de um sistema básico 2D

A tarefa está disponível aqui: [link para a tarefa!](https://rauldoss.github.io/sistema_basico_2d/)

- Interface Gráfica (GUI) básica com a janela de visualização (viewport), display list, botões para movimentação da window (ainda sem implementação)
- Display list 2D que armazene os objetos do sistema
  - Deverá ser possível remover os elementos individuais da display list
  - Todos os objetos da display list devem ser mostrados simultaneamente no viewport
- UI capaz de adicionar ao display list os seguintes objetos 2D: Pontos, retas, polilinhas (listas de pontos interconectados formando uma figura poligonal aberta) e polígonos (semelhante à polilinha, mas formando uma figura poligonal fechada)
  - Cada objeto deve possuir um nome (que possa ser atribuído pelo usuário) e um tipo
  - No caso das polilinhas e polígonos, o número de pontos deve ser variável (3 ou mais)
  - No caso do polígono, o sistema deve automaticamente ligar o último ponto informado ao primeiro, não havendo necessidade de armazenar ambos pontos inicial e final
  - Deve ser possível inserir os objetos em coordenadas cartesianas positivas e negativas
- Nesta parte ainda não há a necessidade de implementar a transformada de viewport
  - A viewport deve refletir automaticamente o estado da display list, ou seja, ao se adicionar, alterar ou remover um elemento do display file, o viewport deve ser automaticamente atualizado

![alt text](https://github.com/rauldosS/sistema_basico_2d/blob/main/images/1.png?raw=true)

![alt text](https://github.com/rauldosS/sistema_basico_2d/blob/main/images/2.png?raw=true)
