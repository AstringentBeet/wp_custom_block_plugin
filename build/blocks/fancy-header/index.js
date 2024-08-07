/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/fancy-header/main.css":
/*!******************************************!*\
  !*** ./src/blocks/fancy-header/main.css ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/blocks/fancy-header/block.json":
/*!********************************************!*\
  !*** ./src/blocks/fancy-header/block.json ***!
  \********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"udemy-plus/fancy-header","title":"Fancy Header","category":"text","icon":"star-filled","description":"Adds a header with a hover effect","keywords":["header","underline","hover"],"version":"1","textdomain":"udemy-plus","editorScript":"file:./index.js","attributes":{"content":{"type":"string","source":"html","selector":"h2"},"underline_color":{"type":"string","default":"#f87171"}},"style":"file:./index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************************!*\
  !*** ./src/blocks/fancy-header/index.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/blocks/fancy-header/block.json");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./main.css */ "./src/blocks/fancy-header/main.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");







(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__.name, {
  edit({
    attributes,
    setAttributes
  }) {
    const {
      content,
      underline_color
    } = attributes;
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Colors', 'udemy-plus'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
            colors: [{
              name: 'Red',
              color: '#f87171'
            }, {
              name: 'Indigo',
              color: '#818cf8'
            }],
            value: underline_color,
            onChange: newVal => setAttributes({
              underline_color: newVal
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        ...blockProps,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
          className: "fancy-header",
          tagName: "h2",
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter Heading', 'udemy-plus'),
          value: content,
          onChange: newVal => setAttributes({
            content: newVal
          }),
          allowedFormats: ['core/bold', 'core/italic']
        })
      })]
    });
  },
  save({
    attributes
  }) {
    const {
      content,
      underline_color
    } = attributes;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: "fancy-header",
      style: {
        'background-image': `
                    linear-gradient(transparent, transparent),
                    linear-gradient(${underline_color}, ${underline_color});
                `
      }
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
      ...blockProps,
      tagName: "h2",
      value: content
    });
  }
});
/******/ })()
;
//# sourceMappingURL=index.js.map