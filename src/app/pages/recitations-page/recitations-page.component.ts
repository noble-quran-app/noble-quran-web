import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuranVideo, Surah } from 'src/app/core/models';
import { Surahs } from 'src/app/data/quran';
import { QuranVideos } from 'src/app/data/videos';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';

@Component({
  selector: 'app-recitations',
  templateUrl: './recitations.component.html',
  styleUrls: ['./recitations.component.scss'],
})
export class RecitationsComponent implements OnInit {
  public surahs = <Surah[]>Surahs;
  public quranVideos = <QuranVideo[]>QuranVideos;

  constructor(private dialog: MatDialog) {}

  openVideoDialog(videoId: string) {
    this.dialog.open(VideoDialogComponent, {
      width: '720px',
      height: '480px',
      panelClass: 'video-dialog',
      data: videoId,
    });
  }

  ngOnInit(): void {}
}
