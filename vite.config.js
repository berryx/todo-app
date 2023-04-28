import path from "path";
import process from "process";
import {defineConfig} from 'vite';

export default defineConfig({
    server: {
        open: "index.html",
    },
    root: "src",
    build: {
        outDir:"../dist"
    },
    resolve: {
        alias: { "/src": path.resolve(process.cwd(), "src") }
    },
})