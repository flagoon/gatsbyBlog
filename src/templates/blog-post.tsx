import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Img from 'gatsby-image';
import { FeaturedImage, ImageSignature } from '../components/Pictures/FeaturedImage';

interface Props {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        featureImageDescription: string;
        featuredImage: {
          childImageSharp: {
            fluid: {
              base64: string;
              aspectRatio: number;
              src: string;
              srcSet: string;
              sizes: string;
            };
          };
        };
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

/**
 * This template is used for creating multiple pages from Markdown files, articles.
 *
 * @param data - this prop is taken from graphQL query from this file. Look at the bottom.
 * @param pageContext - this prop is created and forwarded from gatsby-node.js file during
 * create page. This data can be used in component, but what is more important, it's variables
 * can be used in graphQL query. Loot at the bottom.
 */
const blogPost = ({ data, pageContext }: Props): JSX.Element => {
  const post = data.markdownRemark;
  const { nextSlug, previousSlug } = pageContext;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <FeaturedImage fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
        {post.frontmatter.featureImageDescription ? (
          <ImageSignature align="right">{post.frontmatter.featureImageDescription}</ImageSignature>
        ) : null}
        <div style={{ marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: post.html }} />
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

/**
 * This is a query for DATA in component props. Variables are from context in gatsby-node, when
 * we used createPage function.
 */
export const query = graphql`
  query($id: String!) {
    # where slug is equal slug.
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        featureImageDescription
        # This part might be confusing. Every markdown has an featureImage data we can query for.
        # Using gatsby-plugin-sharp and gatsby-transformer-sharp we can convert this string
        # for a responsive image. If needed it will create multiple, optimized versions of the same
        # image, make lazy loading etc. Great stuff.
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
