var grunt = require("grunt");
grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    'create-windows-installer': {
        x64: {
            appDirectory: './myApp-win32-x64',
            outputDirectory:'./dist',
            loadingGif:'./load.gif',
            authors: 'zyz.',
            exe: 'myApp.exe',
            description:"myApp"
        }
    }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);
