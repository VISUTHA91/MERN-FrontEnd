import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      fs: 'rollup-plugin-node-builtins',
      path: 'rollup-plugin-node-builtins',
      http: 'rollup-plugin-node-builtins',
      https: 'rollup-plugin-node-builtins',
      stream: 'rollup-plugin-node-builtins',
      os: 'rollup-plugin-node-builtins',
    }
  },
  server: {
    host: true // Exposes the server on the network
  }
})
