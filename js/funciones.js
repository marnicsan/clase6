/*Crear una funcion que agrege una pelicula al array de peliculas
La pelicula debera tener un ID y un Titulo
Crear una funcion que evalue antes de agregar que la pelicula no fue ingresada previamente
Crear una funcion que ordene las peliculas por Titulo y por ID
Crear una funcion que elimine una pelicula por su ID.*/

var Pelicula= function(id,titulo){
	this.id=id;
	this.titulo=titulo;
}

var imdb=(function(){
	var instancia;
	
	function init(){
		var peliculas=[];
		var id=1;
		if(localStorage.getItem("peliculas")==null){
			localStorage.setItem("peliculas",peliculas);
		}else{
			peliculas=localStorage.getItem("peliculas");
		}

		function persistirPelis(){
			localStorage.setItem("peliculas",peliculas);
		}

		function ordenarPeliculasId(){
			peliculas.sort(function(a,b){
				return a.id>b.id;
			});
		}

		function ordenarPeliculasTitulo(){
			peliculas.sort(function(a,b){
				return a.titulo>b.titulo;
			});
		}

		function validarPelicula(titulo){
			var res=true;
			if(peliculas.length>0){
				for(var i=0;i<peliculas.length;i++){
					if(peliculas[i].titulo==titulo){
						res=false;
						console.log("La pelicula "+titulo+"ya existe")
						break;
					}
				}
			}
			return res;
		}

		return{
			agregarPelicula: function(titulo){
				if(validarPelicula(titulo)){
					peliculas.push(new Pelicula(id,titulo))
					id++;
				}
				persistirPelis();
			},

			eliminarPelicula: function(id){
				for(var i=0;i<peliculas.length;i++){
					if(peliculas[i].id==id){
						peliculas.splice(i,1);
						break;
					}
				}
				persistirPelis();
			},

			ordenarPelis: function(tipoOrd){
				if(tipoOrd==1){
					ordenarPeliculasId();
					persistirPelis();
				}else if(tipoOrd==2){
					ordenarPeliculasTitulo();
					persistirPelis();
				}
			},

			mostrarPelis: function(){
				var pelis="";
				for(var i=0;i<peliculas.length;i++){
					pelis=pelis+peliculas[i].titulo+"\n";
				}
				console.log(pelis);
			}
		}
	};

	return{
		instanciar: function() {
            if (!instancia)
                instancia = new init();
            return instancia;
        }
	}

})();

var pelis=imdb.instanciar();
accionar();

function accionar(){
	var accion=-1
	do{
		accion=prompt("Por favor Indique el numero de accion a realizar:\n\n"+
						"1- Agregar Pelicula\n"+
						"2- Ordenar Pelicula\n"+
						"3- Elimnar Pelicula\n"+
						"4- Mostrar Peliculas\n"+
						"5- Terminar");
		switch(accion){
			case "1": 	agregarPeliculas();
						break;
			case "2": 	ordenarPeliculas();
						break;
			case "3": 	eliminarPeliculas();
						break;
			case "4": 	pelis.mostrarPelis();
						accionar();
						break;
			case "5": 	alert("ADIOS!");
						break;
		}
	}while(accion!="1" && accion!="2" && accion!="3" && accion!="4" && accion!="5")
}

function agregarPeliculas(){
	var titulo="";
	do{
		titulo=prompt("Ingrese Titulo de la pelicula a agregar:")
		pelis.agregarPelicula(titulo);
	}while(titulo=="");
	accionar();
}

function eliminarPeliculas(){
	var titulo="";
	do{
		titulo=prompt("Ingrese Id de la pelicula a eliminar:")
		pelis.eliminarPelicula(titulo);
	}while(titulo=="");
	accionar();
}

function ordenarPeliculas(){
	var titulo="";
	do{
		titulo=prompt("Ingrese numero de tipo de Ordenamiento:\n\n"+
						"1- Ordenar por Id\n"+
						"2- Ordenar por Titulo\n")
		pelis.ordenarPelis(titulo);
	}while(titulo=="")
	accionar();
}