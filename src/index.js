import { registerBlockType } from '@wordpress/blocks'
import block from './block.json';
import {__} from '@wordpress/i18n'
import { RichText } from '@wordpress/block-editor'

registerBlockType(block.name, {
    edit() {
        return (
        <RichText
         tagName ="h2" 
         placeholder = {__('Enter Heading', 'udemy-plus')}/>
        )
    },
});