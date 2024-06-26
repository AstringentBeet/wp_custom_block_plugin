import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import icons from '../../icons.js'
import './main.css'

registerBlockType('udemy-plus/auth-modal', {
  edit({ attributes, setAttributes }) {
    const { showRegister } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={ __('General', 'udemy-plus') }>
            <ToggleControl
              label={__('Show Registration', 'udemy-plus')}
              help ={
                showRegister
                ? __('Showing Registration Form.', 'udemy-plus')
                : __('Hiding Registration Form.', 'udemy-plus')
              }
              checked={showRegister}
              onChange={showRegister => setAttributes({showRegister})}
            />
          </PanelBody>
        </InspectorControls>
        <div { ...blockProps }>
          {__('This block is not previewable from the editor. View your site for a live demo.', 'udemy-plus')}
        </div>
      </>
    );
  }
});