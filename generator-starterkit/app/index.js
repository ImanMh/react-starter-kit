var generators = require('yeoman-generator');


module.exports = generators.Base.extend({
  initializing: function () {
    console.log('Welcome to React starter kit Yo generator.');
  },

  prompting: function () {
    var prompts = [{
      type: 'list',
      name: 'type',
      message: 'What type of file do you want to create?',
      choices: [ 'component', 'route' ]
    }];

    var _this = this;

    this.prompt(prompts)
      .then(function (ans) {
        if (ans.type === 'component') {
          _this._makeNewComponent();
        }
        if (ans.type === 'route') {
          _this._makeNewRoute();
        }
      });
  },

  _camelCaseToDashSeperated (str) {
      return str.replace(/.{1}([A-Z])/g, (g) => ( g[0] + '-' + g[1].toLowerCase() )).toLowerCase();
  },
  
  _makeNewComponent: function () {
    var _this = this;

    return this.prompt([{
      type    : 'input',
      name    : 'componentName',
      message : 'What\'s the component name?'
    }]).then(function (answer) {
      this.fs.copyTpl(
        this.templatePath('./component/basic.js.tmpl'),
        this.destinationPath('src/components/' + answer.componentName + '/' + answer.componentName + '.js'),
        { 
          componentName: answer.componentName,
          dashedName: _this._camelCaseToDashSeperated(answer.componentName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('component/style.scss.tmpl'),
        this.destinationPath('src/components/' + answer.componentName + '/' + answer.componentName + '.scss'),
        {
          componentName: answer.componentName,
          dashedName: _this._camelCaseToDashSeperated(answer.componentName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('component/package.json.tmpl'),
        this.destinationPath('src/components/' + answer.componentName + '/package.json'),
        { componentName: answer.componentName }
      );
      this.log('component ', answer.componentName, ' is created.')
    }.bind(this));
  },

  _makeNewRoute: function () {
    return this.prompt([{
      type    : 'input',
      name    : 'routeName',
      message : 'What\'s the route name?'
    }]).then(function (answer) {
      console.log({ routeName: answer.routeName });
      this.fs.copyTpl(
        this.templatePath('./route/index.js.tmpl'),
        this.destinationPath('src/routes/' + answer.routeName + '/index.js'),
        { routeName: answer.routeName }
      );
      this.fs.copyTpl(
        this.templatePath('./route/routeComponent.js.tmpl'),
        this.destinationPath('src/routs/' + answer.routeName + '/' + answer.routeName + '.js'),
        { routeName: answer.routeName }
      );
      this.fs.copyTpl(
        this.templatePath('rout/style.scss.tmpl'),
        this.destinationPath('src/routs/' + answer.routeName + '/' + answer.routeName + '.scss'),
        { routeName: answer.routName }
      );
      this.log('route', answer.route, ' is created.')
    }.bind(this));
  }
  
});
