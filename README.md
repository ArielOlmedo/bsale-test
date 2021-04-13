# Test-Bsale

En el siguiente repo se presenta un sistema web planteado por la empresa Bsale, el cual busca determinar si las aptitudes del postulante son adecuadas para la oferta laboral que se está entregando. En este documento se procederá a detallar una breve explicación de como fue abordado el problema. El documento también abordara algunas características respecto a la instalacion y las herramientas utilizadas en el desarrollo.

La problematica a solucionar y algunos aspectos tecnicos del problema pueden ser revisados [aquí](https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=a9213e5e65&attid=0.1&permmsgid=msg-f:1695878238573639094&th=1788f845d87f35b6&view=att&disp=inline&saddbat=ANGjdJ_rGuFdRJSXbKgoXZmH_JwTbwgmB5RPmMIJu_ZWBdNkOyOn6kKFSblfZ9zZ635E2kOWQAXPMm4pnMcqGMgshakylwpgD82ZZtflo9RaZI-8MoErZdu7vRAP6VKGr0koG6VJwwof0sIuu1J9JSswDCYTHeHGp6VUmu98Bx3mIDuxaWaNNcgNMlaeNiWr8RqQpudDJkhbsPPAFkSkRkea0SXtNPMPoCaVaP06ovrpyd1p041VBuLc4gJWV1vySWk1l1MAUxgXLpDP3gGTUUdhfMt089RY2uSkSOcxFZboeFJGdQHCHur-JjGFiQejCbv-cIIjC-HZYmB5i2Wb6CcS23RcmCKsNAlMhZiQvt4lknAxe0Q9X9NBgB-Uj-mcVgjeYz5GmHnJi1kmgh0Hh2ihKEMp0324nMjyZA2LpBI6vBz6IdLpdGbKF_FIzlu0Sje018PgwWN858Pxt38FWBfOotcvXX-SMKZavYPztneMfSGrs_PsvV0fww1Iwee2ZrA-otnk2Hu_q2acsl5k1vadsAC4g5NvzfkE_2G0Qp8lHxHRyIKRy1lM2EpwIywxKpidXBcu8Alz9xB4uSbuL0Wk_bC1smH8hRrCyjZTZGSQddHgf_ye2uLSQYZ7DJkXMYzqvy24S55DOQXhKiXnM6j92y54vCr4ncXeyejEdgLsmQBM4doinOEtbWPpEWw).

La arquitectura utilizada para la solución de este problema será un MVC (Modelo-Vista-Controlador).Para realizar el desarrollo de esta web se ha desarrollado el controlador y la vista, las cuales corresponden al BackEnd y FrontEnd respectivamente, el modelo ya viene dado en el test. Dentro de las herramientas disponibles para el desarrollo del este tipo de software se encuentran distintos frameworks para el manejo de la Api rest, pero se ha decidido utilizar laravel 8. Igualmente para las vistas se utilizó la plantilla de “HTML 5 Boilerplate” junto con la librería Bootstrap para CSS, sin ningún framework en particular.

Demo: https://arielolmedo.github.io/bsale-test/

Repositorio Front-End del proyecto:https://github.com/ArielOlmedo/bsale-test

Repositorio Back-End del proyecto:https://github.com/ArielOlmedo/bsale-test-back


## Comenzando 🚀

Para desplegar el Front-End, se debe clonar el repositorio en caso de querer ejecutar de manera local (En caso de desear desplegar Back-end dirigirse a su documentacion [aquí.](https://github.com/ArielOlmedo/bsale-test-back)).

Clonar Front-End:
```
$ git clone https://github.com/ArielOlmedo/bsale-test.git
```

### Pre-requisitos 📋

Instalar Nodejs: https://nodejs.org/

### Instalación 🔧

Instalar Dependencias

```
npm install
```

Iniciar servidor local:

```
npm start
```

***IMPORTANTE***: SI SE DESEA CORRER BACKEND DE MANERA LOCAL SE DEBEN REEMPLAZAR LOS ENDPOINTS DEL ARCHIVO "fetch.js" POR LOS DEL LOCALHOST.

## Información técnica 📄

La solución ideada para este problema consta de una `barra de búsqueda`, filtros de `categorías`, un select para escoger el `parámetro de orden` de los productos(por defecto ordenado por categorías) y finalmente otro select el cual nos permite `ordenar ascendentemente o descendentemente` tanto alfabéticamente como por el precio de los productos.

![alt_text](https://scontent.fkna1-1.fna.fbcdn.net/v/t1.15752-9/173644965_1352766241768776_3063658800215121989_n.png?_nc_cat=109&ccb=1-3&_nc_sid=ae9488&_nc_ohc=bFLAJw27B5MAX95-mXX&_nc_ht=scontent.fkna1-1.fna&oh=a8bdffeb0ba8addd7b7508b85ca1b7be&oe=609AB05D)

Estas búsquedas a su vez pueden ordenarse y filtrarse. Ejemplo si digito el numero 5 como búsqueda tendré distintos productos pertenecientes a distintas categorías, búsqueda la cual puedo ordenar por cualquiera de los parámetros y a la vez filtrar según la categoría de producto que busque.

Para las vistas de los productos se han implementado las siguientes cards:

![alt text](https://scontent.fkna1-1.fna.fbcdn.net/v/t1.15752-9/173560805_482963779736387_4085036035887684951_n.png?_nc_cat=102&ccb=1-3&_nc_sid=ae9488&_nc_ohc=16vHIc5o52UAX_Zr3U7&_nc_ht=scontent.fkna1-1.fna&oh=11aac4e758e13853a1dc78ec468c139f&oe=609BA470)

Dónde:

1º Corresponde a la `imagen` establecida del producto, en caso de encontrarse un parámetro vacío, se usara una imagen por defecto.<br><br/>
2º Corresponde al `nombre de producto`.<br><br/>
3º Corresponde al `precio del producto con descuento añadido` en caso de poseer descuento, en el caso contrario, solo se da el `precio` dado por la base de datos.<br><br/>
4º Corresponde al `precio sin descuento añadido`en caso de poseer descuento, en el caso contrario este parámetro no existe.<br><br/>
5º Corresponde al `porcentaje a descontar `al precio original del producto, en caso de no existir esto no se muestra en el card.<br><br/>
6º Corresponde a la `categoría` del producto mostrado en el card.<br><br/>


## Construido con 🛠️


* [Html5 Boilerplate](https://html5boilerplate.com/) - Plantilla web utilizada.
* [Bootstrap](https://getbootstrap.com/) - Libreria CSS utilizada.
* [Nodejs](https://nodejs.org/) - Entorno


## Autor ✒️

* **Ariel Olmedo** - [ArielOlmedo](https://github.com/ArielOlmedo)


## Licencia 📄

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para detalles

---
