module.exports = {
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-transformer-remark",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-filesystem",
      options: { name: `src`, path: `${__dirname}/src/` },
    },
  ],
};
