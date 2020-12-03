module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        browserify: {
            build: {
                src: 'modules/node.js',
                dest: 'modules/node_bundle.js'
            }
        },
        shell: {
            php: {
                command: [
                    'git push origin master',
                    'php deploy/deployment.phar deploy/deployment.php'
                ].join('&')
            }
        }
    });

    // Default task
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('default', [
        'browserify',
    ]);

    //
    grunt.loadNpmTasks('grunt-shell');
    grunt.registerTask('deploy', [
        'shell:php'
    ]);

};
