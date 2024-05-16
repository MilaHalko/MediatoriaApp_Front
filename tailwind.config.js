module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            height: {
                // header: '560px',
                // rate: '400px',
            },
            fontSize: {
                h1: '2.6rem',
            },
            screens: {
                // xs: '475px',
            },
            colors: {
                main: '#080A1A',
                subMain: '#ff0000',
                dry: '#0b1133',
                star: "#FFB000",
                text: "#c0c0c0",
                border: '#243970',
                dryGray: '#dfdfdf',
                noPosterAvailable: '#E2E2E2',
            },
            fontFamily: {
                'poppins-light': ['Poppins-Light', 'sans-serif'],
                'poppins-regular': ['Poppins', 'sans-serif'],
                'poppins-medium': ['Poppins-Medium', 'sans-serif'],
                'poppins-bold': ['Poppins-Bold', 'sans-serif'],
                'poppins-extrabold': ['Poppins-ExtraBold', 'sans-serif'],
                'poppins-italic': ['Poppins-Italic', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
                hammersmith: ['Hammersmith', 'sans-serif'],
            }

        },
        plugins: [require('@tailwindcss/line-clamp')],
    }
}