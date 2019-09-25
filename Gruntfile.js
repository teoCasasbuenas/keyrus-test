module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                files: {
                    'scripts/built.min.js': ['scripts/built.js']
                }
            }
        },
        sass: {
            dev: {
                files: {
                    'styles/main.css': 'styles/main.scss'
                }
            }
        },
        cssmin: {
            build: {
                src: 'styles/main.css',
                dest: 'styles/main.min.css'
            }
        },
        concat: {
            options: {
                separator: '\n/*next file*/\n\n'
            },
            dist: {
                src: ['scripts/hello.js', 'scripts/main.js'],
                dest: 'scripts/built.js'
            }
        },
        watch: {
            sass: {
                files: '**/*.scss', // ** any directory; * any file
                tasks: ['css'],
                options: {
                    livereload: 35729
                }
            },
            concat: {
                files: ['scripts/hello.js','scripts/main.js'],
                tasks: ['concat']
            },
            uglify: {
                files: 'scripts/built.js',
                tasks: ['uglify'],
                options: {
                    livereload: true
                }
            },
            all: {
                files: ['**/*.html'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Default task
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('css', ['sass', 'cssmin']);
    grunt.registerTask('js', ['coffee', 'concat', 'uglify']);

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Load the plugin that provides the "sass" task.
    grunt.loadNpmTasks('grunt-contrib-sass');
    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Load the plugin that provides the "watch" task.
    grunt.loadNpmTasks('grunt-contrib-watch');

};
