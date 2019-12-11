module.exports = {
  siteMetadata: {
    title: `Muody's blog`,
    description: `My personal blog for the stuff I'm learning`,
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-transformer-remark',
    'gatsby-plugin-styled-components',
    { resolve: 'gatsby-plugin-typography', pathToConfigModule: `src/utils/typography` },
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: `src`, path: `${__dirname}/src/` },
    },
  ],
};
