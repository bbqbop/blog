import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
        'process.env.VITE_PORT':JSON.stringify(process.env.VITE_PORT)
    }
  };
});