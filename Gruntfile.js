module.exports = function(grunt) {
  grunt.initConfig({
    "download-atom-shell": {
      version: "0.14.0",
      outputDir: "bin"
    }
  });

  grunt.loadNpmTasks("grunt-download-atom-shell");
  grunt.registerTask("install", "download-atom-shell");
  grunt.registerTask("default", "", ["install"]);
};
