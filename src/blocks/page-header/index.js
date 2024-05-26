import { registerBlockType } from '@wordpress/blocks';
import { 
  useBlockProps, RichText, InspectorControls
} from '@wordpress/block-editor';
import {PanelBody, ToggleControl} from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import './main.css'

registerBlockType('udemy-plus/page-header', {
    edit({attributes, setAttributes}) {
    const blockProps = useBlockProps();
    const {content, showCategory} = attributes;

    return (
      <>
        <InspectorControls>
            <PanelBody title ={__('General', 'udemy-plus')}>
                <ToggleControl 
                    label = {__('Show Category', 'udemy-plus')}
                    help = {
                        showCategory 
                        ? __('Category Shown', 'udemy-plus')
                        : __('Custom Content Shown', 'udemy-plus')
                    }
                    checked={showCategory}
                    onChange={ (showCategory) => setAttributes({showCategory})}
                />
            </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
            <div className="inner-page-header">
                {
                    showCategory 
                    ? <h1>{__('Category: Some category', 'udemy-plus')}</h1>  
                    : <RichText
                        tagName='h1'
                        placeholder={__("Heading", "udemy-plus")}
                        value={ content }
                        onChange={ content => { setAttributes( { content } ) } }
                     />
                }
            </div>
        </div>
      </>
    );
  }
});