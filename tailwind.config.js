/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors:{
        "brown":{
          100 : "#ECE0D1",
          300: "#dbc1ac",
          600: "#967259",
          900: "#634832",
        }
      },
      boxShadow:{
        "normal" : "0px 1px 10px 0px rgba(0, 0, 0, 0.05)",
      },
      borderRadius:{
        "4xl": "2rem"
      },
      fontFamily: {
        "dana": 'Dana',
        "danaMedium": 'Dana Medium',
        "danaDemiBold": 'Dana DemiBold',
        "morabbaLight": 'Morabba Light',
        "morabbaMedium": 'Morabba Medium',
        "morabbaBold": 'Morabba Bold'
      },
      letterSpacing:{
        "tightest" : "-0.065em"
      },
      spacing:{
        '4.5' : '1.125rem',
        '25' : '6.25rem',
        '30' : '7.5rem',
        '50' : '12.5rem'
      },
      container:{
        center : true,
        padding:{
          DEFAULT :'1rem' ,
          "lg": '0.625rem'
        }
      },
      backgroundImage:{
        "home-mobile" : "url(../images/headerBgMobile.webp)",
        "home-desktop" :"url(../images/headerBgDesktop.webp)"
      }
    },
    screens:{
      '2xs': '350px',
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    }
  },
  plugins: [
    function({addVariant}) {
      addVariant('child' , '& > *');
      addVariant('child-hover' , '& > *:hover');
    }
  ],
}