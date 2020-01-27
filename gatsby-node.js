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

  /**
   * This invocation is creating index page. For path /home it's using blog-index.tsx component.
   * This is the only part here that is connected to index page. Everything else is handled
   * on blog-index.tsx file. Index page has its own graphql queries.
   */
  createPage({
    path: '/home',
    component: resolve('./src/templates/blog-index.tsx'),
  });

  /**
   * This is the part for blog-post pages. This query is ONLY for getting data for 'createPage'
   * function for pages. It has nothing to do with previous create page. We are asking only for
   * data we will be sending to he blog-post props!!
   */
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
            }
            id
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
  // context: data passed to page queries as graphql variables, but also as props.
  result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    let nextSlug;
    let previousSlug;
    if (next && next.fields && next.fields.slug) {
      nextSlug = { slug: next.fields.slug, title: next.frontmatter.title };
    }
    if (previous && previous.fields && previous.fields.slug) {
      previousSlug = { slug: previous.fields.slug, title: previous.frontmatter.title };
    }
    /**
     * We are creating page for EVERY edge in allMarkdownRemark.
     */
    createPage({
      path: node.fields.slug,
      component: resolve(`./src/templates/blog-post.tsx`),
      context: {
        /**
         * This part is very important. Context is something we are sending to EVERY page created.
         * Thanks to that, we could use this data as props. Normally blog-post component is
         * querying for its data by it self, but it has to know, for what node it has to query.
         * Data from context is available in graphQL query as variables, so we use id as indicator
         * for what we are asking. This is also available in props.pageContext if we need to use
         * it in component directly.
         */
        slug: node.fields.slug,
        nextSlug,
        previousSlug,
        id: node.id,
      },
    });
  });
};
