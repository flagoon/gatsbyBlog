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
    // plugin for loading all files from path into graphql.
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: `images`, path: `${__dirname}/src/` },
    },
    // plugin for transforming Markdown files, multiple config files can be added for using images,
    // code highlight etc in Markdown. In graphql, allMarkdownRemark and markdownRemark are created
    // to search necessary fields.
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    // plugin for using typescript with gatsby.
    'gatsby-plugin-typescript',
    // plugin for using styled-components in gatsby.
    'gatsby-plugin-styled-components',
    // typography config.
    { resolve: 'gatsby-plugin-typography', pathToConfigModule: `src/utils/typography` },
  ],
};
