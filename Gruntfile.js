module.exports = function (grunt) {
    require('time-grunt')(grunt);
  
    // Pull defaults (including username and password) from .screeps.json
    var public_config = require('./.screeps.json')
    var private_config = require('./.screeps.private.json')
  
    // Allow grunt options to override default configuration
    var target = grunt.option('target') || 'public'
    var config = target == 'private' ? private_config : public_config
    var branch = grunt.option('branch') || config.branch;
    var email = grunt.option('email') || config.email;
    var password = grunt.option('password') || config.password;
    var ptr = grunt.option('ptr') ? true : config.ptr
  
    
    // append current date
    var currentdate = new Date();
    grunt.log.subhead('Task Start: ' + currentdate.toLocaleString())
    grunt.log.writeln('Branch: ' + branch)
  
    // Load needed tasks
    grunt.loadNpmTasks('grunt-screeps')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-file-append')
    grunt.loadNpmTasks("grunt-jsbeautifier")
  
    grunt.initConfig({
      screeps: {
        options: {
            server: (target == 'private') ? {
                host: config.host,
                port: 21025,
                http: true
            } : undefined,
            email: config.email,
            password: config.password,
            branch: config.branch,
            ptr: false
        },
        dist: {
            src: ['dist/*.js']
        }
      },
  
      // Copy all source files into the dist folder, flattening the folder
      // structure by converting path delimiters to underscores
      copy: {
        // Pushes the game code to the dist folder so it can be modified before
        // being send to the screeps server.
        screeps: {
          files: [{
            expand: true,
            cwd: 'src/',
            src: '**',
            dest: 'dist/',
            filter: 'isFile',
            rename: function (dest, src) {
              // Change the path name utilize underscores for folders
              return dest + src.replace(/\//g,'_');
            }
          }],
        }
      },
  
      // Add version variable using current timestamp.
      file_append: {
        versioning: {
          files: [
            {
              append: "\nglobal.SCRIPT_VERSION = "+ currentdate.getTime() + "\n",
              input: 'dist/version.js',
            }
          ]
        }
      },
  
  
      // Remove all files from the dist folder.
      clean: {
        'dist': ['dist']
      },
  
  
      // Apply code styling
      jsbeautifier: {
        modify: {
          src: ["src/**/*.js"],
          options: {
            config: '.jsbeautifyrc'
          }
        },
        verify: {
          src: ["src/**/*.js"],
          options: {
            mode: 'VERIFY_ONLY',
            config: '.jsbeautifyrc'
          }
        }
      }
  
    })
  
    // Combine the above into a default task
    grunt.registerTask('default',  ['clean', 'copy:screeps',  'file_append:versioning', 'screeps']);
    grunt.registerTask('test',     ['jsbeautifier:verify']);
    grunt.registerTask('pretty',   ['jsbeautifier:modify']);
  }