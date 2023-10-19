import { Helmet } from 'react-helmet';
import { MetaTagsStyled } from './MetaTags.styled';

interface MetaTagsProps {
  title?: string;
  favicon?: string;
}

/**
 * Functional component that render component meta tags.
 *
 * @return React.ReactElement <MetaTags/>
 */
const MetaTags = ({ title, favicon }: MetaTagsProps) => {
  title = `${title ? `${title} | Portolio Gaming` : `Portfolio Gaming`}`;
  favicon = `${favicon ? `${favicon}/img/favicon.ico` : `favicon.ico`}`;
  return (
    <MetaTagsStyled>
      <Helmet>
        <title>{title}</title>
        <link rel='icon' type='image/x-icon' href={favicon} />
      </Helmet>
    </MetaTagsStyled>
  );
};

export default MetaTags;
