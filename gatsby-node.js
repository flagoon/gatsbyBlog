/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

/**
 * This file is responsible for creating nodes (for graphql)
 * and creating website dynamically
 */

const resolve = require('path').resolve;
const { createFilePath } = require('gatsby-source-filesystem');

// This function is called on creating a node. Useful when we want to
// extract some data from node or create new node values.
// Here we are creating slug from article folder name.
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: `articles` });
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
  const { createPage, createRedirect } = actions;

  createRedirect({ fromPath: '/', toPath: '/home', isPermanent: true, redirectInBrowser: true });

  createPage({
    path: '/home',
    component: resolve('./src/templates/blog-index.tsx'),
  });

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date }) {
        edges {
          next {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
              date(fromNow: true)
            }
            html
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
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
  result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    let nextSlug;
    let previousSlug;
    if (next && next.fields && next.fields.slug) {
      nextSlug = { slug: next.fields.slug, title: next.frontmatter.title };
    }
    if (previous && previous.fields && previous.fields.slug) {
      previousSlug = { slug: previous.fields.slug, title: previous.frontmatter.title };
    }
    createPage({
      path: node.fields.slug,
      component: resolve(`./src/templates/blog-post.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        nextSlug,
        previousSlug,
      },
    });
  });
};
