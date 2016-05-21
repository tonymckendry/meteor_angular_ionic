// This needs "browser-policy": meteor add browser-policy
// However when this was added everything stopped.

// Meteor.startup(function() {
//     console.log('Configuring content-security-policy');
//
//     BrowserPolicy.framing.allowAll();
//
//     BrowserPolicy.content.allowSameOriginForAll();
//     BrowserPolicy.content.disallowInlineScripts();
//     BrowserPolicy.content.disallowEval();
//     BrowserPolicy.content.allowInlineStyles();
//     BrowserPolicy.content.allowFontDataUrl();
//     BrowserPolicy.content.allowOriginForAll("http://fonts.googleapis.com");
//     BrowserPolicy.content.allowOriginForAll("http://fonts.gstatic.com");
// });
