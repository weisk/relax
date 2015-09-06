module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/main.css": "_less/main.less"
        }
      }
    },
    jekyll: {
      options: {
        src: '.'
      },
      dist: {
        options: {
          dest: './_site',
          config: '_config.yml'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['_less/*'],
        tasks: ['less', 'jekyll']
      },
      html: {
        files: ['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*'],
        tasks: ['jekyll'],
        options: {
          spawn: false,
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          base: './_site'
        }
      }
    },

  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['less', 'jekyll', 'connect', 'watch']);
  grunt.registerTask('css', ['less']);
  grunt.registerTask('server', ['less', 'jekyll', 'connect', 'watch']);
};
