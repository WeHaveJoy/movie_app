import './style.css'
import movies from "./vite";
import "./vite"

import Alpine from "alpinejs";

window.Alpine = Alpine;
// Alpine.plugin(persist);
Alpine.data('info', movies)

Alpine.start();