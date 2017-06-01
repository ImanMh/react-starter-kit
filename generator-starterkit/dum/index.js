var generators = require('yeoman-generator');


module.exports = generators.Base.extend({
  paths: function () {
    this.templatePath('./templates');
  },
  
  prompting: function () {
    return this.prompt([{
      type    : 'input',
      name    : 'componentName',
      message : 'What\'s the component name?'
    }]).then(function (answer) {
      this.fs.copyTpl(
        this.templatePath('basic.js'),
        this.destinationPath('src/dumbComponents/' + answer.componentName + '.js'),
          { componentName: answer.componentName }
      );
      this.log('component ', answer.componentName, ' is created.')
    }.bind(this));
  }
});
