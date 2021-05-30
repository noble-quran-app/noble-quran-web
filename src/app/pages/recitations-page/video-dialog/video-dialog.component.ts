import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss'],
})
export class VideoDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<VideoDialogComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) private data: string
  ) {}

  public iframeUrl: SafeResourceUrl;
  public dangerousVideoUrl: string;

  ngOnInit() {
    this.dialogRef.afterOpened().subscribe(() => {
      this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.data + '?autoplay=0';
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
    });
  }
}
