import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/itua-react-test-task/',
  plugins: [react()],
})
