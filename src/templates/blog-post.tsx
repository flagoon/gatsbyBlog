import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

interface Data {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
      };
      html: string;
    };
  };
}

const blogPost = ({ data }: Data): JSX.Element => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
};

export default blogPost;

export const query = graphql`
  # needs to learn graphql better. I'm not sure from where $slug is taken
  # but it seems, that later on it's used in markdownRemark for deciding
  # which file exactly should be used.
  query($slug: String!) {
    # where slug is equal slug.
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
