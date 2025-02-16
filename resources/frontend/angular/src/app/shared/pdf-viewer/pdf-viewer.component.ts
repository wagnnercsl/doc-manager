import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocumentView } from '@core/domain-classes/document-view';
import { CommonService } from '@core/services/common.service';
import { OverlayPanelRef } from '@shared/overlay-panel/overlay-panel-ref';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent extends BaseComponent implements OnChanges {
  @Input() document: DocumentView;
  loadingTime = 2000;
  constructor(
    private commonService: CommonService,
    private toastrService: ToastrService,
    private overlayRef: OverlayPanelRef
  ) {
    super();
  }

  documentUrl: Blob = null;
  isLoading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['document']) {
      this.getDocument();
    }
  }

  getDocument() {
    this.isLoading = true;
    this.sub$.sink = this.commonService
      .downloadDocument(this.document)
      .subscribe({
        next: (event: HttpEvent<Blob>) => {
          if (event.type === HttpEventType.Response) {
            this.isLoading = false;
            this.downloadFile(event);
          }
        },
        error: (err) => {
          this.toastrService.error(err.error.message);
          this.isLoading = false;
          this.onCancel();
        },
      });
  }

  downloadFile(data: HttpResponse<Blob>) {
    this.documentUrl = new Blob([data.body], { type: data.body.type });
  }

  onCancel() {
    this.overlayRef.close();
  }
}
