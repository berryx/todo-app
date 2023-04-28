import path from "path";
import process from "process";
import {defineConfig} from 'vite';



export default defineConfig({
    base: '/todo-app/',
    server: {
        open: "index.html",
    },
    root: "./src",
    publicDir: 'public',
    build: {
        emptyOutDir: true,
        outDir:"../dist"
    },
    resolve: {
        alias: { "/src": path.resolve(process.cwd(), "src") }
    },
})