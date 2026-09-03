# Minidev_back
Proyecto de Express con TypeScript, empleado como backend desplegado localmente. Emplea Clean Architecture.


## Comandos para back de express:

```bash
npm install
npm run dev    # start in development (ts-node-dev)
npm run build  # compile to dist/
npm start      # run compiled output
```

## Comandos para BD local:
* docker compose up 
* docker compose down

## QueryParams de las peticiones de carga de ficheros

### /upload
* mode: el tipo de fichero que se va a pasar. Debe coindidir con el tipo real de fichero que se está incluyendo en la petición. El valor puede ser 'csv' o 'json'
* content: el tipo de contenido del interior del archivo. Debe coindidir con el tipo real de contenido que se está incluyendo en la petición. Se admite 'libro' y 'autor'.

### /uploads
* mode: el tipo de fichero que se va a pasar. Debe coindidir con el tipo real de fichero que se está incluyendo en la petición. El valor puede ser 'csv' o 'json'
* content: el tipo de contenido del interior del/los archivo/s. Debe coindidir con el tipo real de contenido que se está incluyendo en la petición. Se admite 'libro' y 'autor'.
* ficherocarga: es solo para /uploads. Define el nombre de fichero a utilizar en el proyecto para cargar la BD. Este método es mutuamente excluyente con preparar en el body un campo de texto con el nombre de los campos que tienen fichero en la petición.

## Parametros del body para las peticiones de carga de ficheros
Para la carga de archivos mediante ficheros se debe utilizar forzosamente el tipo 'multipart/form-data', accesible en programas como Postman o Insomnia bajo el nombre de 'form-data'
### /upload
* file: el campo de tipo File que incluye un CSV o un JSON. El nombre 'file' corresponde al valor del campo 'name' en un `<input>` de un formulario

### /uploads
* file: uno o varios campos que han de tener como nombre 'file' para poder ser procesados correctamente por Multer. El nombre 'file' corresponde al valor del campo 'name' en un `<input>` de un formulario, que debe ser compartido por todos los `<input>` del formulario que se usen para transmitir archivos.
* fichero: permite emplear su valor para cargar/usar el archivo homónimo (sin extensión) para poblar la BD. Este método es mutuamente excluyente con usar un QueryParam para transmitir el nombre del archivo a utilizar.