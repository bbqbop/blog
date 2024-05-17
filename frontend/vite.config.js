import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from "dotenv";

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    define: {
        'process.env.VITE_PORT':JSON.stringify(process.env.VITE_PORT)
    }
  };
});