module.exports = {
  siteMetadata: {
    title: 'Dupa rakieta',
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
