module.exports = {
  siteMetadata: {
    title: `Muody's blog`,
    description: `My personal blog for the stuff I'm learning`,
  },
  plugins: [
    // plugin for loading all files from path into graphql.
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: `src`, path: `${__dirname}/src/` },
    },
    // plugin for transforming Markdown files, multiple config files can be added for using images,
    // code highlight etc in Markdown. In graphql, allMarkdownRemark and markdownRemark are created
    // to search necessary fields.
    'gatsby-transformer-remark',
    // plugin for using typescript with gatsby.
    'gatsby-plugin-typescript',
    // plugin for using styled-components in gatsby.
    'gatsby-plugin-styled-components',
    // typography config.
    { resolve: 'gatsby-plugin-typography', pathToConfigModule: `src/utils/typography` },
  ],
};
