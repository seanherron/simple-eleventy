module.exports = function(eleventyConfig) {

  // Create an alias for the base layer so we can reference it as base rather than the full paht.
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  // As our CSS is generated in to a folder that git ignores, we want to make sure eleventy still reads it
  eleventyConfig.setUseGitIgnore(false);

  // Watch our generated CSS file for changes
  eleventyConfig.addWatchTarget("./.tmp/css/style.css");
  // If it changes, write it to our generated full site
  eleventyConfig.addPassthroughCopy({ "./.tmp/css/style.css": "static/css/style.css" });

  return  {
    dir: {
      // Where to look for our site
      input: "src/site",
      includes: "_includes",
      // Where to place our generated site
      output: "dist"
    },
    passthroughFileCopy: true,
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
  };
};