import { registerBlockType } from '@wordpress/blocks'
import { useBlockProps, RichText } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'
import apiFetch  from '@wordpress/api-fetch'
import { useState, useEffect } from '@wordpress/element'
import { Spinner } from '@wordpress/components'
import icons from '../../icons.js'
import './main.css';

registerBlockType('udemy-plus/daily-recipe', {
  icon: {
    src: icons.primary
  },
	edit({ attributes, setAttributes }) {
    const { title } = attributes;
    const blockProps = useBlockProps();

    const [post, setPost] = useState({
      isLoading: true,
      url: null,
      img: null,
      title: null,
    })

    /* 
     
     * This is the original code, which casuses
     * the block editor page to break if daily-recipe
     * is removed/deleted from the editor. This is bad.
      
     
    useEffect(async () => {
      const response = await apiFetch({
        path: 'up/v1/daily-recipe',
      });

      setPost({
        isLoading: false,
        ...response
      });

    }, [])
    
    */
      
    useEffect(() => {
      let isMounted = true;

      const fetchPost = async() => {
        try {
          const response = await apiFetch({
            path: 'up/v1/daily-recipe',
          });

          if(isMounted){
            setPost({
              isLoading: false,
              ...response,
            })
          }
        }
        catch(error) {
          if(isMounted) {
            setPost({
              isLoading: false
            });
            console.error("failed to fetch post", error);
          }
        }
      };

      fetchPost();

      return () => {
        isMounted = false;
      }
      }, []); 

    return (
      <div {...blockProps}>
        <RichText
          tagName="h6"
          value={ title } 
          withoutInteractiveFormatting
          onChange={ title => setAttributes({ title }) }
          placeholder={ __('Title', 'udemy-plus') }
        />
        {
          post.isLoading ? (
          <Spinner/> 
          ) : (
          <a href={post.url}>
            <img src={post.img} />
            <h3>{post.title}</h3>
          </a>
        )}
      </div>
    );
  },
});