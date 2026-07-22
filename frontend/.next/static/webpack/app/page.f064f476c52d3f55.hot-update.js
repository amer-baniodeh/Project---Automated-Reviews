/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./components/ClusterExplorer.tsx":
/*!****************************************!*\
  !*** ./components/ClusterExplorer.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ClusterExplorer; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/api */ \"(app-pages-browser)/./lib/api.ts\");\n/* harmony import */ var _PixelStars__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PixelStars */ \"(app-pages-browser)/./components/PixelStars.tsx\");\n/* harmony import */ var _PixelStars__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_PixelStars__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_renderArticle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/renderArticle */ \"(app-pages-browser)/./lib/renderArticle.tsx\");\n/* harmony import */ var _lib_renderArticle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_renderArticle__WEBPACK_IMPORTED_MODULE_4__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst RANK_LABELS = [\n    \"#1\",\n    \"#2\",\n    \"#3\"\n];\nfunction ClusterExplorer() {\n    _s();\n    const [clusters, setClusters] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [article, setArticle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        (0,_lib_api__WEBPACK_IMPORTED_MODULE_2__.getClusters)().then((c)=>{\n            setClusters(c);\n            if (c.length) setSelected(c[0].cluster_id);\n        }).catch((e)=>setError(e.message));\n    }, []);\n    async function handleGenerate() {\n        if (selected === null) return;\n        setLoading(true);\n        setError(null);\n        setArticle(null);\n        try {\n            const res = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_2__.generateArticle)(selected);\n            setArticle(res);\n        } catch (e) {\n            setError(e.message);\n        } finally{\n            setLoading(false);\n        }\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"pixel-frame\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                children: \"> EXPLORE A CATEGORY\"\n            }, void 0, false, {\n                fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                lineNumber: 43,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                value: selected !== null && selected !== void 0 ? selected : \"\",\n                onChange: (e)=>setSelected(e.target.value),\n                children: clusters.map((c)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                        value: c.cluster_id,\n                        children: c.cluster_label\n                    }, c.cluster_id, false, {\n                        fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                        lineNumber: 46,\n                        columnNumber: 11\n                    }, this))\n            }, void 0, false, {\n                fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                lineNumber: 44,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: \"pixel-btn\",\n                onClick: handleGenerate,\n                disabled: loading || selected === null,\n                children: loading ? \"GENERATING...\" : \"GENERATE REPORT >\"\n            }, void 0, false, {\n                fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                lineNumber: 51,\n                columnNumber: 7\n            }, this),\n            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"error\",\n                children: [\n                    \"ERROR: \",\n                    error\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                lineNumber: 55,\n                columnNumber: 17\n            }, this),\n            article && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: {\n                    marginTop: 24\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"session-log-title\",\n                        style: {\n                            marginBottom: 14\n                        },\n                        children: \"> LEADERBOARD_\"\n                    }, void 0, false, {\n                        fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                        lineNumber: 59,\n                        columnNumber: 11\n                    }, this),\n                    article.top_products.map((p, i)=>/*#__PURE__*/ {\n                        var _RANK_LABELS_i;\n                        return (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"leaderboard-item rank-\".concat(i + 1),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"rank-badge\",\n                                    children: (_RANK_LABELS_i = RANK_LABELS[i]) !== null && _RANK_LABELS_i !== void 0 ? _RANK_LABELS_i : \"#\".concat(i + 1)\n                                }, void 0, false, {\n                                    fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                                    lineNumber: 64,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"leaderboard-body\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"leaderboard-name\",\n                                            children: p.product_title\n                                        }, void 0, false, {\n                                            fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                                            lineNumber: 66,\n                                            columnNumber: 17\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"leaderboard-meta\",\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_PixelStars__WEBPACK_IMPORTED_MODULE_3___default()), {\n                                                    rating: p.mean\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                                                    lineNumber: 68,\n                                                    columnNumber: 19\n                                                }, this),\n                                                \" \\xb7 \",\n                                                p.count,\n                                                \" reviews\"\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                                            lineNumber: 67,\n                                            columnNumber: 17\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                                    lineNumber: 65,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, p.product_title, true, {\n                            fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                            lineNumber: 63,\n                            columnNumber: 13\n                        }, this);\n                    }),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        style: {\n                            marginTop: 24\n                        },\n                        children: (0,_lib_renderArticle__WEBPACK_IMPORTED_MODULE_4__.renderArticle)(article.article)\n                    }, void 0, false, {\n                        fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                        lineNumber: 74,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n                lineNumber: 58,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/amerbaniodeh/Desktop/ironhack_ai/Project - Automated Reviews/frontend/components/ClusterExplorer.tsx\",\n        lineNumber: 42,\n        columnNumber: 5\n    }, this);\n}\n_s(ClusterExplorer, \"MyNBO7Rg+Iyl7uqPrJpB4jrltdY=\");\n_c = ClusterExplorer;\nvar _c;\n$RefreshReg$(_c, \"ClusterExplorer\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvQ2x1c3RlckV4cGxvcmVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUU0QztBQUNzRDtBQUM1RDtBQUNlO0FBRXJELE1BQU1NLGNBQWM7SUFBQztJQUFNO0lBQU07Q0FBSztBQUV2QixTQUFTQzs7SUFDdEIsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdSLCtDQUFRQSxDQUFnQixFQUFFO0lBQzFELE1BQU0sQ0FBQ1MsVUFBVUMsWUFBWSxHQUFHViwrQ0FBUUEsQ0FBZ0I7SUFDeEQsTUFBTSxDQUFDVyxTQUFTQyxXQUFXLEdBQUdaLCtDQUFRQSxDQUF1QjtJQUM3RCxNQUFNLENBQUNhLFNBQVNDLFdBQVcsR0FBR2QsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDZSxPQUFPQyxTQUFTLEdBQUdoQiwrQ0FBUUEsQ0FBZ0I7SUFFbERELGdEQUFTQSxDQUFDO1FBQ1JFLHFEQUFXQSxHQUNSZ0IsSUFBSSxDQUFDLENBQUNDO1lBQ0xWLFlBQVlVO1lBQ1osSUFBSUEsRUFBRUMsTUFBTSxFQUFFVCxZQUFZUSxDQUFDLENBQUMsRUFBRSxDQUFDRSxVQUFVO1FBQzNDLEdBQ0NDLEtBQUssQ0FBQyxDQUFDQyxJQUFNTixTQUFTTSxFQUFFQyxPQUFPO0lBQ3BDLEdBQUcsRUFBRTtJQUVMLGVBQWVDO1FBQ2IsSUFBSWYsYUFBYSxNQUFNO1FBQ3ZCSyxXQUFXO1FBQ1hFLFNBQVM7UUFDVEosV0FBVztRQUNYLElBQUk7WUFDRixNQUFNYSxNQUFNLE1BQU12Qix5REFBZUEsQ0FBQ087WUFDbENHLFdBQVdhO1FBQ2IsRUFBRSxPQUFPSCxHQUFRO1lBQ2ZOLFNBQVNNLEVBQUVDLE9BQU87UUFDcEIsU0FBVTtZQUNSVCxXQUFXO1FBQ2I7SUFDRjtJQUVBLHFCQUNFLDhEQUFDWTtRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7MEJBQUc7Ozs7OzswQkFDSiw4REFBQ0M7Z0JBQU9DLE9BQU9yQixxQkFBQUEsc0JBQUFBLFdBQVk7Z0JBQUlzQixVQUFVLENBQUNULElBQU1aLFlBQVlZLEVBQUVVLE1BQU0sQ0FBQ0YsS0FBSzswQkFDdkV2QixTQUFTMEIsR0FBRyxDQUFDLENBQUNmLGtCQUNiLDhEQUFDZ0I7d0JBQTBCSixPQUFPWixFQUFFRSxVQUFVO2tDQUMzQ0YsRUFBRWlCLGFBQWE7dUJBRExqQixFQUFFRSxVQUFVOzs7Ozs7Ozs7OzBCQUs3Qiw4REFBQ2dCO2dCQUFPVCxXQUFVO2dCQUFZVSxTQUFTYjtnQkFBZ0JjLFVBQVV6QixXQUFXSixhQUFhOzBCQUN0RkksVUFBVSxrQkFBa0I7Ozs7OztZQUc5QkUsdUJBQVMsOERBQUNXO2dCQUFJQyxXQUFVOztvQkFBUTtvQkFBUVo7Ozs7Ozs7WUFFeENKLHlCQUNDLDhEQUFDZTtnQkFBSWEsT0FBTztvQkFBRUMsV0FBVztnQkFBRzs7a0NBQzFCLDhEQUFDZDt3QkFBSUMsV0FBVTt3QkFBb0JZLE9BQU87NEJBQUVFLGNBQWM7d0JBQUc7a0NBQUc7Ozs7OztvQkFHL0Q5QixRQUFRK0IsWUFBWSxDQUFDVCxHQUFHLENBQUMsQ0FBQ1UsR0FBZUM7NEJBRVJ2QzsrQkFEaEMsOERBQUNxQjs0QkFBSUMsV0FBVyx5QkFBK0IsT0FBTmlCLElBQUk7OzhDQUMzQyw4REFBQ0M7b0NBQUtsQixXQUFVOzhDQUFjdEIsQ0FBQUEsaUJBQUFBLFdBQVcsQ0FBQ3VDLEVBQUUsY0FBZHZDLDRCQUFBQSxpQkFBa0IsSUFBVSxPQUFOdUMsSUFBSTs7Ozs7OzhDQUN4RCw4REFBQ2xCO29DQUFJQyxXQUFVOztzREFDYiw4REFBQ0Q7NENBQUlDLFdBQVU7c0RBQW9CZ0IsRUFBRUcsYUFBYTs7Ozs7O3NEQUNsRCw4REFBQ3BCOzRDQUFJQyxXQUFVOzs4REFDYiw4REFBQ3hCLG9EQUFVQTtvREFBQzRDLFFBQVFKLEVBQUVLLElBQUk7Ozs7OztnREFBSTtnREFBSUwsRUFBRU0sS0FBSztnREFBQzs7Ozs7Ozs7Ozs7Ozs7MkJBTE9OLEVBQUVHLGFBQWE7Ozs7O29CQVFqRTtrQ0FHUCw4REFBQ3BCO3dCQUFJYSxPQUFPOzRCQUFFQyxXQUFXO3dCQUFHO2tDQUFJcEMsaUVBQWFBLENBQUNPLFFBQVFBLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUt2RTtHQXJFd0JMO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvQ2x1c3RlckV4cGxvcmVyLnRzeD80ZjU1Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBnZXRDbHVzdGVycywgZ2VuZXJhdGVBcnRpY2xlLCBDbHVzdGVySW5mbywgQXJ0aWNsZVJlc3VsdCwgVG9wUHJvZHVjdCB9IGZyb20gXCIuLi9saWIvYXBpXCI7XG5pbXBvcnQgUGl4ZWxTdGFycyBmcm9tIFwiLi9QaXhlbFN0YXJzXCI7XG5pbXBvcnQgeyByZW5kZXJBcnRpY2xlIH0gZnJvbSBcIi4uL2xpYi9yZW5kZXJBcnRpY2xlXCI7XG5cbmNvbnN0IFJBTktfTEFCRUxTID0gW1wiIzFcIiwgXCIjMlwiLCBcIiMzXCJdO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDbHVzdGVyRXhwbG9yZXIoKSB7XG4gIGNvbnN0IFtjbHVzdGVycywgc2V0Q2x1c3RlcnNdID0gdXNlU3RhdGU8Q2x1c3RlckluZm9bXT4oW10pO1xuICBjb25zdCBbc2VsZWN0ZWQsIHNldFNlbGVjdGVkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbYXJ0aWNsZSwgc2V0QXJ0aWNsZV0gPSB1c2VTdGF0ZTxBcnRpY2xlUmVzdWx0IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGdldENsdXN0ZXJzKClcbiAgICAgIC50aGVuKChjKSA9PiB7XG4gICAgICAgIHNldENsdXN0ZXJzKGMpO1xuICAgICAgICBpZiAoYy5sZW5ndGgpIHNldFNlbGVjdGVkKGNbMF0uY2x1c3Rlcl9pZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiBzZXRFcnJvcihlLm1lc3NhZ2UpKTtcbiAgfSwgW10pO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUdlbmVyYXRlKCkge1xuICAgIGlmIChzZWxlY3RlZCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgc2V0RXJyb3IobnVsbCk7XG4gICAgc2V0QXJ0aWNsZShudWxsKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZ2VuZXJhdGVBcnRpY2xlKHNlbGVjdGVkKTtcbiAgICAgIHNldEFydGljbGUocmVzKTtcbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgIHNldEVycm9yKGUubWVzc2FnZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJwaXhlbC1mcmFtZVwiPlxuICAgICAgPGgzPiZndDsgRVhQTE9SRSBBIENBVEVHT1JZPC9oMz5cbiAgICAgIDxzZWxlY3QgdmFsdWU9e3NlbGVjdGVkID8/IFwiXCJ9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VsZWN0ZWQoZS50YXJnZXQudmFsdWUpfT5cbiAgICAgICAge2NsdXN0ZXJzLm1hcCgoYykgPT4gKFxuICAgICAgICAgIDxvcHRpb24ga2V5PXtjLmNsdXN0ZXJfaWR9IHZhbHVlPXtjLmNsdXN0ZXJfaWR9PlxuICAgICAgICAgICAge2MuY2x1c3Rlcl9sYWJlbH1cbiAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgKSl9XG4gICAgICA8L3NlbGVjdD5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicGl4ZWwtYnRuXCIgb25DbGljaz17aGFuZGxlR2VuZXJhdGV9IGRpc2FibGVkPXtsb2FkaW5nIHx8IHNlbGVjdGVkID09PSBudWxsfT5cbiAgICAgICAge2xvYWRpbmcgPyBcIkdFTkVSQVRJTkcuLi5cIiA6IFwiR0VORVJBVEUgUkVQT1JUID5cIn1cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICB7ZXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9XCJlcnJvclwiPkVSUk9SOiB7ZXJyb3J9PC9kaXY+fVxuXG4gICAgICB7YXJ0aWNsZSAmJiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAyNCB9fT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlc3Npb24tbG9nLXRpdGxlXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxNCB9fT5cbiAgICAgICAgICAgICZndDsgTEVBREVSQk9BUkRfXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2FydGljbGUudG9wX3Byb2R1Y3RzLm1hcCgocDogVG9wUHJvZHVjdCwgaTogbnVtYmVyKSA9PiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGxlYWRlcmJvYXJkLWl0ZW0gcmFuay0ke2kgKyAxfWB9IGtleT17cC5wcm9kdWN0X3RpdGxlfT5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmFuay1iYWRnZVwiPntSQU5LX0xBQkVMU1tpXSA/PyBgIyR7aSArIDF9YH08L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGVhZGVyYm9hcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGVhZGVyYm9hcmQtbmFtZVwiPntwLnByb2R1Y3RfdGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWFkZXJib2FyZC1tZXRhXCI+XG4gICAgICAgICAgICAgICAgICA8UGl4ZWxTdGFycyByYXRpbmc9e3AubWVhbn0gLz4gwrcge3AuY291bnR9IHJldmlld3NcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cblxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAyNCB9fT57cmVuZGVyQXJ0aWNsZShhcnRpY2xlLmFydGljbGUpfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59Il0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiZ2V0Q2x1c3RlcnMiLCJnZW5lcmF0ZUFydGljbGUiLCJQaXhlbFN0YXJzIiwicmVuZGVyQXJ0aWNsZSIsIlJBTktfTEFCRUxTIiwiQ2x1c3RlckV4cGxvcmVyIiwiY2x1c3RlcnMiLCJzZXRDbHVzdGVycyIsInNlbGVjdGVkIiwic2V0U2VsZWN0ZWQiLCJhcnRpY2xlIiwic2V0QXJ0aWNsZSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXJyb3IiLCJzZXRFcnJvciIsInRoZW4iLCJjIiwibGVuZ3RoIiwiY2x1c3Rlcl9pZCIsImNhdGNoIiwiZSIsIm1lc3NhZ2UiLCJoYW5kbGVHZW5lcmF0ZSIsInJlcyIsImRpdiIsImNsYXNzTmFtZSIsImgzIiwic2VsZWN0IiwidmFsdWUiLCJvbkNoYW5nZSIsInRhcmdldCIsIm1hcCIsIm9wdGlvbiIsImNsdXN0ZXJfbGFiZWwiLCJidXR0b24iLCJvbkNsaWNrIiwiZGlzYWJsZWQiLCJzdHlsZSIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsInRvcF9wcm9kdWN0cyIsInAiLCJpIiwic3BhbiIsInByb2R1Y3RfdGl0bGUiLCJyYXRpbmciLCJtZWFuIiwiY291bnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/ClusterExplorer.tsx\n"));

/***/ }),

/***/ "(app-pages-browser)/./components/PixelStars.tsx":
/*!***********************************!*\
  !*** ./components/PixelStars.tsx ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/./lib/renderArticle.tsx":
/*!*******************************!*\
  !*** ./lib/renderArticle.tsx ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ })

});