module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		meta: {
			copyright: 'Copyright (c) 2013 Brandon Thomas <bt@brand.io>',
			notifyCmd: 'notify-send -i ' +
						'/usr/share/icons/gnome/32x32/emotes/face-laugh.png ' +
						'-t 500 ',
		},

		less: {
			main: {
				src: 'less/main.less',
				dest: 'static/design.out.css',
				options: {
					yuicompress: true,
				},
			},
		},

		watch: {
			style: {
				files: ['less/*.less'],
				tasks: ['less', 'shell:alert'],
			},
		},

		shell: {
			alert: {
				command: '<%= meta.notifyCmd%> "Grunt" ' +
						 '"Yay, compiled!"',
				options: {
					stdout: false,
				},
			},
		},

	});
 
	// TODO: Write these dependencies to package.json
	// TODO: Write jQuery, Backbone, etc. dependencies
	// TODO: Remove old dependencies that are no longer used
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-shell');

	// TODO: jslint, build tests, etc.
	//grunt.registerTask('test', ['todo1', 'todo2']);
	//grunt.registerTask('default', ['neuter:production']);
	grunt.registerTask('default', ['less', 'watch']);
	grunt.registerTask('build', ['less']); // eg. for pre-commit hook
};
