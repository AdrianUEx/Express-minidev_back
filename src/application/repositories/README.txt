En esta carpeta se supone que van las interfaces de los repositorios, porque se supone que indican qué operaciones tienen que venir desde la BD.

Es decir, no es un DAO. Solo establece una plantilla de los métodos que pueden ser accedidos por cualquier caso de uso que implemente esta interfaz (deberían ser todos).
Así los casos de uso llaman a este repositorio (o implementan este repositorio, no sé) pero la llamada real al ORM ni siquiera está en este repositorio que ellos usan,
sino que está en otra parte de la aplicación que no me queda clara.