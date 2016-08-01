'use strict';

var PackageJson = require('../../package.json');
var EXTENSION_NAME = PackageJson.name;
var EXTENSION_UNIQUE_NAME = 'zaggino.' + EXTENSION_NAME;
var domainName = EXTENSION_UNIQUE_NAME;
var domainManager = null;
var tsUtils = require('./ts-utils');

exports.init = function (_domainManager) {
  domainManager = _domainManager;

  if (!domainManager.hasDomain(domainName)) {
    domainManager.registerDomain(domainName, { major: 0, minor: 1 });
  }

  domainManager.registerCommand(
    domainName,
    'getDiagnostics', // command name
    tsUtils.getDiagnostics, // handler function
    true, // is async
    'getDiagnostics', // description
    [
      { name: 'projectRoot', type: 'string' },
      { name: 'fullPath', type: 'string' },
      { name: 'code', type: 'string' }
    ], [
      { name: 'report', type: 'object' }
    ]
  );

  domainManager.registerCommand(
    domainName,
    'getCompletions', // command name
    tsUtils.getCompletions, // handler function
    true, // is async
    'getCompletions', // description
    [
      { name: 'projectRoot', type: 'string' },
      { name: 'fullPath', type: 'string' },
      { name: 'code', type: 'string' },
      { name: 'position', type: 'number' },
      { name: 'implicitChar', type: 'string' }
    ], [
      { name: 'report', type: 'object' }
    ]
  );

};
