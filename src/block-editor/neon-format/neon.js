//https://developer.wordpress.org/block-editor/how-to-guides/format-api/#step-1-register-a-new-format

import './neon.css';
import { registerFormatType, toggleFormat} from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

registerFormatType("udemy-plus/neon", {
    title: __("Neon", "udemy-plus"),
    tagName: "span",
    className: "neon",
    edit({ isActive, onChange, value }) {
        return(
            <RichTextToolbarButton 
                title={__('Neon', 'udemy-plus')}
                icon="superhero"
                isActive={isActive}
                onClick={ () => {
                    onChange(toggleFormat(value, {
                        type: "udemy-plus/neon",
                    }));
                }}
            />
        )
    }
});