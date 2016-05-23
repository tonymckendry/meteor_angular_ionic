Package.describe({
  name: 'zuus:core',
  version: '0.0.1',
  summary: 'To help with app structure for testing',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('core.js');
  api.export('App');
});
