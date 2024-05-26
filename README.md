# Custom Wordpress Block/Plugin Development
### Author: Alexander Effanga

## Resource Log
- [Wordpress' Official WordPress Block Development Document Site](https://developer.wordpress.org/block-editor/)
- [Zac Gordon's guide to using registerBlockType() function](https://wp.zacgordon.com/2017/12/28/how-to-use-to-registerblocktype-to-create-blocks-in-wordpress/)
- [wordpress official block file structure diagram (created with Excalidraw)](assets/images/wp_block_registration_diagram.png)
- [Javascipt for Wordpress guid on block development (it seems a bit outdated, so proceed with caution)](https://javascriptforwp.com/wordpress-scripts-build-tool-tutorial/)
- [Wordpress Block registration process diagram for both server-side and client-side](assets/images/wp_block_registration.webp)
- [WordPress' official overview of `block.json`](https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-json/)
    - [Wordpress `block.json` file diagram](assets/images/wp_block-json_structure.webp)

#### List of blocks that will be developed

1. Fancy Header: A pretty straight-forward event-based feature that will simply animate an underline on a header when the user hover the mouse over it. 
1. Search Form Block: 

## Progress Log

### 05/12/2024

Skipping pleasentries for now; let's get down to business.

-A bundle refers to a file that is the finished product of code. Webpack does this for Gutenberg blocks.
    -run `npm run start` to have webpack automatically bundle the project once any change has been made.

Similar to the custom theme, It's considered standard for blocks to have a metadata file in order to canonically register blocks both on the server side and client side. This is where `block.json` comes into play.

I spent most of the day trying to figure out how block registration within the context of `index.php` works – specifically the `plugin_dir_path();` function and it's subsequent `__FILE__` magic constant that is typically placed inside of it. To cut it short, `__FILE__` is relative to the file it is called on, which in my case was `index.php`. `plugin_dir_path` is pretty self-explanitory, so combining these two basically says <br> <i>"Hey, if you're looking for the base of this whole plugin, check me (`__FILE__`) out. I'm at the root of it all."</i>

There's really two main parts of registering a custom block:
- JSON, which is what I've been focused on so far. This is taking care of the backend.
- Javascript, which takes care of the client side.

There's three lines of code you must register within `block.json` in order to have the block up and running on the client-side:
1. **editorScript**, which queues in the file on the gutenberg editor within the admin side of wordpress.
2. **viewScript** Loads the script on the frontend, AND the block appears
on the page.
3. **script** Loads the script on both the editor and frontend.

### 05/13/2024
After being a week off with an arm injury, I'm back to work out int the truck yard. Nonetheless, I'm currently undersatnding how block registration works on the client-side using Javascript
```
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
```
Although this project is using `@wordpress/scripts` for the majority of the project, I'm still trying to wrap my head around how dependencies work. This is looking into the fact that I don't even have `@wordpress/blocks` installed; so how am I able to use packages from there?
#### (05/15/2024) Quick Update :
I may alter this depending on what I see in other resources...
So the majority of these modules are already within wordpress' core, using import literally just says "Hey, I need this small function. No need to give me the whole file," and proceeds to use a small function of many. When installing `@Wordpress/scripts`. we're really just installing developer dependencies prior to deploying the full app. This allows us to experiment, test, and troubleshoot the application/website before moving it into a production environment. In addition, `@wordpress/scripts` is bundled with various tools that includes compilation, bundling, linting, formatting, etc. More information about `@wordpress/scripts` can be found on their [official documentation page](https://developer.wordpress.org/block-editor/getting-started/devenv/get-started-with-wp-scripts/).

[Javascript for WordPress](https://javascriptforwp.com/wordpress-scripts-build-tool-tutorial/) also has a small tutorial that goes over this.

#### <span style = "color:#80b3ff"> Deep Dive: `{registerBlockType}`</span>
Anyways `{registerBlockType}` as the name suggests, registers a block type on the server using the metadata stored in the `block.json` file.
```
register_block_type
    ( 
        string|WP_Block_Type $block_type,
        array $args = array() 
    ): WP_Block_Type|false
```
Looking at structure of the function, the `WP_BLOCK_TYPE|false` part indicates that it will return a boolean value based on the registered type's success. Besides that, here's the run down of the function:
*The Following information is sourced from [Zac Gordon's WordPress blog](https://wp.zacgordon.com/2017/12/28/how-to-use-to-registerblocktype-to-create-blocks-in-wordpress/)
1. the first value that it accepts is <span style="color:#80b3ff">**'Name'[String].**</span> This is of course, the name for the block.
2. The second parameter is <span style="color:#80b3ff">**Settings[Objects]**</span>, which has numerous predefined properties that must be assigned in order for the block to work properly.
    - <span style="color:#80b3ff">**title** [string] </span>– The title setting gives your block a searchable, human readable name. It should be escaped using `wp.i18n.__()`.
    - <span style="color:#80b3ff"> **category** [string] </span>– The category setting determines under which heading a user can find your block. Options include “common”, “formatting”, “layout”, “widgets” and “embed.”
    - <span style="color:#80b3ff">**icon** [Dashicon|Element]</span> – The icon setting for registerBlockType determines what icon will represent your custom block. Can use a WP Dashicon or custom SVG.
    - <span style="color:#80b3ff"> **keywords** [Array]</span> – The keyword setting provides three additional keyword / phrases that will display your block when searched for. Limited to 3.
    - <span style="color:#80b3ff">**attributes** [Object] </span>– The attribute setting identifies what dynamic content we are using in our blocks. Several attribute options exist depending on what types of data we are using. Attribute settings are optional if your block uses no dynamic data. This data is then made available via props.attributes.name. Read more.
    - <span style="color:#80b3ff"> **edit** [function]</span> – The edit setting determines what be displayed in the editor area for the block. Must return a valid React element using wp.element.createElement() or JSX. Also accepts dynamic data as a props parameter.
    - <span style="color:#80b3ff">**save** [function]</span> – The save setting determines what be displayed when the block is converted to content for the frontend. Must return a valid React element using wp.element.createElement() or JSX. Also accepts dynamic data as a props parameter.

### 05/14/2024
That's cool and all, but what about the mysterious `{__}` module from the `i18n` package? It basically opens the content up to translation in the wordpress community.

As stated from [wordpress developer docs](https://developer.wordpress.org/block-editor/how-to-guides/internationalization/):

Internationalization is the process to provide multiple language support to software, in this case WordPress. Internationalization is often abbreviated as i18n, where 18 stands for the number of letters between the first i and the last n.
Providing i18n support to your plugin and theme allows it to reach the largest possible audience, even without requiring you to provide the additional language translations. When you upload your software to WordPress.org, all JS and PHP files will automatically be parsed. Any detected translation strings are added to translate.wordpress.org to allow the community to translate, ensuring WordPress plugins and themes are available in as many languages as possible.

### 05/15/2024
#### Understanding RichText
The Rich Text package is designed to aid in the manipulation of plain text strings in order that they can represent complex formatting. [It has a decent amount of components to further](https://developer.wordpress.org/block-editor/reference-guides/richtext/) flesh out the content and features of the respective block.

### 05/16/2024
I spent a small amount of time following the course, but after filling out more of the block registration function, I decided to take a pause on the material and really look into the official documentation
```
import { registerBlockType } from '@wordpress/blocks'
import block from './block.json';
import {__} from '@wordpress/i18n'
import { RichText } from '@wordpress/block-editor'

registerBlockType(block.name, {
    edit({attributes, setAttributes}) {
        const {content} = attributes;

        return (
            <RichText
                tagName ="h2" 
                placeholder = {__('Enter Heading', 'udemy-plus')}
                value = {content}
                onChange={newVal => setAttributes({content: newVal})}
            />
        )
    },
});
```
Because although this may seem super basic to the average wordpress developer, I'm barely able to follow through.

When registering a block with JavaScript on the client, the edit and save functions provide the interface for how a block is going to be rendered within the editor, how it will operate and be manipulated, and how it will be saved.

### 05/17/2024
#### <span style="color:#80b3ff">Client-Side Rendering</span>
The `save` function is being introduced. I've through several documents about it, but what the function does is basically display what's already been added to the Gutenberg editor in the front-end. The edit function will create a component for editing the block, whereas the `save` function will create a component saved in the database

Honestly, there was too much I did to fully write down, but to cut it short, the facny header block is complete. Onto Server-side Rendering...

One thing I will mention just for the sake of documentation is the importance of the `useBlockProps` hook of the `block-editor` package. Once placed into the root element of prospective block, it communicates to wordpress to give it the proper markups to register it as a block. Doing so allows custom css attributes to be applied within the block. An excerpt from this [medium article](https://franky-arkon-digital.medium.com/gutenberg-tips-generate-your-blocks-class-name-using-useblockprops-aa77a98f4fd) details further below:
>"but in order for the Gutenberg editor to know how to manipulate the block, add any extra classNames that are needed for the block… the block wrapper element should apply props retrieved from the useBlockProps react hook call"

#### <span style="color:#80b3ff">Server-Side Rendering</span>
##### Why use client-side rendering?
- Client-side rendering is great for simple content that does not rely on external data
- Great for blocks that require dynamic user interaction (animation, real-time-updates, etc)
- Ideal for single page applications
- Faster
##### Why Server-Side rendering?
- Server-side rendering is great for content that relies on external data.
    - Take the site title for example. It can be prone to change based on what the site administrator chooses. So as long as the block can be prone to change, it's best to use server-side rendering.
    - The block content is generated on the server using php prior to being sent to the user's browser

### 05/18/2024
Normally, Javascript doesn't support svg files, but webpack helps take care of it. The best way to add an svg file is through exporting it as a module
```
export default {
    primary: <svg file>
}
```

#### <span style="color:#80b3ff"> Quick Dive: PanelColorSettings </span>
A wordpress component from the `block-editor` package that provides a color ipcker in the control panel, having the capability to hold multiple color pickers for different attributes (ie background and text colors). It can be used within `InspectorControls`. Wordpress' offical block editor handbook doesn't have details about it, but there are some details on it's direct [GitHub page](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/panel-color-settings/README.md)

### 05/23/2024
So far, I have established the basic front-end display of the search bar by utilizing php (because this will be used in a dynamic way). The lecture I just completed introduced a php concept known as 'output buffering', which temporaily saves information (usually html) until it is fully able to render (which the programmer has to specify when).
#### <span style="color:#80b3ff">sanitizing vs escaping</span>
Pretty short answer. Sanitizing is the process of securing/filtering/cleaning all input data as security measure from untrusted and potentially harmful sources. 
Escaping output, on the other hand, is similar to sanitization, but focuses on stripping potentially malformed/unwatned output data
Wordpress' [API Handbook's security section](https://developer.wordpress.org/apis/security/) details this further.

**Side Note:** CSS class names for blocks always start with "wp-block". The rest are custom classes created by the user, so concantenate away.

### 05/25/2024
Completed the search-form block, starting on the 'page header' block which also uses server-side rendering.

#### Quick Update (13:18 CDT)
Completed the page header, and now mmoving on to the next section: Authentication.

### 05/26/2024
Now that the page header tools block is complete (the block that will prompt users to sign in or register), it's now time to work on the authentication modal, or better known as the login/register portal.