module.exports = function (grunt) {
    'use strict';
    
    var packagedFiles = ['index.html', 'package.json', 'img/*', 'css/*', 'js/*'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        clean: ['builds/TotesPaint/*'],
        
        compress: {  
            options: {
              archive: 'builds/testapp.zip'
            },
            files: {
                src: packagedFiles,
                flatten: true
            }
        },
        
        nodewebkit: {
            options: {
                platforms: ['win64'],
                buildDir: './builds',
                winIco: 'img/facebook.ico'
            },
            src: packagedFiles
        },
        
        shell: {
            options: {
                stderr: false
            },
            runTest: {
                command: '"../NWJS/nw.exe" <%= compress.options.archive %>'
            },
            runBuild: {
                command: '"builds/TotesPaint/win64/TotesPaint.exe"'
            }
        },

        typescript: {
            base: {
                src: ['ts/**/*.ts'],
                dest: 'js/scripts.js',
                options: {
                    module: 'amd' //or commonjs
                }
            }
        },

        watch: {
            ts: {
                files: ['**/*.ts'],
                tasks: ['typescript'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('compileAssets', ['typescript']);
    grunt.registerTask('buildApp', ['clean', 'nodewebkit', 'shell:runBuild']);
    grunt.registerTask('testApp', ['compress', 'shell:runTest']);
    
    grunt.registerTask('default', ['compileAssets', 'watch']);
};