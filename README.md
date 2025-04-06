# Fundación Antivirus para la Deserción - Frontend

Este repositorio contiene el código fuente de la interfaz web de la Fundación Antivirus para la Deserción. La aplicación está desarrollada con **Remix**, **TypeScript** y **Tailwind CSS**, y ha sido diseñada para ofrecer una experiencia de usuario moderna, responsiva y accesible. La integración continua se realiza mediante **GitHub Actions**, lo que permite el despliegue automatizado en **Azure**.

## Índice

- [Arquitectura y Diseño](#arquitectura-y-diseño)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Características y Funcionalidades](#características-y-funcionalidades)
- [Despliegue Automatizado](#despliegue-automatizado)
- [Licencia](#licencia)


## Arquitectura y Diseño

El proyecto frontend ha sido desarrollado para integrarse de manera fluida con el backend, garantizando una experiencia de usuario consistente y optimizada. Entre sus características se destacan:

- **Enrutamiento Eficiente:**  
  Utilizando Remix, se gestionan de forma intuitiva las rutas de la aplicación para acceder a secciones como Inicio, Servicios, Oportunidades, Ingresar y Registro.
  
- **Diseño Responsivo y Accesible:**  
  Gracias a Tailwind CSS, la interfaz se adapta de forma óptima a dispositivos móviles, tablets y escritorios, cumpliendo con altos estándares de accesibilidad.
  
- **Componentes Reutilizables:**  
  La arquitectura basada en componentes permite mantener un código limpio y modular, facilitando futuras mejoras y mantenimiento.

## Tecnologías Utilizadas

La solución frontend se ha construido utilizando las siguientes tecnologías:

- **Remix:**  
  Framework moderno para la creación de aplicaciones web con un excelente manejo del enrutamiento y la renderización del lado del servidor.
- **TypeScript:**  
  Proporciona tipado estático, lo que mejora la robustez y mantenibilidad del código.
- **Tailwind CSS:**  
  Framework CSS que permite un diseño ágil y responsivo con una amplia personalización.
- **GitHub Actions:**  
  Automatiza la integración y despliegue continuo, garantizando actualizaciones rápidas y confiables.
- **Azure:**  
  Plataforma en la nube donde se despliega la aplicación, asegurando escalabilidad y alta disponibilidad.

## Requisitos Previos

Para ejecutar el proyecto localmente, se debe contar con:

- **Node.js y npm:**  
  Versiones recomendadas para compilar y ejecutar la aplicación.
- **Git:**  
  Para clonar y gestionar el repositorio.

## Instalación y Ejecución

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Reto-Profundizacion-equipo-3-Nodo/Front-Antivirus.git
   cd Front-Antivirus
   ```

2. **Instalar las dependencias:**

   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

Una vez iniciado el servidor, la aplicación estará disponible en el navegador, permitiéndote explorar todas las funcionalidades implementadas.

## Características y Funcionalidades

La aplicación cuenta con las siguientes funcionalidades clave:

- **Menú de Navegación Dinámico:**  
  La interfaz presenta un menú intuitivo con acceso a las secciones de Inicio, Servicios, Oportunidades, Ingresar y Registro, facilitando la navegación y exploración del contenido.
  
- **Interfaz de Usuario Moderna:**  
  Basada en el diseño propuesto en Figma, la aplicación ofrece un estilo visual atractivo y coherente, optimizado para distintos dispositivos citeturn1file0.
  
- **Gestión de Usuarios y Autenticación:**  
  La aplicación integra funcionalidades de inicio de sesión y registro, permitiendo a los usuarios autenticarse y gestionar sus perfiles de manera segura.
  
- **Consumo de APIs:**  
  Se implementa la comunicación con el backend a través de llamadas a APIs RESTful, facilitando la obtención y manipulación de datos en tiempo real.
  
- **Experiencia Interactiva:**  
  Gracias a la utilización de Remix y TypeScript, la aplicación ofrece una interacción fluida y una carga eficiente de contenido.

## Despliegue Automatizado

El proceso de despliegue se ha automatizado mediante **GitHub Actions**. Cada actualización en la rama principal desencadena un flujo de trabajo que compila y despliega la aplicación en **Azure**, asegurando que la versión en producción esté siempre actualizada y operativa.

## Licencia

Este proyecto se distribuye bajo la **Licencia MIT**, permitiendo su uso, modificación y distribución conforme a los términos establecidos en dicha licencia.


Esta documentación presenta de manera integral el proyecto frontend de la Fundación Antivirus para la Deserción, destacando sus características técnicas, la arquitectura empleada y los procesos de despliegue automatizado, para ofrecer una experiencia de usuario final óptima y un mantenimiento ágil del sistema.
