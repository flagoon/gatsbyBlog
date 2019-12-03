/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

/**
 * This file is responsible for creating nodes (for graphql)
 * and creating website dynamically
 */

const resolve = require('path').resolve;

// This function is called on creating a node. Useful when we want to
// extract some data from node or create new node values.
// Here we are creating slug from article folder name.
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const fileName = getNode(node.parent);
    const slug = fileName.relativeDirectory.split('/')[1];
    // It's creating new node, which name is 'slug', the value is slug (duh)
    // and parent is 'fields' in 'node' from parameters.
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  // here we create a page for every node we query for. 'createPage' needs 3 arguments.
  // path: the path from browser where the page will be placed
  // component: from what component page will be created. A little bit of magic!
  // context: data passed to page queries as graphql variables.
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: resolve(`./src/templates/blog-post.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });
};
