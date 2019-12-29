import React from 'react';
import { graphql, Link } from 'gatsby';
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
  pageContext: {
    slug: string;
    nextSlug: {
      slug: string;
      title: string;
    };
    previousSlug: {
      slug: string;
      title: string;
    };
  };
}

const blogPost = ({ data, pageContext }: Data): JSX.Element => {
  const post = data.markdownRemark;
  const { nextSlug, previousSlug } = pageContext;
  console.log(pageContext);
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div>
          {previousSlug ? <Link to={previousSlug.slug}>{previousSlug.title}</Link> : null}
          <span>---</span>
          {nextSlug ? <Link to={nextSlug.slug}>{nextSlug.title}</Link> : null}
        </div>
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
