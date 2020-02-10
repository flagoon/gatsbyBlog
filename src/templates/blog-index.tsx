import React from 'react';
import Layout from '../components/Layout';
import { graphql, Link } from 'gatsby';
import get from 'lodash/get';

interface Node {
  node: {
    frontmatter: FrontMatter;
    fields: CustomFields;
  };
}

interface Props {
  data: {
    allMarkdownRemark: {
      edges: Node[];
    };
  };
}

const BlogIndexTemplate = (props: Props): JSX.Element => {
  const { data } = props;
  const articleList = data.allMarkdownRemark.edges.map((node: Node) => {
    const frontmatter = get(node, 'node.frontmatter');
    console.warn(frontmatter);
    const fields = get(node, 'node.fields');
    return (
      <div key={fields.slug}>
        <Link to={fields.slug}>
          <h2>{frontmatter.title}</h2>
        </Link>
        <div>{frontmatter.description}</div>{' '}
      </div>
    );
  });
  return (
    <Layout>
      <>{articleList}</>
    </Layout>
  );
};

export default BlogIndexTemplate;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            date
            description
            title
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
