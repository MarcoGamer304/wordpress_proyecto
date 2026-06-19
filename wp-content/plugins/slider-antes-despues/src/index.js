import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import save from './save';
import metadata from '../block.json';
import './style.scss';

registerBlockType( metadata.name, {
    title: metadata.title,
    description: metadata.description,
    category: metadata.category,
    icon: metadata.icon,
    keywords: metadata.keywords,
    attributes: metadata.attributes,
    supports: metadata.supports,
    edit: Edit,
    save: save,
} );
