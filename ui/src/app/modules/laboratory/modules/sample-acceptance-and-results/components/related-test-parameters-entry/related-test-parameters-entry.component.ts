import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SampleAllocationObject } from "src/app/shared/resources/sample-allocations/models/allocation.model";

@Component({
  selector: "app-related-test-parameters-entry",
  templateUrl: "./related-test-parameters-entry.component.html",
  styleUrls: ["./related-test-parameters-entry.component.scss"],
})
export class RelatedTestParametersEntryComponent implements OnInit {
  @Input() allSampleAllocations: SampleAllocationObject[];
  @Input() parametersWithDefinedRelationship: any[];
  @Input() isLIS: boolean;
  @Input() disabled: boolean;
  @Input() conceptNameType: string;
  @Input() order: any;
  relatedAllocation: any;
  finalResultsForParentTestParameter: any;
  @Output() data: EventEmitter<any> = new EventEmitter<any>();
  results: any = {};
  allocationsWithoutRelationShip: any[];
  constructor() {}

  ngOnInit(): void {
    console.log("allSampleAllocations", this.allSampleAllocations);
    console.log("order", this.order);
    // console.log(
    //   "parametersWithDefinedRelationship",
    //   this.parametersWithDefinedRelationship
    // );
    this.relatedAllocation =
      this.parametersWithDefinedRelationship[0]?.relatedAllocation;
    this.finalResultsForParentTestParameter =
      this.relatedAllocation?.finalResult?.groups[
        this.relatedAllocation?.finalResult?.groups?.length - 1
      ]?.results;
    this.allocationsWithoutRelationShip =
      this.order?.allocations?.filter(
        (allocation) =>
          (
            this.order?.parametersWithDefinedRelationship?.filter(
              (all) => all?.id === allocation?.id
            ) || []
          )?.length === 0
      ) || [];
  }

  getFedResult(data: any, relatedResult: any, allocation: any): void {
    this.results[data?.parameter?.uuid + ":" + relatedResult?.uuid] = {
      ...data,
      relatedResult,
      allocation,
    };
    this.data.emit(this.results);
  }
}
