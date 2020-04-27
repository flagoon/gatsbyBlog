import Img from 'gatsby-image';
import styled from 'styled-components';

export const FeaturedImage = styled(Img)`
  border: 1px solid rgba(0, 0, 0, 0.7);
  max-height: 500px;
`;

export const ImageSignature = styled.div<{ align: string }>`
  text-align: ${(props): string => props.align};
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.7);
`;
