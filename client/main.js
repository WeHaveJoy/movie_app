import './style.css'
import movies from "./vite";
import "./vite"

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

import Alpine from "alpinejs";


window.Alpine = Alpine;
// Alpine.plugin(persist);
Alpine.data('info', movies)

Alpine.start();