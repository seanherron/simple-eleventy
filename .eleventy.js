const { DateTime } = require('luxon');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  // Create an alias for the base layer so we can reference it as base rather than the full paht.
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  // Date helper
  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('LLLL d, y');
  });
  eleventyConfig.addFilter('htmlDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('y-MM-dd');
  });

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: false,
    trim: false,
  });

  // As our CSS is generated in to a folder that git ignores, we want to make sure eleventy still reads it
  eleventyConfig.setUseGitIgnore(false);

  // Watch our generated CSS file for changes
  eleventyConfig.addWatchTarget("./.tmp/css/style.css");
  
  // Passthrough additional files and folders
  eleventyConfig.addPassthroughCopy({ "./.tmp/css/style.css": "static/css/style.css" });
  eleventyConfig.addPassthroughCopy({ "./src/site/_includes/fonts": "static/fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/site/_includes/img": "static/img" });
  eleventyConfig.addPassthroughCopy({ "./src/site/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "./src/site/robots.txt": "robots.txt" });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
    level: 2,
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  return  {
    dir: {
      // Where to look for our site
      input: "src/site",
      includes: "_includes",
      data: "_data",
      // Where to place our generated site
      output: "dist"
    },
    passthroughFileCopy: true,
    templateFormats : ["njk", "md", "webmanifest"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
  };
};