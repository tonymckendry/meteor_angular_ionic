### The first time you start the app, you will probably encounter this error:
`
Errors prevented startup:
   While processing files with fourseven:scss (for target web.browser):
   /client/app.core.scss: Scss compiler error: File to import:
   {}/node_modules/ionic-angular/fonts/ionicons-icons not found in file:
   fonts/ionicons
`
**In the file `node_modules/ionic-angular/fonts/ionicons.scss` change the @import statements on  lines 8 & 9 to the following:**
`
@import "../../ionicons/dist/scss/ionicons-icons";
@import "../../ionicons/dist/scss/ionicons-variables";
`
