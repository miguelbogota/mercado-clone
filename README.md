# Mercado Clone 👨🏻‍💻

Mercado Clone es un proyecto usando la API de Mercado Libre, este proyecto se utilizará como prueba
técnica para Mercado Libre.

### [Live Website](https://mercado-clone.vercel.app)

### Desafío

El desafío era desarrollar una aplicación con tres vistas:

- Caja de búsqueda
- Resultados de la búsqueda
- Detalle del producto

Cada una de las vistas debían ser navegables y dos de ellas (resultados de búsqueda y detalle del
producto) debían enviar peticiones al server para consultar la API de mercado libre y mostrar los
resultados enviados.

### Acercamiento

Inicialmente me documente más acerca de la API de Mercado Libre con el propósito de entender mejor
los datos con los que se van a trabajar.

La siguiente etapa fue identificar las rutas, componentes y servicios tanto del cliente como del
servidor.

Después estructuré el proyecto, decidí usar una estructura simple, pero eficaz en la cual nuevos
desarrolladores se ubiquen fácilmente al iniciar el proyecto. Dentro la carpeta `src` estaría todo
el proyecto y aunque inicialmente se tenía pensado usar más carpetas después me di cuenta de que no
eran necesarias para el proyecto. Dentro de la carpeta `pages` se encuentran las rutas
(Documentación Next.js [Rutas](https://nextjs.org/docs/routing/introduction) y
[Rutas API](https://nextjs.org/docs/api-routes/introduction)), dentro de la carpeta
`components` se encontrarán con todos los componentes recusables y dentro de esa misma carpeta
existe `styling` la cual tiene componentes globales de estilos.

### Tecnologías Usadas:

- [Next js](https://nextjs.org)
- [Emotion](https://emotion.sh/docs/introduction)
- [React Hook Form](https://react-hook-form.com)
- [Axios](https://axios-http.com/docs/intro)
- [Lodash](https://lodash.com)
- [Typescript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Vercel](https://vercel.com/home)

### Estructura del Proyecto:

    .
    ├── public               # Archivos públicos.
    ├── src                  # Proyecto.
    │   ├──components        # Todos los componentes básicos del proyecto.
    │   └── pages            # Páginas a mostrar (Cada archivo representa una página).
    │       └── api          # Endpoints para hacer las peticiones http.
    ├── test                 # Testing (Misma estructura que "src").
    └── types                # Types para typescript globales.

### Desarrollo

Para el desarrollo se tuvo en cuenta que el código fuese lo más segura, reusable, usable, escalable
y performante posible. Estas fueron algunas consideraciones que ayudaron a este propósito:

- Para la vista inicial (Caja de búsqueda) se usó
  [SSG](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) y para las otras
  dos (Resultados de la búsqueda y Detalle del producto) se usó
  [SSR](https://nextjs.org/docs/basic-features/pages#server-side-rendering), esto permite que la
  página inicial esté cacheada al no tener mucho y las otras dos renderizadas cuando sea necesario.
- Al hacer la búsqueda y/o acceder al detalle del producto se mantiene oculto toda la petición al
  hacerse en el servidor
  ([Docs](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)) esto da mucha
  más seguridad, ya que no revela nada al cliente, el cliente solo recibe los props a renderizar.
- La estructura del proyecto se hizo pensando que un nuevo desarrollador pueda ser productivo más
  rápido al tener una interfaz muy intuitiva.
- Prácticamente no hay ningún side effect.
- Se empleó el accesibility para algunos elementos (Para probar esto activa el plugin el screen
  reader de tu navegador, también puedes navegar con el teclado).
- Aunque no muchos se agregaron elementos graficos para tener una mejor experiencia UX (Loading
  states, not found page y responsiveness).

### Correr Localmente

Se puede ver un demo online [aquí](https://mercado-clone.vercel.app). Sin embargo si se quiere
correr localmente solo es necesario clonar, instalar las dependencias y correr el script `watch`.

    git clone git@github.com:miguelbogota/mercado-clone.git

#### Con Yarn

Instalar las dependencias.

    yarn install

Correr la aplicacion.

    yarn watch

#### Con NPM

Instalar las dependencias.

    npm install

Correr la aplicación.

    npm run watch

### Performance

#### Desktop

De la siguiente manera se debería comportar él UI en desktop.

<img
  width="800"
  src="assets/desktop-performance.gif"
  alt="Desktop Performance"
/>

De la siguiente manera se debería comportar él UI en mobile.

<img
  width="400"
  src="assets/mobile-performance.gif"
  alt="Desktop Performance"
/>

## Autor

_Miguel Bogota_

#### Encuéntrame en la web 🌎

<p>
  <a href="https://dev.to/miguelbogota">
    <img
      height="30"
      src="https://raw.githubusercontent.com/miguelbogota/miguelbogota/master/images/dev.png"
      alt="Dev.to link to profile"
    />
  </a>&nbsp;&nbsp;
  <a href="https://instagram.com/migue_bogota">
    <img
      height="30"
      src="https://raw.githubusercontent.com/miguelbogota/miguelbogota/master/images/instagram.jpg"
      alt="Instagram link to profile"
    />
  </a>&nbsp;&nbsp;
  <a href="https://linkedin.com/in/miguelbogota">
    <img
      height="30"
      src="https://raw.githubusercontent.com/miguelbogota/miguelbogota/master/images/linkedin.png"
      alt="LinkedIn link to profile"
    />
  </a>&nbsp;&nbsp;
  <a href="https://github.com/miguelbogota">
    <img
      height="30"
      src="https://raw.githubusercontent.com/miguelbogota/miguelbogota/master/images/github.png"
      alt="GitHub link to profile"
    />
  </a>
</p>
