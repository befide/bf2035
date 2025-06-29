import type { OrganizationDto } from "@/astro/domain"
import type { TreeNode } from "@/astro/domain/content.tree"
import type { FacilityDto } from "@/astro/domain/facilities/facility"
import { numberFormat, oneLineFormat } from "./config"
import type { TaxonomyItemDto } from "@utils/taxonomy/taxonomyItem.ts"

export const treeTableConfigMap = (key: string) => {
  if (key === "domainTaxonomy" || key === "genericTaxonomy") {
    return [
      {
        label: "Label",
        format: (d: TreeNode<TaxonomyItemDto>) =>
          `<div>${oneLineFormat(d.data.term)}${oneLineFormat(d.data.definition)}</div>`,
      },
    ]
  } else if (key === "community") {
    return [
      {
        label: "Label",
        format: (d: TreeNode<OrganizationDto>) =>
          `<div>${oneLineFormat(d.data.label__short)}</div>`,
      },
      {
        label: "Label",
        className: "tree-node__value",
        format: (d: TreeNode<OrganizationDto>) => d,
      },
    ]
  } else if (key === "facilities") {
    return [
      {
        label: "Label",
        format: (d: TreeNode<FacilityDto>) =>
          `<div class='bold tree-node__cell--label'>${d.data.label}</div>${
            d.data.tagLine
              ? "<div class='tree-node__cell--tag-line'>" +
                d.data.tagLine +
                "</div>"
              : ""
          }</div>`,
      },
      {
        label: "Type",
        format: (d: TreeNode<FacilityDto>) => d.data.instanceOf__term,
      },
      {
        label: "Operation Start",
        format: (d: TreeNode<FacilityDto>) =>
          numberFormat(d.data.operation_startYear),
      },
      {
        label: "Operation End",
        format: (d: TreeNode<FacilityDto>) => {
          return numberFormat(d.data.operation_endYear)
        },
      },
    ]
  } else {
    return []
  }
}
