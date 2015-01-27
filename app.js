var fs = require('fs');
var scraper = require('website-scraper'); 
var sitelist = require('./sitelist');
var url = require('url');

var len = sitelist.websites.length;
var i = 0;

function nextWeb() {
  if (i < len) {

    var website = sitelist.websites[i];
    var name = url.parse(website);

    console.log('==> ', website);

    scraper.scrape({
      urls: website,
      directory: './websites/' + name.host,
      subdirectories: [
      {directory: 'img', extensions: ['.jpg', '.png', '.svg']},
      {directory: 'js', extensions: ['.js']},
      {directory: 'css', extensions: ['.css']}
      ],
      sources: [
      {selector: 'img', attr: 'src'},
      {selector: 'link[rel="stylesheet"]', attr: 'href'},
      {selector: 'script', attr: 'src'}
      ]
    }, function(res) {
      i++;
      nextWeb();
    });
  } else {
    return;
  }
}

nextWeb();