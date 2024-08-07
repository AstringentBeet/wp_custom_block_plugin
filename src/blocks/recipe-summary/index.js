import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';
import Rating from '@mui/material/Rating/index.js';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import './main.css';

registerBlockType('udemy-plus/recipe-summary', {
  edit({ attributes, setAttributes, context }) {

    const cache = createCache({
      key: 'wp-editor-styles',
      container: document.querySelector('iframe[name="editor-canvas"]')
      .contentDocument.head,
    })

    const { prepTime, cookTime, course } = attributes;
    const blockProps = useBlockProps();
    const { postId } = context;
    const [termIDs] = useEntityProp('postType', 'recipe', 'cuisine', postId);

    const {cuisines, isLoading} = useSelect((select) => {
      const { getEntityRecords, isResolving } = select('core')
      const taxonomyArgs = [
        'taxonomy',
        'cuisine',
        {
          include: termIDs
        }
      ]
      return {
        cuisines: getEntityRecords(...taxonomyArgs),
        isLoading: isResolving('getEntityRecords', taxonomyArgs)
      }
    }, [termIDs]);
    
    const {rating} = useSelect(select => {
      const {getCurrentPostAttribute} = select('core/editor');
      return {
        rating: getCurrentPostAttribute('meta').recipe_rating
      }
    })

    console.log(rating);

    return (
      <>
      <CacheProvider value = {cache}>
          <div {...blockProps}>
            <i className="bi bi-alarm"></i>
            <div className="recipe-columns-2">
              <div className="recipe-metadata">
                <div className="recipe-title">{__('Prep Time', 'udemy-plus')}</div>
                <div className="recipe-data recipe-prep-time">
                  <RichText
                    tagName="span"
                    value={ prepTime } 
                    onChange={ prepTime => setAttributes({ prepTime }) }
                    placeholder={ __('Prep time', 'udemy-plus') }
                  />
                </div>
              </div>
              <div className="recipe-metadata">
                <div className="recipe-title">{__('Cook Time', 'udemy-plus')}</div>
                <div className="recipe-data recipe-cook-time">
                  <RichText
                    tagName="span"
                    value={ cookTime } 
                    onChange={ cookTime => setAttributes({ cookTime }) }
                    placeholder={ __('Cook time', 'udemy-plus') }
                  />
                </div>
              </div>
            </div>
            <div className="recipe-columns-2-alt">
              <div className="recipe-columns-2">
                <div className="recipe-metadata">
                  <div className="recipe-title">{__('Course', 'udemy-plus')}</div>
                  <div className="recipe-data recipe-course">
                    <RichText
                      tagName="span"
                      value={ course } 
                      onChange={ course => setAttributes({ course }) }
                      placeholder={ __('Course', 'udemy-plus') }
                    />
                  </div>
                </div>
                <div className="recipe-metadata">
                  <div className="recipe-title">{__('Cuisine', 'udemy-plus')}</div>
                  <div className="recipe-data recipe-cuisine">
                    {
                      isLoading &&
                      <Spinner />
                    }
                    {
                      !isLoading && cuisines && cuisines.map((item, index) => {
                        const comma = cuisines[index + 1] ? ', ' : '';
                        return(
                          <>
                            <a href = {item.meta.more_info_url}>
                              {item.name}
                            </a>{comma}
                          </>
                        )
                      })
                    }
                  </div>
                </div>
                <i className="bi bi-egg-fried"></i>
              </div>
              <div className="recipe-metadata">
                <div className="recipe-title">{__('Rating', 'udemy-plus')}</div>
                <div className="recipe-data">
                  <Rating
                    value = { rating }
                    readOnly
                  />
                </div>
                <i className="bi bi-hand-thumbs-up"></i>
              </div>
            </div>
          </div>
        </CacheProvider>
      </>
    );
  }
});