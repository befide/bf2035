import { stratify, hierarchy } from "d3"
import { ascending,  } from "d3-array"
import { baseMixin } from "dc"

// const nester = ({ key, sortKeys, sortValues, entries }) => {
//   if (sortValues) {
//     entries = [...entries].sort(sortValues)
//   }
//   let out = groups(entries, key)
//   if (sortKeys) {
//     out = out.sort(sortKeys)
//   }

//   // remap to d3@v5 structure
//   return out.map((e) => ({
//     key: `${e[0]}`, // d3@v5 always returns key as string
//     values: e[1],
//   }))
// }

const tree = (entries) => {
  const roots = entries.filter((d) => !d.parentId)

  const rootedEngtries =
    roots.length === 1
      ? entries
      : entries
          .map((d) => ({
            ...d,
            parentId: d.parentId ? d.parentId : ":",
          }))
          .concat({ id: ":", parentId: null, term: { de: "ROOT", en: "ROOT" } })

  const root = stratify()
    .id((d) => d.id)
    .parentId((d) => d.parentId)(rootedEngtries)

  const tree = hierarchy(root, (d) => d.children).sum((d) => (d.children?.length > 0 ? 0 : 1))

  return tree

  // // Index the nodes by id, in case they come out of order.
  // nodes.forEach(function (d) {
  //   nodeById[d.id] = d
  // })

  // // Lazily compute children.
  // nodes.forEach(function (d) {
  //   if ("manager" in d) {
  //     var manager = nodeById[d.manager]
  //     if (manager.children) manager.children.push(d)
  //     else manager.children = [d]
  //   }
  // })

  return root
}

/**
 * The data table is a simple widget designed to list crossfilter focused data set (rows being
 * filtered) in a good old tabular fashion.
 *
 * An interesting feature of the data table is that you can pass a crossfilter group to the
 * `dimension`, if you want to show aggregated data instead of raw data rows. This requires no
 * special code as long as you specify the {@link dc.dataTable#order order} as ` descending`,
 * since the data table will use `dimension.top()` to fetch the data in that case, and the method is
 * equally supported on the crossfilter group as the crossfilter dimension.
 *
 * If you want to display aggregated data in ascending order, you will need to wrap the group
 * in a [fake dimension](https://github.com/dc-js/dc.js/wiki/FAQ#fake-dimensions) to support the
 * `.bottom()` method. See the example linked below for more details.
 *
 * Note: Formerly the data table (and data grid chart) used the {@link dc.dataTable#group group} attribute as a
 * keying function for {@link https://github.com/d3/d3-collection/blob/master/README.md#nest nesting} the data
 * together in sections.  This was confusing so it has been renamed to `section`, although `group` still works.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/ Nasdaq 100 Index}
 * - {@link http://dc-js.github.io/dc.js/examples/table-on-aggregated-data.html dataTable on a crossfilter group}
 * ({@link https://github.com/dc-js/dc.js/blob/develop/web/examples/table-on-aggregated-data.html source})
 * @class dataTable
 * @memberof dc
 * @mixes dc.baseMixin
 * @param {String|node|d3.selection} parent - Any valid
 * {@link https://github.com/d3/d3-selection/blob/master/README.md#select d3 single selector} specifying
 * a dom block element such as a div; or a dom element or d3 selection.
 * @param {String} [chartGroup] - The name of the chart group this chart instance should be placed in.
 * Interaction with a chart will only trigger events and redraws within the chart's group.
 * @returns {dc.dataTable}
 */
export default function (parent, chartGroup?) {
  const LABEL_CSS_CLASS = "dc-tree-table-label"
  const ROW_CSS_CLASS = "dc-table-row"
  const COLUMN_CSS_CLASS = "dc-table-column"
  const SECTION_CSS_CLASS = "dc-table-section dc-table-group"
  const HEAD_CSS_CLASS = "dc-table-head"

  const _chart = baseMixin({})

  let _size = 25
  let _columns = []
  let _sortBy = function (d) {
    return d
  }
  let _order = ascending
  let _beginSlice = 0
  let _endSlice
  let _showSections = true
  let _section = function () {
    return ""
  } // all in one section
  _chart._mandatoryAttributes(["dimension"])

  _chart._doRender = function () {
    _chart.selectAll("ul").remove()

    renderRoot()

    return _chart
  }

  _chart._doColumnValueFormat = function (v, d) {
    return typeof v === "function"
      ? v(d) // v as function
      : typeof v === "string"
        ? d[v] // v is field name string
        : v.format(d) // v is Object, use fn (element 2)
  }

  _chart._doColumnHeaderFormat = function (d) {
    // if 'function', convert to string representation
    // show a string capitalized
    // if an object then display its label string as-is.
    return typeof d === "function"
      ? _chart._doColumnHeaderFnToString(d)
      : typeof d === "string"
        ? _chart._doColumnHeaderCapitalize(d)
        : String(d.label)
  }

  _chart._doColumnHeaderCapitalize = function (s) {
    // capitalize
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  _chart._doColumnHeaderFnToString = function (f) {
    // columnString(f) {
    let s = String(f)
    const i1 = s.indexOf("return ")
    if (i1 >= 0) {
      const i2 = s.lastIndexOf(";")
      if (i2 >= 0) {
        s = s.substring(i1 + 7, i2)
        const i3 = s.indexOf("numberFormat")
        if (i3 >= 0) {
          s = s.replace("numberFormat", "")
        }
      }
    }
    return s
  }

  function treeEntries() {
    let entries
    if (_order === ascending) {
      entries = _chart.dimension().bottom(_size)
    } else {
      entries = _chart.dimension().top(_size)
    }

    return tree(entries)
  }

  function makeElements(parentDOM, myData) {
    myData.children?.forEach(function (child) {
      //add li element
      //if children then make ul
      const li = parentDOM.append("li")
      li.classed("tree-data-node", true)
      if (child.children?.length > 0) {
        const details = li.append("details")
        details.attr("open", true)

        const summary = details.append("summary")
        summary.classed("node-header", true)
        _chart
          .columns()
          .forEach((column) => {

            summary.append("span").classed(column.className, true).text(column.format(child))
          })
            
         
        // summary.append("span").classed("tree-node__label", true).text(child.data.data.label)
        // // summary.append("span").classed("tree-node__type", true).text(child.data.data.type)
        // summary.append("span").classed("tree-node__height", true).text(child.value)

        const ul = details.append("ul")
        ul.classed("tree-data-list", true)

        //recurse pass ul as parentDOM
        makeElements(ul, child)
      } else {
        const header = li.append("div")
        header.classed("node-header", true)
        _chart.columns().forEach((column) => header.append("span").classed(column.className, true).text(column.format(child)))

        const body = li.append("div")
        body.classed("node-body", true)
        body.text(child.data.data.definition?.en)
      }
    })
  }

  function renderRoot() {
    const rootNodes = _chart
      .root()
      .append("ul") //root ul
      .classed("tree-data-list", true)
      
    // console.log({ children: [treeEntries()] })
    makeElements(rootNodes, treeEntries() )
  }

  _chart._doRedraw = function () {
    return _chart._doRender()
  } /**
   * Get or set the section function for the data table. The section function takes a data row and
   * returns the key to specify to {@link https://github.com/d3/d3-collection/blob/master/README.md#nest d3.nest}
   * to split rows into sections. By default there will be only one section with no name.
   *
   * Set {@link dc.dataTable#showSections showSections} to false to hide the section headers
   *
   * @method section
   * @memberof dc.dataTable
   * @instance
   * @example
   * // section rows by the value of their field
   * chart
   *     .section(function(d) { return d.field; })
   * @param {Function} section Function taking a row of data and returning the nest key.
   * @returns {Function|dc.dataTable}
   */

  _chart.section = function (section) {
    if (!arguments.length) {
      return _section
    }
    _section = section
    return _chart
  } /**
   * Backward-compatible synonym for {@link dc.dataTable#section section}.
   *
   * @method group
   * @memberof dc.dataTable
   * @instance
   * @param {Function} groupFunction Function taking a row of data and returning the nest key.
   * @returns {Function|dc.dataTable}
   */

  _chart.group = _chart.section
  /**
   * Get or set the table size which determines the number of rows displayed by the widget.
   * @method size
   * @memberof dc.dataTable
   * @instance
   * @param {Number} [size=25]
   * @returns {Number|dc.dataTable}
   */

  _chart.size = function (size) {
    if (!arguments.length) {
      return _size
    }
    _size = size
    return _chart
  } /**
       * Get or set the index of the beginning slice which determines which entries get displayed
       * by the widget. Useful when implementing pagination.
       *
       * Note: the sortBy function will determine how the rows are ordered for pagination purposes.
  
       * See the {@link http://dc-js.github.io/dc.js/examples/table-pagination.html table pagination example}
       * to see how to implement the pagination user interface using `beginSlice` and `endSlice`.
       * @method beginSlice
       * @memberof dc.dataTable
       * @instance
       * @param {Number} [beginSlice=0]
       * @returns {Number|dc.dataTable}
       */

  _chart.beginSlice = function (beginSlice) {
    if (!arguments.length) {
      return _beginSlice
    }
    _beginSlice = beginSlice
    return _chart
  } /**
   * Get or set the index of the end slice which determines which entries get displayed by the
   * widget. Useful when implementing pagination. See {@link dc.dataTable#beginSlice `beginSlice`} for more information.
   * @method endSlice
   * @memberof dc.dataTable
   * @instance
   * @param {Number|undefined} [endSlice=undefined]
   * @returns {Number|dc.dataTable}
   */

  _chart.endSlice = function (endSlice) {
    if (!arguments.length) {
      return _endSlice
    }
    _endSlice = endSlice
    return _chart
  } /**
   * Get or set column functions. The data table widget supports several methods of specifying the
   * columns to display.
   *
   * The original method uses an array of functions to generate dynamic columns. Column functions
   * are simple javascript functions with only one input argument `d` which represents a row in
   * the data set. The return value of these functions will be used to generate the content for
   * each cell. However, this method requires the HTML for the table to have a fixed set of column
   * headers.
   *
   * <pre><code>chart.columns([
   *     function(d) { return d.date; },
   *     function(d) { return d.open; },
   *     function(d) { return d.close; },
   *     function(d) { return numberFormat(d.close - d.open); },
   *     function(d) { return d.volume; }
   * ]);
   * </code></pre>
   *
   * In the second method, you can list the columns to read from the data without specifying it as
   * a function, except where necessary (ie, computed columns).  Note the data element name is
   * capitalized when displayed in the table header. You can also mix in functions as necessary,
   * using the third `{label, format}` form, as shown below.
   *
   * <pre><code>chart.columns([
   *     "date",    // d["date"], ie, a field accessor; capitalized automatically
   *     "open",    // ...
   *     "close",   // ...
   *     {
   *         label: "Change",
   *         format: function (d) {
   *             return numberFormat(d.close - d.open);
   *         }
   *     },
   *     "volume"   // d["volume"], ie, a field accessor; capitalized automatically
   * ]);
   * </code></pre>
   *
   * In the third example, we specify all fields using the `{label, format}` method:
   * <pre><code>chart.columns([
   *     {
   *         label: "Date",
   *         format: function (d) { return d.date; }
   *     },
   *     {
   *         label: "Open",
   *         format: function (d) { return numberFormat(d.open); }
   *     },
   *     {
   *         label: "Close",
   *         format: function (d) { return numberFormat(d.close); }
   *     },
   *     {
   *         label: "Change",
   *         format: function (d) { return numberFormat(d.close - d.open); }
   *     },
   *     {
   *         label: "Volume",
   *         format: function (d) { return d.volume; }
   *     }
   * ]);
   * </code></pre>
   *
   * You may wish to override the dataTable functions `_doColumnHeaderCapitalize` and
   * `_doColumnHeaderFnToString`, which are used internally to translate the column information or
   * function into a displayed header. The first one is used on the "string" column specifier; the
   * second is used to transform a stringified function into something displayable. For the Stock
   * example, the function for Change becomes the table header **d.close - d.open**.
   *
   * Finally, you can even specify a completely different form of column definition. To do this,
   * override `_chart._doColumnHeaderFormat` and `_chart._doColumnValueFormat` Be aware that
   * fields without numberFormat specification will be displayed just as they are stored in the
   * data, unformatted.
   * @method columns
   * @memberof dc.dataTable
   * @instance
   * @param {Array<Function>} [columns=[]]
   * @returns {Array<Function>}|dc.dataTable}
   */

  _chart.columns = function (columns) {
    if (!arguments.length) {
      return _columns
    }
    _columns = columns
    return _chart
  } /**
   * Get or set sort-by function. This function works as a value accessor at row level and returns a
   * particular field to be sorted by.
   * @method sortBy
   * @memberof dc.dataTable
   * @instance
   * @example
   * chart.sortBy(function(d) {
   *     return d.date;
   * });
   * @param {Function} [sortBy=identity function]
   * @returns {Function|dc.dataTable}
   */

  _chart.sortBy = function (sortBy) {
    if (!arguments.length) {
      return _sortBy
    }
    _sortBy = sortBy
    return _chart
  } /**
   * Get or set sort order. If the order is ` ascending`, the data table will use
   * `dimension().bottom()` to fetch the data; otherwise it will use `dimension().top()`
   * @method order
   * @memberof dc.dataTable
   * @instance
   * @see {@link https://github.com/d3/d3-array/blob/master/README.md#ascending  ascending}
   * @see {@link https://github.com/d3/d3-array/blob/master/README.md#descending  descending}
   * @example
   * chart.order( descending);
   * @param {Function} [order= ascending]
   * @returns {Function|dc.dataTable}
   */

  _chart.order = function (order) {
    if (!arguments.length) {
      return _order
    }
    _order = order
    return _chart
  } /**
   * Get or set if section header rows will be shown.
   * @method showSections
   * @memberof dc.dataTable
   * @instance
   * @example
   * chart
   *     .section([value], [name])
   *     .showSections(true|false);
   * @param {Boolean} [showSections=true]
   * @returns {Boolean|dc.dataTable}
   */

  _chart.showSections = function (showSections) {
    if (!arguments.length) {
      return _showSections
    }
    _showSections = showSections
    return _chart
  } /**
   * Backward-compatible synonym for {@link dc.dataTable#showSections showSections}.
   * @method showGroups
   * @memberof dc.dataTable
   * @instance
   * @param {Boolean} [showGroups=true]
   * @returns {Boolean|dc.dataTable}
   */

  return _chart.anchor(parent, chartGroup)
}
