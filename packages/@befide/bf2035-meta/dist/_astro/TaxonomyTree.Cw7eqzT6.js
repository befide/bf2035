import{B as $e,k as M,H as re,I as w,l as oe,s as le,J as ae,K as ie,L as We,M as Ue,N as xe,O as V,P as T,Q as Ve,m as p,R as Y,T as Z,b as d,c as h,e as m,h as C,i as f,t as ee,p as x,g as S,U as ze,D as _e,E as Ge,F as k,n as g,w as y,f as Me,V as se,W as E,X as _,G as Xe,d as K,j as b,q as ce,x as qe,a as O,r as G,o as Je}from"./main.CnChN3XN.js";import{e as Qe,g as B,b as Ye,f as Te,a as H,h as Ze,i as et,j as tt,R as nt,_ as rt,c as ot}from"./_plugin-vue_export-helper.Dp6-QRIk.js";import{a as de,b as ue,c as pe,d as lt,e as at,f as it,s as st}from"./index.Dyug92SV.js";/* empty css                                   */var ct=function(e){var t=e.dt;return`
.p-treetable {
    position: relative;
}

.p-treetable-table {
    border-spacing: 0;
    border-collapse: separate;
    width: 100%;
}

.p-treetable-scrollable > .p-treetable-table-container {
    position: relative;
}

.p-treetable-scrollable-table > .p-treetable-thead {
    inset-block-start: 0;
    z-index: 1;
}

.p-treetable-scrollable-table > .p-treetable-frozen-tbody {
    position: sticky;
    z-index: 1;
}

.p-treetable-scrollable-table > .p-treetable-tfoot {
    inset-block-end: 0;
    z-index: 1;
}

.p-treetable-scrollable .p-treetable-frozen-column {
    position: sticky;
    background: `.concat(t("treetable.header.cell.background"),`;
}

.p-treetable-scrollable th.p-treetable-frozen-column {
    z-index: 1;
}

.p-treetable-scrollable > .p-treetable-table-container > .p-treetable-table > .p-treetable-thead {
    background: `).concat(t("treetable.header.cell.background"),`;
}

.p-treetable-scrollable > .p-treetable-table-container > .p-treetable-table > .p-treetable-tfoot {
    background: `).concat(t("treetable.footer.cell.background"),`;
}

.p-treetable-flex-scrollable {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.p-treetable-flex-scrollable > .p-treetable-table-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
}

.p-treetable-scrollable-table > .p-treetable-tbody > .p-treetable-row-group-header {
    position: sticky;
    z-index: 1;
}

.p-treetable-resizable-table > .p-treetable-thead > tr > th,
.p-treetable-resizable-table > .p-treetable-tfoot > tr > td,
.p-treetable-resizable-table > .p-treetable-tbody > tr > td {
    overflow: hidden;
    white-space: nowrap;
}

.p-treetable-resizable-table > .p-treetable-thead > tr > th.p-treetable-resizable-column:not(.p-treetable-frozen-column) {
    background-clip: padding-box;
    position: relative;
}

.p-treetable-resizable-table-fit > .p-treetable-thead > tr > th.p-treetable-resizable-column:last-child .p-treetable-column-resizer {
    display: none;
}

.p-treetable-column-resizer {
    display: block;
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    margin: 0;
    width: `).concat(t("treetable.column.resizer.width"),`;
    height: 100%;
    padding: 0;
    cursor: col-resize;
    border: 1px solid transparent;
}

.p-treetable-column-header-content {
    display: flex;
    align-items: center;
    gap: `).concat(t("treetable.header.cell.gap"),`;
}

.p-treetable-column-resize-indicator {
    width: `).concat(t("treetable.resize.indicator.width"),`;
    position: absolute;
    z-index: 10;
    display: none;
    background: `).concat(t("treetable.resize.indicator.color"),`;
}

.p-treetable-mask {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}

.p-treetable-paginator-top {
    border-color: `).concat(t("treetable.paginator.top.border.color"),`;
    border-style: solid;
    border-width: `).concat(t("treetable.paginator.top.border.width"),`;
}

.p-treetable-paginator-bottom {
    border-color: `).concat(t("treetable.paginator.bottom.border.color"),`;
    border-style: solid;
    border-width: `).concat(t("treetable.paginator.bottom.border.width"),`;
}

.p-treetable-header {
    background: `).concat(t("treetable.header.background"),`;
    color: `).concat(t("treetable.header.color"),`;
    border-color: `).concat(t("treetable.header.border.color"),`;
    border-style: solid;
    border-width: `).concat(t("treetable.header.border.width"),`;
    padding: `).concat(t("treetable.header.padding"),`;
}

.p-treetable-footer {
    background: `).concat(t("treetable.footer.background"),`;
    color: `).concat(t("treetable.footer.color"),`;
    border-color: `).concat(t("treetable.footer.border.color"),`;
    border-style: solid;
    border-width: `).concat(t("treetable.footer.border.width"),`;
    padding: `).concat(t("treetable.footer.padding"),`;
}

.p-treetable-header-cell {
    padding: `).concat(t("treetable.header.cell.padding"),`;
    background: `).concat(t("treetable.header.cell.background"),`;
    border-color: `).concat(t("treetable.header.cell.border.color"),`;
    border-style: solid;
    border-width: 0 0 1px 0;
    color: `).concat(t("treetable.header.cell.color"),`;
    font-weight: normal;
    text-align: start;
    transition: background `).concat(t("treetable.transition.duration"),", color ").concat(t("treetable.transition.duration"),", border-color ").concat(t("treetable.transition.duration"),`,
            outline-color `).concat(t("treetable.transition.duration"),", box-shadow ").concat(t("treetable.transition.duration"),`;
}

.p-treetable-column-title {
    font-weight: `).concat(t("treetable.column.title.font.weight"),`;
}

.p-treetable-tbody > tr {
    outline-color: transparent;
    background: `).concat(t("treetable.row.background"),`;
    color: `).concat(t("treetable.row.color"),`;
    transition: background `).concat(t("treetable.transition.duration"),", color ").concat(t("treetable.transition.duration"),", border-color ").concat(t("treetable.transition.duration"),`,
            outline-color `).concat(t("treetable.transition.duration"),", box-shadow ").concat(t("treetable.transition.duration"),`;
}

.p-treetable-tbody > tr > td {
    text-align: start;
    border-color: `).concat(t("treetable.body.cell.border.color"),`;
    border-style: solid;
    border-width: 0 0 1px 0;
    padding: `).concat(t("treetable.body.cell.padding"),`;
}

.p-treetable-hoverable .p-treetable-tbody > tr:not(.p-treetable-row-selected):hover {
    background: `).concat(t("treetable.row.hover.background"),`;
    color: `).concat(t("treetable.row.hover.color"),`;
}

.p-treetable-tbody > tr.p-treetable-row-selected {
    background: `).concat(t("treetable.row.selected.background"),`;
    color: `).concat(t("treetable.row.selected.color"),`;
}

.p-treetable-tbody > tr:has(+ .p-treetable-row-selected) > td {
    border-block-end-color: `).concat(t("treetable.body.cell.selected.border.color"),`;
}

.p-treetable-tbody > tr.p-treetable-row-selected > td {
    border-block-end-color: `).concat(t("treetable.body.cell.selected.border.color"),`;
}

.p-treetable-tbody > tr:focus-visible,
.p-treetable-tbody > tr.p-treetable-contextmenu-row-selected {
    box-shadow: `).concat(t("treetable.row.focus.ring.shadow"),`;
    outline: `).concat(t("treetable.row.focus.ring.width")," ").concat(t("treetable.row.focus.ring.style")," ").concat(t("treetable.row.focus.ring.color"),`;
    outline-offset: `).concat(t("treetable.row.focus.ring.offset"),`;
}

.p-treetable-tfoot > tr > td {
    text-align: start;
    padding: `).concat(t("treetable.footer.cell.padding"),`;
    border-color: `).concat(t("treetable.footer.cell.border.color"),`;
    border-style: solid;
    border-width: 0 0 1px 0;
    color: `).concat(t("treetable.footer.cell.color"),`;
    background: `).concat(t("treetable.footer.cell.background"),`;
}

.p-treetable-column-footer {
    font-weight: `).concat(t("treetable.column.footer.font.weight"),`;
}

.p-treetable-sortable-column {
    cursor: pointer;
    user-select: none;
    outline-color: transparent;
}

.p-treetable-column-title,
.p-treetable-sort-icon,
.p-treetable-sort-badge {
    vertical-align: middle;
}

.p-treetable-sort-icon {
    color: `).concat(t("treetable.sort.icon.color"),`;
    font-size: `).concat(t("treetable.sort.icon.size"),`;
    width: `).concat(t("treetable.sort.icon.size"),`;
    height: `).concat(t("treetable.sort.icon.size"),`;
    transition: color `).concat(t("treetable.transition.duration"),`;
}

.p-treetable-sortable-column:not(.p-treetable-column-sorted):hover {
    background: `).concat(t("treetable.header.cell.hover.background"),`;
    color: `).concat(t("treetable.header.cell.hover.color"),`;
}

.p-treetable-sortable-column:not(.p-treetable-column-sorted):hover .p-treetable-sort-icon {
    color: `).concat(t("treetable.sort.icon.hover.color"),`;
}

.p-treetable-column-sorted {
    background: `).concat(t("treetable.header.cell.selected.background"),`;
    color: `).concat(t("treetable.header.cell.selected.color"),`;
}

.p-treetable-column-sorted .p-treetable-sort-icon {
    color: `).concat(t("treetable.header.cell.selected.color"),`;
}

.p-treetable-sortable-column:focus-visible {
    box-shadow: `).concat(t("treetable.header.cell.focus.ring.shadow"),`;
    outline: `).concat(t("treetable.header.cell.focus.ring.width")," ").concat(t("treetable.header.cell.focus.ring.style")," ").concat(t("treetable.header.cell.focus.ring.color"),`;
    outline-offset: `).concat(t("treetable.header.cell.focus.ring.offset"),`;
}

.p-treetable-hoverable .p-treetable-selectable-row {
    cursor: pointer;
}

.p-treetable-loading-icon {
    font-size: `).concat(t("treetable.loading.icon.size"),`;
    width: `).concat(t("treetable.loading.icon.size"),`;
    height: `).concat(t("treetable.loading.icon.size"),`;
}

.p-treetable-gridlines .p-treetable-header {
    border-width: 1px 1px 0 1px;
}

.p-treetable-gridlines .p-treetable-footer {
    border-width: 0 1px 1px 1px;
}

.p-treetable-gridlines .p-treetable-paginator-top {
    border-width: 1px 1px 0 1px;
}

.p-treetable-gridlines .p-treetable-paginator-bottom {
    border-width: 0 1px 1px 1px;
}

.p-treetable-gridlines .p-treetable-thead > tr > th {
    border-width: 1px 0 1px 1px;
}

.p-treetable-gridlines .p-treetable-thead > tr > th:last-child {
    border-width: 1px;
}

.p-treetable-gridlines .p-treetable-tbody > tr > td {
    border-width: 1px 0 0 1px;
}

.p-treetable-gridlines .p-treetable-tbody > tr > td:last-child {
    border-width: 1px 1px 0 1px;
}

.p-treetable-gridlines .p-treetable-tbody > tr:last-child > td {
    border-width: 1px 0 1px 1px;
}

.p-treetable-gridlines .p-treetable-tbody > tr:last-child > td:last-child {
    border-width: 1px;
}

.p-treetable-gridlines .p-treetable-tfoot > tr > td {
    border-width: 1px 0 1px 1px;
}

.p-treetable-gridlines .p-treetable-tfoot > tr > td:last-child {
    border-width: 1px 1px 1px 1px;
}

.p-treetable.p-treetable-gridlines .p-treetable-thead + .p-treetable-tfoot > tr > td {
    border-width: 0 0 1px 1px;
}

.p-treetable.p-treetable-gridlines .p-treetable-thead + .p-treetable-tfoot > tr > td:last-child {
    border-width: 0 1px 1px 1px;
}

.p-treetable.p-treetable-gridlines:has(.p-treetable-thead):has(.p-treetable-tbody) .p-treetable-tbody > tr > td {
    border-width: 0 0 1px 1px;
}

.p-treetable.p-treetable-gridlines:has(.p-treetable-thead):has(.p-treetable-tbody) .p-treetable-tbody > tr > td:last-child {
    border-width: 0 1px 1px 1px;
}

.p-treetable.p-treetable-gridlines:has(.p-treetable-tbody):has(.p-treetable-tfoot) .p-treetable-tbody > tr:last-child > td {
    border-width: 0 0 0 1px;
}

.p-treetable.p-treetable-gridlines:has(.p-treetable-tbody):has(.p-treetable-tfoot) .p-treetable-tbody > tr:last-child > td:last-child {
    border-width: 0 1px 0 1px;
}

.p-treetable.p-treetable-sm .p-treetable-header {
    padding: 0.375rem 0.5rem;
}

.p-treetable.p-treetable-sm .p-treetable-thead > tr > th {
    padding: 0.375rem 0.5rem;
}

.p-treetable.p-treetable-sm .p-treetable-tbody > tr > td {
    padding: 0.375rem 0.5rem;
}

.p-treetable.p-treetable-sm .p-treetable-tfoot > tr > td {
    padding: 0.375rem 0.5rem;
}

.p-treetable.p-treetable-sm .p-treetable-footer {
    padding: 0.375rem 0.5rem;
}

.p-treetable.p-treetable-lg .p-treetable-header {
    padding: 0.9375rem 1.25rem;
}

.p-treetable.p-treetable-lg .p-treetable-thead > tr > th {
    padding: 0.9375rem 1.25rem;
}

.p-treetable.p-treetable-lg .p-treetable-tbody > tr > td {
    padding: 0.9375rem 1.25rem;
}

.p-treetable.p-treetable-lg .p-treetable-tfoot > tr > td {
    padding: 0.9375rem 1.25rem;
}

.p-treetable.p-treetable-lg .p-treetable-footer {
    padding: 0.9375rem 1.25rem;
}

.p-treetable-body-cell-content {
    display: flex;
    align-items: center;
    gap: `).concat(t("treetable.body.cell.gap"),`;
}

.p-treetable-tbody > tr.p-treetable-row-selected .p-treetable-node-toggle-button {
    color: inherit;
}

.p-treetable-node-toggle-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    width: `).concat(t("treetable.node.toggle.button.size"),`;
    height: `).concat(t("treetable.node.toggle.button.size"),`;
    color: `).concat(t("treetable.node.toggle.button.color"),`;
    border: 0 none;
    background: transparent;
    cursor: pointer;
    border-radius: `).concat(t("treetable.node.toggle.button.border.radius"),`;
    transition: background `).concat(t("treetable.transition.duration"),", color ").concat(t("treetable.transition.duration"),", border-color ").concat(t("treetable.transition.duration"),`,
            outline-color `).concat(t("treetable.transition.duration"),", box-shadow ").concat(t("treetable.transition.duration"),`;
    outline-color: transparent;
    user-select: none;
}

.p-treetable-node-toggle-button:enabled:hover {
    color: `).concat(t("treetable.node.toggle.button.hover.color"),`;
    background: `).concat(t("treetable.node.toggle.button.hover.background"),`;
}

.p-treetable-tbody > tr.p-treetable-row-selected .p-treetable-node-toggle-button:hover {
    background: `).concat(t("treetable.node.toggle.button.selected.hover.background"),`;
    color: `).concat(t("treetable.node.toggle.button.selected.hover.color"),`;
}

.p-treetable-node-toggle-button:focus-visible {
    box-shadow: `).concat(t("treetable.node.toggle.button.focus.ring.shadow"),`;
    outline: `).concat(t("treetable.node.toggle.button.focus.ring.width")," ").concat(t("treetable.node.toggle.button.focus.ring.style")," ").concat(t("treetable.node.toggle.button.focus.ring.color"),`;
    outline-offset: `).concat(t("treetable.node.toggle.button.focus.ring.offset"),`;
}

.p-treetable-node-toggle-icon:dir(rtl) {
    transform: rotate(180deg);
}
`)},dt={root:function(e){var t=e.instance,r=e.props;return["p-treetable p-component",{"p-treetable-hoverable":r.rowHover||t.rowSelectionMode,"p-treetable-resizable":r.resizableColumns,"p-treetable-resizable-fit":r.resizableColumns&&r.columnResizeMode==="fit","p-treetable-scrollable":r.scrollable,"p-treetable-flex-scrollable":r.scrollable&&r.scrollHeight==="flex","p-treetable-gridlines":r.showGridlines,"p-treetable-sm":r.size==="small","p-treetable-lg":r.size==="large"}]},loading:"p-treetable-loading",mask:"p-treetable-mask p-overlay-mask",loadingIcon:"p-treetable-loading-icon",header:"p-treetable-header",paginator:function(e){var t=e.position;return"p-treetable-paginator-"+t},tableContainer:"p-treetable-table-container",table:function(e){var t=e.props;return["p-treetable-table",{"p-treetable-scrollable-table":t.scrollable,"p-treetable-resizable-table":t.resizableColumns,"p-treetable-resizable-table-fit":t.resizableColumns&&t.columnResizeMode==="fit"}]},thead:"p-treetable-thead",headerCell:function(e){var t=e.instance,r=e.props,l=e.context;return["p-treetable-header-cell",{"p-treetable-sortable-column":t.columnProp("sortable"),"p-treetable-resizable-column":r.resizableColumns,"p-treetable-column-sorted":l?.sorted,"p-treetable-frozen-column":t.columnProp("frozen")}]},columnResizer:"p-treetable-column-resizer",columnHeaderContent:"p-treetable-column-header-content",columnTitle:"p-treetable-column-title",sortIcon:"p-treetable-sort-icon",pcSortBadge:"p-treetable-sort-badge",tbody:"p-treetable-tbody",row:function(e){var t=e.props,r=e.instance;return[{"p-treetable-row-selected":r.selected,"p-treetable-contextmenu-row-selected":t.contextMenuSelection&&r.isSelectedWithContextMenu}]},bodyCell:function(e){var t=e.instance;return[{"p-treetable-frozen-column":t.columnProp("frozen")}]},bodyCellContent:function(e){var t=e.instance;return["p-treetable-body-cell-content",{"p-treetable-body-cell-content-expander":t.columnProp("expander")}]},nodeToggleButton:"p-treetable-node-toggle-button",nodeToggleIcon:"p-treetable-node-toggle-icon",pcNodeCheckbox:"p-treetable-node-checkbox",emptyMessage:"p-treetable-empty-message",tfoot:"p-treetable-tfoot",footerCell:function(e){var t=e.instance;return[{"p-treetable-frozen-column":t.columnProp("frozen")}]},footer:"p-treetable-footer",columnResizeIndicator:"p-treetable-column-resize-indicator"},ut={tableContainer:{overflow:"auto"},thead:{position:"sticky"},tfoot:{position:"sticky"}},pt=$e.extend({name:"treetable",theme:ct,classes:dt,inlineStyles:ut}),ht={name:"BaseTreeTable",extends:H,props:{value:{type:null,default:null},dataKey:{type:[String,Function],default:"key"},expandedKeys:{type:null,default:null},selectionKeys:{type:null,default:null},selectionMode:{type:String,default:null},metaKeySelection:{type:Boolean,default:!1},contextMenu:{type:Boolean,default:!1},contextMenuSelection:{type:Object,default:null},rows:{type:Number,default:0},first:{type:Number,default:0},totalRecords:{type:Number,default:0},paginator:{type:Boolean,default:!1},paginatorPosition:{type:String,default:"bottom"},alwaysShowPaginator:{type:Boolean,default:!0},paginatorTemplate:{type:String,default:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"},pageLinkSize:{type:Number,default:5},rowsPerPageOptions:{type:Array,default:null},currentPageReportTemplate:{type:String,default:"({currentPage} of {totalPages})"},lazy:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},loadingMode:{type:String,default:"mask"},rowHover:{type:Boolean,default:!1},autoLayout:{type:Boolean,default:!1},sortField:{type:[String,Function],default:null},sortOrder:{type:Number,default:null},defaultSortOrder:{type:Number,default:1},multiSortMeta:{type:Array,default:null},sortMode:{type:String,default:"single"},removableSort:{type:Boolean,default:!1},filters:{type:Object,default:null},filterMode:{type:String,default:"lenient"},filterLocale:{type:String,default:void 0},resizableColumns:{type:Boolean,default:!1},columnResizeMode:{type:String,default:"fit"},indentation:{type:Number,default:1},showGridlines:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},scrollHeight:{type:String,default:null},size:{type:String,default:null},tableStyle:{type:null,default:null},tableClass:{type:[String,Object],default:null},tableProps:{type:Object,default:null}},style:pt,provide:function(){return{$pcTreeTable:this,$parentInstance:this}}},Oe={name:"FooterCell",hostName:"TreeTable",extends:H,props:{column:{type:Object,default:null},index:{type:Number,default:null}},data:function(){return{styleObject:{}}},mounted:function(){this.columnProp("frozen")&&this.updateStickyPosition()},updated:function(){this.columnProp("frozen")&&this.updateStickyPosition()},methods:{columnProp:function(e){return B(this.column,e)},getColumnPT:function(e){var t,r={props:this.column.props,parent:{instance:this,props:this.$props,state:this.$data},context:{index:this.index,frozen:this.columnProp("frozen"),size:(t=this.$parentInstance)===null||t===void 0?void 0:t.size}};return p(this.ptm("column.".concat(e),{column:r}),this.ptm("column.".concat(e),r),this.ptmo(this.getColumnProp(),e,r))},getColumnProp:function(){return this.column.props&&this.column.props.pt?this.column.props.pt:void 0},updateStickyPosition:function(){if(this.columnProp("frozen")){var e=this.columnProp("alignFrozen");if(e==="right"){var t=0,r=Y(this.$el,'[data-p-frozen-column="true"]');r&&(t=T(r)+parseFloat(r.style.right||0)),this.styleObject.insetInlineEnd=t+"px"}else{var l=0,o=Z(this.$el,'[data-p-frozen-column="true"]');o&&(l=T(o)+parseFloat(o.style.left||0)),this.styleObject.insetInlineStart=l+"px"}}}},computed:{containerClass:function(){return[this.columnProp("footerClass"),this.columnProp("class"),this.cx("footerCell")]},containerStyle:function(){var e=this.columnProp("footerStyle"),t=this.columnProp("style");return this.columnProp("frozen")?[t,e,this.styleObject]:[t,e]}}};function I(n){"@babel/helpers - typeof";return I=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},I(n)}function he(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(l){return Object.getOwnPropertyDescriptor(n,l).enumerable})),t.push.apply(t,r)}return t}function fe(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?he(Object(t),!0).forEach(function(r){ft(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):he(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}function ft(n,e,t){return(e=bt(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function bt(n){var e=mt(n,"string");return I(e)=="symbol"?e:e+""}function mt(n,e){if(I(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var r=t.call(n,e||"default");if(I(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}var yt=["data-p-frozen-column"];function gt(n,e,t,r,l,o){return d(),h("td",p({style:o.containerStyle,class:o.containerClass,role:"cell"},fe(fe({},o.getColumnPT("root")),o.getColumnPT("footerCell")),{"data-p-frozen-column":o.columnProp("frozen")}),[t.column.children&&t.column.children.footer?(d(),m(C(t.column.children.footer),{key:0,column:t.column},null,8,["column"])):f("",!0),o.columnProp("footer")?(d(),h("span",p({key:1,class:n.cx("columnFooter")},o.getColumnPT("columnFooter")),ee(o.columnProp("footer")),17)):f("",!0)],16,yt)}Oe.render=gt;var Ke={name:"HeaderCell",hostName:"TreeTable",extends:H,emits:["column-click","column-resizestart"],props:{column:{type:Object,default:null},resizableColumns:{type:Boolean,default:!1},sortField:{type:[String,Function],default:null},sortOrder:{type:Number,default:null},multiSortMeta:{type:Array,default:null},sortMode:{type:String,default:"single"},index:{type:Number,default:null}},data:function(){return{styleObject:{}}},mounted:function(){this.columnProp("frozen")&&this.updateStickyPosition()},updated:function(){this.columnProp("frozen")&&this.updateStickyPosition()},methods:{columnProp:function(e){return B(this.column,e)},getColumnPT:function(e){var t,r={props:this.column.props,parent:{instance:this,props:this.$props,state:this.$data},context:{index:this.index,sorted:this.isColumnSorted(),frozen:this.$parentInstance.scrollable&&this.columnProp("frozen"),resizable:this.resizableColumns,scrollable:this.$parentInstance.scrollable,showGridlines:this.$parentInstance.showGridlines,size:(t=this.$parentInstance)===null||t===void 0?void 0:t.size}};return p(this.ptm("column.".concat(e),{column:r}),this.ptm("column.".concat(e),r),this.ptmo(this.getColumnProp(),e,r))},getColumnProp:function(){return this.column.props&&this.column.props.pt?this.column.props.pt:void 0},updateStickyPosition:function(){if(this.columnProp("frozen")){var e=this.columnProp("alignFrozen");if(e==="right"){var t=0,r=Y(this.$el,'[data-p-frozen-column="true"]');r&&(t=T(r)+parseFloat(r.style.right||0)),this.styleObject.insetInlineEnd=t+"px"}else{var l=0,o=Z(this.$el,'[data-p-frozen-column="true"]');o&&(l=T(o)+parseFloat(o.style.left||0)),this.styleObject.insetInlineStart=l+"px"}var c=this.$el.parentElement.nextElementSibling;if(c){var i=xe(this.$el);c.children[i].style.left=this.styleObject.left,c.children[i].style.right=this.styleObject.right}}},onClick:function(e){this.$emit("column-click",{originalEvent:e,column:this.column})},onKeyDown:function(e){(e.code==="Enter"||e.code==="NumpadEnter"||e.code==="Space")&&e.currentTarget.nodeName==="TH"&&w(e.currentTarget,"data-p-sortable-column")&&(this.$emit("column-click",{originalEvent:e,column:this.column}),e.preventDefault())},onResizeStart:function(e){this.$emit("column-resizestart",e)},getMultiSortMetaIndex:function(){for(var e=-1,t=0;t<this.multiSortMeta.length;t++){var r=this.multiSortMeta[t];if(r.field===this.columnProp("field")||r.field===this.columnProp("sortField")){e=t;break}}return e},isMultiSorted:function(){return this.columnProp("sortable")&&this.getMultiSortMetaIndex()>-1},isColumnSorted:function(){return this.sortMode==="single"?this.sortField&&(this.sortField===this.columnProp("field")||this.sortField===this.columnProp("sortField")):this.isMultiSorted()}},computed:{containerClass:function(){return[this.columnProp("headerClass"),this.columnProp("class"),this.cx("headerCell")]},containerStyle:function(){var e=this.columnProp("headerStyle"),t=this.columnProp("style");return this.columnProp("frozen")?[t,e,this.styleObject]:[t,e]},sortState:function(){var e=!1,t=null;if(this.sortMode==="single")e=this.sortField&&(this.sortField===this.columnProp("field")||this.sortField===this.columnProp("sortField")),t=e?this.sortOrder:0;else if(this.sortMode==="multiple"){var r=this.getMultiSortMetaIndex();r>-1&&(e=!0,t=this.multiSortMeta[r].order)}return{sorted:e,sortOrder:t}},sortableColumnIcon:function(){var e=this.sortState,t=e.sorted,r=e.sortOrder;if(t){if(t&&r>0)return ue;if(t&&r<0)return pe}else return de;return null},ariaSort:function(){if(this.columnProp("sortable")){var e=this.sortState,t=e.sorted,r=e.sortOrder;return t&&r<0?"descending":t&&r>0?"ascending":"none"}else return null}},components:{Badge:Ze,SortAltIcon:de,SortAmountUpAltIcon:ue,SortAmountDownIcon:pe}};function F(n){"@babel/helpers - typeof";return F=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},F(n)}function be(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(l){return Object.getOwnPropertyDescriptor(n,l).enumerable})),t.push.apply(t,r)}return t}function me(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?be(Object(t),!0).forEach(function(r){vt(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):be(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}function vt(n,e,t){return(e=St(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function St(n){var e=kt(n,"string");return F(e)=="symbol"?e:e+""}function kt(n,e){if(F(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var r=t.call(n,e||"default");if(F(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}var Ct=["tabindex","aria-sort","data-p-sortable-column","data-p-resizable-column","data-p-sorted","data-p-frozen-column"];function wt(n,e,t,r,l,o){var c=x("Badge");return d(),h("th",p({class:o.containerClass,style:[o.containerStyle],onClick:e[1]||(e[1]=function(){return o.onClick&&o.onClick.apply(o,arguments)}),onKeydown:e[2]||(e[2]=function(){return o.onKeyDown&&o.onKeyDown.apply(o,arguments)}),tabindex:o.columnProp("sortable")?"0":null,"aria-sort":o.ariaSort,role:"columnheader"},me(me({},o.getColumnPT("root")),o.getColumnPT("headerCell")),{"data-p-sortable-column":o.columnProp("sortable"),"data-p-resizable-column":t.resizableColumns,"data-p-sorted":o.isColumnSorted(),"data-p-frozen-column":o.columnProp("frozen")}),[t.resizableColumns&&!o.columnProp("frozen")?(d(),h("span",p({key:0,class:n.cx("columnResizer"),onMousedown:e[0]||(e[0]=function(){return o.onResizeStart&&o.onResizeStart.apply(o,arguments)})},o.getColumnPT("columnResizer")),null,16)):f("",!0),S("div",p({class:n.cx("columnHeaderContent")},o.getColumnPT("columnHeaderContent")),[t.column.children&&t.column.children.header?(d(),m(C(t.column.children.header),{key:0,column:t.column},null,8,["column"])):f("",!0),o.columnProp("header")?(d(),h("span",p({key:1,class:n.cx("columnTitle")},o.getColumnPT("columnTitle")),ee(o.columnProp("header")),17)):f("",!0),o.columnProp("sortable")?(d(),h("span",ze(p({key:2},o.getColumnPT("sort"))),[(d(),m(C(t.column.children&&t.column.children.sorticon||o.sortableColumnIcon),p({sorted:o.sortState.sorted,sortOrder:o.sortState.sortOrder,class:n.cx("sortIcon")},o.getColumnPT("sortIcon")),null,16,["sorted","sortOrder","class"]))],16)):f("",!0),o.isMultiSorted()?(d(),m(c,p({key:3,class:n.cx("pcSortBadge")},o.getColumnPT("pcSortBadge"),{value:o.getMultiSortMetaIndex()+1,size:"small"}),null,16,["class","value"])):f("",!0)],16)],16,Ct)}Ke.render=wt;var je={name:"BodyCell",hostName:"TreeTable",extends:H,emits:["node-toggle","checkbox-toggle"],props:{node:{type:Object,default:null},column:{type:Object,default:null},level:{type:Number,default:0},indentation:{type:Number,default:1},leaf:{type:Boolean,default:!1},expanded:{type:Boolean,default:!1},selectionMode:{type:String,default:null},checked:{type:Boolean,default:!1},partialChecked:{type:Boolean,default:!1},templates:{type:Object,default:null},index:{type:Number,default:null},loadingMode:{type:String,default:"mask"}},data:function(){return{styleObject:{}}},mounted:function(){this.columnProp("frozen")&&this.updateStickyPosition()},updated:function(){this.columnProp("frozen")&&this.updateStickyPosition()},methods:{toggle:function(){this.$emit("node-toggle",this.node)},columnProp:function(e){return B(this.column,e)},getColumnPT:function(e){var t,r={props:this.column.props,parent:{instance:this,props:this.$props,state:this.$data},context:{index:this.index,selectable:this.$parentInstance.rowHover||this.$parentInstance.rowSelectionMode,selected:this.$parent.selected,frozen:this.columnProp("frozen"),scrollable:this.$parentInstance.scrollable,showGridlines:this.$parentInstance.showGridlines,size:(t=this.$parentInstance)===null||t===void 0?void 0:t.size}};return p(this.ptm("column.".concat(e),{column:r}),this.ptm("column.".concat(e),r),this.ptmo(this.getColumnProp(),e,r))},getColumnProp:function(){return this.column.props&&this.column.props.pt?this.column.props.pt:void 0},getColumnCheckboxPT:function(e){var t={props:this.column.props,parent:{instance:this,props:this.$props,state:this.$data},context:{checked:this.checked,partialChecked:this.partialChecked}};return p(this.ptm("column.".concat(e),{column:t}),this.ptm("column.".concat(e),t),this.ptmo(this.getColumnProp(),e,t))},updateStickyPosition:function(){if(this.columnProp("frozen")){var e=this.columnProp("alignFrozen");if(e==="right"){var t=0,r=Y(this.$el,'[data-p-frozen-column="true"]');r&&(t=T(r)+parseFloat(r.style.right||0)),this.styleObject.insetInlineEnd=t+"px"}else{var l=0,o=Z(this.$el,'[data-p-frozen-column="true"]');o&&(l=T(o)+parseFloat(o.style.left||0)),this.styleObject.insetInlineStart=l+"px"}}},resolveFieldData:function(e,t){return M(e,t)},toggleCheckbox:function(){this.$emit("checkbox-toggle")}},computed:{containerClass:function(){return[this.columnProp("bodyClass"),this.columnProp("class"),this.cx("bodyCell")]},containerStyle:function(){var e=this.columnProp("bodyStyle"),t=this.columnProp("style");return this.columnProp("frozen")?[t,e,this.styleObject]:[t,e]},togglerStyle:function(){return{marginLeft:this.level*this.indentation+"rem",visibility:this.leaf?"hidden":"visible"}},checkboxSelectionMode:function(){return this.selectionMode==="checkbox"}},components:{Checkbox:lt,ChevronRightIcon:at,ChevronDownIcon:et,CheckIcon:tt,MinusIcon:it,SpinnerIcon:Te},directives:{ripple:nt}};function A(n){"@babel/helpers - typeof";return A=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},A(n)}function ye(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(l){return Object.getOwnPropertyDescriptor(n,l).enumerable})),t.push.apply(t,r)}return t}function ge(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?ye(Object(t),!0).forEach(function(r){Pt(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):ye(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}function Pt(n,e,t){return(e=xt(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function xt(n){var e=zt(n,"string");return A(e)=="symbol"?e:e+""}function zt(n,e){if(A(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var r=t.call(n,e||"default");if(A(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}var Mt=["data-p-frozen-column"];function Tt(n,e,t,r,l,o){var c=x("SpinnerIcon"),i=x("Checkbox"),s=_e("ripple");return d(),h("td",p({style:o.containerStyle,class:o.containerClass,role:"cell"},ge(ge({},o.getColumnPT("root")),o.getColumnPT("bodyCell")),{"data-p-frozen-column":o.columnProp("frozen")}),[S("div",p({class:n.cx("bodyCellContent")},o.getColumnPT("bodyCellContent")),[o.columnProp("expander")?Ge((d(),h("button",p({key:0,type:"button",class:n.cx("nodeToggleButton"),onClick:e[0]||(e[0]=function(){return o.toggle&&o.toggle.apply(o,arguments)}),style:o.togglerStyle,tabindex:"-1"},o.getColumnPT("nodeToggleButton"),{"data-pc-group-section":"rowactionbutton"}),[t.node.loading&&t.loadingMode==="icon"?(d(),h(k,{key:0},[t.templates.nodetoggleicon?(d(),m(C(t.templates.nodetoggleicon),{key:0})):f("",!0),t.templates.nodetogglericon?(d(),m(C(t.templates.nodetogglericon),{key:1})):(d(),m(c,p({key:2,spin:""},n.ptm("nodetoggleicon")),null,16))],64)):(d(),h(k,{key:1},[t.column.children&&t.column.children.rowtoggleicon?(d(),m(C(t.column.children.rowtoggleicon),{key:0,node:t.node,expanded:t.expanded,class:g(n.cx("nodeToggleIcon"))},null,8,["node","expanded","class"])):f("",!0),t.column.children&&t.column.children.rowtogglericon?(d(),m(C(t.column.children.rowtogglericon),{key:1,node:t.node,expanded:t.expanded,class:g(n.cx("nodeToggleIcon"))},null,8,["node","expanded","class"])):t.expanded?(d(),m(C(t.node.expandedIcon?"span":"ChevronDownIcon"),p({key:2,class:n.cx("nodeToggleIcon")},o.getColumnPT("nodeToggleIcon")),null,16,["class"])):(d(),m(C(t.node.collapsedIcon?"span":"ChevronRightIcon"),p({key:3,class:n.cx("nodeToggleIcon")},o.getColumnPT("nodeToggleIcon")),null,16,["class"]))],64))],16)),[[s]]):f("",!0),o.checkboxSelectionMode&&o.columnProp("expander")?(d(),m(i,{key:1,modelValue:t.checked,binary:!0,class:g(n.cx("pcNodeCheckbox")),disabled:t.node.selectable===!1,onChange:o.toggleCheckbox,tabindex:-1,indeterminate:t.partialChecked,unstyled:n.unstyled,pt:o.getColumnCheckboxPT("pcNodeCheckbox"),"data-p-partialchecked":t.partialChecked},{icon:y(function(u){return[t.templates.checkboxicon?(d(),m(C(t.templates.checkboxicon),{key:0,checked:u.checked,partialChecked:t.partialChecked,class:g(u.class)},null,8,["checked","partialChecked","class"])):f("",!0)]}),_:1},8,["modelValue","class","disabled","onChange","indeterminate","unstyled","pt","data-p-partialchecked"])):f("",!0),t.column.children&&t.column.children.body?(d(),m(C(t.column.children.body),{key:2,node:t.node,column:t.column},null,8,["node","column"])):(d(),h(k,{key:3},[Me(ee(o.resolveFieldData(t.node.data,o.columnProp("field"))),1)],64))],16)],16,Mt)}je.render=Tt;function D(n){"@babel/helpers - typeof";return D=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(n)}function X(n,e){var t=typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(!t){if(Array.isArray(n)||(t=Ee(n))||e){t&&(n=t);var r=0,l=function(){};return{s:l,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(u){throw u},f:l}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,c=!0,i=!1;return{s:function(){t=t.call(n)},n:function(){var u=t.next();return c=u.done,u},e:function(u){i=!0,o=u},f:function(){try{c||t.return==null||t.return()}finally{if(i)throw o}}}}function ve(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(l){return Object.getOwnPropertyDescriptor(n,l).enumerable})),t.push.apply(t,r)}return t}function q(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?ve(Object(t),!0).forEach(function(r){Ot(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):ve(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}function Ot(n,e,t){return(e=Kt(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function Kt(n){var e=jt(n,"string");return D(e)=="symbol"?e:e+""}function jt(n,e){if(D(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var r=t.call(n,e||"default");if(D(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function Se(n){return It(n)||Rt(n)||Ee(n)||Et()}function Et(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ee(n,e){if(n){if(typeof n=="string")return J(n,e);var t={}.toString.call(n).slice(8,-1);return t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set"?Array.from(n):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?J(n,e):void 0}}function Rt(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function It(n){if(Array.isArray(n))return J(n)}function J(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,r=Array(e);t<e;t++)r[t]=n[t];return r}var Re={name:"TreeTableRow",hostName:"TreeTable",extends:H,emits:["node-click","node-toggle","checkbox-change","nodeClick","nodeToggle","checkboxChange","row-rightclick","rowRightclick"],props:{node:{type:null,default:null},dataKey:{type:[String,Function],default:"key"},parentNode:{type:null,default:null},columns:{type:null,default:null},expandedKeys:{type:null,default:null},selectionKeys:{type:null,default:null},selectionMode:{type:String,default:null},level:{type:Number,default:0},indentation:{type:Number,default:1},tabindex:{type:Number,default:-1},ariaSetSize:{type:Number,default:null},ariaPosInset:{type:Number,default:null},loadingMode:{type:String,default:"mask"},templates:{type:Object,default:null},contextMenu:{type:Boolean,default:!1},contextMenuSelection:{type:Object,default:null}},nodeTouched:!1,methods:{columnProp:function(e,t){return B(e,t)},toggle:function(){this.$emit("node-toggle",this.node)},onClick:function(e){se(e.target)||w(e.target,"data-pc-section")==="nodetogglebutton"||w(e.target,"data-pc-section")==="nodetoggleicon"||e.target.tagName==="path"||(this.setTabIndexForSelectionMode(e,this.nodeTouched),this.$emit("node-click",{originalEvent:e,nodeTouched:this.nodeTouched,node:this.node}),this.nodeTouched=!1)},onRowRightClick:function(e){this.$emit("row-rightclick",{originalEvent:e,node:this.node})},onTouchEnd:function(){this.nodeTouched=!0},nodeKey:function(e){return M(e,this.dataKey)},onKeyDown:function(e,t){switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Enter":case"NumpadEnter":case"Space":se(e.target)||this.onEnterKey(e,t);break;case"Tab":this.onTabKey(e);break}},onArrowDownKey:function(e){var t=e.currentTarget.nextElementSibling;t&&this.focusRowChange(e.currentTarget,t),e.preventDefault()},onArrowUpKey:function(e){var t=e.currentTarget.previousElementSibling;t&&this.focusRowChange(e.currentTarget,t),e.preventDefault()},onArrowRightKey:function(e){var t=this,r=E(e.currentTarget,"button").style.visibility==="hidden",l=E(this.$refs.node,'[data-pc-section="nodetogglebutton"]');r||(!this.expanded&&l.click(),this.$nextTick(function(){t.onArrowDownKey(e)}),e.preventDefault())},onArrowLeftKey:function(e){if(!(this.level===0&&!this.expanded)){var t=e.currentTarget,r=E(t,"button").style.visibility==="hidden",l=E(t,'[data-pc-section="nodetogglebutton"]');if(this.expanded&&!r){l.click();return}var o=this.findBeforeClickableNode(t);o&&this.focusRowChange(t,o)}},onHomeKey:function(e){var t=E(e.currentTarget.parentElement,'tr[aria-level="'.concat(this.level+1,'"]'));t&&_(t),e.preventDefault()},onEndKey:function(e){var t=V(e.currentTarget.parentElement,'tr[aria-level="'.concat(this.level+1,'"]')),r=t[t.length-1];_(r),e.preventDefault()},onEnterKey:function(e){if(e.preventDefault(),this.setTabIndexForSelectionMode(e,this.nodeTouched),this.selectionMode==="checkbox"){this.toggleCheckbox();return}this.$emit("node-click",{originalEvent:e,nodeTouched:this.nodeTouched,node:this.node}),this.nodeTouched=!1},onTabKey:function(){var e=Se(V(this.$refs.node.parentElement,"tr")),t=e.some(function(l){return w(l,"data-p-selected")||l.getAttribute("aria-checked")==="true"});if(e.forEach(function(l){l.tabIndex=-1}),t){var r=e.filter(function(l){return w(l,"data-p-selected")||l.getAttribute("aria-checked")==="true"});r[0].tabIndex=0;return}e[0].tabIndex=0},focusRowChange:function(e,t){e.tabIndex="-1",t.tabIndex="0",_(t)},findBeforeClickableNode:function(e){var t=e.previousElementSibling;if(t){var r=t.querySelector("button");return r&&r.style.visibility!=="hidden"?t:this.findBeforeClickableNode(t)}return null},toggleCheckbox:function(){var e=this.selectionKeys?q({},this.selectionKeys):{},t=!this.checked;this.propagateDown(this.node,t,e),this.$emit("checkbox-change",{node:this.node,check:t,selectionKeys:e})},propagateDown:function(e,t,r){if(t?r[this.nodeKey(e)]={checked:!0,partialChecked:!1}:delete r[this.nodeKey(e)],e.children&&e.children.length){var l=X(e.children),o;try{for(l.s();!(o=l.n()).done;){var c=o.value;this.propagateDown(c,t,r)}}catch(i){l.e(i)}finally{l.f()}}},propagateUp:function(e){var t=e.check,r=q({},e.selectionKeys),l=0,o=!1,c=X(this.node.children),i;try{for(c.s();!(i=c.n()).done;){var s=i.value;r[this.nodeKey(s)]&&r[this.nodeKey(s)].checked?l++:r[this.nodeKey(s)]&&r[this.nodeKey(s)].partialChecked&&(o=!0)}}catch(u){c.e(u)}finally{c.f()}t&&l===this.node.children.length?r[this.nodeKey(this.node)]={checked:!0,partialChecked:!1}:(t||delete r[this.nodeKey(this.node)],o||l>0&&l!==this.node.children.length?r[this.nodeKey(this.node)]={checked:!1,partialChecked:!0}:r[this.nodeKey(this.node)]={checked:!1,partialChecked:!1}),this.$emit("checkbox-change",{node:e.node,check:e.check,selectionKeys:r})},onCheckboxChange:function(e){var t=e.check,r=q({},e.selectionKeys),l=0,o=!1,c=X(this.node.children),i;try{for(c.s();!(i=c.n()).done;){var s=i.value;r[this.nodeKey(s)]&&r[this.nodeKey(s)].checked?l++:r[this.nodeKey(s)]&&r[this.nodeKey(s)].partialChecked&&(o=!0)}}catch(u){c.e(u)}finally{c.f()}t&&l===this.node.children.length?r[this.nodeKey(this.node)]={checked:!0,partialChecked:!1}:(t||delete r[this.nodeKey(this.node)],o||l>0&&l!==this.node.children.length?r[this.nodeKey(this.node)]={checked:!1,partialChecked:!0}:r[this.nodeKey(this.node)]={checked:!1,partialChecked:!1}),this.$emit("checkbox-change",{node:e.node,check:e.check,selectionKeys:r})},setTabIndexForSelectionMode:function(e,t){if(this.selectionMode!==null){var r=Se(V(this.$refs.node.parentElement,"tr"));e.currentTarget.tabIndex=t===!1?-1:0,r.every(function(l){return l.tabIndex===-1})&&(r[0].tabIndex=0)}}},computed:{containerClass:function(){return[this.node.styleClass,this.cx("row")]},expanded:function(){return this.expandedKeys&&this.expandedKeys[this.nodeKey(this.node)]===!0},leaf:function(){return this.node.leaf===!1?!1:!(this.node.children&&this.node.children.length)},selected:function(){return this.selectionMode&&this.selectionKeys?this.selectionKeys[this.nodeKey(this.node)]===!0:!1},isSelectedWithContextMenu:function(){return this.node&&this.contextMenuSelection?Xe(this.node,this.contextMenuSelection,this.dataKey):!1},checked:function(){return this.selectionKeys?this.selectionKeys[this.nodeKey(this.node)]&&this.selectionKeys[this.nodeKey(this.node)].checked:!1},partialChecked:function(){return this.selectionKeys?this.selectionKeys[this.nodeKey(this.node)]&&this.selectionKeys[this.nodeKey(this.node)].partialChecked:!1},getAriaSelected:function(){return this.selectionMode==="single"||this.selectionMode==="multiple"?this.selected:null},ptmOptions:function(){return{context:{selectable:this.$parentInstance.rowHover||this.$parentInstance.rowSelectionMode,selected:this.selected,scrollable:this.$parentInstance.scrollable}}}},components:{TTBodyCell:je}},Ft=["tabindex","aria-expanded","aria-level","aria-setsize","aria-posinset","aria-selected","aria-checked","data-p-selected","data-p-selected-contextmenu"];function At(n,e,t,r,l,o){var c=x("TTBodyCell"),i=x("TreeTableRow",!0);return d(),h(k,null,[S("tr",p({ref:"node",class:o.containerClass,style:t.node.style,tabindex:t.tabindex,role:"row","aria-expanded":t.node.children&&t.node.children.length?o.expanded:void 0,"aria-level":t.level+1,"aria-setsize":t.ariaSetSize,"aria-posinset":t.ariaPosInset,"aria-selected":o.getAriaSelected,"aria-checked":o.checked||void 0,onClick:e[1]||(e[1]=function(){return o.onClick&&o.onClick.apply(o,arguments)}),onKeydown:e[2]||(e[2]=function(){return o.onKeyDown&&o.onKeyDown.apply(o,arguments)}),onTouchend:e[3]||(e[3]=function(){return o.onTouchEnd&&o.onTouchEnd.apply(o,arguments)}),onContextmenu:e[4]||(e[4]=function(){return o.onRowRightClick&&o.onRowRightClick.apply(o,arguments)})},n.ptm("row",o.ptmOptions),{"data-p-selected":o.selected,"data-p-selected-contextmenu":t.contextMenuSelection&&o.isSelectedWithContextMenu}),[(d(!0),h(k,null,K(t.columns,function(s,u){return d(),h(k,{key:o.columnProp(s,"columnKey")||o.columnProp(s,"field")||u},[o.columnProp(s,"hidden")?f("",!0):(d(),m(c,{key:0,column:s,node:t.node,level:t.level,leaf:o.leaf,indentation:t.indentation,expanded:o.expanded,selectionMode:t.selectionMode,checked:o.checked,partialChecked:o.partialChecked,templates:t.templates,onNodeToggle:e[0]||(e[0]=function(a){return n.$emit("node-toggle",a)}),onCheckboxToggle:o.toggleCheckbox,index:u,loadingMode:t.loadingMode,unstyled:n.unstyled,pt:n.pt},null,8,["column","node","level","leaf","indentation","expanded","selectionMode","checked","partialChecked","templates","onCheckboxToggle","index","loadingMode","unstyled","pt"]))],64)}),128))],16,Ft),o.expanded&&t.node.children&&t.node.children.length?(d(!0),h(k,{key:0},K(t.node.children,function(s){return d(),m(i,{key:o.nodeKey(s),dataKey:t.dataKey,columns:t.columns,node:s,parentNode:t.node,level:t.level+1,expandedKeys:t.expandedKeys,selectionMode:t.selectionMode,selectionKeys:t.selectionKeys,contextMenu:t.contextMenu,contextMenuSelection:t.contextMenuSelection,indentation:t.indentation,ariaPosInset:t.node.children.indexOf(s)+1,ariaSetSize:t.node.children.length,templates:t.templates,onNodeToggle:e[5]||(e[5]=function(u){return n.$emit("node-toggle",u)}),onNodeClick:e[6]||(e[6]=function(u){return n.$emit("node-click",u)}),onRowRightclick:e[7]||(e[7]=function(u){return n.$emit("row-rightclick",u)}),onCheckboxChange:o.onCheckboxChange,unstyled:n.unstyled,pt:n.pt},null,8,["dataKey","columns","node","parentNode","level","expandedKeys","selectionMode","selectionKeys","contextMenu","contextMenuSelection","indentation","ariaPosInset","ariaSetSize","templates","onCheckboxChange","unstyled","pt"])}),128)):f("",!0)],64)}Re.render=At;function L(n){"@babel/helpers - typeof";return L=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(n)}function U(n,e){var t=typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(!t){if(Array.isArray(n)||(t=Ie(n))||e){t&&(n=t);var r=0,l=function(){};return{s:l,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(u){throw u},f:l}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,c=!0,i=!1;return{s:function(){t=t.call(n)},n:function(){var u=t.next();return c=u.done,u},e:function(u){i=!0,o=u},f:function(){try{c||t.return==null||t.return()}finally{if(i)throw o}}}}function ke(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(l){return Object.getOwnPropertyDescriptor(n,l).enumerable})),t.push.apply(t,r)}return t}function z(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?ke(Object(t),!0).forEach(function(r){Dt(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):ke(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}function Dt(n,e,t){return(e=Lt(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function Lt(n){var e=Nt(n,"string");return L(e)=="symbol"?e:e+""}function Nt(n,e){if(L(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var r=t.call(n,e||"default");if(L(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function R(n){return $t(n)||Ht(n)||Ie(n)||Bt()}function Bt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ie(n,e){if(n){if(typeof n=="string")return Q(n,e);var t={}.toString.call(n).slice(8,-1);return t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set"?Array.from(n):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Q(n,e):void 0}}function Ht(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function $t(n){if(Array.isArray(n))return Q(n)}function Q(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,r=Array(e);t<e;t++)r[t]=n[t];return r}var Fe={name:"TreeTable",extends:ht,inheritAttrs:!1,emits:["node-expand","node-collapse","update:expandedKeys","update:selectionKeys","node-select","node-unselect","update:first","update:rows","page","update:sortField","update:sortOrder","update:multiSortMeta","sort","filter","column-resize-end","update:contextMenuSelection","row-contextmenu"],provide:function(){return{$columns:this.d_columns}},data:function(){return{d_expandedKeys:this.expandedKeys||{},d_first:this.first,d_rows:this.rows,d_sortField:this.sortField,d_sortOrder:this.sortOrder,d_multiSortMeta:this.multiSortMeta?R(this.multiSortMeta):[],hasASelectedNode:!1,d_columns:new Qe({type:"Column"})}},documentColumnResizeListener:null,documentColumnResizeEndListener:null,lastResizeHelperX:null,resizeColumnElement:null,watch:{expandedKeys:function(e){this.d_expandedKeys=e},first:function(e){this.d_first=e},rows:function(e){this.d_rows=e},sortField:function(e){this.d_sortField=e},sortOrder:function(e){this.d_sortOrder=e},multiSortMeta:function(e){this.d_multiSortMeta=e}},beforeUnmount:function(){this.destroyStyleElement(),this.d_columns.clear()},methods:{columnProp:function(e,t){return B(e,t)},ptHeaderCellOptions:function(e){return{context:{frozen:this.columnProp(e,"frozen")}}},onNodeToggle:function(e){var t=this.nodeKey(e);this.d_expandedKeys[t]?(delete this.d_expandedKeys[t],this.$emit("node-collapse",e)):(this.d_expandedKeys[t]=!0,this.$emit("node-expand",e)),this.d_expandedKeys=z({},this.d_expandedKeys),this.$emit("update:expandedKeys",this.d_expandedKeys)},onNodeClick:function(e){if(this.rowSelectionMode&&e.node.selectable!==!1){var t=e.nodeTouched?!1:this.metaKeySelection,r=t?this.handleSelectionWithMetaKey(e):this.handleSelectionWithoutMetaKey(e);this.$emit("update:selectionKeys",r)}},nodeKey:function(e){return M(e,this.dataKey)},handleSelectionWithMetaKey:function(e){var t=e.originalEvent,r=e.node,l=this.nodeKey(r),o=t.metaKey||t.ctrlKey,c=this.isNodeSelected(r),i;return c&&o?(this.isSingleSelectionMode()?i={}:(i=z({},this.selectionKeys),delete i[l]),this.$emit("node-unselect",r)):(this.isSingleSelectionMode()?i={}:this.isMultipleSelectionMode()&&(i=o?this.selectionKeys?z({},this.selectionKeys):{}:{}),i[l]=!0,this.$emit("node-select",r)),i},handleSelectionWithoutMetaKey:function(e){var t=e.node,r=this.nodeKey(t),l=this.isNodeSelected(t),o;return this.isSingleSelectionMode()?l?(o={},this.$emit("node-unselect",t)):(o={},o[r]=!0,this.$emit("node-select",t)):l?(o=z({},this.selectionKeys),delete o[r],this.$emit("node-unselect",t)):(o=this.selectionKeys?z({},this.selectionKeys):{},o[r]=!0,this.$emit("node-select",t)),o},onCheckboxChange:function(e){this.$emit("update:selectionKeys",e.selectionKeys),e.check?this.$emit("node-select",e.node):this.$emit("node-unselect",e.node)},onRowRightClick:function(e){this.contextMenu&&(re(),e.originalEvent.target.focus()),this.$emit("update:contextMenuSelection",e.node),this.$emit("row-contextmenu",e)},isSingleSelectionMode:function(){return this.selectionMode==="single"},isMultipleSelectionMode:function(){return this.selectionMode==="multiple"},onPage:function(e){this.d_first=e.first,this.d_rows=e.rows;var t=this.createLazyLoadEvent(e);t.pageCount=e.pageCount,t.page=e.page,this.d_expandedKeys={},this.$emit("update:expandedKeys",this.d_expandedKeys),this.$emit("update:first",this.d_first),this.$emit("update:rows",this.d_rows),this.$emit("page",t)},resetPage:function(){this.d_first=0,this.$emit("update:first",this.d_first)},getFilterColumnHeaderClass:function(e){return[this.cx("headerCell",{column:e}),this.columnProp(e,"filterHeaderClass")]},onColumnHeaderClick:function(e){var t=e.originalEvent,r=e.column;if(this.columnProp(r,"sortable")){var l=t.target,o=this.columnProp(r,"sortField")||this.columnProp(r,"field");if(w(l,"data-p-sortable-column")===!0||w(l,"data-pc-section")==="columntitle"||w(l,"data-pc-section")==="columnheadercontent"||w(l,"data-pc-section")==="sorticon"||w(l.parentElement,"data-pc-section")==="sorticon"||w(l.parentElement.parentElement,"data-pc-section")==="sorticon"||l.closest('[data-p-sortable-column="true"]')){if(re(),this.sortMode==="single")this.d_sortField===o?this.removableSort&&this.d_sortOrder*-1===this.defaultSortOrder?(this.d_sortOrder=null,this.d_sortField=null):this.d_sortOrder=this.d_sortOrder*-1:(this.d_sortOrder=this.defaultSortOrder,this.d_sortField=o),this.$emit("update:sortField",this.d_sortField),this.$emit("update:sortOrder",this.d_sortOrder),this.resetPage();else if(this.sortMode==="multiple"){var c=t.metaKey||t.ctrlKey;c||(this.d_multiSortMeta=this.d_multiSortMeta.filter(function(i){return i.field===o})),this.addMultiSortField(o),this.$emit("update:multiSortMeta",this.d_multiSortMeta)}this.$emit("sort",this.createLazyLoadEvent(t))}}},addMultiSortField:function(e){var t=this.d_multiSortMeta.findIndex(function(r){return r.field===e});t>=0?this.removableSort&&this.d_multiSortMeta[t].order*-1===this.defaultSortOrder?this.d_multiSortMeta.splice(t,1):this.d_multiSortMeta[t]={field:e,order:this.d_multiSortMeta[t].order*-1}:this.d_multiSortMeta.push({field:e,order:this.defaultSortOrder}),this.d_multiSortMeta=R(this.d_multiSortMeta)},sortSingle:function(e){return this.sortNodesSingle(e)},sortNodesSingle:function(e){var t=this,r=R(e),l=oe();return r.sort(function(o,c){var i=M(o.data,t.d_sortField),s=M(c.data,t.d_sortField);return le(i,s,t.d_sortOrder,l)}),r},sortMultiple:function(e){return this.sortNodesMultiple(e)},sortNodesMultiple:function(e){var t=this,r=R(e);return r.sort(function(l,o){return t.multisortField(l,o,0)}),r},multisortField:function(e,t,r){var l=M(e.data,this.d_multiSortMeta[r].field),o=M(t.data,this.d_multiSortMeta[r].field),c=oe();return l===o?this.d_multiSortMeta.length-1>r?this.multisortField(e,t,r+1):0:le(l,o,this.d_multiSortMeta[r].order,c)},filter:function(e){var t=[],r=this.filterMode==="strict",l=U(e),o;try{for(l.s();!(o=l.n()).done;){for(var c=o.value,i=z({},c),s=!0,u=!1,a=0;a<this.columns.length;a++){var v=this.columns[a],P=this.columnProp(v,"filterField")||this.columnProp(v,"field");if(Object.prototype.hasOwnProperty.call(this.filters,P)){var Ae=this.columnProp(v,"filterMatchMode")||"startsWith",De=this.filters[P],Le=ae.filters[Ae],$={filterField:P,filterValue:De,filterConstraint:Le,strict:r};if((r&&!(this.findFilteredNodes(i,$)||this.isFilterMatched(i,$))||!r&&!(this.isFilterMatched(i,$)||this.findFilteredNodes(i,$)))&&(s=!1),!s)break}if(this.hasGlobalFilter()&&!u){var j=z({},i),Ne=this.filters.global,Be=ae.filters.contains,W={filterField:P,filterValue:Ne,filterConstraint:Be,strict:r};(r&&(this.findFilteredNodes(j,W)||this.isFilterMatched(j,W))||!r&&(this.isFilterMatched(j,W)||this.findFilteredNodes(j,W)))&&(u=!0,i=j)}}var te=s;this.hasGlobalFilter()&&(te=s&&u),te&&t.push(i)}}catch(He){l.e(He)}finally{l.f()}var ne=this.createLazyLoadEvent(event);return ne.filteredValue=t,this.$emit("filter",ne),t},findFilteredNodes:function(e,t){if(e){var r=!1;if(e.children){var l=R(e.children);e.children=[];var o=U(l),c;try{for(o.s();!(c=o.n()).done;){var i=c.value,s=z({},i);this.isFilterMatched(s,t)&&(r=!0,e.children.push(s))}}catch(u){o.e(u)}finally{o.f()}}if(r)return!0}},isFilterMatched:function(e,t){var r=t.filterField,l=t.filterValue,o=t.filterConstraint,c=t.strict,i=!1,s=M(e.data,r);return o(s,l,this.filterLocale)&&(i=!0),(!i||c&&!this.isNodeLeaf(e))&&(i=this.findFilteredNodes(e,{filterField:r,filterValue:l,filterConstraint:o,strict:c})||i),i},isNodeSelected:function(e){return this.selectionMode&&this.selectionKeys?this.selectionKeys[this.nodeKey(e)]===!0:!1},isNodeLeaf:function(e){return e.leaf===!1?!1:!(e.children&&e.children.length)},createLazyLoadEvent:function(e){var t=this,r;return this.hasFilters()&&(r={},this.columns.forEach(function(l){t.columnProp(l,"field")&&(r[l.props.field]=t.columnProp(l,"filterMatchMode"))})),{originalEvent:e,first:this.d_first,rows:this.d_rows,sortField:this.d_sortField,sortOrder:this.d_sortOrder,multiSortMeta:this.d_multiSortMeta,filters:this.filters,filterMatchModes:r}},onColumnResizeStart:function(e){var t=ie(this.$el).left;this.resizeColumnElement=e.target.parentElement,this.columnResizing=!0,this.lastResizeHelperX=e.pageX-t+this.$el.scrollLeft,this.bindColumnResizeEvents()},onColumnResize:function(e){var t=ie(this.$el).left;this.$el.setAttribute("data-p-unselectable-text","true"),!this.isUnstyled&&We(this.$el,{"user-select":"none"}),this.$refs.resizeHelper.style.height=this.$el.offsetHeight+"px",this.$refs.resizeHelper.style.top="0px",this.$refs.resizeHelper.style.left=e.pageX-t+this.$el.scrollLeft+"px",this.$refs.resizeHelper.style.display="block"},onColumnResizeEnd:function(){var e=Ue(this.$el)?this.lastResizeHelperX-this.$refs.resizeHelper.offsetLeft:this.$refs.resizeHelper.offsetLeft-this.lastResizeHelperX,t=this.resizeColumnElement.offsetWidth,r=t+e,l=this.resizeColumnElement.style.minWidth||15;if(t+e>parseInt(l,10)){if(this.columnResizeMode==="fit"){var o=this.resizeColumnElement.nextElementSibling,c=o.offsetWidth-e;r>15&&c>15&&this.resizeTableCells(r,c)}else if(this.columnResizeMode==="expand"){var i=this.$refs.table.offsetWidth+e+"px",s=function(a){a&&(a.style.width=a.style.minWidth=i)};this.resizeTableCells(r),s(this.$refs.table)}this.$emit("column-resize-end",{element:this.resizeColumnElement,delta:e})}this.$refs.resizeHelper.style.display="none",this.resizeColumn=null,this.$el.removeAttribute("data-p-unselectable-text"),!this.isUnstyled&&(this.$el.style["user-select"]=""),this.unbindColumnResizeEvents()},resizeTableCells:function(e,t){var r=xe(this.resizeColumnElement),l=[],o=V(this.$refs.table,'thead[data-pc-section="thead"] > tr > th');o.forEach(function(s){return l.push(T(s))}),this.destroyStyleElement(),this.createStyleElement();var c="",i='[data-pc-name="treetable"]['.concat(this.$attrSelector,'] > [data-pc-section="tablecontainer"] > table[data-pc-section="table"]');l.forEach(function(s,u){var a=u===r?e:t&&u===r+1?t:s,v="width: ".concat(a,"px !important; max-width: ").concat(a,"px !important");c+=`
                    `.concat(i,' > thead[data-pc-section="thead"] > tr > th:nth-child(').concat(u+1,`),
                    `).concat(i,' > tbody[data-pc-section="tbody"] > tr > td:nth-child(').concat(u+1,`),
                    `).concat(i,' > tfoot[data-pc-section="tfoot"] > tr > td:nth-child(').concat(u+1,`) {
                        `).concat(v,`
                    }
                `)}),this.styleElement.innerHTML=c},bindColumnResizeEvents:function(){var e=this;this.documentColumnResizeListener||(this.documentColumnResizeListener=document.addEventListener("mousemove",function(t){e.columnResizing&&e.onColumnResize(t)})),this.documentColumnResizeEndListener||(this.documentColumnResizeEndListener=document.addEventListener("mouseup",function(){e.columnResizing&&(e.columnResizing=!1,e.onColumnResizeEnd())}))},unbindColumnResizeEvents:function(){this.documentColumnResizeListener&&(document.removeEventListener("document",this.documentColumnResizeListener),this.documentColumnResizeListener=null),this.documentColumnResizeEndListener&&(document.removeEventListener("document",this.documentColumnResizeEndListener),this.documentColumnResizeEndListener=null)},onColumnKeyDown:function(e,t){(e.code==="Enter"||e.code==="NumpadEnter")&&e.currentTarget.nodeName==="TH"&&w(e.currentTarget,"data-p-sortable-column")&&this.onColumnHeaderClick(e,t)},hasColumnFilter:function(){if(this.columns){var e=U(this.columns),t;try{for(e.s();!(t=e.n()).done;){var r=t.value;if(r.children&&r.children.filter)return!0}}catch(l){e.e(l)}finally{e.f()}}return!1},hasFilters:function(){return this.filters&&Object.keys(this.filters).length>0&&this.filters.constructor===Object},hasGlobalFilter:function(){return this.filters&&Object.prototype.hasOwnProperty.call(this.filters,"global")},getItemLabel:function(e){return e.data.name},createStyleElement:function(){var e;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",Ve(this.styleElement,"nonce",(e=this.$primevue)===null||e===void 0||(e=e.config)===null||e===void 0||(e=e.csp)===null||e===void 0?void 0:e.nonce),document.head.appendChild(this.styleElement)},destroyStyleElement:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},setTabindex:function(e,t){if(this.isNodeSelected(e))return this.hasASelectedNode=!0,0;if(this.selectionMode){if(!this.isNodeSelected(e)&&t===0&&!this.hasASelectedNode)return 0}else if(!this.selectionMode&&t===0)return 0;return-1}},computed:{columns:function(){return this.d_columns.get(this)},processedData:function(){if(this.lazy)return this.value;if(this.value&&this.value.length){var e=this.value;return this.sorted&&(this.sortMode==="single"?e=this.sortSingle(e):this.sortMode==="multiple"&&(e=this.sortMultiple(e))),this.hasFilters()&&(e=this.filter(e)),e}else return null},dataToRender:function(){var e=this.processedData;if(this.paginator){var t=this.lazy?0:this.d_first;return e.slice(t,t+this.d_rows)}else return e},empty:function(){var e=this.processedData;return!e||e.length===0},sorted:function(){return this.d_sortField||this.d_multiSortMeta&&this.d_multiSortMeta.length>0},hasFooter:function(){var e=!1,t=U(this.columns),r;try{for(t.s();!(r=t.n()).done;){var l=r.value;if(this.columnProp(l,"footer")||l.children&&l.children.footer){e=!0;break}}}catch(o){t.e(o)}finally{t.f()}return e},paginatorTop:function(){return this.paginator&&(this.paginatorPosition!=="bottom"||this.paginatorPosition==="both")},paginatorBottom:function(){return this.paginator&&(this.paginatorPosition!=="top"||this.paginatorPosition==="both")},singleSelectionMode:function(){return this.selectionMode&&this.selectionMode==="single"},multipleSelectionMode:function(){return this.selectionMode&&this.selectionMode==="multiple"},rowSelectionMode:function(){return this.singleSelectionMode||this.multipleSelectionMode},totalRecordsLength:function(){if(this.lazy)return this.totalRecords;var e=this.processedData;return e?e.length:0}},components:{TTRow:Re,TTPaginator:Ye,TTHeaderCell:Ke,TTFooterCell:Oe,SpinnerIcon:Te}};function N(n){"@babel/helpers - typeof";return N=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},N(n)}function Ce(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(l){return Object.getOwnPropertyDescriptor(n,l).enumerable})),t.push.apply(t,r)}return t}function we(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Ce(Object(t),!0).forEach(function(r){Wt(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):Ce(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}function Wt(n,e,t){return(e=Ut(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function Ut(n){var e=Vt(n,"string");return N(e)=="symbol"?e:e+""}function Vt(n,e){if(N(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var r=t.call(n,e||"default");if(N(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}var _t=["colspan"];function Gt(n,e,t,r,l,o){var c=x("TTPaginator"),i=x("TTHeaderCell"),s=x("TTRow"),u=x("TTFooterCell");return d(),h("div",p({class:n.cx("root"),"data-scrollselectors":".p-treetable-scrollable-body"},n.ptmi("root")),[b(n.$slots,"default"),n.loading&&n.loadingMode==="mask"?(d(),h("div",p({key:0,class:n.cx("loading")},n.ptm("loading")),[S("div",p({class:n.cx("mask")},n.ptm("mask")),[b(n.$slots,"loadingicon",{class:g(n.cx("loadingIcon"))},function(){return[(d(),m(C(n.loadingIcon?"span":"SpinnerIcon"),p({spin:"",class:[n.cx("loadingIcon"),n.loadingIcon]},n.ptm("loadingIcon")),null,16,["class"]))]})],16)],16)):f("",!0),n.$slots.header?(d(),h("div",p({key:1,class:n.cx("header")},n.ptm("header")),[b(n.$slots,"header")],16)):f("",!0),o.paginatorTop?(d(),m(c,{key:2,rows:l.d_rows,first:l.d_first,totalRecords:o.totalRecordsLength,pageLinkSize:n.pageLinkSize,template:n.paginatorTemplate,rowsPerPageOptions:n.rowsPerPageOptions,currentPageReportTemplate:n.currentPageReportTemplate,class:g(n.cx("pcPaginator",{position:"top"})),onPage:e[0]||(e[0]=function(a){return o.onPage(a)}),alwaysShow:n.alwaysShowPaginator,unstyled:n.unstyled,pt:n.ptm("pcPaginator")},ce({_:2},[n.$slots.paginatorcontainer?{name:"container",fn:y(function(a){return[b(n.$slots,"paginatorcontainer",{first:a.first,last:a.last,rows:a.rows,page:a.page,pageCount:a.pageCount,totalRecords:a.totalRecords,firstPageCallback:a.firstPageCallback,lastPageCallback:a.lastPageCallback,prevPageCallback:a.prevPageCallback,nextPageCallback:a.nextPageCallback,rowChangeCallback:a.rowChangeCallback})]}),key:"0"}:void 0,n.$slots.paginatorstart?{name:"start",fn:y(function(){return[b(n.$slots,"paginatorstart")]}),key:"1"}:void 0,n.$slots.paginatorend?{name:"end",fn:y(function(){return[b(n.$slots,"paginatorend")]}),key:"2"}:void 0,n.$slots.paginatorfirstpagelinkicon?{name:"firstpagelinkicon",fn:y(function(a){return[b(n.$slots,"paginatorfirstpagelinkicon",{class:g(a.class)})]}),key:"3"}:void 0,n.$slots.paginatorprevpagelinkicon?{name:"prevpagelinkicon",fn:y(function(a){return[b(n.$slots,"paginatorprevpagelinkicon",{class:g(a.class)})]}),key:"4"}:void 0,n.$slots.paginatornextpagelinkicon?{name:"nextpagelinkicon",fn:y(function(a){return[b(n.$slots,"paginatornextpagelinkicon",{class:g(a.class)})]}),key:"5"}:void 0,n.$slots.paginatorlastpagelinkicon?{name:"lastpagelinkicon",fn:y(function(a){return[b(n.$slots,"paginatorlastpagelinkicon",{class:g(a.class)})]}),key:"6"}:void 0,n.$slots.paginatorjumptopagedropdownicon?{name:"jumptopagedropdownicon",fn:y(function(a){return[b(n.$slots,"paginatorjumptopagedropdownicon",{class:g(a.class)})]}),key:"7"}:void 0,n.$slots.paginatorrowsperpagedropdownicon?{name:"rowsperpagedropdownicon",fn:y(function(a){return[b(n.$slots,"paginatorrowsperpagedropdownicon",{class:g(a.class)})]}),key:"8"}:void 0]),1032,["rows","first","totalRecords","pageLinkSize","template","rowsPerPageOptions","currentPageReportTemplate","class","alwaysShow","unstyled","pt"])):f("",!0),S("div",p({class:n.cx("tableContainer"),style:[n.sx("tableContainer"),{maxHeight:n.scrollHeight}]},n.ptm("tableContainer")),[S("table",p({ref:"table",role:"table",class:[n.cx("table"),n.tableClass],style:n.tableStyle},we(we({},n.tableProps),n.ptm("table"))),[S("thead",p({class:n.cx("thead"),style:n.sx("thead"),role:"rowgroup"},n.ptm("thead")),[S("tr",p({role:"row"},n.ptm("headerRow")),[(d(!0),h(k,null,K(o.columns,function(a,v){return d(),h(k,{key:o.columnProp(a,"columnKey")||o.columnProp(a,"field")||v},[o.columnProp(a,"hidden")?f("",!0):(d(),m(i,{key:0,column:a,resizableColumns:n.resizableColumns,sortField:l.d_sortField,sortOrder:l.d_sortOrder,multiSortMeta:l.d_multiSortMeta,sortMode:n.sortMode,onColumnClick:e[1]||(e[1]=function(P){return o.onColumnHeaderClick(P)}),onColumnResizestart:e[2]||(e[2]=function(P){return o.onColumnResizeStart(P)}),index:v,unstyled:n.unstyled,pt:n.pt},null,8,["column","resizableColumns","sortField","sortOrder","multiSortMeta","sortMode","index","unstyled","pt"]))],64)}),128))],16),o.hasColumnFilter()?(d(),h("tr",ze(p({key:0},n.ptm("headerRow"))),[(d(!0),h(k,null,K(o.columns,function(a,v){return d(),h(k,{key:o.columnProp(a,"columnKey")||o.columnProp(a,"field")||v},[o.columnProp(a,"hidden")?f("",!0):(d(),h("th",p({key:0,class:o.getFilterColumnHeaderClass(a),style:[o.columnProp(a,"style"),o.columnProp(a,"filterHeaderStyle")],ref_for:!0},n.ptm("headerCell",o.ptHeaderCellOptions(a))),[a.children&&a.children.filter?(d(),m(C(a.children.filter),{key:0,column:a,index:v},null,8,["column","index"])):f("",!0)],16))],64)}),128))],16)):f("",!0)],16),S("tbody",p({class:n.cx("tbody"),role:"rowgroup"},n.ptm("tbody")),[o.empty?(d(),h("tr",p({key:1,class:n.cx("emptyMessage")},n.ptm("emptyMessage")),[S("td",p({colspan:o.columns.length},n.ptm("emptyMessageCell")),[b(n.$slots,"empty")],16,_t)],16)):(d(!0),h(k,{key:0},K(o.dataToRender,function(a,v){return d(),m(s,{key:o.nodeKey(a),dataKey:n.dataKey,columns:o.columns,node:a,level:0,expandedKeys:l.d_expandedKeys,indentation:n.indentation,selectionMode:n.selectionMode,selectionKeys:n.selectionKeys,ariaSetSize:o.dataToRender.length,ariaPosInset:v+1,tabindex:o.setTabindex(a,v),loadingMode:n.loadingMode,contextMenu:n.contextMenu,contextMenuSelection:n.contextMenuSelection,templates:n.$slots,onNodeToggle:o.onNodeToggle,onNodeClick:o.onNodeClick,onCheckboxChange:o.onCheckboxChange,onRowRightclick:e[3]||(e[3]=function(P){return o.onRowRightClick(P)}),unstyled:n.unstyled,pt:n.pt},null,8,["dataKey","columns","node","expandedKeys","indentation","selectionMode","selectionKeys","ariaSetSize","ariaPosInset","tabindex","loadingMode","contextMenu","contextMenuSelection","templates","onNodeToggle","onNodeClick","onCheckboxChange","unstyled","pt"])}),128))],16),o.hasFooter?(d(),h("tfoot",p({key:0,class:n.cx("tfoot"),style:n.sx("tfoot"),role:"rowgroup"},n.ptm("tfoot")),[S("tr",p({role:"row"},n.ptm("footerRow")),[(d(!0),h(k,null,K(o.columns,function(a,v){return d(),h(k,{key:o.columnProp(a,"columnKey")||o.columnProp(a,"field")||v},[o.columnProp(a,"hidden")?f("",!0):(d(),m(u,{key:0,column:a,index:v,unstyled:n.unstyled,pt:n.pt},null,8,["column","index","unstyled","pt"]))],64)}),128))],16)],16)):f("",!0)],16)],16),o.paginatorBottom?(d(),m(c,{key:3,rows:l.d_rows,first:l.d_first,totalRecords:o.totalRecordsLength,pageLinkSize:n.pageLinkSize,template:n.paginatorTemplate,rowsPerPageOptions:n.rowsPerPageOptions,currentPageReportTemplate:n.currentPageReportTemplate,class:g(n.cx("pcPaginator",{position:"bottom"})),onPage:e[4]||(e[4]=function(a){return o.onPage(a)}),alwaysShow:n.alwaysShowPaginator,unstyled:n.unstyled,pt:n.ptm("pcPaginator")},ce({_:2},[n.$slots.paginatorcontainer?{name:"container",fn:y(function(a){return[b(n.$slots,"paginatorcontainer",{first:a.first,last:a.last,rows:a.rows,page:a.page,pageCount:a.pageCount,totalRecords:a.totalRecords,firstPageCallback:a.firstPageCallback,lastPageCallback:a.lastPageCallback,prevPageCallback:a.prevPageCallback,nextPageCallback:a.nextPageCallback,rowChangeCallback:a.rowChangeCallback})]}),key:"0"}:void 0,n.$slots.paginatorstart?{name:"start",fn:y(function(){return[b(n.$slots,"paginatorstart")]}),key:"1"}:void 0,n.$slots.paginatorend?{name:"end",fn:y(function(){return[b(n.$slots,"paginatorend")]}),key:"2"}:void 0,n.$slots.paginatorfirstpagelinkicon?{name:"firstpagelinkicon",fn:y(function(a){return[b(n.$slots,"paginatorfirstpagelinkicon",{class:g(a.class)})]}),key:"3"}:void 0,n.$slots.paginatorprevpagelinkicon?{name:"prevpagelinkicon",fn:y(function(a){return[b(n.$slots,"paginatorprevpagelinkicon",{class:g(a.class)})]}),key:"4"}:void 0,n.$slots.paginatornextpagelinkicon?{name:"nextpagelinkicon",fn:y(function(a){return[b(n.$slots,"paginatornextpagelinkicon",{class:g(a.class)})]}),key:"5"}:void 0,n.$slots.paginatorlastpagelinkicon?{name:"lastpagelinkicon",fn:y(function(a){return[b(n.$slots,"paginatorlastpagelinkicon",{class:g(a.class)})]}),key:"6"}:void 0,n.$slots.paginatorjumptopagedropdownicon?{name:"jumptopagedropdownicon",fn:y(function(a){return[b(n.$slots,"paginatorjumptopagedropdownicon",{class:g(a.class)})]}),key:"7"}:void 0,n.$slots.paginatorrowsperpagedropdownicon?{name:"rowsperpagedropdownicon",fn:y(function(a){return[b(n.$slots,"paginatorrowsperpagedropdownicon",{class:g(a.class)})]}),key:"8"}:void 0]),1032,["rows","first","totalRecords","pageLinkSize","template","rowsPerPageOptions","currentPageReportTemplate","class","alwaysShow","unstyled","pt"])):f("",!0),n.$slots.footer?(d(),h("div",p({key:4,class:n.cx("footer")},n.ptm("footer")),[b(n.$slots,"footer")],16)):f("",!0),S("div",p({ref:"resizeHelper",class:n.cx("columnResizeIndicator"),style:{display:"none"}},n.ptm("columnResizeIndicator")),null,16)],16)}Fe.render=Gt;const Xt="de",Pe={en:{"taxonomy.type.affiliation":"Affiliation","taxonomy.type.accelerator-type":"Affiliation","taxonomy.type.project":"Project","taxonomy.type.accelerator-subsystem":"Accelerator Subsystem","taxonomy.type.accelerator-based-facility-type":"accelerator-based Facility Type","taxonomy.type.accelerating-technique":"Accelerating Technique","taxonomy.type.accelerator-based-facility":"Accelerator-based Facility","taxonomy.type.application":"Application","taxonomy.type.stakeholder":"stakeholder","taxonomy.type.issue":"Strategisches Thema","taxonomy.type.reserach-topic":"Reserach Topic","country.name.DE":"Germany","country.name.CH":"Switzerland","country.name.FR":"France","country.name.SE":"Sweden","country.name.BE":"Belgium"},de:{"taxonomy.type.affiliation":"Affiliation","taxonomy.type.organisation":"Organisation","taxonomy.type.project":"Projekt","taxonomy.type.accelerator-type":"Beschleunigertyp","taxonomy.type.accelerator-subsystem":"Beschleunigerkomponente","taxonomy.type.accelerator-based-facility-type":"beschleunigerbasierter Anlagentyp","taxonomy.type.accelerating-technique":"Beschleunigigungstechnologie","taxonomy.type.accelerator-based-facility":"beschleunigerbasierter Anlage","taxonomy.type.application":"Anwendung","taxonomy.type.issue":"Strategisches Thema","taxonomy.type.reserach-topic":"Forschungsthema","country.name.DE":"Deutschland","country.name.CH":"Schweiz","country.name.FR":"Frankreich","country.name.SE":"Schweden","country.name.BE":"Belgien"}};function qt(n){return function(t){return Pe[n][t]||Pe[Xt][t]}}const Jt=qe({__name:"TaxonomyTree",setup(n,{expose:e}){e();const t=qt("de"),r=G(),l=G({}),o=G([]);Je(async()=>{const u=await fetch("/api/taxonomy-tree.json").then(a=>a.json());r.value=u.tree.children,o.value=u.keys});const s={t,nodes:r,expandedKeys:l,keys:o,expandAll:()=>{l.value=o.value.reduce((u,a)=>(u[a]=!0)&&u,{})},collapseAll:()=>{l.value=null},get TreeTable(){return Fe},get Button(){return ot},get Column(){return st}};return Object.defineProperty(s,"__isScriptSetup",{enumerable:!1,value:!0}),s}}),Qt={class:"card"},Yt={class:"flex flex-wrap flex-row gap-2"};function Zt(n,e,t,r,l,o){return d(),h("div",Qt,[O(r.TreeTable,{value:r.nodes,dataKey:"id",expandedKeys:r.expandedKeys,"onUpdate:expandedKeys":e[0]||(e[0]=c=>r.expandedKeys=c),size:"large",sortField:"data.labelShortFormDe",sortOrder:1},{header:y(()=>[S("div",Yt,[O(r.Button,{icon:"pi pi-plus",label:"Expand All",onClick:r.expandAll}),e[1]||(e[1]=S("br",null,null,-1)),O(r.Button,{icon:"pi pi-minus",label:"Collapse All",onClick:r.collapseAll})])]),default:y(()=>[O(r.Column,{field:"data.labelShortFormDe",sortable:"",expander:"",header:"Label",class:"font-bold",style:{width:"40%"}},{default:y(()=>e[2]||(e[2]=[Me(" >")])),_:1}),O(r.Column,{field:"descendantsCount",sortable:"",header:"#Einträge",style:{width:"10%"}}),O(r.Column,{field:"data.descriptionDe",header:"Beschreibung",style:{width:"50%"}})]),_:1},8,["value","expandedKeys"])])}const on=rt(Jt,[["render",Zt]]);export{on as default};
