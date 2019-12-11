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

const BlogIndexTemplate = ({ data }: Props): JSX.Element => {
  const articleList = data.allMarkdownRemark.edges.map((node: Node) => {
    const frontmatter = get(node, 'node.frontmatter');
    const fields = get(node, 'node.fields');
    console.log(fields);
    return (
      <div key={fields.slug}>
        <Link to={fields.slug}>
          <h2>{frontmatter.title}</h2>
        </Link>
        <div>{frontmatter.description}</div>{' '}
      </div>
    );
  });
  return <Layout>{articleList}</Layout>;
};

export default BlogIndexTemplate;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date }) {
      edges {
        node {
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
