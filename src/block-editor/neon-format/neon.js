import './neon.css';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Neon = ({isActive, onChange, value}) => {
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

registerFormatType("udemy-plus/neon", {
    title: __("Neon", "udemy-plus"),
    tagName: "span",
    className: "wp-block-neon",
    edit: Neon,
});
