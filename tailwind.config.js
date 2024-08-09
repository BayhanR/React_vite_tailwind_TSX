/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // React bileşenlerinizin ve diğer dosyalarınızın yolu
  ],
  theme: {
    extend: {
      colors:{
        'petlas':'#E5262D',
        'ako':'#0958A0',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite', // Yavaş dönen animasyon
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  
  plugins: [],
}
