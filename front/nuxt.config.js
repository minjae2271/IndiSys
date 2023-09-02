module.exports = {
    head: {
        title: 'INDI',
        meta: [{
            charset: 'utf-8',   
        }, {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
        }, {
            name: 'description',
            content: 'INDI 업무 시스템',
        }, {
            hid: 'ogtitle',
            name: 'og:title',
            content: 'INDI Design',
        }, {
            hid: 'ogdescription',
            name: 'og:description',
            content: 'INDI 업무 시스템',
        }, {
            hid: 'ogtype',
            property: 'og:type',
            content: 'website',
        }, {
            hid: 'ogimage',
            property: 'og-image',
            content: '/logo.png',
        }],
        link: [{
            rel: 'shortcut icon', href: '/indi.png'
        }]
    },
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    modules: [
        '@nuxtjs/axios',
    ],
    build: {
        standalone: true
    },
    axios: {
        // browserBaseURL: 'http://localhost:3085/',
        baseURL: process.env.NODE_ENV === 'production' ? 'http://api.indi-elevator-design.com' : 'http://localhost:3085/',
        https: false,
    },
    moment: {
        locales: ['ko']
    },
    build: {
        analyze: false,
        extend(config, { isClient, isServer, isDev}) {
            if (isServer && !isDev) {
                config.devtool = 'hidden-source-map';
            }
            console.log('webpack', config, isClient, isServer);
        }
    },
    server: {
        port: process.env.PORT || 3080,
    }
}